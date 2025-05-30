import useGetAllBooksQry from 'queries/books/useGetAllBooksQry'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPagination,
  setTotalPages
} from '../../../redux/catalogSlice'
import { useUrlParams } from './useUrlParams'

export const useCatalog = () => {
  const dispatch = useDispatch()
  const { setParams, getParams } = useUrlParams()
  const { pageSize } = useSelector(selectPagination)
  const urlParams = getParams()
  
  const prevFiltersRef = useRef({
    language: urlParams.language,
    subcategories: urlParams.subcategories,
    author: urlParams.author,
    ageGroup: urlParams.ageGroup,
    priceRange: urlParams.priceRange
  })

  // Convert 1-based page to 0-based for API
  const apiPage = Math.max(0, urlParams.page - 1)

  const { data, isLoading, refetch } = useGetAllBooksQry({
    page: apiPage,
    size: pageSize,
    language: urlParams.language?.join(','),
    subcategories: urlParams.subcategories?.join(','),
    author: urlParams.author,
    ageGroup: urlParams.ageGroup,
    priceRange: urlParams.priceRange
  })

  // Update total pages when data changes
  useEffect(() => {
    if (data?.data?.totalPages) {
      dispatch(setTotalPages(data.data.totalPages))
    }
  }, [data?.data?.totalPages, dispatch])

  // Ефект для відстеження змін фільтрів та URL параметрів
  useEffect(() => {
    const currentFilters = {
      language: urlParams.language,
      subcategories: urlParams.subcategories,
      author: urlParams.author,
      ageGroup: urlParams.ageGroup,
      priceRange: urlParams.priceRange
    }

    const prevFilters = prevFiltersRef.current
    
    const hasFiltersChanged = 
      JSON.stringify(prevFilters.language) !== JSON.stringify(currentFilters.language) ||
      JSON.stringify(prevFilters.subcategories) !== JSON.stringify(currentFilters.subcategories) ||
      prevFilters.author !== currentFilters.author ||
      prevFilters.ageGroup !== currentFilters.ageGroup ||
      JSON.stringify(prevFilters.priceRange) !== JSON.stringify(currentFilters.priceRange)

    if (hasFiltersChanged) {
      prevFiltersRef.current = currentFilters
      // Оновлюємо URL параметри без колбека
      setParams({ 
        ...urlParams,
        page: 1
      })
    }
  }, [
    urlParams.language,
    urlParams.subcategories,
    urlParams.author,
    urlParams.ageGroup,
    urlParams.priceRange
  ])

  // Окремий ефект для рефетчу при будь-яких змінах параметрів
  useEffect(() => {
    refetch()
  }, [
    urlParams.page,
    urlParams.language,
    urlParams.subcategories,
    urlParams.author,
    urlParams.ageGroup,
    urlParams.priceRange,
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