import { useDispatch, useSelector } from 'react-redux';
import stock from '../../assets/stock.svg';
import trash from '../../assets/trash.svg';
import { decrease, increase, removeFromCart } from '../../redux/cartSlice';
import stylesGlobal from '../../style'
import styles from './cartItem.module.scss';


const CartItem = ({ id, title, author, images, price }) => {

	const coverImageUrl = images && images.length > 0 ? images[0].url : '';
	const dispatch = useDispatch();

	const handleRemoveFromCart = () => {
		dispatch(removeFromCart(id));
	};

	const cartItem = useSelector(state =>
		state.cart.cartItems.find(item => item.id === id)
	);

	const qty = cartItem ? cartItem.qty : 1;

	return (
		<div className={styles.cartItem}>
			{/* image */}
			<img
				className={styles.cartItemImage}
				src={coverImageUrl}
				alt={title}
			/>

			{/* info */}
			<div className={styles.cartItemData}>
				<div className={styles.cartItemDetails}>
					<h4 className={`${stylesGlobal.subtitleMedium} ${styles.title}`}>{title}</h4>
					<p className={`${stylesGlobal.bodyRegular} ${styles.author}`}>
						Автор:{' '}
						{author}
					</p>
					<p
						className={`${stylesGlobal.bodyRegular} ${styles.productCode}`}
					>
						Код товару: {id}
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

			{/* price */}
			<div className={styles.cartItemPrice}>
				<div className={styles.quantityControls}>
					<button
						onClick={() => {
							if (qty > 1) {
								dispatch(decrease({ id }));
							} else {
								dispatch(removeFromCart(id));
							}
						}}
						className={styles.qtyButton}
					>
						-
					</button>

					<div className={styles.qtyDisplay}>
						{qty}
					</div>

					<button
						onClick={() => dispatch(increase({ id }))}
						className={styles.qtyButton}
					>
						+
					</button>
				</div>

				<h4 className={`${stylesGlobal.subtitleMedium} ${styles.priceText}`}>
					{price * qty} {price > 0 ? `грн` : `Ціну уточнюйте`}
				</h4>
			</div>

		</div>
	);
};

export default CartItem;
