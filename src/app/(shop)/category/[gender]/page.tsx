import { ProductGrid, Title } from '@/components'
import { Category } from '@/interfaces'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    gender: Category
  }
}

const products = initialData.products

export default function CategoryPage({ params }: Props) {
  const { gender } = params
  const filteredProductsByCategory = products.filter((p) => p.gender === gender)
  const labels: Record<Category, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kids',
    unisex: 'All'
  }
  if (filteredProductsByCategory.length === 0) notFound()

  return (
    <>
      <Title title={`${labels[gender]}`} subtitle="All Products" />
      <ProductGrid products={filteredProductsByCategory} />
    </>
  )
}
