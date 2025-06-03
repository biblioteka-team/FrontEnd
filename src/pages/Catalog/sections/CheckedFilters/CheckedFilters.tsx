import { useUrlParams } from '../../hooks/useUrlParams'
import s from './CheckedFilters.module.scss'

const LANGUAGE_LABELS: Record<string, string> = {
  uk: 'Українська',
  en: 'Англійська'
}

const AGE_GROUP_LABELS: Record<string, string> = {
  KIDS: 'Дитяча',
  ADULT: 'Доросла'
}
const AGE_RESTRICTION_LABELS: Record<number, string> = {
  0: 'Для дітей',
  18: 'Для дорослих'
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
  const { languages, subcategories, author, ageRestriction,  minPrice, maxPrice } = getParams()

 const handleRemoveFilter = (type: string, value?: string | number) => {
    const currentParams = getParams()

    switch (type) {
      case 'languages':
        if (value && currentParams.languages) {
          setParams({
            ...currentParams,
            languages: currentParams.languages.filter(lang => lang !== value)
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
      case 'ageRestriction':
        setParams({
          ...currentParams,
          ageRestriction: null as any
        })
        break
      case 'minPrice':
        setParams({
          ...currentParams,
          minPrice: 1,
        })
        break
      case 'maxPrice':
        setParams({
          ...currentParams,
          maxPrice: 10000, 
        })
        break
    }
  }

  return (
    <section className={s.CheckedFilters}>
      {languages?.map(lang => (
        <div key={lang} className={s.filter}>
          <span>{LANGUAGE_LABELS[lang]}</span>
          <button
            onClick={() => handleRemoveFilter('languages', lang)}
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

       {typeof ageRestriction === 'number' && (
        <div className={s.filter}>
          <span>{AGE_RESTRICTION_LABELS[ageRestriction]}</span>
          <button
            onClick={() => handleRemoveFilter('ageRestriction')}
            className={s.removeButton}
          >
            ✕
          </button>
        </div>
      )}

      {minPrice !== undefined && minPrice !== 1 && (
        <div className={s.filter}>
          <span>Від: {minPrice} грн</span>
          <button
            onClick={() => handleRemoveFilter('minPrice')}
            className={s.removeButton}
          >
            ✕
          </button>
        </div>
      )}

     
      {maxPrice !== undefined && maxPrice !== 10000 && (
        <div className={s.filter}>
          <span>До: {maxPrice} грн</span>
          <button
            onClick={() => handleRemoveFilter('maxPrice')}
            className={s.removeButton}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}