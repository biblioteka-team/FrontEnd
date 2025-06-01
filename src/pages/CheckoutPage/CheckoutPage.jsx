import style from './checkoutPage.module.scss';
import stylesGlobal from './../../style';
import FormSection from '../../components/FormSection';
import SelectInput from '../../components/SelectInput';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  firstName: Yup.string().required('Введи ім’я'),
  lastName: Yup.string().required('Введи прізвище'),
})
const OrderPage = () => {
  return (
    <section className={style.checkoutPage}>
      <div className={style.checkoutPage_container}>

        <div> breadcrumbs </div>

        <h1 className={stylesGlobal.heading}>Оформлення замовлення</h1>
        <div className={style.checkoutPage_content}>
          {/* форма для заповнення */}
          <div className={style.checkoutPage_form}>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
              }}

              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log('Форма надіслана:', values)
              }}
            >
              {({ errors, touched, handleChange, values }) => (
                <Form className={style.checkoutPage_form_section}>
                  <FormSection
                    title="Дані для доставки"
                    fields={[
                      { name: 'firstName', placeholder: 'Введіть Ваше ім’я' },
                      { name: 'lastName', placeholder: "Введіть Ваше прізвище" },
                      { name: 'middleName', placeholder: "Введіть по батькові" },
                      { name: 'phoneNumber', placeholder: "Введіть Ваш телефон" },
                      { name: 'email', placeholder: "Email" },
                    ]}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                  />

                  <SelectInput
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    placeholder="Введіть або оберіть місто"
                    errorText={touched.city ? errors.city : ''}
                    options={[
                      { value: 'kyiv', label: 'Київ' },
                      { value: 'lviv', label: 'Львів' },
                      { value: 'kharkiv', label: 'Харків' },
                    ]}
                  />
                </Form>
              )}

            </Formik>



          </div>
          {/* кошик */}
          <div className={style.checkoutPage_order}>
            <h2>Ваше замовлення</h2>
            {/* Order summary details will go here */}
          </div>

        </div>
      </div>
    </section>
  )
}

export default OrderPage