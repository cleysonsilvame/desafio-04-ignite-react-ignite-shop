import { PiHandbagBold } from 'react-icons/pi'
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
      <PiHandbagBold size={24} />
    </CartButton>
  )
}
