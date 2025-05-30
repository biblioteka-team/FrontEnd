import cn from 'classnames'
import s from './BookPreviewSkeleton.module.scss'

interface Props {
  className?: string
}

/**
 *  BookPreviewSkeleton
 *  @param className
 */

export default function BookPreviewSkeleton({ className = '' }: Props) {
  return (
    <div className={cn(s.BookPreviewSkeleton, className)}>
      <div className={s.image}></div>
      <div className={s.title}></div>
      <div className={s.author}></div>
      <div className={s.price}></div>
      <div className={s.button}></div>
    </div>
  )
}