import { useSearchParams } from 'react-router-dom'
import { AgeGroup, Language, Subcategory } from '../../../redux/catalogSlice'

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getParams = () => ({
    page: Number(searchParams.get('page')) || 1,
    language: searchParams.getAll('language') as Language[],
    subcategories: searchParams.getAll('subcategories') as Subcategory[],
    ageGroup: searchParams.get('ageGroup') as AgeGroup | undefined,
    author: searchParams.get('author') || undefined,
    priceRange: searchParams.get('priceRange') ? 
      JSON.parse(searchParams.get('priceRange')!) : undefined
  })

  const setParams = (params: Partial<{
    page: number
    language: Language[]
    subcategories: Subcategory[]
    ageGroup: AgeGroup
    author: string
    priceRange: { min: number; max: number }
  }>) => {
    const newParams = new URLSearchParams(searchParams)
    
    if (params.page !== undefined) {
      newParams.set('page', params.page.toString())
    }
    if (params.language !== undefined) {
      newParams.delete('language')
      params.language.forEach(lang => newParams.append('language', lang))
    }
    if (params.subcategories !== undefined) {
      newParams.delete('subcategories')
      params.subcategories.forEach(sub => newParams.append('subcategories', sub))
    }
    if (params.ageGroup !== undefined) {
      if (params.ageGroup) {
        newParams.set('ageGroup', params.ageGroup)
      } else {
        newParams.delete('ageGroup')
      }
    }
    if (params.author !== undefined) {
      if (params.author) {
        newParams.set('author', params.author)
      } else {
        newParams.delete('author')
      }
    }
    if (params.priceRange !== undefined) {
      if (params.priceRange) {
        newParams.set('priceRange', JSON.stringify(params.priceRange))
      } else {
        newParams.delete('priceRange')
      }
    }

    setSearchParams(newParams, { replace: true })
  }

  return { getParams, setParams }
}