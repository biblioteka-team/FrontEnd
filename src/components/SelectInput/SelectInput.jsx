import style from './selectInput.module.scss';

const SelectInput = ({ name, options, value, onChange, placeholder }) => {
  return (
    <div className={style.selectInput_wrapper}>
      <select
        name={name}
        className={style.selectInput_select}
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
    </div>
  );
}

export default SelectInput;