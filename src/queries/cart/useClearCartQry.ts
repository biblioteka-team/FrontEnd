import { UseMutationResult, useMutation } from '@tanstack/react-query'
import client from '../../api'
import { TError, TSuccess } from '../../api/RESTClient/routes/cart/clearCart'
import { queryClient } from '../../main'

export type TClearCartQry = UseMutationResult<TSuccess, TError, string>

/**
 * Хук для очищення кошика користувача.
 * 
 * @returns {TClearCartQry} Результат мутації
 * 
 * @example
 * const { mutate, isLoading } = useClearCartQry();
 * 
 * const handleClearCart = () => {
 *   mutate('userId', {
 *     onSuccess: () => {
 *       console.log('Cart cleared successfully');
 *     },
 *     onError: (error) => {
 *       console.error('Failed to clear cart:', error);
 *     }
 *   });
 * };
 */
export default function useClearCartQry(): TClearCartQry {
  return useMutation({
    mutationFn: (userId: string) => client.api.cart.clearCart(userId),
    onSuccess: () => {
      // Інвалідуємо кеш кошика після успішного очищення
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })
}