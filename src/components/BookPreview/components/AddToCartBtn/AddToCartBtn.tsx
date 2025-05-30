import cn from 'classnames'
import AddToCartPopUp from 'components/AddToCartPopUp'
import { useBookPreviewContext } from 'components/BookPreview/context/BookPreviewContext'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../../redux/Cart'
import s from './AddToCartBtn.module.scss'

interface Props {
  className?: string
}

/**
 *  AddToCartBtn
 *  @param className
 */

export default function AddToCartBtn({ className = '' }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { offer } = useBookPreviewContext()
  const handleAddToCart = () => {
    dispatch(addToCart(offer))
    setIsOpen(true)
  }

  return (<>
    <button onClick={handleAddToCart} className={cn(s.AddToCartBtn, className)}>
      В кошик
    </button>
    {isOpen && <AddToCartPopUp handleClose={() => setIsOpen(false)} />}

  </>
  )
}