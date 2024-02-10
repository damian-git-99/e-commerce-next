import { Pagination, ProductGrid } from '@/components'
import { useEffect, useState } from 'react'
import { Loader } from './Loader'
import { getPaginatedProductsWithImagesByTitle } from '@/actions'

interface Props {
  search: string
}

export const ProductsResult = ({ search }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<any>([])
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    const data = setTimeout(() => {
      // todo: call server action
      getPaginatedProductsWithImagesByTitle({ term: search })
        .then((res) => {
          console.log('call server')
          console.log(res)
          setProducts(res.products)
          setTotalPages(res.totalPages)
        })
        .finally(() => setIsLoading(false))
    }, 1000)
    return () => clearTimeout(data)
  }, [search])

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
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
