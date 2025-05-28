import { useCatalog } from 'pages/Catalog/hooks/useCatalog'
import s from './NumbersOfGoods.module.scss'

export default function NumbersOfGoods() {
  const { totalElements } = useCatalog()

  return (
    <p className={s.NumbersOfGoods}>
      {totalElements} товарів
    </p>
  )
}