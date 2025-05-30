import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotals, clearCart } from '../../redux/cartSlice'
import CartItem from './CartItem'
import stylesGlobal from '../../style'
import styles from './cartModal.module.scss'
import Button from '../../ui/Button'
import { motion } from 'framer-motion'

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

const modalVariants = {
  hidden: { opacity: 0, y: "-50px", scale: 0.9 },
  visible: { opacity: 1, y: "0", scale: 1 },
  exit: { opacity: 0, y: "-50px", scale: 0.9 }
}

const CartModal = ({ toggleModal }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems)
  const amount = useSelector(state => state.cart.amount)
  const total = useSelector(state => state.cart.total)

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <motion.div
      className={styles.cartModalWrapper}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className={styles.cartModal}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <h1 className={`${stylesGlobal.heading} ${styles.cartHeading}`}>Кошик</h1>

        {/* cart items container */}
        <div className={styles.cartItems}>
          {cartItems.length > 0 ? (
            <>
              <div className={`${stylesGlobal.menu} ${styles.cartAmount}  block-with-divider`}>
                <div>{amount} шт</div>
                <button onClick={handleClearCart}>Видалити все</button>
              </div>

              <div className={styles.cartList}>
                {cartItems.map(item => <CartItem key={item.id} {...item} />)}
              </div>

              <div className={styles.cartTotalContainer}>
                <div className={`${styles.cartTotal} ${stylesGlobal.subtitleSemibold}`}>
                  <p>Разом</p>
                  <div>{total} грн</div>
                </div>

                <div className={`${stylesGlobal.flexCenter} ${styles.cartButtonContainer}`}>
                  <Button
                    label={"Продовжити покупки"}
                    onClick={toggleModal}
                    className={`${stylesGlobal.button} ${styles.cartButton}`}
                  />
                  <Button
                    label='До сплати'
                    onClick={() => console.log('Proceed to payment')}
                    className={`${stylesGlobal.button} ${styles.cartButton}  ${styles.cartButtonFilled}`}
                  />
                </div>
              </div>
            </>
          ) : (
            <p className={`${stylesGlobal.subtitleMain} ${styles.cartInfo}`}>
              Кошик поки що порожній :)
            </p>
          )}
        </div>

        <button className='close-modal' onClick={toggleModal}>
          <svg
            className='icon cursor-pointer'
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.75732 12.2431L6.99995 7.00045M6.99995 7.00045L12.2426 1.75781M6.99995 7.00045L1.75732 1.75781M6.99995 7.00045L12.2426 12.2431'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </motion.div>

      {/* motion overlay */}
      <motion.div
        className={styles.overlay}
        onClick={toggleModal}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      />
    </motion.div>
  )
}

export default CartModal
