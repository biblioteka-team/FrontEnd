
import './NotFoundLayout.css'
import Footer from './sections/Footer'

export default function NotFoundLayout({ children }) {
	return (
		<main className='MainLayout'>
			<div className='inner'>{children}</div>
			<Footer />
		</main>
	);
}
