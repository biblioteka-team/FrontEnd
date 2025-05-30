import Icon from 'assets/icons/AllFiltersIcon.svg'
import Drawer from 'components/Drawer'
import { useState } from 'react'
import s from './FilterDrawer.module.scss'
import Filters from './sections/Filters'
import Genre from './sections/Genre'

export default function FilterDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)


  return <section className={s.FilterDrawer}>
    <button onClick={() => setIsDrawerOpen(true)} className={s.openDrawerButton}>
      Усі фільтри
      <img src={Icon} alt="" className={s.icon} />
    </button>
    <Drawer
      isOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      className={s.drawer}
      classNameContent={s.drawerContentInner}
    >
      <Filters />
      {/* <Language /> */}
      <Genre />
      {/* <Age /> */}
      {/* <Author /> */}
      {/* <Price /> */}
    </Drawer>
  </section>
}