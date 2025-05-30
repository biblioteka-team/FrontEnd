import s from './FilterMenuSct.module.scss'
import FilterDrawer from './sections/FilterDrawer'
import NumbersOfGoods from './sections/NumbersOfGoods'
import Sort from './sections/Sort'

export default function FilterMenuSct() {
  return <section className={s.FilterMenuSct}>
    <NumbersOfGoods />
    <div className={s.actions}>
      <Sort />
      <FilterDrawer />
    </div>
  </section>
}