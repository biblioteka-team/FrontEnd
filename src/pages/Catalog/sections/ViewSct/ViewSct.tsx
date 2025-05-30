import BookPreview from 'components/BookPreview'
import BookPreviewSkeleton from 'components/BookPreviewSkeleton'
import { useCatalog } from 'pages/Catalog/hooks/useCatalog'
import s from './ViewSct.module.scss'

export default function ViewSct() {
  const { books, isLoading } = useCatalog()

  return (
    <section className={s.ViewSct}>
      {isLoading ? (
        <>
          {[...Array(12)].map((_, index) => (
            <BookPreviewSkeleton key={index} className={s.item} />
          ))}
        </>
      ) : books.length === 0 ? (
        <div className={s.noItems}>
          <p>Немає товарів</p>
        </div>
      ) : (
        books.map(el => (
          <BookPreview key={el.id} contextValue={{ offer: el }} className={s.item}>
            <BookPreview.Image className={s.image} />
            <BookPreview.Title className={s.bookTitle} />
            <BookPreview.Author className={s.author} />
            <BookPreview.Price className={s.price} />
            <BookPreview.AddToCartButton className={s.addToCartBtn} />
          </BookPreview>
        ))
      )
      }
    </section >
  )
}