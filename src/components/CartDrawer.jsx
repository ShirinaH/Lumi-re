import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, total } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="font-serif text-xl font-semibold">Your Bag</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-blush-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blush-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Your bag is empty</p>
              <p className="text-sm text-gray-400 mt-1">Add something beautiful ✨</p>
              <button
                onClick={onClose}
                className="mt-5 btn-primary text-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={`${item.id}-${item.selectedShade}`} className="flex gap-4">
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 leading-snug">{item.name}</h4>
                    {item.selectedShade && (
                      <p className="text-xs text-gray-400 mt-0.5">{item.selectedShade}</p>
                    )}
                    <p className="text-sm font-semibold text-blush-600 mt-1">${item.price}</p>

                    {/* Qty */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, item.selectedShade, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg leading-none"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.selectedShade, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg leading-none"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.selectedShade)}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors ml-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-5 space-y-3">
            {/* Free shipping bar */}
            {total < 50 && (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Add <strong className="text-gray-700">${(50 - total).toFixed(2)}</strong> for free shipping</span>
                  <span>${total.toFixed(2)} / $50</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blush-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            {total >= 50 && (
              <p className="text-xs text-green-600 font-medium text-center">🎉 You've unlocked free shipping!</p>
            )}

            <div className="flex justify-between text-sm font-medium">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400 text-center">Taxes and shipping calculated at checkout</p>
            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
              className="btn-primary w-full text-sm font-semibold py-3.5"
            >
              Checkout → ${total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
