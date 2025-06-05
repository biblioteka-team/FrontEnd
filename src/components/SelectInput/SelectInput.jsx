import style from './selectInput.module.scss';

const SelectInput = ({ title, name, options, value, onChange, placeholder }) => {
  return (
    <div className={style.selectInput_wrapper}>
      <h3 className={style.SelectInput_heading}>{title}</h3>
      <select
        title={title}
        name={name}
        className={style.selectInput_select}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value} className={style.selectInput_option}>
            {option.label}
          </option>
        ))}

      </select>
    </div>
  );
}

export default SelectInput;