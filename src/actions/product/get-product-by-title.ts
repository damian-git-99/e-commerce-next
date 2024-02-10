'use server'

import prisma from '@/lib/prisma'

interface PaginationOptions {
  page?: number
  take?: number
  term: string
}

export const getPaginatedProductsWithImagesByTitle = async ({
  page = 1,
  take = 10,
  term
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  try {
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      },
      where: {
        title: {
          contains: term,
          mode: 'insensitive'
        }
      }
    })

    const totalCount = await prisma.product.count({
      where: {
        title: {
          contains: term,
          mode: 'insensitive'
        }
      }
    })

    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url)
      }))
    }
  } catch (error) {
    throw new Error('The products could not be loaded')
  }
}
