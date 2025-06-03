import { useUrlParams } from '../../../../../../hooks/useUrlParams'
import s from './ClearAllFiltersBtn.module.scss'

export default function ClearAllFiltersBtn() {
  const { getParams, setParams } = useUrlParams()
  // const params = getParams()


  const handleClearAll = () => {
    setParams({
      page: 1,
      languages: [],
      subcategories: [],
      author: undefined,
      ageRestriction: null as any,
      minPrice: null,
      maxPrice: null,
    })
  }


  return (
    <button
      className={s.ClearAllFiltersBtn}
      onClick={handleClearAll}
    >
      Очистити всі фільтри
    </button>
  )
}