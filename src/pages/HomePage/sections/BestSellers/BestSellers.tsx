import BookPreview from 'components/BookPreview'
import BookPreviewSkeleton from 'components/BookPreviewSkeleton'
import MainSlider from 'components/MainSlider'
import useGetAllBooksBestSellersQry from 'queries/books/useGetAllBooksBestSellersQry'
import { useBreakpointMF } from 'react-responsive-tools'
import { Link } from 'react-router-dom'
import s from './BestSellers.module.scss'

export default function BestSellers() {
  const { data, isLoading } = useGetAllBooksBestSellersQry()
  const isMedium = useBreakpointMF("md")
  const isLarge = useBreakpointMF("lg")
  const isExtraLarge = useBreakpointMF("ltm")

  const getItemsToShow = () => {
    if (isExtraLarge) return 5
    if (isLarge) return 4
    if (isMedium) return 3
    return 1
  }
  const getGap = () => {
    if (isExtraLarge) return 60
    if (isMedium) return 36
    return 0
  }

  return <section className={s.BestSellers}> <div className={s.header}>
    <h3 className={s.title}>Бестселери</h3>
    {isMedium && <Link to="/catalog" className={s.viewAll}>Переглянути повністю</Link>}
  </div>
    <MainSlider itemsToShow={getItemsToShow()} gap={getGap()} className={s.Slider}>
      {isLoading ? (
        Array(getItemsToShow()).fill(null).map((_, index) => (
          <div className={s.sliderItem} key={index}>
            <BookPreviewSkeleton className={s.skeleton} />
          </div>
        ))
      ) : (
        data?.data.content.map(el => (
          <div className={s.sliderItem} key={el.id}>
            <BookPreview key={el.id} contextValue={{ offer: el.book }}>
              <BookPreview.Image className={s.image} />
              <BookPreview.Title className={s.bookTitle} />
              <BookPreview.Author className={s.author} />
              <BookPreview.Price className={s.price} />
              <BookPreview.AddToCartButton className={s.addToCartBtn} />
            </BookPreview>
          </div>

        )))}
    </MainSlider>
    {!isMedium && <Link to="/catalog" className={s.viewAll}>Переглянути повністю</Link>}</section>
}


