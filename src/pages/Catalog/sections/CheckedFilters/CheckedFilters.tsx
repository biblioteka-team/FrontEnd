import { useUrlParams } from '../../hooks/useUrlParams'
import s from './CheckedFilters.module.scss'

const LANGUAGE_LABELS: Record<string, string> = {
  UK: 'Українська',
  EN: 'Англійська'
}

const AGE_GROUP_LABELS: Record<string, string> = {
  KIDS: 'Дитяча',
  ADULT: 'Доросла'
}
const SUBCATEGORY_LABELS: Record<string, string> = {
  ROMANCE: 'Романи',
  HISTORICAL: 'Історичні романи',
  DETECTIVE: 'Детективні романи',
  SCIFI: 'Наукова фантастика',
  FANTASY: 'Фентезі',
  PSYCHOLOGICAL: 'Психологічні романи',
  POETRY: 'Поезія',
  BIOGRAPHY: 'Біографії та мемуари',
  HISTORY: 'Історія',
  SCIENCE: 'Наука і техніка',
  PHILOSOPHY: 'Філософія',
  PSYCHOLOGY: 'Психологія',
  BUSINESS: 'Економіка і бізнес',
  ARTS_CULTURE: 'Мистецтво і культура',
  TRAVEL: 'Подорожі і туризм',
  COOKING: 'Кулінарія',
  FAIRY_TALES: 'Казки',
  PRESCHOOL: 'Розповіді для дошкільнят',
  SCHOOL_AGE: 'Книги для молодшого шкільного віку',
  TEEN: 'Підліткова література',
  EDUCATIONAL_KIDS: 'Освітні книги',
  PRESCHOOL_EDU: 'Підготовка до школи',
  TEXTBOOKS: 'Підручники',
  MANUALS: 'Посібники',
  MOTIVATION: 'Мотиваційні книги',
  SELF_PSYCHOLOGY: 'Психологія саморозвитку',
  HEALTH: 'Здоров\'я і фітнес',
  MEDICAL: 'Медична література',
  LAW: 'Правознавство',
  TECHNICAL: 'Технічна література',
  IT: 'Інформаційні технології'
}

export default function CheckedFilters() {
  const { getParams, setParams } = useUrlParams()
  const { language, subcategories, author, ageGroup, priceRange } = getParams()

  const handleRemoveFilter = (type: string, value?: string) => {
    const currentParams = getParams()

    switch (type) {
      case 'language':
        if (value && currentParams.language) {
          setParams({
            ...currentParams,
            language: currentParams.language.filter(lang => lang !== value)
          })
        }
        break
      case 'subcategories':
        if (value && currentParams.subcategories) {
          setParams({
            ...currentParams,
            subcategories: currentParams.subcategories.filter(sub => sub !== value)
          })
        }
        break
      case 'author':
        setParams({
          ...currentParams,
          author: undefined
        })
        break
      case 'ageGroup':
        setParams({
          ...currentParams,
          ageGroup: undefined
        })
        break
      case 'priceRange':
        setParams({
          ...currentParams,
          priceRange: undefined
        })
        break
    }
  }

  return (
    <section className={s.CheckedFilters}>
      {language?.map(lang => (
        <div key={lang} className={s.filter}>
          <span>{LANGUAGE_LABELS[lang]}</span>
          <button
            onClick={() => handleRemoveFilter('language', lang)}
            className={s.removeButton}
          >
            ✕
          </button>
        </div>
      ))}

      {subcategories?.map(sub => (
        <div key={sub} className={s.filter}>
          <span>{SUBCATEGORY_LABELS[sub] || sub}</span>
          <button
            onClick={() => handleRemoveFilter('subcategories', sub)}
            className={s.removeButton}
          >
            ✕
          </button>
        </div>
      ))}

      {author && (
        <div className={s.filter}>
          <span>Автор: {author}</span>
          <button
            onClick={() => handleRemoveFilter('author')}
            className={s.removeButton}
          >
            ✕
          </button>
        </div>
      )}

      {ageGroup && (
        <div className={s.filter}>
          <span>{AGE_GROUP_LABELS[ageGroup]}</span>
          <button
            onClick={() => handleRemoveFilter('ageGroup')}
            className={s.removeButton}
          >
            ✕
          </button>
        </div>
      )}

      {priceRange && (
        <div className={s.filter}>
          <span>
            Ціна: {priceRange.min} - {priceRange.max} грн
          </span>
          <button
            onClick={() => handleRemoveFilter('priceRange')}
            className={s.removeButton}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}