import cn from 'classnames'
import { useEffect } from 'react'
import s from './Drawer.module.scss'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  children?: React.ReactNode
  className?: string
  classNameContent?: string
}

export default function Drawer({ isOpen = false, onClose, children, className, classNameContent }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = 'var(--scrollbar-width)'
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])


  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
  }, [])
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className={s.overlay}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <section
        className={cn(s.FilterDrawer, {
          [s.open]: isOpen
        }, className)}
      >
        <button
          className={s.closeButton}
          onClick={onClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <div className={cn(s.content, classNameContent)}>
          {children}
        </div>
      </section>
    </>
  )
}