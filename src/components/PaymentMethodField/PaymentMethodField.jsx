import { Field } from 'formik';
import style from './paymentMethodField.module.scss';
import stylesGlobal from './../../style';
const PaymentMethodField = ({ name, type, options, errorText }) => {
  return (
    <div className={style.paymentField}>
      <label className={`${style.paymentField_label} ${stylesGlobal.bodyMedium}`}>Метод оплати</label>

      {options.map((option) => (
        <label key={option} className={`${style.paymentField_option} ${stylesGlobal.bodyMedium}`}>
          <Field type={type} name={name} value={option} />
          <span className="ml-2">{option}</span>
        </label>
      ))}
      {errorText && (
        <div className="text-red-500 text-sm">{errorText}</div>
      )}
    </div>
  );
};

export default PaymentMethodField;
