import CheckBox from 'components/CheckBox'
import { useUrlParams } from '../../../../../../hooks/useUrlParams'
import s from './Age.module.scss'

export type AgeRestriction = 0 | 18 // 0 for children, 18 for adults

export default function Age() {
  const { getParams, setParams } = useUrlParams()
  const { ageRestriction } = getParams()

  const handleAgeToggle = (age: AgeRestriction) => {
    const params = getParams()
    
    if (params.ageRestriction === age) {
      // If same age is clicked, remove the filter
      setParams({
        ...params,
        ageRestriction: undefined
      })
    } else {
      // Set new age restriction
      setParams({
        ...params,
        ageRestriction: age
      })
    }
  }

  return (
    <section className={s.Age}>
      <h3 className={s.title}>Вік</h3>
      <CheckBox
        text="Для дітей"
        checked={ageRestriction === 0}
        onChange={() => handleAgeToggle(0)}
      />
      <CheckBox
        text="Для дорослих"
        checked={ageRestriction === 18}
        onChange={() => handleAgeToggle(18)}
      />
    </section>
  )
}