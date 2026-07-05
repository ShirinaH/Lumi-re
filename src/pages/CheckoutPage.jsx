import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const STEPS = ["Cart", "Information", "Shipping", "Payment", "Confirmation"];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(items.length === 0 ? 0 : 1);
  const [orderNum] = useState(() => Math.floor(Math.random() * 900000) + 100000);

  const [form, setForm] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "",
    province: "", postalCode: "", country: "Canada", phone: "",
    shipping: "standard", cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };
  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handlePlaceOrder = () => {
    clearCart();
    setStep(4);
  };

  const shippingCost = form.shipping === "express" ? 14.99 : total >= 50 ? 0 : 6.99;
  const tax = total * 0.13;
  const grandTotal = total + shippingCost + tax;

  if (items.length === 0 && step !== 4) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-5">🛍️</p>
        <h2 className="font-serif text-2xl font-bold mb-2">Your bag is empty</h2>
        <p className="text-gray-500 mb-7">Add some products before checking out.</p>
        <Link to="/shop" className="btn-primary text-sm">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-2xl font-bold text-gray-900">
            lumière<span className="text-blush-500">.</span>
          </Link>
        </div>

        {/* Step indicator */}
        {step < 4 && (
          <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
            {STEPS.slice(0, 4).map((label, i) => (
              <div key={label} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      i + 1 < step
                        ? "bg-green-500 text-white"
                        : i + 1 === step
                        ? "bg-blush-500 text-white shadow-md"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i + 1 < step ? "✓" : i + 1}
                  </div>
                  <span className={`text-xs mt-1 hidden sm:block ${i + 1 === step ? "text-blush-500 font-semibold" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div className={`h-0.5 w-12 sm:w-20 mx-1 mt-0 sm:-mt-5 ${i + 1 < step ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        <div className={step === 4 ? "flex justify-center" : "grid lg:grid-cols-5 gap-8"}>
          {/* Left column - form */}
          <div className={step === 4 ? "w-full max-w-lg" : "lg:col-span-3"}>
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              {/* ── STEP 1: Cart review ── */}
              {step === 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">Your Bag</h2>
                  <p className="text-gray-500 text-sm">Your bag is empty. <Link to="/shop" className="text-blush-500 underline">Continue shopping</Link></p>
                </div>
              )}

              {/* ── STEP 1: Information ── */}
              {step === 1 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone (optional)</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
                      />
                    </div>
                    <div className="border-t pt-5">
                      <h3 className="font-semibold text-gray-900 mb-4">Shipping Address</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={(e) => updateForm("firstName", e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
                          <input
                            type="text"
                            value={form.lastName}
                            onChange={(e) => updateForm("lastName", e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                        <input
                          type="text"
                          value={form.address}
                          onChange={(e) => updateForm("address", e.target.value)}
                          placeholder="123 Beauty Lane"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                          <input
                            type="text"
                            value={form.city}
                            onChange={(e) => updateForm("city", e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Province</label>
                          <select
                            value={form.province}
                            onChange={(e) => updateForm("province", e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-blush-400 bg-white"
                          >
                            <option value="">Select</option>
                            {["AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT"].map(p => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Postal Code</label>
                          <input
                            type="text"
                            value={form.postalCode}
                            onChange={(e) => updateForm("postalCode", e.target.value)}
                            placeholder="A1A 1A1"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                          <input
                            type="text"
                            value={form.country}
                            readOnly
                            className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Shipping ── */}
              {step === 2 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">Shipping Method</h2>

                  {/* Address summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{form.firstName} {form.lastName}</p>
                        <p>{form.address}, {form.city}, {form.province} {form.postalCode}</p>
                        <p>{form.email}</p>
                      </div>
                      <button onClick={() => setStep(1)} className="text-blush-500 text-xs hover:underline">Edit</button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "standard", label: "Standard Shipping", desc: "5–7 business days", price: total >= 50 ? "Free" : "$6.99" },
                      { id: "express", label: "Express Shipping", desc: "2–3 business days", price: "$14.99" },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          form.shipping === opt.id ? "border-blush-400 bg-blush-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={opt.id}
                            checked={form.shipping === opt.id}
                            onChange={() => updateForm("shipping", opt.id)}
                            className="text-blush-500 focus:ring-blush-400"
                          />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{opt.label}</p>
                            <p className="text-xs text-gray-500">{opt.desc}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-sm text-gray-900">{opt.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 3: Payment ── */}
              {step === 3 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">Payment</h2>
                  <div className="flex gap-3 mb-6">
                    {["VISA", "MC", "AMEX", "PayPal"].map((card) => (
                      <div key={card} className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 bg-gray-50">
                        {card}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Name on card</label>
                      <input
                        type="text"
                        value={form.cardName}
                        onChange={(e) => updateForm("cardName", e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Card number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={form.cardNumber}
                          onChange={(e) => updateForm("cardNumber", e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19))}
                          placeholder="1234 5678 9012 3456"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400 pr-12"
                          maxLength={19}
                        />
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry date</label>
                        <input
                          type="text"
                          value={form.expiry}
                          onChange={(e) => updateForm("expiry", e.target.value.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1/$2").slice(0, 5))}
                          placeholder="MM/YY"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                        <input
                          type="text"
                          value={form.cvv}
                          onChange={(e) => updateForm("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.1.9-2 2-2m0 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2m4 0V7a4 4 0 0 0-8 0v4" />
                    </svg>
                    Your payment info is encrypted and secure
                  </div>
                </div>
              )}

              {/* ── STEP 4: Confirmation ── */}
              {step === 4 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                  <p className="text-gray-500 mb-1">Thank you, <strong>{form.firstName || "Beauty Lover"}</strong>!</p>
                  <p className="text-gray-500 text-sm mb-6">
                    Your order <strong className="text-gray-800">#{orderNum}</strong> has been placed and a confirmation email has been sent to <strong>{form.email || "your email"}</strong>.
                  </p>
                  <div className="bg-gray-50 rounded-2xl p-5 text-sm text-left mb-7 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Estimated delivery</span>
                      <span className="font-medium">
                        {form.shipping === "express" ? "2–3 business days" : "5–7 business days"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping to</span>
                      <span className="font-medium">{form.city || "Your city"}, {form.province}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/shop" className="btn-primary text-sm px-8">
                      Continue Shopping
                    </Link>
                    <Link to="/survey" className="btn-outline text-sm px-8">
                      Share Your Feedback
                    </Link>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              {step > 0 && step < 4 && (
                <div className="flex gap-3 mt-8">
                  {step > 1 && (
                    <button onClick={handleBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                      ← Back
                    </button>
                  )}
                  <div className="flex-1" />
                  {step < 3 && (
                    <button
                      onClick={handleNext}
                      disabled={step === 1 && (!form.email || !form.firstName || !form.address)}
                      className="btn-primary text-sm px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </button>
                  )}
                  {step === 3 && (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={!form.cardNumber || !form.expiry || !form.cvv}
                      className="btn-primary text-sm px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Place Order · ${grandTotal.toFixed(2)}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right column - order summary */}
          {step < 4 && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-5">Order Summary</h3>
                <ul className="space-y-3 mb-5">
                  {items.map((item) => (
                    <li key={`${item.id}-${item.selectedShade}`} className="flex gap-3 items-start">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {item.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 leading-tight">{item.name}</p>
                        {item.selectedShade && <p className="text-xs text-gray-400">{item.selectedShade}</p>}
                      </div>
                      <p className="text-sm font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? <span className="text-green-600">Free</span> : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tax (HST 13%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-base border-t pt-3 mt-2">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
