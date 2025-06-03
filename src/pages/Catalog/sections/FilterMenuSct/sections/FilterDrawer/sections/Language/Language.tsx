import CheckBox from 'components/CheckBox'
import { useUrlParams } from '../../../../../../hooks/useUrlParams'
import s from './Language.module.scss'

export type Language = 'uk' | 'en'

export default function Language() {
  const { getParams, setParams } = useUrlParams()
  const { languages: selectedLanguages = [] } = getParams()

  const handleLanguageToggle = (lang: Language) => {
    const params = getParams()
    const current = params.languages || []
    
    if (current.includes(lang)) {
      setParams({
        ...params,
        languages: current.filter(l => l !== lang)
      })
    } else {
      setParams({
        ...params,
        languages: [...current, lang]
      })
    }
  }

  return (
    <section className={s.Language}>
      <h3>Мова</h3>
      <CheckBox
        text="Українська"
        checked={selectedLanguages.includes('uk')}
        onChange={() => handleLanguageToggle('uk')}
      />
      <CheckBox
        text="Англійська"
        checked={selectedLanguages.includes('en')}
        onChange={() => handleLanguageToggle('en')}
      />
    </section>
  )
}