import RESTClient from './RESTClient'
import * as routes from './routes'

// Функція для зв'язування всіх API з клієнтом
export const bindAllApi = (thisArg: RESTClient) => {
  return {
    // Об'єкт для роботи з аутентифікацією
    auth: {
      login: routes.auth.login.bind(thisArg), // Логін
      logout: routes.auth.logout.bind(thisArg), // Вихід з системи.
      register: routes.auth.register.bind(thisArg), // Реєстрація
    },
    // Об'єкт для роботи з користувачем
    users: {
      getAll: routes.users.getAllUsers.bind(thisArg), // Отримання всіх користувачів.
      getById: routes.users.getUserById.bind(thisArg), // Отримання користувача по ID.
      put: routes.users.putUser.bind(thisArg), // Оновлення користувача.
      delete: routes.users.deleteUser.bind(thisArg), // Видалення користувача.
    },
    // Об'єкт для роботи з Книгами
    books: {
      getAll: routes.books.getAllBooks.bind(thisArg), // Отримання всіх Книг.
      getById: routes.books.getBookById.bind(thisArg), // Отримання Книги по ID.
      getAllPromotion: routes.books.getAllBooksPromotions.bind(thisArg), // Отримання всіх Книг типу Promotion.
      getPromotionById: routes.books.getBookById.bind(thisArg), // Отримання Книги типу Promotion по ID.
      getAllBestSellers: routes.books.getAllBooksBestSellers.bind(thisArg), // Отримання всіх Книг типу BestSellers.
      getBestSellersById: routes.books.getBookById.bind(thisArg), // Отримання Книги типу BestSellers по ID.
      getAllNewArrivals: routes.books.getAllBooksNewArrivals.bind(thisArg), // Отримання всіх Книг типу NewArrivals.
      getNewArrivalsById: routes.books.getBookById.bind(thisArg), // Отримання Книги типу NewArrivals по ID.
    },

    // Об'єкт для роботи з Адміністратором
    admins: {
      register: routes.admins.registerAdministrator.bind(thisArg), // Реєстрація Адміністратора
      getById: routes.admins.getAdministratorById.bind(thisArg), // Отримання Адміністратора по ID.
      put: routes.admins.putAdministrator.bind(thisArg), // Оновлення Адміністратора.
      patch: routes.admins.patchAdministrator.bind(thisArg), // Оновлення частини Адміністратора.
    },
    cart: {
      addToCart: routes.cart.addToCart.bind(thisArg), // Додавання товару до кошика.
      getCart: routes.cart.getCart.bind(thisArg), // Отримання кошика користувача.
      removeFromCart: routes.cart.removeFromCart.bind(thisArg), // Видалення товару з кошика.
      clearCart: routes.cart.clearCart.bind(thisArg), // Очищення кошика.
    },
      };
};
