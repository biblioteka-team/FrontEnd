import { AxiosRequestConfig } from 'axios'
import BaseRESTClient from '../../../BaseRESTClient'
import { TResponseError, TResponseSuccess } from '../../types'

interface CartItem {
  id: string
  bookId: string
  quantity: number
}

interface CartResponse {
  id: string
  bookId: string
  quantity: number
}

/**
 * Додає книгу в кошик користувача.
 *
 * @function postInUserCart
 * @this {BaseRESTClient} - Екземпляр REST-клієнта для виконання запиту.
 * @param {string} userId - ID користувача.
 * @param {CartItem} cartItem - Дані для додавання в кошик.
 * @param {AxiosRequestConfig} [config] - Додаткові налаштування для запиту.
 * @returns {Promise<TResponseSuccess<CartResponse>>} - Об'єкт з даними доданого товару.
 * @throws {TResponseError} - Об'єкт помилки, що містить повідомлення та статус-код.
 *
 * @example
 * try {
 *   const cartItem = { id: "1", bookId: "book1", quantity: 1 };
 *   const { data } = await client.api.cart.postInUserCart("userId", cartItem);
 *   console.log(data);
 * } catch (error) {
 *   console.error(error);
 * }
 */

export interface TAPIPostInUserCart {
  TError: TResponseError;
  TSuccess: TResponseSuccess<CartResponse>;
}

export type TError = TAPIPostInUserCart['TError'];
export type TSuccess = TAPIPostInUserCart['TSuccess'];

export async function addToCart(
  this: BaseRESTClient,
  userId: string,
  cartItem: CartItem,
  config?: AxiosRequestConfig
): Promise<TSuccess> {
  try {
    const response = await this.client.post<CartResponse>(
      `/api/cart/${userId}/items`,
      cartItem,
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