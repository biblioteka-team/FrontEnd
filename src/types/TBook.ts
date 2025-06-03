

// 📌 Базовий тип Книги
export interface TBook {
  id: string
  discountPercentage: number
  book: TBookBook
}
export interface TBookBook {
    id: string
  title: string
  author: string
  publisher: string
  year: number
  description: string
  category: string
  subcategories: string[]
  ageRestriction: number
  price: number
  quantity: number
  languages: string[]
  images: TImage[]
}

export interface TImage {
  id: string
  url: string
  publicId: string
}