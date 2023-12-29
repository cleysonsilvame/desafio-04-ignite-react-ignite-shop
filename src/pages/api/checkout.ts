import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'
import absoluteUrl from 'next-absolute-url'

import { z } from 'zod'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const schema = z
    .object({
      price: z.string(),
      quantity: z.number().int().positive(),
    })
    .array()
    .safeParse(req.body)

  if (schema.success === false) {
    return res.status(400).json(schema.error)
  }

  const { origin } = absoluteUrl(req)

  const successUrl = `${origin}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${origin}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: schema.data,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
