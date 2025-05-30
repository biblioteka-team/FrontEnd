
import ProductImageGallery from 'components/ProductImageGallery/productImageGallery'
import { useState } from 'react'
import Modal from 'react-modal'
import { useParams } from 'react-router-dom'
import { useGetBookInfoQuery } from '../../redux/productPageSlice'
import Button from '../../ui/Button/index.jsx'
import IconStatusFalse from './ProductStatusItemFalse.svg'
import IconStatusTrue from './ProductStatusItemTrue.svg'
import IconClose from './close.svg'
import ProductDescription from './productDescription'
import globalStyles from '../../style.ts'
import styles from './productPage.module.scss'

const ProductPage = () => {
	const { id } = useParams()
	const { data, error, isLoading } = useGetBookInfoQuery(id)
	const [isOpen, setIsOpen] = useState(false)
	const handleOpenModal = () => {
		setIsOpen(true)
	}
	const handleCloseModal = () => {
		setIsOpen(false)
	}
	if (isLoading) return <div className='h-screen'>Loading...</div>
	if (error) return <div className='h-screen'>Error: {error.message}</div>

	const book = data
	console.log('book', book)

	let infoObj = {
		'Мова видання': book.language,
		'Рік видання': book.year,
		'Видавництво': book.publisher,
		'Жанр': book.category,
	}

	let statusIcon = false

	return (
		<div className={`${globalStyles.boxWidth} mt-14 mx-auto`}>

			<Modal
				isOpen={isOpen}
				onRequestClose={handleCloseModal}
				className={styles.modal}
				overlayClassName={styles.overlay}>
				<button onClick={handleCloseModal}>
					<img src={IconClose} alt="close" />
				</button>
				<ProductImageGallery imageSrc={book.images?.map(img => img.url) || []} />
			</Modal>

			<div className={styles.productItem } >
				<div className={styles.productTitle}>{book.title}</div>
				<div className={styles.productAuthor}>{book.author}</div>

				<div onClick={handleOpenModal} className={styles.productImg}>
					<ProductImageGallery imageSrc={book.images?.map(img => img.url) || []} />
				</div>

				<div className={styles.productInfo}>
					{Object.entries(infoObj).map(([key, value]) => (
						<div key={key} className={styles.infoRow}>
							<p>{key}:</p>
							<p>{value}</p>
						</div>
					))}
				</div>

				<div className={styles.productPrice}>
					<p className={styles.price}>
						<span>{book.price > 0 ? book.price : 'Ціну уточнюйте'}</span> грн
					</p>
					<p className={`${styles.status} ${statusIcon ? styles.available : styles.unavailable}`}>
						<img src={statusIcon ? IconStatusTrue : IconStatusFalse} alt="" />
						{statusIcon ? 'В наявності' : 'Немає в наявності'}
					</p>
				</div>

				<div className={styles.productBtns}>
					<Button label='В кошик' className='bg-button' />
					<Button label='Оплатити' className='bg-buttonB border-none' />
				</div>

				<div className={styles.productSummary}>
					<ProductDescription description={book.description} />
				</div>
			</div>

			
		</div>
	)
}

export default ProductPage
