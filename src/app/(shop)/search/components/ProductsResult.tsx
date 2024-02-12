'use client'
import { Pagination, ProductGrid } from '@/components'
import { useEffect, useState } from 'react'
import { Loader } from './Loader'
import { getPaginatedProductsWithImagesByTitle } from '@/actions'
import { useSearchParams } from 'next/navigation'
import { Product } from '@/interfaces'

interface Props {
  search: string
}

export const ProductsResult = ({ search }: Props) => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    const data = setTimeout(() => {
      let page = 1
      if (searchParams.has('page'))
        page = parseInt(searchParams.get('page') as string)

      getPaginatedProductsWithImagesByTitle({ term: search, page })
        .then((res) => {
          setProducts(res.products)
          setTotalPages(res.totalPages)
        })
        .finally(() => setIsLoading(false))
    }, 1000)
    return () => clearTimeout(data)
  }, [search, searchParams])

  return (
    <div>
      {isLoading && <Loader />}
      {products.length === 0 && isLoading === false && (
        <div className="bg-gray-600 h-15 p-3 text-center text-white mt-7">
          No Results...
        </div>
      )}
      {products.length > 0 && isLoading === false && (
        <div className="mt-5">
          <ProductGrid products={products} />
          <Pagination totalPages={totalPages} extraParams={{ term: search }} />
        </div>
      )}
    </div>
  )
}
