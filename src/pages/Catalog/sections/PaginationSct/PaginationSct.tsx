import cn from 'classnames'
import { useCatalog } from 'pages/Catalog/hooks/useCatalog'
import { useSelector } from 'react-redux'
import { selectPagination } from '../../../../redux/catalogSlice'
import { useUrlParams } from '../../hooks/useUrlParams'
import s from './PaginationSct.module.scss'

interface Props {
  className?: string
}

export default function PaginationSct({ className = '' }: Props) {
  const { totalPages } = useSelector(selectPagination)
  const { getParams, setParams } = useUrlParams()
  const { books } = useCatalog()
  const { page } = getParams()

  const handlePageChange = (newPage: number) => {
    setParams({ page: newPage })
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Add first page if not visible
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={cn(s.pageButton, { [s.active]: page === 1 })}
        >
          1
        </button>
      )
      if (startPage > 2) pages.push(<span key="dots1">...</span>)
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={cn(s.pageButton, { [s.active]: page === i })}
        >
          {i}
        </button>
      )
    }

    // Add last page if not visible
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<span key="dots2">...</span>)
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={cn(s.pageButton, { [s.active]: page === totalPages })}
        >
          {totalPages}
        </button>
      )
    }

    return pages
  }

  if (books.length === 0 || totalPages <= 1) return null

  return (
    <section className={cn(s.PaginationSct, className)}>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={s.arrowButton}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <div className={s.pageNumbers}>
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={s.arrowButton}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </button>
    </section>
  )
}