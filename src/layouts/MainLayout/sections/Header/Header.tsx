import client from 'api/index.js'
import { useEffect, useState } from 'react'
import { useBreakpointMF } from 'react-responsive-tools'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from "ui/SearchBar"
import logo from './assets/logo.svg'
import CartIcon from './components/CartIcon/CartIcon.js'
import LogInIcon from './components/LoginRegisterIcon'
import NavBar from './components/Navbar'
import UserDropDown from './components/UserDropDown/UserDropDown.js'
import s from './Header.module.scss'
const Header = () => {
	const location = useLocation()
	const isHomePage = location.pathname === '/'
	const isMedium = useBreakpointMF('md')
	const [isLogin, setIsLogin] = useState<boolean>(!!client.AM.token)

	useEffect(() => {
		const handleLoginSuccess = () => {
			setIsLogin(true)
		}
		window.addEventListener('loginSuccess', handleLoginSuccess)
		return () => {
			window.removeEventListener('loginSuccess', handleLoginSuccess)
		}
	}, [])
	return (
		<>
			<header className={s.Header}>
				<div className={s.wrapper}>
					{isHomePage ? (
						<img src={logo} alt='BookShop' className={s.logo} />
					) : (
						<Link to='/'>
							<img src={logo} alt='BookShop' className={s.logo} />
						</Link>
					)}
					{isMedium &&
						<SearchBar searchType='books' />}
					<div className={s.icons}>
						<CartIcon />
						{isLogin ? <UserDropDown /> : (<LogInIcon />
						)}
					</div>
				</div>
			</header>
			<NavBar />
		</>
	)
}

export default Header
