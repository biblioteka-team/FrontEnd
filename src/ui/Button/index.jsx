import styles from '../../style';
const Button = ({ label, icon, onClick, className }) => {
	return (
		<button
		
			onClick={onClick}
			className={`${styles.button} ${className}`}
		>
			{icon && <img src={icon} alt="button icon" className={styles.button_icon} />}
			{label}	
		</button>
	);
};

export default Button;
