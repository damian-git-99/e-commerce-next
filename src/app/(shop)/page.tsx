export const revalidate = 60

import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page
  })
  return (
    <>
      <Title title="Shop" subtitle="All Products" />

      {products.length === 0 && (
        <div className="h-screen flex justify-center">
          <p>No Hay Productos Disponibles...</p>
        </div>
      )}

      {products.length > 0 && (
        <>
          <ProductGrid products={products} />
          <Pagination totalPages={totalPages} />
        </>
      )}
    </>
  )
}
