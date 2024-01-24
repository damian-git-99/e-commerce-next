export const revalidate = 60

import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { Gender } from '@prisma/client'
import { notFound, redirect } from 'next/navigation'

interface Props {
  params: {
    gender: string
  }
  searchParams: {
    page?: string
  }
}

export default async function GenderPage({ params, searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { gender } = params
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender
  })
  if (products.length === 0) {
    redirect('/')
  }
  const filteredProductsByCategory = products.filter((p) => p.gender === gender)
  const labels: Record<string, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kids',
    unisex: 'All'
  }
  if (filteredProductsByCategory.length === 0) notFound()
  return (
    <>
      <Title title={`${labels[gender as Gender]}`} subtitle="All Products" />
      <ProductGrid products={filteredProductsByCategory} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
