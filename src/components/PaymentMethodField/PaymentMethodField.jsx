import { Field, ErrorMessage } from 'formik';

const PaymentMethodField = () => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">Метод оплати</label>

      <label className="block mb-1">
        <Field type="radio" name="paymentMethod" value="card" />
        <span className="ml-2">Оплата карткою</span>
      </label>

      <label className="block mb-1">
        <Field type="radio" name="paymentMethod" value="cash" />
        <span className="ml-2">Післяплата</span>
      </label>

      <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default PaymentMethodField;
