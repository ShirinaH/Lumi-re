import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductPage({ onCartOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const [selectedShade, setSelectedShade] = useState(product?.selectedShade || null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [slideDir, setSlideDir] = useState("right"); // "right" | "left"
  const [imgKey, setImgKey] = useState(0);

  if (!product) {
    return (
      <div className="text-center py-24">
        <p className="text-4xl mb-4">😢</p>
        <h2 className="font-serif text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="mt-5 inline-block btn-primary text-sm">Back to Shop</Link>
      </div>
    );
  }

  // If the product has per-shade images, build the gallery from them; otherwise fall back to default pair
  const imgs = product.shadeImages
    ? Object.values(product.shadeImages)
    : [product.image, product.hoverImage].filter(Boolean);

  // When a shade is selected, jump to its image in the gallery with a slide animation
  const handleShadeSelect = (shade) => {
    if (product.shadeImages) {
      const keys = Object.keys(product.shadeImages);
      const newIdx = keys.indexOf(shade);
      if (newIdx !== -1) {
        setSlideDir(newIdx >= activeImg ? "right" : "left");
        setActiveImg(newIdx);
        setImgKey((k) => k + 1);
      }
    }
    setSelectedShade(shade);
  };

  const handleThumbClick = (idx) => {
    setSlideDir(idx >= activeImg ? "right" : "left");
    setActiveImg(idx);
    setImgKey((k) => k + 1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ ...product, selectedShade });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    onCartOpen();
  };

  const handleBuyNow = () => {
    addItem({ ...product, selectedShade });
    navigate("/checkout");
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex gap-2 items-center">
        <Link to="/" className="hover:text-blush-500">Home</Link>
        <span>›</span>
        <Link to="/shop" className="hover:text-blush-500">Shop</Link>
        <span>›</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-blush-500 capitalize">{product.category}</Link>
        <span>›</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image gallery */}
        <div>
          <div className="rounded-3xl overflow-hidden bg-gray-50 aspect-square mb-4">
            <img
              key={imgKey}
              src={imgs[activeImg]}
              alt={product.name}
              className={`w-full h-full object-cover ${slideDir === "right" ? "slide-in-right" : "slide-in-left"}`}
            />
          </div>
          {imgs.length > 1 && (
            <div className="flex gap-3 flex-wrap">
              {imgs.map((img, i) => (
                <button
                  key={i}
                  onClick={() => handleThumbClick(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === i ? "border-blush-400" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          {product.badge && (
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${
              product.badge === "Best Seller" ? "bg-blush-100 text-blush-600" :
              product.badge === "New" ? "bg-gray-900 text-white" :
              product.badge === "Sale" ? "bg-amber-100 text-amber-700" :
              "bg-nude-100 text-nude-700"
            }`}>
              {product.badge}
            </span>
          )}

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Stars */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(product.rating) ? "text-amber-400" : "text-gray-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-gray-400 line-through text-lg">${product.originalPrice}</span>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium capitalize">
                {tag}
              </span>
            ))}
          </div>

          {/* Shade picker */}
          {product.shades && product.shades.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Shade: <span className="font-normal text-gray-600">{selectedShade || "Select a shade"}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.shades.map((shade) => (
                  <button
                    key={shade}
                    onClick={() => handleShadeSelect(shade)}
                    title={shade}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedShade === shade
                        ? "border-gray-900 scale-110 ring-2 ring-offset-1 ring-blush-300"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: shadeToColor(shade) }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-900">Qty:</span>
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-xl"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 rounded-full text-sm font-semibold transition-all ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-blush-500 text-white hover:bg-blush-600 active:scale-95"
              }`}
            >
              {added ? "✓ Added to Bag!" : "Add to Bag"}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 rounded-full text-sm font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
            >
              Buy Now
            </button>
          </div>

          {/* Perks */}
          <div className="mt-7 border-t pt-5 space-y-2.5 text-sm text-gray-500">
            <div className="flex items-center gap-2"><span>🚚</span> Free shipping on orders $50+</div>
            <div className="flex items-center gap-2"><span>🔄</span> Free 30-day returns</div>
            <div className="flex items-center gap-2"><span>🌿</span> Vegan &amp; cruelty-free</div>
            <div className="flex items-center gap-2"><span>💳</span> Secure checkout</div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-7">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function shadeToColor(shade) {
  const map = {
    "Rose Quartz": "#e8a4b8", "Cherry Nectar": "#c0395e", "Nude Bliss": "#d4a090",
    "Berry Dream": "#8b3a6e", "Coral Dusk": "#e8795c", "Deep Mauve": "#8e5c6e",
    "Classic Red": "#c0392b", "Dusty Rose": "#c9858e", "Burnt Sienna": "#a0522d",
    "Bare": "#e8d5c4", "Petal Pink": "#f4aab9", "Raspberry": "#d4234a",
    "Terracotta": "#c06e52", "Peach Bloom": "#ffb77e", "Rose Petal": "#f4a0b5",
    "Berry Flush": "#9b3d6e", "Coral Sunset": "#f4755c", "Warm Terracotta": "#c87d55",
    "Fair": "#f8e8d8", "Light": "#f0d5bc", "Light-Medium": "#e8c4a0",
    "Medium": "#d4a882", "Medium-Deep": "#c4906a", "Deep": "#a06040", "Rich": "#7a4020",
    "Pearl": "#f8f0e8", "Champagne": "#f0e0b0", "Rose Gold": "#e8b4a0", "Bronze": "#c09060",
    "Dawn": "#d4a0c8", "Golden Hour": "#e0a030", "Midnight": "#202040",
    "Midnight Black": "#111111", "Deep Brown": "#4a2010", "Jet Black": "#000000",
    "Brown": "#6b4226", "Navy": "#1a2a5e", "Forest Green": "#1a4a2a",
    "Blonde": "#f0d890", "Light Brown": "#a07040", "Medium Brown": "#7a5030",
    "Dark Brown": "#4a2a10", "Ebony": "#1a1008",
  };
  return map[shade] || "#e0c0c8";
}
