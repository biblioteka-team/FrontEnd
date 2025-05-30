import CheckBox from 'components/CheckBox'
import s from './Filters.module.scss'

export default function Filters() {
  return <section className={s.Filters}>
    <h3>Фільтри</h3>
    <CheckBox
      text="Новинки"
      onChange={(checked) => console.log('Checkbox state:', checked)}
    />
    <CheckBox
      text="Акції"
      onChange={(checked) => console.log('Checkbox state:', checked)}
    />
    <CheckBox
      text="Бестселери"
      onChange={(checked) => console.log('Checkbox state:', checked)}
    />
  </section>
}