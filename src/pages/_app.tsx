import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'

import Image from 'next/future/image'
import { CartTrigger } from '../components/CartTrigger'
import { CartProvider } from '../providers/CartProvider'
import { ShoppingCartModal } from '../providers/ShoppingCartModal'

globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartProvider>
        <ShoppingCartModal>
          <Header>
            <Image src={logoImg} alt='' />
            <CartTrigger />
          </Header>

          <Component {...pageProps} />
        </ShoppingCartModal>
      </CartProvider>
    </Container>
  )
}

export default App
