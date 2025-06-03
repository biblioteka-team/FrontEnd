import { Field } from 'formik';

const CommentField = () => {
  return (
    <div className="mb-4">
      <label htmlFor="comment" className="block font-semibold mb-2">Коментар</label>

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
