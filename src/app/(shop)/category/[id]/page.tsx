import { ProductGrid, Title } from '@/components'
import { Category } from '@/interfaces'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: Category
  }
}

const products = initialData.products

export default function CategoryPage({ params }: Props) {
  const { id } = params
  const filteredProductsByCategory = products.filter((p) => p.gender === id)
  const labels: Record<Category, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kids',
    unisex: 'All'
  }
  if (filteredProductsByCategory.length === 0) notFound()

  return (
    <>
      <Title title={`${labels[id]}`} subtitle="All Products" />
      <ProductGrid products={filteredProductsByCategory} />
    </>
  )
}
