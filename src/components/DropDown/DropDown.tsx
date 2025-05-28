import cn from 'classnames'
import { useState } from 'react'
import s from './DropDown.module.scss'

interface Props {
  className?: string
  title: string
  children: React.ReactNode
  classNameContent?: string
}

export default function DropDown({ className = '', title, children, classNameContent }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn(s.DropDown, className)}>
      <button
        className={s.trigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={s.title}>{title}</span>
        <svg
          className={cn(s.arrow, { [s.open]: isOpen })}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className={cn(s.content, classNameContent, { [s.visible]: isOpen })}>
        {children}
      </div>
    </div>
  )
}