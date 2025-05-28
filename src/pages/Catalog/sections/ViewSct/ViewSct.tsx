import BookPreview from 'components/BookPreview'
import BookPreviewSkeleton from 'components/BookPreviewSkeleton'
import { useCatalog } from 'pages/Catalog/hooks/useCatalog'
import s from './ViewSct.module.scss'

export default function ViewSct() {
  // const queryParams = {
  //   page: 1,
  //   size: 10
  // }

  // const { data, isLoading } = useGetAllBooksQry(queryParams)
  // console.log('ViewSct data:', data)
  const { books, isLoading } = useCatalog()

  return (
    <section className={s.ViewSct}>
      {isLoading ? (
        <>
          {[...Array(12)].map((_, index) => (
            <BookPreviewSkeleton key={index} className={s.item} />
          ))}
        </>
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