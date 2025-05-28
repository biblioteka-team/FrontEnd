import { useEffect, useState } from 'react'
import { useUrlParams } from '../../../../../../hooks/useUrlParams'
import s from './Author.module.scss'

export default function Author() {
  const [searchTerm, setSearchTerm] = useState('')
  const { getParams, setParams } = useUrlParams()
  const { author } = getParams()

  // Update author filter with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== author) {
        setParams({
          ...getParams(),
          author: searchTerm || undefined
        })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const handleClear = () => {
    setSearchTerm('')
    setParams({
      ...getParams(),
      author: undefined
    })
  }

  // Sync input with URL params on mount
  useEffect(() => {
    if (author && !searchTerm) {
      setSearchTerm(author)
    }
  }, [author])

  return (
    <section className={s.Author}>
      <h3 className={s.title}>Автор</h3>

      <div className={s.searchWrapper}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введіть ім'я автора..."
          className={s.searchInput}
        />
        {searchTerm && (
          <button
            className={s.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {author && (
        <div className={s.selectedAuthor}>
          <span>Обрано: {author}</span>
        </div>
      )}
    </section>
  )
}