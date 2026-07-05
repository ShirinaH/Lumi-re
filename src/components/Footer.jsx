import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-2xl font-bold text-white">
              lumière<span className="text-blush-400">.</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Vegan, cruelty-free makeup and skincare crafted for every skin type. Your beauty, elevated.
            </p>
            <div className="flex space-x-3 mt-5">
              {["Instagram", "TikTok", "Pinterest", "YouTube"].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-blush-500 flex items-center justify-center transition-colors text-xs"
                  aria-label={s}
                >
                  {s[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Shop</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "All Products", to: "/shop" },
                { label: "Lips", to: "/shop?category=lips" },
                { label: "Eyes", to: "/shop?category=eyes" },
                { label: "Face", to: "/shop?category=face" },
                { label: "Skincare", to: "/shop?category=skincare" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-blush-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Help</h4>
            <ul className="space-y-2 text-sm">
              {["FAQ", "Shipping & Returns", "Track Order", "Contact Us", "Store Locator"].map((item) => (
                <li key={item}>
                  <button className="hover:text-blush-400 transition-colors">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Stay in the glow</h4>
            <p className="text-sm text-gray-400 mb-3">
              Get 10% off your first order + early access to new launches.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-gray-800 text-white text-sm px-4 py-2.5 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blush-400 placeholder:text-gray-500"
              />
              <button className="bg-blush-500 hover:bg-blush-600 text-white text-sm px-4 py-2.5 rounded-r-full transition-colors font-medium">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2026 Lumière Beauty. All rights reserved.</p>
          <div className="flex space-x-4">
            <button className="hover:text-gray-300">Privacy Policy</button>
            <button className="hover:text-gray-300">Terms of Use</button>
            <button className="hover:text-gray-300">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
