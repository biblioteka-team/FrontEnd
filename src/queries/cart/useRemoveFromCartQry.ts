import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import client from '../../api'
import { TError, TSuccess } from '../../api/RESTClient/routes/cart/removeFromCart'

interface RemoveFromCartParams {
  userId: string
  itemId: string
}

export type TRemoveFromCartQry = UseMutationResult<TSuccess, TError, RemoveFromCartParams>

/**
 * Хук для видалення товару з кошика користувача.
 * 
 * @returns {TRemoveFromCartQry} Результат мутації
 * 
 * @example
 * const { mutate, isLoading } = useRemoveFromCartQry();
 * 
 * const handleRemoveFromCart = () => {
 *   mutate(
 *     { 
 *       userId: 'user123', 
 *       itemId: 'item456' 
 *     },
 *     {
 *       onSuccess: () => {
 *         console.log('Item removed from cart');
 *       },
 *       onError: (error) => {
 *         console.error('Failed to remove item:', error);
 *       }
 *     }
 *   );
 * };
 */
export default function useRemoveFromCartQry(): TRemoveFromCartQry {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, itemId }: RemoveFromCartParams) => 
      client.api.cart.removeFromCart(userId, itemId),
    onSuccess: () => {
      // Інвалідуємо кеш кошика після успішного видалення
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })
}