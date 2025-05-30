import { AxiosRequestConfig } from 'axios'

import { TBook } from '../../../../types/TBook'
import { TListBooks } from '../../types/TBook'

import BaseRESTClient from '../../../BaseRESTClient'
import {
  TListMeta,
  TResponseError,
  TResponseSuccess
} from '../../types'
/**
 * Отримує список усіх Книжок із сервера.
 *
 * @function getAllBooks
 * @this {BaseRESTClient} - Екземпляр REST-клієнта для виконання запиту.
 * @param {TListMeta<TBook>} [params] - Параметри для запиту, такі як `page`, `pageSize`, `sorting`, `filters`.
 * @param {AbortSignal} - Сигнал для можливості скасування запиту.
 * @param {AxiosRequestConfig} [config] - Додаткові налаштування для запиту.
 * @returns {Promise<TResponseSuccess<TListBooks>>} - Об'єкт із списком Книжок, що містить `count`, `next`, `previous`, `page`, `pageSize`, `results`.
 * @throws {TResponseError} - Об'єкт помилки, що містить повідомлення та статус-код.
 *
 * @example
 * try {
 *   const { data } = await client.api.books.getAll();
 *   console.log(data.results);
 * } catch (error) {
 *   console.error(error);
 * }
 */

export interface TAPIGetAllBooks {
  TError: TResponseError;
  TSuccess: TResponseSuccess<TListBooks>;
}
export type TError = TAPIGetAllBooks['TError'];
export type TSuccess = TAPIGetAllBooks['TSuccess'];

export async function getAllBooks(
  this: BaseRESTClient,
  params?: TListMeta<TBook>,
  { signal }: { signal?: AbortSignal } = {},
  config?: AxiosRequestConfig
): Promise<TSuccess> {
  try {
    const response = await this.client.get<TSuccess>('/books/search', {
      ...config,
      signal,
      params,
      paramsSerializer: {
        indexes: null,
      },
    });
    return {
      message: response.statusText,
      status: 'OK',
      data: response.data as unknown as TListBooks,
    };
  } catch (error: any | TError) {
    throw {
      message: error.message,
      status: 'Error',
      errors: error.response?.data || {},
    };
  }
}
