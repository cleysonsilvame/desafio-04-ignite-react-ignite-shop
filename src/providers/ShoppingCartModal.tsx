import Image from 'next/image'
import { ReactNode, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { PiXBold } from 'react-icons/pi'

import axios from 'axios'
import { useShoppingCart } from 'use-shopping-cart'
import { CartEntry } from 'use-shopping-cart/core'
import { Button } from '../styles/components/Button'
import {
  DialogClose,
  DialogContent,
  DialogTitle,
  ProductBody,
  ProductContainer,
  ProductContent,
  ProductFooter,
  ProductImage,
  ProductInfoContent,
} from '../styles/providers/CartDialog'

export function ShoppingCartModal({ children }: { children: ReactNode }) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const {
    cartDetails,
    formattedTotalPrice,
    cartCount,
    removeItem,
    shouldDisplayCart,
    handleCartClick,
  } = useShoppingCart()

  const products: CartEntry[] = Object.values(cartDetails)

  const cartCountText = cartCount > 1 ? 'itens' : 'item'

  function handleRemoveItem(productId: string) {
    removeItem(productId)
  }

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)
      const data = products.map(product => ({
        price: product.price_id,
        quantity: product.quantity,
      }))

      const response = await axios.post('/api/checkout', data)

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error: any) {
      setIsCreatingCheckoutSession(false)
      alert(`
      Erro ao finalizar compra. Tente novamente!
      ${error?.message}
      `)
    }
  }

  return (
    <>
      {children}

      <Dialog.Root open={shouldDisplayCart} onOpenChange={handleCartClick}>
        <Dialog.Portal>
          <DialogContent>
            <ProductBody>
              <DialogTitle>Sacola de compras</DialogTitle>
              <Dialog.Description className='DialogDescription' hidden>
                Sua sacola de compras está aqui.
              </Dialog.Description>

              <DialogClose asChild>
                <button type='button'>
                  <PiXBold size={20} />
                </button>
              </DialogClose>

              <ProductContainer>
                {products.map((product, index) => (
                  <ProductContent key={index}>
                    <ProductImage>
                      <Image
                        src={product.image}
                        alt=''
                        width={90}
                        height={75}
                      />
                    </ProductImage>

                    <ProductInfoContent>
                      <span>{product.name}</span>
                      <strong>{product.formattedValue}</strong>
                      <button
                        onClick={() => handleRemoveItem(product.id)}
                        className='IconButton'
                        aria-label='Remove item'
                      >
                        Remover
                      </button>
                    </ProductInfoContent>
                  </ProductContent>
                ))}
              </ProductContainer>
            </ProductBody>

            <ProductFooter>
              <div>
                <span>Quantidade</span>
                <span className='amount'>
                  {cartCount} {cartCountText}
                </span>
              </div>

              <div>
                <strong>Valor total</strong>
                <strong className='price'>{formattedTotalPrice}</strong>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isCreatingCheckoutSession}
              >
                Finalizar compra
              </Button>
            </ProductFooter>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
