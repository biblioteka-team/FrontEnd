import cartSvg from 'assets/cart.svg'
import closeSvg from 'assets/close.svg'
import cn from 'classnames'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotals } from '../../redux/Cart'
import s from './AddToCartPopUp.module.scss'

interface Props {
  className?: string
  handleClose: () => void
}

/**
 *  AddToCartPopUp
 *  @param className
 */

export default function AddToCartPopUp({ className = '', handleClose }: Props) {
  const dispatch = useDispatch()
  const amount = useSelector(state => state.cart.amount)
  const total = useSelector(state => state.cart.total)
  useEffect(() => {
    dispatch(calculateTotals())
  }, [dispatch])
  return (
    <div className={cn(s.AddToCartPopUp, className)}>
      <div className={s.overLay} />
      <div className={s.content}>
        <div className={s.header}>
          <img src={cartSvg} />
          <p>Товар в кошику :)</p>
          <img src={closeSvg} className={s.imageClose} onClick={handleClose} />
        </div>
        <div className={s.info}>
          <p>Всього: {amount} товари</p>
          <p>Сума товарів: {total} грн</p>
        </div>
        <button onClick={handleClose} className={s.makeOrderBtn}>Оформити замовлення</button>
      </div>
    </div>
  )
}