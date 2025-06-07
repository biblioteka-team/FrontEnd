import style from './checkoutPage.module.scss';
import stylesGlobal from './../../style';
import OrderForm from '../../components/OrderForm/OrderForm';

const OrderPage = () => {
  return (
    <section className={style.checkoutPage}>
      <div className={style.checkoutPage_container}>
        <div className={stylesGlobal.bodyRegular}> breadcrumbs </div>
        <h1 className={`${stylesGlobal.heading} ${style.checkoutPage_header}`}>Оформлення замовлення</h1>
        <OrderForm/>
      </div>
    </section>
  )
}

export default OrderPage