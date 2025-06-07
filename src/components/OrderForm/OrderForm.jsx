import { Formik, Form } from 'formik';
import FormSection from '../FormSection';
import SelectInput from '../SelectInput';
import PaymentMethodField from '../PaymentMethodField';
import CommentField from '../CommentField';
import CheckoutSummary from '../CheckoutSummary';
import { checkoutValidationSchema } from '../../validation/checkoutValidation';
import style from './orderForm.module.scss';

const OrderForm = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        middleName: '',
        phoneNumber: '',
        email: '',
        city: '',
        paymentMethod: '',
        submitForm: '',
    };

    const handleSubmit = (values) => {
        console.log('Форма надіслана:', values);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={checkoutValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, handleChange, values, handleSubmit }) => (
                    <div className={style.orderForm}>
                        <Form className={style.orderForm_form}>
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
                                title={'Доставка'}
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

                            <PaymentMethodField
                                name="paymentMethod"
                                value={values.paymentMethod}
                                type="radio"
                                options={['Оплата карткою', 'Післяплата']}
                                errorText={touched.paymentMethod ? errors.paymentMethod : ''}
                            />

                            <CommentField />
                        </Form>
                        <CheckoutSummary
                            onSubmit={handleSubmit} />
                    </div>
                )}
            </Formik>
        </>
    )
}

export default OrderForm