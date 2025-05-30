import styles from '../../style';
const Button = ({ label, onClick, className }) => {
	return (
		<button
			onClick={onClick}
			className={`${styles.button} ${className}`}
		>
			{label}
		</button>
	);
};

export default Button;
