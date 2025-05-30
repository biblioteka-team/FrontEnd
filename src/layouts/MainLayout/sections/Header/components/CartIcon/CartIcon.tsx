import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CartModal from '../../../../../../modals/CartModal/CartModal'
import {AnimatePresence} from 'framer-motion'

import s from './CartIcon.module.scss'
const CartIcon = () => {
    const amount = useSelector((store) => store.cart.amount)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }
    
    useEffect(() => {
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
}, [modal])

    return (
        <div className={s.CartIcon}>
            <button onClick={toggleModal} className={s.cartBtn}>
                <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.5 34C32.3284 34 33 33.3284 33 32.5C33 31.6716 32.3284 31 31.5 31C30.6716 31 30 31.6716 30 32.5C30 33.3284 30.6716 34 31.5 34Z"
                        fill="black"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    <path d="M21.5 34C22.3284 34 23 33.3284 23 32.5C23 31.6716 22.3284 31 21.5 31C20.6716 31 20 31.6716 20 32.5C20 33.3284 20.6716 34 21.5 34Z"
                        fill="black"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    <path d="M17 16H34L32 27H19L17 16ZM17 16C16.8333 15.3333 16 14 14 14"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    <path d="M32 27H19H17.2308C15.4465 27 14.5 27.7812 14.5 29C14.5 30.2188 15.4465 31 17.2308 31H31.5"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
            </button>
            {cartItems.length > 0 && (
                <div className={s.amountBadge}>
                    <p>{amount}</p>
                </div>
            )}
            {/* {modal && <CartModal toggleModal={toggleModal} />} */}
            <AnimatePresence mode='wait'>
                {modal && <CartModal toggleModal={toggleModal} />}  
            </AnimatePresence>
        </div>
    )
}

export default CartIcon