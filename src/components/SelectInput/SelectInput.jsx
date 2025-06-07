import style from './selectInput.module.scss';
import stylesGlobal from './../../style';

const SelectInput = ({ title, name, options, value, onChange, placeholder, errorText }) => {
  const isError = !!errorText;

  return (
    <div className={style.selectInput_wrapper}>
      <h3 className={`${style.selectInput_heading} ${stylesGlobal.bodyMedium}`}>{title}</h3>

      <select
        title={title}
        name={name}
        className={`${style.selectInput_select} ${isError ? style.selectInput_error : ''}`}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {isError && <p className={style.selectInput_errorText}>{errorText}</p>}
    </div>
  );
};

export default SelectInput;
