import CheckBox from 'components/CheckBox'
import DropDown from 'components/DropDown'
import { useUrlParams } from 'pages/Catalog/hooks/useUrlParams'
import { Subcategory } from '../../../../../../../../redux/catalogSlice'
import s from './Genre.module.scss'

interface GenreCategory {
  title: string
  items: {
    text: string
    value: Subcategory
  }[]
}

const GENRE_CATEGORIES: GenreCategory[] = [
  {
    title: 'Художня література',
    items: [
      { text: 'Романи', value: 'ROMANCE' },
      { text: 'Історичні романи', value: 'HISTORICAL' },
      { text: 'Детективні романи', value: 'DETECTIVE' },
      { text: 'Наукова фантастика', value: 'SCIFI' },
      { text: 'Фентезі', value: 'FANTASY' },
      { text: 'Психологічні романи', value: 'PSYCHOLOGICAL' },
      { text: 'Поезія', value: 'POETRY' },
    ]
  },
  {
    title: 'Нехудожня література',
    items: [
      { text: 'Біографії та мемуари', value: 'BIOGRAPHY' },
      { text: 'Історія', value: 'HISTORY' },
      { text: 'Наука і техніка', value: 'SCIENCE' },
      { text: 'Філософія', value: 'PHILOSOPHY' },
      { text: 'Психологія', value: 'PSYCHOLOGY' },
      { text: 'Економіка і бізнес', value: 'BUSINESS' },
      { text: 'Мистецтво і культура', value: 'ARTS_CULTURE' },
      { text: 'Подорожі і туризм', value: 'TRAVEL' },
      { text: 'Кулінарія', value: 'COOKING' },
    ]
  },
  {
    title: 'Дитяча література',
    items: [
      { text: 'Казки', value: 'FAIRY_TALES' },
      { text: 'Розповіді для дошкільнят', value: 'PRESCHOOL' },
      { text: 'Книги для молодшого шкільного віку', value: 'SCHOOL_AGE' },
      { text: 'Підліткова література', value: 'TEEN' },
      { text: 'Освітні книги', value: 'EDUCATIONAL_KIDS' },
    ]
  },
  {
    title: 'Навчальна література',
    items: [
      { text: 'Підготовка до школи', value: 'PRESCHOOL_EDU' },
      { text: 'Підручники', value: 'TEXTBOOKS' },
      { text: 'Посібники', value: 'MANUALS' },
    ]
  },
  {
    title: 'Самовдосконалення',
    items: [
      { text: 'Мотиваційні книги', value: 'MOTIVATION' },
      { text: 'Психологія саморозвитку', value: 'SELF_PSYCHOLOGY' },
      { text: 'Здоров\'я і фітнес', value: 'HEALTH' },
    ]
  }, {
    title: 'Спеціалізована література',
    items: [
      { text: 'Медична література', value: 'MEDICAL' },
      { text: 'Правознавство', value: 'LAW' },
      { text: 'Технічна література', value: 'TECHNICAL' },
      { text: 'Інформаційні технології ', value: 'IT' },

    ]
  }
]

export default function Genre() {
  const { getParams, setParams } = useUrlParams()
  const { subcategories = [] } = getParams()

  const handleSubcategoryToggle = (value: Subcategory) => () => {
    const params = getParams()
    const current = params.subcategories || []

    if (current.includes(value)) {
      setParams({
        ...params,
        subcategories: current.filter(s => s !== value)
      })
    } else {
      setParams({
        ...params,
        subcategories: [...current, value]
      })
    }
  }


  return (
    <section className={s.Genre}>
      <h3 className={s.title}>Жанри</h3>

      {GENRE_CATEGORIES.map(category => (
        <DropDown
          key={category.title}
          title={category.title}
          className={s.dropDown}
          classNameContent={s.dropDownContent}
        >
          {category.items.map(({ text, value }) => (
            <CheckBox
              key={value}
              text={text}
              checked={subcategories.includes(value)}
              onChange={handleSubcategoryToggle(value)}
            />
          ))}
        </DropDown>
      ))}
    </section>
  )
}