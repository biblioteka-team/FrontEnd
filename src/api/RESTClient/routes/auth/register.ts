import { AxiosRequestConfig } from 'axios'

import BaseRESTClient from 'api/BaseRESTClient'
import { TResponseError, TResponseSuccess } from 'api/RESTClient/types'
import { TCredentials } from 'api/RESTClient/types/TUsers'
import { TJWT } from 'api/types'

/**
 * Виконує реєстрацію нового користувача.
 *
 * @function register
 * @this {BaseRESTClient} - Екземпляр REST-клієнта для виконання запиту.
 * @param {TRegisterPayload} payload - Дані для реєстрації користувача.
 * @param {AbortSignal} - Сигнал для можливості скасування запиту.
 * @param {AxiosRequestConfig} [config] - Додаткові налаштування для запиту.
 * @returns {Promise<TResponseSuccess<TJWT>>} - Об'єкт із токенами доступу та оновлення.
 * @throws {TResponseError} - Об'єкт помилки, що містить повідомлення та статус-код.
 *
 * @example
 * try {
 *   const { data } = await client.api.auth.register({
 *     email: 'test@example.com',
 *     password: '123456',
 *     name: 'John Doe',
 *   });
 *   console.log('Успішна реєстрація:', data);
 * } catch (error) {
 *   console.error('Помилка реєстрації:', error);
 * }
 */

export interface TAPIRegister {
  TError: TResponseError;
  TSuccess: TResponseSuccess<TJWT>;
  TPayload: TRegisterPayload;
}

export interface TRegisterPayload extends TCredentials {
  name: string;
}

export type TError = TAPIRegister['TError'];
export type TSuccess = TAPIRegister['TSuccess'];
export type TPayload = TAPIRegister['TPayload'];

export async function register(
  this: BaseRESTClient,
  payload: TPayload,
  { signal }: { signal?: AbortSignal } = {},
  config?: AxiosRequestConfig
): Promise<TSuccess> {
  try {
    const response = await this.client.post<TSuccess>('/auth/register', payload, {
      ...config,
      signal,
    });
    
    console.log('Raw response:', response); // Додайте для дебагу
    
    // Перевірте структуру відповіді
    if (response.data) {
      // Зберігаємо токен через AuthManager
      this.AM.login(response.data);
      
      // Встановлюємо токен в заголовки
      this.client.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
    }
    
    return {
      message: response.statusText,
      status: 'OK',
      data: response.data, // Прибираємо .data, оскільки response.data вже містить потрібні дані
    };
  } catch (error: any | TError) {
    console.error('Registration error:', error); // Додайте для дебагу
    throw {
      message: error.message,
      status: 'Error',
      errors: error.response?.data || {},
    };
  }
}