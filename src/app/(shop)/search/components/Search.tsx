'use client'

import { useState } from 'react'
import { SearchInput } from './SearchInput'
import { ProductsResult } from './ProductsResult'
import { useSearchParams } from 'next/navigation'

export const Search = () => {
  const searchParams = useSearchParams()
  const termParam = searchParams.get('term') ?? ''
  const [search, setSearch] = useState(termParam)
  return (
    <div className="min-h-screen mt-10">
      <div className="flex justify-center">
        <div className="w-[400px]">
          <SearchInput setSearch={setSearch} search={search} />
        </div>
      </div>
      <ProductsResult search={search} />
    </div>
  )
}
