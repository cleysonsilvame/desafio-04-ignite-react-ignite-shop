import Image from 'next/future/image'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import { PiHandbag, PiHandbagBold } from 'react-icons/pi'

import { stripe } from '../lib/stripe'
import { HomeContainer, Product } from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { CartButton } from '../styles/components/CartButton'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    formatted_price: string
    price: number
    price_id: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map(product => {
          return (
            <Product key={product.id} className='keen-slider__slide'>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt='' />
              </Link>

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.formatted_price}</span>
                </div>
                <CartButton
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.imageUrl,
                      currency: 'BRL',
                      price_id: product.price_id,
                    })
                  }}
                >
                  <PiHandbagBold size={26} />
                </CartButton>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      formatted_price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      price: price.unit_amount,
      price_id: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours,
  }
}
