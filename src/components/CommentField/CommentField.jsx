import { Field } from 'formik';
import style from './commentField.module.scss';
const CommentField = () => {
  return (
    <div className={style.commentField}>
    <label htmlFor="comment" className={style.commentField_label}>Коментар</label>

      <Field
        as="textarea"
        id="comment"
        name="comment"
        placeholder="Коментар..."
        rows="4"
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
};

export default CommentField;
