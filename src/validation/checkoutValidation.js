import * as Yup from 'yup';

export const checkoutValidationSchema = Yup.object({
  firstName: Yup.string().required('Введи ім’я'),
  lastName: Yup.string().required('Введи прізвище'),
  middleName: Yup.string().required('Введи по батькові'),
  phoneNumber: Yup.string()
    .required('Введи номер телефону')
    .matches(/^\+?[\d\s\-]{9,15}$/, 'Неправильний формат телефону'),
  email: Yup.string()
    .email('Невірний email')
    .required('Email обов’язковий'),
  city: Yup.string().required('Оберіть місто'),
  paymentMethod: Yup.string().required('Оберіть метод оплати'),
});
