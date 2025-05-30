
import BestSellers from './sections/BestSellers'
import Hero from './sections/Hero/index.ts'
import NewArrival from './sections/NewArrival'
import Promotion from './sections/Promotion'
import StoreDescription from './sections/StoreDescription/index.ts'

const HomePage = () => {

	return (
		<div>
			<Hero />
			<StoreDescription />
			<NewArrival />
			<Promotion />
			<BestSellers />
		</div>
	)
}

export default HomePage
