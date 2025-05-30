import { AxiosRequestConfig } from 'axios'
import BaseRESTClient from '../../../BaseRESTClient'
import { TResponseError, TResponseSuccess } from '../../types'

interface DeleteAllResponse {
  success: boolean
  message: string
}

/**
 * Видаляє всі товари з кошика користувача.
 *
 * @function deleteAllFromUserCart
 * @this {BaseRESTClient} - Екземпляр REST-клієнта для виконання запиту.
 * @param {string} userId - ID користувача.
 * @param {AxiosRequestConfig} [config] - Додаткові налаштування для запиту.
 * @returns {Promise<TResponseSuccess<DeleteAllResponse>>} - Об'єкт з результатом операції.
 * @throws {TResponseError} - Об'єкт помилки, що містить повідомлення та статус-код.
 */

export interface TAPIDeleteAllFromUserCart {
  TError: TResponseError;
  TSuccess: TResponseSuccess<DeleteAllResponse>;
}

export type TError = TAPIDeleteAllFromUserCart['TError'];
export type TSuccess = TAPIDeleteAllFromUserCart['TSuccess'];

export async function clearCart(
  this: BaseRESTClient,
  userId: string,
  config?: AxiosRequestConfig
): Promise<TSuccess> {
  try {
    const response = await this.client.delete<DeleteAllResponse>(
      `/api/cart/${userId}/clear`,
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