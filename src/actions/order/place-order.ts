'use server'
import prisma from '@/lib/prisma'

import { auth } from '@/auth.config'
import type { Address, Size } from '@/interfaces'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return {
      ok: false,
      message: 'There is no user session'
    }
  }

  // Get information about the products
  // Note: Remember that we can have 2+ products with the same ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId)
      }
    }
  })

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0)

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity
      const product = products.find((product) => product.id === item.productId)

      if (!product) throw new Error(`${item.productId} does not exist - 500`)

      const subTotal = product.price * productQuantity

      totals.subTotal += subTotal
      totals.tax += subTotal * 0.15
      totals.total += subTotal * 1.15

      return totals
    },
    { subTotal: 0, tax: 0, total: 0 }
  )

  // Transaction
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. update stock
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0)

        if (productQuantity === 0) {
          throw new Error(`${product.id} does not have a defined quantity.`)
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)

      // Verify negative values in existence = no stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} There is not enough inventory.`)
        }
      })

      // 2. Order Creation
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0
              }))
            }
          },

          OrderAddress: {
            create: {
              countryId: address.country,
              firstName: address.firstName,
              lastName: address.lastName,
              phone: address.phone,
              address: address.address,
              address2: address.address2,
              postalCode: address.postalCode,
              city: address.city
            }
          }
        }
      })

      //todo Validate if the Price is zero

      return {
        updatedProducts: updatedProducts,
        order: order
      }
    })

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx
    }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error?.message
    }
  }
}
