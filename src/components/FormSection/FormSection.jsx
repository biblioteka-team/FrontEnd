import style from './formSection.module.scss';
import InputText from '../../ui/InputText/InputText.tsx';

const FormSection = ({ title, fields }) => {
    return (
        <div className={style.form}>
            {title && <h3 className="form-section-title">{title}</h3>}
            <div className="form-section-content">
                {fields.map((field) => (
                    <InputText
                        key={field.name}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        errorText={field.errorText}
                    />
                ))}
            </div>
        </div>
    );
}

export default FormSection;