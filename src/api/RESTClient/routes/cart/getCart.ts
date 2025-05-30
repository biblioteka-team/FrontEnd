import { AxiosRequestConfig } from 'axios'
import BaseRESTClient from '../../../BaseRESTClient'
import { TResponseError, TResponseSuccess } from '../../types'

interface CartItem {
  id: string
  bookId: string
  quantity: number
  book: {
    id: string
    title: string
    price: number
    images: { url: string }[]
    author: string
  }
}

interface CartResponse {
  id: string
  userId: string
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
}

/**
 * Отримує кошик користувача.
 *
 * @function getUserCart
 * @this {BaseRESTClient} - Екземпляр REST-клієнта для виконання запиту.
 * @param {string} userId - ID користувача.
 * @param {AxiosRequestConfig} [config] - Додаткові налаштування для запиту.
 * @returns {Promise<TResponseSuccess<CartResponse>>} - Об'єкт з даними кошика.
 * @throws {TResponseError} - Об'єкт помилки, що містить повідомлення та статус-код.
 *
 * @example
 * try {
 *   const { data } = await client.api.cart.getUserCart("userId");
 *   console.log(data);
 * } catch (error) {
 *   console.error(error);
 * }
 */

export interface TAPIGetCart {
  TError: TResponseError;
  TSuccess: TResponseSuccess<CartResponse>;
}

export type TError = TAPIGetCart['TError'];
export type TSuccess = TAPIGetCart['TSuccess'];

export async function getCart(
  this: BaseRESTClient,
  userId: string,
  config?: AxiosRequestConfig
): Promise<TSuccess> {
  try {
    const response = await this.client.get<CartResponse>(
      `/api/cart/${userId}`,
      config
    );

    return {
      message: response.statusText,
      status: 'OK',
      data: response.data,
    };
  } catch (error: any | TError) {
    throw {
      message: error.message,
      status: 'Error',
      errors: error.response?.data || {},
    };
  }
}