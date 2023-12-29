import { Handbag } from '@phosphor-icons/react'
import { CartButton } from '../styles/components/CartButton'
import { useShoppingCart } from 'use-shopping-cart'

export function CartTrigger() {
  const { handleCartHover, cartCount } = useShoppingCart()

  return (
    <CartButton
      color={'gray'}
      size={'small'}
      onClick={() => {
        handleCartHover()
      }}
    >
      <span>{cartCount}</span>
      <Handbag size={24} weight='bold' />
    </CartButton>
  )
}
