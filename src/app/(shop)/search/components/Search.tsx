'use client'

import { useState } from 'react'
import { SearchInput } from './SearchInput'
import { ProductsResult } from './ProductsResult'

export const Search = () => {
  const [search, setSearch] = useState('')
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
