import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import client from '../../api'
import { TError, TSuccess } from '../../api/RESTClient/routes/cart/addToCart'

interface AddToCartParams {
  userId: string
  cartItem: {
    id: string
    bookId: string
    quantity: number
  }
}

export type TAddToCartQry = UseMutationResult<TSuccess, TError, AddToCartParams>

/**
 * Хук для додавання товару в кошик користувача.
 * 
 * @returns {TAddToCartQry} Результат мутації
 * 
 * @example
 * const { mutate, isLoading } = useAddToCartQry();
 * 
 * const handleAddToCart = () => {
 *   mutate(
 *     {
 *       userId: 'user123',
 *       cartItem: {
 *         id: 'item1',
 *         bookId: 'book1',
 *         quantity: 1
 *       }
 *     },
 *     {
 *       onSuccess: () => {
 *         console.log('Item added to cart');
 *       },
 *       onError: (error) => {
 *         console.error('Failed to add item:', error);
 *       }
 *     }
 *   );
 * };
 */
export default function useAddToCartQry(): TAddToCartQry {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, cartItem }: AddToCartParams) => 
      client.api.cart.addToCart(userId, cartItem),
    onSuccess: () => {
      // Інвалідуємо кеш кошика після успішного додавання
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })
}