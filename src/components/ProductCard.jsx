import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const badgeColors = {
  "Best Seller": "bg-blush-500 text-white",
  "New": "bg-gray-900 text-white",
  "Sale": "bg-amber-500 text-white",
  "Fan Favorite": "bg-nude-500 text-white",
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [selectedShade, setSelectedShade] = useState(product.selectedShade || null);
  const [added, setAdded] = useState(false);
  const [slideDir, setSlideDir] = useState("right");
  const [imgKey, setImgKey] = useState(0);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({ ...product, selectedShade });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        {/* Image container */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-[3/4]">
          <img
            key={imgKey}
            src={
              product.shadeImages && selectedShade && product.shadeImages[selectedShade]
                ? product.shadeImages[selectedShade]
                : hovered && product.hoverImage
                ? product.hoverImage
                : product.image
            }
            alt={product.name}
            className={`w-full h-full object-cover ${imgKey > 0 ? (slideDir === "right" ? "slide-in-right" : "slide-in-left") : ""}`}
          />

          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                badgeColors[product.badge] || "bg-gray-200 text-gray-700"
              }`}
            >
              {product.badge}
            </span>
          )}

          {/* Discount */}
          {discount && (
            <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}

          {/* Quick-add overlay */}
          <div
            className={`absolute inset-x-0 bottom-0 p-3 transition-all duration-300 ${
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={handleAddToCart}
              className={`w-full py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-white/90 backdrop-blur text-gray-900 hover:bg-blush-500 hover:text-white"
              }`}
            >
              {added ? "✓ Added to Bag" : "Quick Add"}
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm hover:text-blush-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-0.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3 h-3 ${star <= Math.round(product.rating) ? "text-amber-400" : "text-gray-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-semibold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Shade dots */}
        {product.shades && product.shades.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {product.shades.slice(0, 5).map((shade) => (
              <button
                key={shade}
                onClick={() => {
                  if (product.shadeImages) {
                    const keys = Object.keys(product.shadeImages);
                    const newIdx = keys.indexOf(shade);
                    const curIdx = keys.indexOf(selectedShade);
                    setSlideDir(newIdx >= curIdx ? "right" : "left");
                    setImgKey((k) => k + 1);
                  }
                  setSelectedShade(shade);
                }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedShade === shade
                    ? "border-blush-500 scale-125 shadow"
                    : "border-gray-200 hover:scale-110"
                }`}
                style={{ backgroundColor: shadeToColor(shade) }}
                title={shade}
              />
            ))}
            {product.shades.length > 5 && (
              <span className="text-xs text-gray-400 leading-4">+{product.shades.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function shadeToColor(shade) {
  const map = {
    "Rose Quartz": "#e8a4b8",
    "Cherry Nectar": "#c0395e",
    "Nude Bliss": "#d4a090",
    "Berry Dream": "#8b3a6e",
    "Coral Dusk": "#e8795c",
    "Deep Mauve": "#8e5c6e",
    "Classic Red": "#c0392b",
    "Dusty Rose": "#c9858e",
    "Burnt Sienna": "#a0522d",
    "Bare": "#e8d5c4",
    "Petal Pink": "#f4aab9",
    "Raspberry": "#d4234a",
    "Terracotta": "#c06e52",
    "Peach Bloom": "#ffb77e",
    "Rose Petal": "#f4a0b5",
    "Berry Flush": "#9b3d6e",
    "Coral Sunset": "#f4755c",
    "Warm Terracotta": "#c87d55",
    "Fair": "#f8e8d8",
    "Light": "#f0d5bc",
    "Light-Medium": "#e8c4a0",
    "Medium": "#d4a882",
    "Medium-Deep": "#c4906a",
    "Deep": "#a06040",
    "Rich": "#7a4020",
    "Pearl": "#f8f0e8",
    "Champagne": "#f0e0b0",
    "Rose Gold": "#e8b4a0",
    "Bronze": "#c09060",
    "Dawn": "#d4a0c8",
    "Golden Hour": "#e0a030",
    "Midnight": "#202040",
    "Midnight Black": "#111111",
    "Deep Brown": "#4a2010",
    "Jet Black": "#000000",
    "Brown": "#6b4226",
    "Navy": "#1a2a5e",
    "Forest Green": "#1a4a2a",
    "Blonde": "#f0d890",
    "Light Brown": "#a07040",
    "Medium Brown": "#7a5030",
    "Dark Brown": "#4a2a10",
    "Ebony": "#1a1008",
    "forever boy": "#e8c4a0",
    "fembot": "#f4a0b5",
  };
  return map[shade] || "#e0c0c8";
}
