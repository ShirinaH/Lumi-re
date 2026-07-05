import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const heroSlides = [
  {
    headline: "Your skin deserves the best.",
    sub: "Vegan, cruelty-free makeup and skincare for your most radiant self.",
    cta: "Shop Now",
    ctaLink: "/shop",
    bg: "from-blush-50 to-pink-50",
    accent: "text-blush-500",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=85",
  },
];

const categories = [
  { label: "Lips", img: "/category-lips.png", to: "/shop?category=lips" },
  { label: "Eyes", img: "/category-eyes.png", to: "/shop?category=eyes" },
  { label: "Face", img: "/category-face.png", to: "/shop?category=face" },
  { label: "Skincare", img: "/category-skincare.png", to: "/shop?category=skincare" },
];

const bestSellers = products.filter((p) => p.badge === "Best Seller").slice(0, 4);
const newArrivals = products.filter((p) => p.badge === "New").slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Full-bleed collection image as background */}
        <div className="absolute inset-0">
          <img
            src="/hero-collection.png"
            alt="New Collection Summer 2026"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay: heavy on left for readability, fades to transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdf0f0]/95 via-[#fdf0f0]/70 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 flex flex-col md:flex-row items-center gap-10">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-blush-100 text-blush-600 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              New Collection · Summer 2026
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Glow like<br />
              <span className="text-blush-500 italic">you mean it.</span>
            </h1>
            <p className="mt-5 text-gray-700 text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
              Vegan, cruelty-free makeup and skincare formulated for every skin type. Discover your ritual.
            </p>
            <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
              <Link to="/shop" className="btn-primary text-sm px-8 py-3.5">
                Shop the Collection
              </Link>
              <Link to="/shop?category=skincare" className="btn-outline text-sm px-8 py-3.5">
                Skincare
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-9 justify-center md:justify-start text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="text-green-500">✓</span> 100% Vegan
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-green-500">✓</span> Cruelty-Free
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-green-500">✓</span> Clean Formulas
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="bg-gray-900 text-white py-5">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-2 text-sm font-medium text-center px-4">
          <span>🚚 Free shipping on orders $50+</span>
          <span>🌿 100% Vegan & Cruelty-Free</span>
          <span>💌 Free gift on orders $70+</span>
          <span>♻️ Sustainable packaging</span>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-500 mt-2">Find your perfect match</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.to}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                <p className="font-serif text-lg font-semibold">{cat.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-blush-500 text-xs font-bold uppercase tracking-widest">Trending Now</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-1">Best Sellers</h2>
          </div>
          <Link to="/shop?badge=Best+Seller" className="text-sm text-blush-500 font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── SPLIT BANNER ── */}
      <section className="bg-gradient-to-r from-nude-50 to-blush-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img
              src="/skincare-collection-banner.png"
              alt="Lumière Skincare Collection"
              className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3]"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="text-blush-500 text-xs font-bold uppercase tracking-widest">Skincare First</span>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mt-3 leading-snug">
              The ritual that<br />changes everything.
            </h2>
            <p className="text-gray-500 mt-4 leading-relaxed max-w-md">
              Our dermatologist-tested skincare range is packed with science-backed ingredients. Hyaluronic acid, retinol, ceramides — your skin will thank you.
            </p>
            <Link to="/shop?category=skincare" className="inline-block mt-7 btn-primary text-sm px-8 py-3.5">
              Explore Skincare
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-blush-500 text-xs font-bold uppercase tracking-widest">Just Landed</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-1">New Arrivals</h2>
          </div>
          <Link to="/shop?badge=New" className="text-sm text-blush-500 font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">What our customers say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sophie L.",
                rating: 5,
                text: "The Dewy Glow Serum is everything. My skin has never looked so hydrated and plump. I get compliments every single day!",
                product: "Dewy Glow Serum",
              },
              {
                name: "Maya R.",
                rating: 5,
                text: "The Cloud Blush is the most beautiful product I've ever used. The color payoff is insane and it lasts all day.",
                product: "Cloud Blush",
              },
              {
                name: "Priya K.",
                rating: 5,
                text: "I was skeptical about online beauty shopping but Lumière's quality blew me away. The Velvet Lip Gloss is my new holy grail.",
                product: "Velvet Lip Gloss",
              },
            ].map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">"{review.text}"</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center text-blush-600 font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SURVEY CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-gradient-to-br from-blush-500 to-nude-500 rounded-3xl p-10 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-80">We want to hear from you</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Help us glow up — together.</h2>
          <p className="text-white/80 max-w-md mx-auto mb-7">
            Take our 2-minute survey and help shape the future of Lumière. Your feedback makes us better.
          </p>
          <Link to="/survey" className="inline-block bg-white text-blush-600 font-semibold px-8 py-3.5 rounded-full hover:bg-blush-50 transition-colors text-sm">
            Take the Survey ✨
          </Link>
        </div>
      </section>
    </div>
  );
}
