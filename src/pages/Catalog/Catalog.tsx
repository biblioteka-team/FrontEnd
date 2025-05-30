import s from './Catalog.module.scss'
import CheckedFilters from './sections/CheckedFilters'
import FilterMenuSct from './sections/FilterMenuSct'
import PaginationSct from './sections/PaginationSct'
import ViewSct from './sections/ViewSct'

export default function Catalog() {

  return (
    <section className={s.Catalog}>
      <FilterMenuSct />
      <CheckedFilters />
      <div className={s.content}>
        <ViewSct />
        <PaginationSct />
      </div>
    </section>
  )
}