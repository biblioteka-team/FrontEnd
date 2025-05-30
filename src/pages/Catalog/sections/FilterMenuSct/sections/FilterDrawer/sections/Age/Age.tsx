import CheckBox from 'components/CheckBox'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilters, setAgeGroup } from '../../../../../../../../redux/Catalog'
import s from './Age.module.scss'

export default function Age() {
  const dispatch = useDispatch()
  const { ageGroup } = useSelector(selectFilters)

  const handleAgeToggle = (group: 'ADULT' | 'CHILDREN') => {
    if (ageGroup === group) {
      dispatch(setAgeGroup(undefined))
    } else {
      dispatch(setAgeGroup(group))
    }
  }

  return (
    <section className={s.Age}>
      <h3 className={s.title}>Вік</h3>
      <CheckBox
        text="Для дітей"
        checked={ageGroup === 'CHILDREN'}
        onChange={() => handleAgeToggle('CHILDREN')}
      />
      <CheckBox
        text="Для дорослих"
        checked={ageGroup === 'ADULT'}
        onChange={() => handleAgeToggle('ADULT')}
      />
    </section>
  )
}