import useGetAllBooksQry from 'queries/books/useGetAllBooksQry'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPagination,
  setTotalPages
} from '../../../redux/Catalog'

import { useUrlParams } from './useUrlParams'

export const useCatalog = () => {
  const dispatch = useDispatch()
  const { setParams, getParams } = useUrlParams()
  const { pageSize } = useSelector(selectPagination)
  const urlParams = getParams()
  
  const prevFiltersRef = useRef({
    languages: urlParams.languages,
    subcategories: urlParams.subcategories,
    author: urlParams.author,
    ageRestriction: urlParams.ageRestriction,
     minPrice: urlParams.minPrice,
    maxPrice: urlParams.maxPrice
  })

  // Convert 1-based page to 0-based for API
  const apiPage = Math.max(0, urlParams.page - 1)

  const { data, isLoading, refetch } = useGetAllBooksQry({
    page: apiPage,
    size: pageSize,
    languages: urlParams.languages?.length ? urlParams.languages.join(',') : undefined,
    subcategories: urlParams.subcategories?.join(','),
    author: urlParams.author,
    ageRestriction: urlParams.ageRestriction,
     minPrice: urlParams.minPrice,
    maxPrice: urlParams.maxPrice
  })


  // Update total pages when data changes
  useEffect(() => {
    console.log('useCatalog data:', data);
    
    if (data?.data?.totalPages) {
      dispatch(setTotalPages(data.data.totalPages))
    }
  }, [data?.data?.totalPages, dispatch])

  // Ефект для відстеження змін фільтрів та URL параметрів
  useEffect(() => {
    const currentFilters = {
      languages: urlParams.languages,
      subcategories: urlParams.subcategories,
      author: urlParams.author,
      ageRestriction: urlParams.ageRestriction,
       minPrice: urlParams.minPrice,
    maxPrice: urlParams.maxPrice
    }

    const prevFilters = prevFiltersRef.current
    
    const hasFiltersChanged = 
      JSON.stringify(prevFilters.languages) !== JSON.stringify(currentFilters.languages) ||
      JSON.stringify(prevFilters.subcategories) !== JSON.stringify(currentFilters.subcategories) ||
      prevFilters.ageRestriction !== currentFilters.ageRestriction ||
      prevFilters.minPrice !== currentFilters.minPrice ||
      prevFilters.maxPrice !== currentFilters.maxPrice

    if (hasFiltersChanged) {
      prevFiltersRef.current = currentFilters
      // Оновлюємо URL параметри без колбека
      setParams({ 
        ...urlParams,
        page: 1
      })
    }
  }, [
    urlParams.languages,
    urlParams.subcategories,
    urlParams.author,
    urlParams.ageRestriction,
    urlParams.minPrice,
    urlParams.maxPrice
  ])

  // Окремий ефект для рефетчу при будь-яких змінах параметрів
  useEffect(() => {
    refetch()
  }, [
    urlParams.page,
    urlParams.languages,
    urlParams.subcategories,
    urlParams.author,
    urlParams.ageRestriction,
    urlParams.minPrice,
    urlParams.maxPrice,
    refetch
  ])

  return {
    books: data?.data?.content || [],
    isLoading,
    totalElements: data?.data?.totalElements || 0,
    currentPage: urlParams.page,
    pageSize,
    filters: urlParams
  }
}