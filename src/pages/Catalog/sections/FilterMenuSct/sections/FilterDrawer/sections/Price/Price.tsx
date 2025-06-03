import cn from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import { useUrlParams } from '../../../../../../hooks/useUrlParams'
import s from './Price.module.scss'

const MIN_PRICE = 1
const MAX_PRICE = 10000

interface PriceValues {
  min: number | string
  max: number | string
}

export default function Price() {
  const { getParams, setParams } = useUrlParams()
  const { minPrice, maxPrice } = getParams()

  // Setting the initial values
  const [values, setValues] = useState<PriceValues>({
    min: minPrice === undefined ? MIN_PRICE : minPrice,
    max: maxPrice === undefined ? MAX_PRICE : maxPrice
  })

  // This effect tracks changes to URL parameters
  useEffect(() => {
    setValues({
      min: minPrice === undefined ? MIN_PRICE : minPrice,
      max: maxPrice === undefined ? MAX_PRICE : maxPrice
    })
  }, [minPrice, maxPrice])

  const handleSliderChange = (type: 'min' | 'max') => (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)

    setValues(prev => {
      if (type === 'min') {
        return {
          min: Math.min(value, Number(prev.max) - 10),
          max: prev.max
        }
      }
      return {
        min: prev.min,
        max: Math.max(value, Number(prev.min) + 10)
      }
    })
  }

  const handleInputChange = (type: 'min' | 'max') => (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    if (inputValue === '') {
      setValues(prev => ({
        ...prev,
        [type]: ''
      }))
      return
    }

    const value = parseInt(inputValue)
    if (isNaN(value)) return

    setValues(prev => {
      if (type === 'min') {
        return {
          min: value,
          max: Number(prev.max)
        }
      }
      return {
        min: prev.min,
        max: value
      }
    })
  }

  // Validate min/max relationship and boundaries
  useEffect(() => {
    if (values.min !== '' && values.max !== '') {
      const minValue = Number(values.min)
      const maxValue = Number(values.max)

      if (minValue < MIN_PRICE || maxValue > MAX_PRICE || minValue >= maxValue) {
        setValues({
          min: Math.max(MIN_PRICE, Math.min(minValue, maxValue - 1)),
          max: Math.min(MAX_PRICE, Math.max(maxValue, minValue + 1))
        })
      }
    }
  }, [values.min, values.max])

  // Update URL parameters with debounce
  useEffect(() => {
    if (values.min !== '' && values.max !== '') {
      const timer = setTimeout(() => {
        const min = Number(values.min)
        const max = Number(values.max)
        
        // Check if the values ​​are different from the current URL parameters
        const { minPrice: currentMin, maxPrice: currentMax } = getParams()
        
        if (min !== currentMin || max !== currentMax) {
          setParams({
            ...getParams(),
            minPrice: min !== MIN_PRICE ? min : null,
            maxPrice: max !== MAX_PRICE ? max : null
          })
        }
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [values])

  const progressStyle = {
    left: `${(Number(values.min) / MAX_PRICE) * 100}%`,
    width: `${((Number(values.max) - Number(values.min)) / MAX_PRICE) * 100}%`
  }

  return (
    <section className={s.Price}>
      <h3 className={s.title}>Ціна</h3>

      <div className={s.sliderContainer}>
        <div className={s.sliderTrack}>
          <div className={s.rangeProgress} style={progressStyle} />
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={values.min === '' ? MIN_PRICE : values.min}
            onChange={handleSliderChange('min')}
            className={cn(s.slider, s.sliderMin)}
          />
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={values.max === '' ? MAX_PRICE : values.max}
            onChange={handleSliderChange('max')}
            className={cn(s.slider, s.sliderMax)}
          />
        </div>

        <div className={s.inputs}>
          <div className={s.inputGroup}>
            <input
              type="number"
              placeholder={MIN_PRICE.toString()}
              value={values.min}
              onChange={handleInputChange('min')}
              className={s.input}
            />
            <span className={s.currency}>₴</span>
          </div>
          <span className={s.separator}>-</span>
          <div className={s.inputGroup}>
            <input
              type="number"
              placeholder={MAX_PRICE.toString()}
              value={values.max}
              onChange={handleInputChange('max')}
              className={s.input}
            />
            <span className={s.currency}>₴</span>
          </div>
        </div>
      </div>
    </section>
  )
}