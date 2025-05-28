import cn from 'classnames'
import s from './CheckBox.module.scss'

interface CheckBoxProps {
	text: string
	className?: string
	checked?: boolean // Add checked prop
	onChange?: (checked: boolean) => void
}

const CheckBox = ({ text, className = '', checked = false, onChange }: CheckBoxProps) => {
	const handleChange = () => {
		onChange?.(!checked)
	}

	return (
		<label className={cn(s.CheckBox, className)}>
			<input
				type="checkbox"
				checked={checked}
				onChange={handleChange}
				className={s.input}
			/>
			<span className={s.checkbox}>
				<svg
					className={s.checkmark}
					width="14"
					height="10"
					viewBox="0 0 14 10"
					fill="none"
				>
					<path
						d="M1 5L5 9L13 1"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
			<span className={s.text}>{text}</span>
		</label>
	)
}

export default CheckBox