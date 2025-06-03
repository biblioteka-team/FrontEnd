import { useSearchParams } from 'react-router-dom'
import { Language, Subcategory } from '../../../redux/Catalog'
import { AgeRestriction } from '../sections/FilterMenuSct/sections/FilterDrawer/sections/Age/Age'
export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getParams = () => ({
    page: Number(searchParams.get('page')) || 1,
    languages: searchParams.getAll('languages') as Language[],
    subcategories: searchParams.getAll('subcategories') as Subcategory[],
    ageRestriction: searchParams.get('ageRestriction') 
      ? Number(searchParams.get('ageRestriction')) as AgeRestriction 
      : undefined,
    author: searchParams.get('author') || undefined,
    minPrice: searchParams.get('min') ? Number(searchParams.get('min')) : undefined,
    maxPrice: searchParams.get('max') ? Number(searchParams.get('max')) : undefined
  })

  const setParams = (params: Partial<{
    page: number
    languages: Language[]
    subcategories: Subcategory[]
    ageRestriction: AgeRestriction
    author: string
    minPrice: number | null
    maxPrice: number | null
  }>) => {
    const newParams = new URLSearchParams(searchParams)
    
    if (params.page !== undefined) {
      newParams.set('page', params.page.toString())
    }
    if (params.languages !== undefined) {
      newParams.delete('languages')
      params.languages.forEach(lang => newParams.append('languages', lang))
    }
    if (params.subcategories !== undefined) {
      newParams.delete('subcategories')
      params.subcategories.forEach(sub => newParams.append('subcategories', sub))
    }
   if (params.ageRestriction !== undefined) {
      if (params.ageRestriction !== null) {
        newParams.set('ageRestriction', params.ageRestriction.toString())
      } else {
        newParams.delete('ageRestriction')
      }
    }
    if (params.author !== undefined) {
      if (params.author) {
        newParams.set('author', params.author)
      } else {
        newParams.delete('author')
      }
    }
     if (params.minPrice !== undefined) {
      if (params.minPrice !== null) {
        newParams.set('min', params.minPrice.toString())
      } else {
        newParams.delete('min')
      }
    }
    if (params.maxPrice !== undefined) {
      if (params.maxPrice !== null) {
        newParams.set('max', params.maxPrice.toString())
      } else {
        newParams.delete('max')
      }
    }

    setSearchParams(newParams, { replace: true })
  }

  return { getParams, setParams }
}