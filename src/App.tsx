import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/index.js'
import NotFoundLayout from './layouts/NotFoundLayout/index.js'
import NotFoundPage from './pages/404NotFound/index.js'
import AboutUs from './pages/aboutUs/aboutUs.jsx'
import Catalog from './pages/Catalog/index.js'
import HomePage from './pages/HomePage/index.js'
import ProductPage from './pages/ProductPage/productPage.jsx'
import Sales from './pages/sales/sales.jsx'
import TopBooks from './pages/topBooks/topBooks.jsx'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/about' element={<AboutUs />} />
				<Route path='/top-books' element={<TopBooks />} />
				<Route path='/special-offers' element={<Sales />} />
				<Route path='/catalog/:id' element={<ProductPage />} />
				<Route path='/catalog' element={<Catalog />} />
			</Route>
			<Route
				path='*'
				element={
					<NotFoundLayout>
						<NotFoundPage status={404} title='Not found' />
					</NotFoundLayout>
				}
			/>
		</Routes>
	)
}

export default App
