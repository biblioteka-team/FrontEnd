import { useDispatch } from 'react-redux'
import stock from '../../assets/stock.svg'
import trash from '../../assets/trash.svg'
import { decrease, increase, removeFromCart } from '../../redux/Cart'
import stylesGlobal from '../../style'
import { TBookBook } from '../../types/TBook'
import styles from './CartItem.module.scss'

interface CartItemProps {
  item: {
    id: string
    qty: number
  } & TBookBook
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch()
  const coverImageUrl = item.images && item.images.length > 0 ? item.images[0].url : ''

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <div className={styles.cartItem}>
      <img
        className={styles.cartItemImage}
        src={coverImageUrl}
        alt={item.title}
      />

      <div className={styles.cartItemData}>
        <div className={styles.cartItemDetails}>
          <h4 className={`${stylesGlobal.subtitleMedium} ${styles.title}`}>{item.title}</h4>
          <p className={`${stylesGlobal.bodyRegular} ${styles.author}`}>
            Автор:{' '}
            {item.author}
          </p>
          <p className={`${stylesGlobal.bodyRegular} ${styles.productCode}`}>
            Код товару: {item.id}
          </p>
          <p className={styles.inStock}>
            <img src={stock} alt='in stock' />
            <span className={`${stylesGlobal.bodyRegular} ${styles.inStockText}`}>
              В наявності
            </span>
          </p>
        </div>

        <button onClick={handleRemoveFromCart}>
          <img src={trash} alt='remove item' />
        </button>
      </div>

      <div className={styles.cartItemPrice}>
        <div className={styles.quantityControls}>
          <button
            onClick={() => {
              if (item.qty > 1) {
                dispatch(decrease({ id: item.id }))
              } else {
                dispatch(removeFromCart(item.id))
              }
            }}
            className={styles.qtyButton}
          >
            -
          </button>

          <div className={styles.qtyDisplay}>
            {item.qty}
          </div>

          <button
            onClick={() => dispatch(increase({ id: item.id }))}
            className={styles.qtyButton}
          >
            +
          </button>
        </div>

        <h4 className={`${stylesGlobal.subtitleMedium} ${styles.priceText}`}>
          {item.price * item.qty} {item.price > 0 ? `грн` : `Ціну уточнюйте`}
        </h4>
      </div>
    </div>
  )
}

export default CartItem