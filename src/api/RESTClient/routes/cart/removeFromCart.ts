import { AxiosRequestConfig } from 'axios'
import BaseRESTClient from '../../../BaseRESTClient'
import { TResponseError, TResponseSuccess } from '../../types'

interface DeleteItemResponse {
  success: boolean
  message: string
}

/**
 * Видаляє конкретний товар з кошика користувача.
 *
 * @function deleteItemFromUserCart
 * @this {BaseRESTClient} - Екземпляр REST-клієнта для виконання запиту.
 * @param {string} userId - ID користувача.
 * @param {string} itemId - ID товару для видалення.
 * @param {AxiosRequestConfig} [config] - Додаткові налаштування для запиту.
 * @returns {Promise<TResponseSuccess<DeleteItemResponse>>} - Об'єкт з результатом операції.
 * @throws {TResponseError} - Об'єкт помилки, що містить повідомлення та статус-код.
 */

export interface TAPIDeleteItemFromUserCart {
  TError: TResponseError;
  TSuccess: TResponseSuccess<DeleteItemResponse>;
}

export type TError = TAPIDeleteItemFromUserCart['TError'];
export type TSuccess = TAPIDeleteItemFromUserCart['TSuccess'];

export async function removeFromCart(
  this: BaseRESTClient,
  userId: string,
  itemId: string,
  config?: AxiosRequestConfig
): Promise<TSuccess> {
  try {
    const response = await this.client.delete<DeleteItemResponse>(
      `/api/cart/${userId}/items/${itemId}`,
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