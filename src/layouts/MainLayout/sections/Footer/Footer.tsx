import { useBreakpointMF } from 'react-responsive-tools'
import { Link } from 'react-router-dom'
import address from '../../../../assets/icons/address.svg'
import arrowUp from '../../../../assets/icons/arrowUp.svg'
import facebook from '../../../../assets/icons/facebook.svg'
import instagram from '../../../../assets/icons/instagram.svg'
import mail from '../../../../assets/icons/mail.svg'
import phone from '../../../../assets/icons/telephone.svg'
import logo from '../../../../assets/images/logo.svg'
import s from './Footer.module.scss'

const Footer = () => {
	const isMedium = useBreakpointMF('md')

	const toTop = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		})
	}

	const BtnToTop = (
		<button
			onClick={toTop}
			className={s.ScrollToTop}
		>
			ВГОРУ <img src={arrowUp} alt='arrow up icon' />
		</button>
	)

	return (
		<footer className={s.Footer}>
			<div className={s.content}>
				<div className={s.Brand}>
					<img src={logo} alt='Biblioteka logo' className={s.footerLogo} />
				</div>
				<nav className={s.Nav}>
					<div className={s.NavPrimary}>
						<Link to="/">Головна</Link>
						<Link to="/catalog/page/1">Каталог</Link>
						<Link to="/about">Про нас</Link>
					</div>
					<div className={s.NavSecondary}>
						<Link to="/top-books">Топ книг</Link>
						<Link to="/sales">Акції</Link>
					</div>
				</nav>

				<address className={s.Contacts}>
					<a href="mailto:biblioteka.gmail.com">
						<img src={mail} alt="Email" />
						biblioteka.gmail.com
					</a>
					<a href="tel:+380530883635">
						<img src={phone} alt="Phone" />
						+380 053 088 3635
					</a>
					<p>
						<img src={address} alt="Address" />
						м. Київ, вул.Шевченка, 22
					</p>
				</address>
				<div className={s.Socials}>
					<Link
						to="/"><img src={instagram} /></Link>
					<Link
						to="/"><img src={facebook} /></Link>
				</div>

				{!isMedium && BtnToTop}
			</div>
			<div className={s.footerBottom}>
				<p>
					&copy; BIBLIOTEKA 2024. Усі права захищено
				</p>
				{isMedium && BtnToTop}
			</div>
		</footer>
	)
}

export default Footer
