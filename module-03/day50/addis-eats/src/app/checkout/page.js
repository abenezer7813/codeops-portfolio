'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { orderSchema } from '@/schema'
import { placeOrder } from '../actions'
import Link from 'next/link'


const paymentMethods = [
  { id: 'telebirr', label: 'Telebirr Quick Merchant Pay' },
  { id: 'cbe', label: 'CBE Birr / CBE Mobile Banking' },
  { id: 'cod', label: 'Cash or Card on Delivery' },
  { id: 'amole', label: 'Amole / Awash Birr' },
]

export default function Checkout() {
  const user = { 'name': 'ab', 'email': 'ab@gmail.com' }
  const clearCart = useCartStore((s) => s.clearCart)
  const cart = useCartStore((s) => s.items)
  const cartTotal = useCartStore((s) =>
    s.items.reduce((total, i) => total + i.priceETB * i.quantity, 0)
  )
  const items = useCartStore((state) => state.items);

  const router = useRouter()

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: '',
    subCity: '',
    street: '',
    landmark: '',
    deliveryTime: 'immediate',
    paymentMethod: 'telebirr',
  })


  const [errors, setErrors] = useState({})

  const [state, formAction, pending] = useActionState(placeOrder, null)

  useEffect(() => {
    if (state?.status === 201) {
       alert("Order placed successfully!");
      clearCart();
    }
  }, [state, clearCart]);
  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const subtotal = cartTotal
  const expressFee = 150
  const total = subtotal + expressFee

  async function handleConfirm(e) {
    e.preventDefault()

    const validationErrors = {}
    const result = orderSchema.safeParse(form)

    if (!result.success) {
      result.error.issues.forEach(
        (issues) => (validationErrors[issues.path[0]] = issues.message)
      )
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})

    const order = {
      result,
      items: cart,
      grandTotal,
    }
    //using api 
    const postResult = await fetch('/api/orders',
      {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          "content-type": "application/json"
        }
      }
    )
  
    clearCart()
    sessionStorage.setItem('order', JSON.stringify(order))
    //router.push('/order-confirmation')
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fdf6f0] px-6 text-center">
        <h1 className="mb-3 text-2xl font-bold text-[#7a1f1f]">
          Your Cart is Empty
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          You need to add some delicious food before proceeding to checkout.
        </p>

        <Link
          href="/menu"
          className="rounded-lg bg-[#7a1f1f] px-6 py-3 font-semibold text-white no-underline hover:bg-[#611818]"
        >
          Go to Menu
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#fdf6f0] px-6 py-6 md:px-12">
      <div className="mb-6 flex justify-center gap-6 text-[13px]">
        <span className="text-[#999]">1. Review Order</span>
        <span className="font-semibold text-[#7a1f1f]">
          2. Delivery & Payment
        </span>
        <span className="text-[#ccc]">3. Confirmation</span>
      </div>

      <form
        action={formAction}
        className="grid grid-cols-1 items-start gap-6 md:grid-cols-[2fr_1fr]"
      // onSubmit={handleConfirm}
      >
        <input type="hidden" name="total" value={total} />
        <div>
          <section className="mb-5 rounded-xl border border-[#f0e0d0] bg-white p-5">
            <h2 className="mb-4 text-[15px] text-[#7a1f1f]">
              1. Contact & Guest Details
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="mb-3 flex flex-col">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs text-[#666]"
                >
                  Recipient Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="rounded-md border border-[#ddd] px-2.5 py-2 text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-[#c0392b]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="mb-3 flex flex-col">
                <label
                  htmlFor="phone"
                  className="mb-1 text-xs text-[#666]"
                >
                  Phone (Ethiopian Telegram Line)
                </label>
                <div className="flex overflow-hidden rounded-md border border-[#ddd]">
                  <span className="bg-[#f5f5f5] px-2.5 py-2 text-sm text-[#666]">
                    +251
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="911 234 567"
                    className="min-w-0 flex-1 border-0 px-2.5 py-2 text-sm outline-none"
                  />
                </div>
                {state?.errors?.phone && (
                  <p className="text-xs text-red-600">
                    {state.errors.phone[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-xs text-[#666]"
              >
                Email for Digital Receipt
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-md border border-[#ddd] px-2.5 py-2 text-sm"
              />
              {state?.errors?.email && (
                <p className="text-xs text-red-600">
                  {state.errors.email[0]}
                </p>
              )}
            </div>
          </section>
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(cart)}
          />
          <section className="mb-5 rounded-xl border border-[#f0e0d0] bg-white p-5">
            <h2 className="mb-4 text-[15px] text-[#7a1f1f]">
              2. Delivery Location in Addis Ababa
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="mb-3 flex flex-col">
                <label
                  htmlFor="subCity"
                  className="mb-1 text-xs text-[#666]"
                >
                  Sub-City / Neighborhood
                </label>
                <input
                  id="subCity"
                  name="subCity"
                  value={form.subCity}
                  onChange={handleChange}
                  placeholder="Bole Medhanialem / Kazanchis"
                  className="rounded-md border border-[#ddd] px-2.5 py-2 text-sm"
                />
                {state?.errors?.subCity && (
                  <p className="text-xs text-red-600">
                    {state.errors.subCity[0]}
                  </p>
                )}
              </div>

              <div className="mb-3 flex flex-col">
                <label
                  htmlFor="street"
                  className="mb-1 text-xs text-[#666]"
                >
                  Street, Building, Flat No.
                </label>
                <input
                  id="street"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  placeholder="Bentui Edna Mall, House No. 402, 3rd Floor"
                  className="rounded-md border border-[#ddd] px-2.5 py-2 text-sm"
                />
                {state?.errors?.street && (
                  <p className="text-xs text-red-600">
                    {state.errors.street[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3 flex flex-col">
              <label
                htmlFor="landmark"
                className="mb-1 text-xs text-[#666]"
              >
                Specific Landmark / Gate Instruction
              </label>
              <input
                id="landmark"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder="Opposite Boston Day Spa, entrance through dark green gate"
                className="rounded-md border border-[#ddd] px-2.5 py-2 text-sm"
              />
             {state?.errors?.landmark && (
                  <p className="text-xs text-red-600">
                    {state.errors.landmark[0]}
                  </p>
                )}
            </div>

            <div className="mt-2 flex gap-3">
              <button
                type="button"
                className={`flex-1 rounded-lg border p-2.5 text-left text-[13px] ${form.deliveryTime === 'immediate'
                  ? 'border-[#7a1f1f] bg-[#fdf0ea] text-[#7a1f1f]'
                  : 'border-[#ddd] bg-white'
                  }`}
                onClick={() =>
                  setForm({ ...form, deliveryTime: 'immediate' })
                }
              >
                Immediate Dispatch
              </button>

              <button
                type="button"
                className={`flex-1 rounded-lg border p-2.5 text-left text-[13px] ${form.deliveryTime === 'scheduled'
                  ? 'border-[#7a1f1f] bg-[#fdf0ea] text-[#7a1f1f]'
                  : 'border-[#ddd] bg-white'
                  }`}
                onClick={() =>
                  setForm({ ...form, deliveryTime: 'scheduled' })
                }
              >
                Schedule for Dinner
              </button>
            </div>
          </section>

          <section className="mb-5 rounded-xl border border-[#f0e0d0] bg-white p-5">
            <h2 className="mb-4 text-[15px] text-[#7a1f1f]">
              3. Payment Method
            </h2>

            <div className="flex flex-col gap-2.5">
              {paymentMethods.map((method) => (
                <button
                  type="button"
                  key={method.id}
                  className={`rounded-lg border p-3 text-left text-sm ${form.paymentMethod === method.id
                    ? 'border-[#7a1f1f] bg-[#fdf0ea]'
                    : 'border-[#ddd] bg-white'
                    }`}
                  onClick={() =>
                    setForm({ ...form, paymentMethod: method.id })
                  }
                >
                  {method.label}
                </button>
              ))}
            </div>

            {errors.paymentMethod && (
              <p className="mt-1 text-xs text-[#c0392b]">
                {errors.paymentMethod}
              </p>
            )}
          </section>
        </div>

        <aside className="sticky top-6 rounded-xl border border-[#f0e0d0] bg-white p-5">
          <h2 className="mb-4 text-[15px] text-[#7a1f1f]">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="mb-2 flex justify-between text-[13px] text-[#555]"
            >
              <span>
                {item.nameEn} × {item.quantity}
              </span>
              <span>ETB {item.priceETB * item.quantity}</span>
            </div>
          ))}

          <div className="my-2 flex justify-between text-sm text-[#555]">
            <span>Items Subtotal</span>
            <span>ETB {subtotal}</span>
          </div>

          <div className="my-2 flex justify-between text-sm text-[#555]">
            <span>Express Delivery</span>
            <span>ETB {expressFee}</span>
          </div>

          <div className="mt-2 flex justify-between border-t border-[#eee] pt-3 text-lg font-bold text-[#7a1f1f]">
            <span>Grand Total</span>
            <span>ETB {total}</span>
          </div>

          <button
            disabled={pending}
            type="submit"
            className="mt-4 w-full rounded-lg border-0 bg-[#7a1f1f] p-3.5 font-semibold text-white hover:bg-[#611818]"
          >
            {pending ? "Sending" : `Confirm Order & Pay ETB ${total} →`}
          </button>
        </aside>
      </form>
    </div>
  )
}

