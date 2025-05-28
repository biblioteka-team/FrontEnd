import cn from 'classnames'
import { useState } from 'react'
import s from './Sort.module.scss'

type SortOption = {
  id: number
  label: string
  value: string
}

const sortOptions: SortOption[] = [
  { id: 3, label: 'За популярністью', value: 'popularity' },
  { id: 2, label: 'За знижкою', value: 'sale' },
  { id: 4, label: 'Від дешевих', value: 'price_asc' },
  { id: 5, label: 'Від дорогих', value: 'price_desc' },
]

export default function Sort() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(sortOptions[0])

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  return (
    <section className={s.Sort}>
      <div className={s.dropdown}>
        <button
          className={s.trigger}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption.label}</span>
          <svg
            className={cn(s.arrow, { [s.open]: isOpen })}
            width="10"
            height="6"
            viewBox="0 0 10 6"
          >
            <path d="M1 1L5 5L9 1" stroke="currentColor" fill="none" />
          </svg>
        </button>

        {isOpen && (
          <div className={s.menu}>
            {sortOptions.map(option => (
              <button
                key={option.id}
                className={cn(s.option, {
                  [s.active]: selectedOption.id === option.id
                })}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}