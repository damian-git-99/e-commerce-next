'use client'

import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'
import { useEffect, useState } from 'react'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStock()
  }, [])

  const getStock = async () => {
    const inStock = await getStockBySlug(slug)
    setStock(inStock)
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <span
          className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse `}
        >
          &nbsp;
        </span>
      ) : (
        <span
          className={` ${titleFont.className} antialiased font-bold text-lg`}
        >
          Stock: {stock}
        </span>
      )}
    </>
  )
}
