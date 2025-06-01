import style from './selectInput.module.scss';

const SelectInput = ({ options, value, onChange, placeholder }) => {
  return (
    <div className={style.selectInput_wrapper}>
      <select
        className={style.selectInput_select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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