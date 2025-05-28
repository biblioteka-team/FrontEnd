import CheckBox from 'components/CheckBox'
import { useUrlParams } from '../../../../../../hooks/useUrlParams'
import s from './Language.module.scss'

type LanguageType = 'UK' | 'EN'

export default function Language() {
  const { getParams, setParams } = useUrlParams()
  const { language: selectedLanguages = [] } = getParams()

  const handleLanguageToggle = (lang: LanguageType) => {
    const params = getParams()
    const current = params.language || []

    if (current.includes(lang)) {
      setParams({
        ...params,
        language: current.filter(l => l !== lang)
      })
    } else {
      setParams({
        ...params,
        language: [...current, lang]
      })
    }
  }

  return (
    <section className={s.Language}>
      <h3>Мова</h3>
      <CheckBox
        text="Українська"
        checked={selectedLanguages.includes('UK')}
        onChange={() => handleLanguageToggle('UK')}
      />
      <CheckBox
        text="Англійська"
        checked={selectedLanguages.includes('EN')}
        onChange={() => handleLanguageToggle('EN')}
      />
    </section>
  )
}