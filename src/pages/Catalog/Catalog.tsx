import s from './Catalog.module.scss'
import FilterMenuSct from './sections/FilterMenuSct'
import PaginationSct from './sections/PaginationSct'
import ViewSct from './sections/ViewSct'

export default function Catalog() {

  return (
    <section className={s.Catalog}>
      <FilterMenuSct />
      <div className={s.content}>
        <ViewSct />
        <PaginationSct />
      </div>
    </section>
  )
}