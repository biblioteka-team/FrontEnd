import {
	DefinedInitialDataOptions,
	UndefinedInitialDataOptions,
	useQuery,
	UseQueryResult,
} from '@tanstack/react-query'

import client from '../../api/index'
import { TError, TSuccess } from '../../api/RESTClient/routes/cart/getCart'

export type TGetCartQry = UseQueryResult<TSuccess, TError>

export type TGetCartOpts = Omit<
  DefinedInitialDataOptions<TSuccess, TError>,
  'queryKey' | 'initialData'
>

/**
 * Генерує унікальний ключ для запиту getCart.
 *
 * @param {string} userId - ID користувача
 * @returns {Array<string>} - Унікальний ключ запиту
 */
export const getGetCartKey = (userId: string): Array<string> => [
  'cart',
  'getCart',
  userId,
]

/**
 * Формує параметри для виклику `useQuery` при отриманні даних кошика.
 *
 * @param {string} userId - ID користувача
 * @param {TGetCartOpts} [options] - Додаткові опції для запиту
 * @returns {UndefinedInitialDataOptions<TSuccess, TError>} - Опції запиту
 */
export function getGetCartOpts(
  userId: string,
  options?: TGetCartOpts
): UndefinedInitialDataOptions<TSuccess, TError> {
  return {
    ...options,
    queryKey: getGetCartKey(userId),
    queryFn: ({ signal }) => client.api.cart.getCart(userId, { signal }),
  }
}

/**
 * Хук для отримання даних кошика користувача.
 *
 * @param {string} userId - ID користувача
 * @param {TGetCartOpts} [options] - Додаткові опції для запиту
 * @returns {TGetCartQry} - Результат запиту
 *
 * @example
 * const { data, isLoading, isError } = useGetCartQry('user123');
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (isError) return <div>Error loading cart</div>;
 * 
 * console.log(data.data.items); // Cart items
 * console.log(data.data.totalPrice); // Total price
 */
export default function useGetCartQry(
  userId: string,
  options?: TGetCartOpts
): TGetCartQry {
  const opts = getGetCartOpts(userId, options)
  return useQuery<TSuccess, TError>(opts)
}