import { useUrlParams } from '../../../../../../hooks/useUrlParams'
import s from './ClearAllFiltersBtn.module.scss'

export default function ClearAllFiltersBtn() {
  const { getParams, setParams } = useUrlParams()
  const params = getParams()

  const hasActiveFilters =
    params.language?.length > 0 ||
    params.subcategories?.length > 0 ||
    params.author ||
    params.ageGroup ||
    params.priceRange

  const handleClearAll = () => {
    setParams({
      page: 1,
      language: [],
      subcategories: [],
      author: undefined,
      ageGroup: undefined,
      priceRange: undefined
    })
  }

  // if (!hasActiveFilters) return null

  return (
    <button
      className={s.ClearAllFiltersBtn}
      onClick={handleClearAll}
    >
      Очистити всі фільтри
    </button>
  )
}