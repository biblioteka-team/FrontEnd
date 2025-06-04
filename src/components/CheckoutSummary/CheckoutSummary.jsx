import Button from "../../ui/Button"
import img from '../../assets/icons/pen.svg'
import style from './CheckoutSummary.module.scss'
import stylesGlobal from './../../style.ts'
import CartItem from './../../components/CartItem'
import { useSelector } from "react-redux"

const CheckoutSummary = () => {
    const cartItems = useSelector(state => state.cart.cartItems)
    return (
        <>
         <div className={style.checkoutSummary_orderHeader}>
            <h2 className={stylesGlobal.bodyMedium}>Ваше замовлення</h2>
            <Button
                icon={img}
                label="змінити замовлення"
                className={style.checkoutSummary_orderChangeBtn}
                onClick={() => console.log('Change order clicked')}
            />
            <div className={style.CheckoutSummary_cartItemsContainer}>
                {cartItems.map(item => <CartItem key={item.id} item={item} />)}
            </div>
        </div>
        </>
       
    )
}

export default CheckoutSummary