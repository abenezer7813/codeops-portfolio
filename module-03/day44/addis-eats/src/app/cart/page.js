'use client'

import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function   Cart() {
  const cart = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const cartTotal = useCartStore((s) =>
    s.items.reduce((total, i) => total + i.priceETB * i.quantity, 0)
  )
  const removeFromCart = useCartStore((s) => s.removeFromCart)

  const router = useRouter()

  const subtotal = cartTotal

  const deliveryFee = subtotal >= 1200 ? 0 : 40
  const tax = Math.round(subtotal * 0.15)
  const grandTotal = subtotal + deliveryFee + tax

  if (cart.length === 0) {
    return (
      <div className="text-center px-5 py-20">
        <p>Your basket is empty.</p>
        <Link href="/menu">Browse the menu</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fdf6f0] px-6 py-8 md:px-12">
      <h1 className="mb-6 text-[28px] text-[#7a1f1f]">
        Your Gursha Basket
      </h1>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="mb-4 text-sm text-[#333]">
            Clay Pot Stews & Provisions
            <span className="ml-1.5 font-normal text-[#999]">
              ({cart.length} handcrafted selections)
            </span>
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="mb-4 flex gap-4 rounded-xl border border-[#f0e0d0] bg-white p-4"
            >
              <img
                src="doro.png"
                alt={item.nameEn}
                className="h-[90px] w-[90px] rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3>{item.nameEn}</h3>
                <p className="mt-1 text-[13px] text-[#777]">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="font-semibold text-[#7a1f1f]">
                  ETB {item.priceETB}
                </span>

                <div className="flex items-center gap-2 rounded-md border border-[#ddd] px-2 py-1">
                  <button
                    className="cursor-pointer border-none bg-transparent text-base"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="cursor-pointer border-none bg-transparent text-base"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="cursor-pointer border-none bg-transparent text-xs text-[#999] underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky top-6 rounded-xl border border-[#f0e0d0] bg-white p-6">
          <h2>Basket Ledger</h2>

          <div className="mb-3 mt-4 flex justify-between text-sm text-[#555]">
            <span>Items Subtotal ({cart.length} items)</span>
            <span>ETB {subtotal}</span>
          </div>

          <div className="mb-3 flex justify-between text-sm text-[#555]">
            <span>Delivery Fee</span>
            <span>
              {deliveryFee === 0 ? 'FREE' : `ETB ${deliveryFee}`}
            </span>
          </div>

          <div className="mb-3 flex justify-between text-sm text-[#555]">
            <span>VAT & Tourism Levy (15%)</span>
            <span>ETB {tax}</span>
          </div>

          <div className="mt-2 flex justify-between border-t border-[#eee] pt-4 text-xl font-bold text-[#7a1f1f]">
            <span>Grand Total</span>
            <span>ETB {grandTotal}</span>
          </div>

          <button
            className="mt-5 w-full cursor-pointer rounded-lg border-none bg-[#7a1f1f] p-3.5 font-semibold text-white hover:bg-[#611818]"
            onClick={() => router.push('/checkout')}
          >
            Proceed to Delivery Checkout →
          </button>
        </div>
      </div>
    </div>
  )
}

