import Button from "../../ui/Button"
import img from '../../assets/icons/pen.svg'
import style from './CheckoutSummary.module.scss'
import CartItem from './../../components/CartItem'
import { useSelector, useDispatch } from "react-redux"
import { calculateTotals } from "../../redux/Cart"
import { useEffect } from "react"


const CheckoutSummary = ({ onSubmit }) => {
    const cartItems = useSelector(state => state.cart.cartItems)
    const totalPrice = useSelector(state => state.cart.total)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(calculateTotals())
    }, [cartItems])
    return (
        <div className={style.checkout}>
            <div className={style.checkout_header}>
                <h2>Ваше замовлення</h2>
                <Button
                    icon={img}
                    label="змінити"
                    className={style.checkout_changeBtn}
                    onClick={() => console.log('Change order clicked')}
                />
            </div>
            <div className={style.checkout_cart}>
                {cartItems.map(item => <CartItem key={item.id} item={item} />)}
            </div>
            <div>
                <div className={style.checkout_total}>
                    <div className={style.checkout_summary}>
                        <span>Сума</span>
                        <span>{totalPrice}</span>
                    </div>
                    <div className={style.checkout_summary}>
                        <span>Доставка</span>
                        <span>Безкоштовно</span>
                    </div>
                    <div className={style.checkout_summary}>
                        <span>Разом</span>
                        <span>{totalPrice}</span>
                    </div>

                </div>
            </div>
            <Button
                label="Оформити замовлення"
                className={style.checkoutSummary_orderBtn}
                onClick={() => {
                    console.log('Надсилаємо замовлення...');
                    onSubmit();
                }}
            />
        </div>

    )
}

export default CheckoutSummary