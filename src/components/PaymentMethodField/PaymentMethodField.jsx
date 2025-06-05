import { Field, ErrorMessage } from 'formik';
import style from './paymentMethodField.module.scss';
import stylesGlobal from './../../style';
const PaymentMethodField = ({ name, type, options, errorText }) => {
  return (
    <div className={style.paymentField}>
      <label className={`${style.paymentField_label} ${stylesGlobal.bodyMedium}`}>Метод оплати</label>

      {options.map((option) => (
        <label key={option} className="block mb-1">
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
