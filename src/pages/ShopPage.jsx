import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  products,
  categories,
  subcategories,
  skinTypes,
  concerns,
  badges,
  priceRanges,
} from "../data/products";
import ProductCard from "../components/ProductCard";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "newest", label: "Newest" },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState(
    searchParams.get("badge") ? [searchParams.get("badge")] : []
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    subcategory: true,
    price: true,
    badge: true,
    skinType: false,
    concern: false,
  });

  // Sync URL param for category
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const badge = searchParams.get("badge");
    if (badge) setSelectedBadges([badge]);
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleFilter = (list, setList, value) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Filtered + sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSubcategories.length > 0) {
      result = result.filter((p) => selectedSubcategories.includes(p.subcategory));
    }

    if (selectedPriceRanges.length > 0) {
      const ranges = priceRanges.filter((r) => selectedPriceRanges.includes(r.id));
      result = result.filter((p) => ranges.some((r) => p.price >= r.min && p.price < r.max));
    }

    if (selectedBadges.length > 0) {
      result = result.filter((p) => p.badge && selectedBadges.includes(p.badge));
    }

    if (selectedSkinTypes.length > 0) {
      result = result.filter(
        (p) => p.skinType.length === 0 || p.skinType.some((s) => selectedSkinTypes.includes(s))
      );
    }

    if (selectedConcerns.length > 0) {
      result = result.filter(
        (p) => p.concern.length === 0 || p.concern.some((c) => selectedConcerns.includes(c))
      );
    }

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "reviews": result.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }

    return result;
  }, [selectedCategory, selectedSubcategories, selectedPriceRanges, selectedBadges, selectedSkinTypes, selectedConcerns, searchQuery, sortBy]);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [selectedCategory, selectedSubcategories, selectedPriceRanges, selectedBadges, selectedSkinTypes, selectedConcerns, searchQuery, sortBy]);

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedSubcategories.length +
    selectedPriceRanges.length +
    selectedBadges.length +
    selectedSkinTypes.length +
    selectedConcerns.length;

  const clearAll = () => {
    setSelectedCategory("all");
    setSelectedSubcategories([]);
    setSelectedPriceRanges([]);
    setSelectedBadges([]);
    setSelectedSkinTypes([]);
    setSelectedConcerns([]);
    setSearchQuery("");
    setSearchParams({});
  };

  const subcatsForCategory =
    selectedCategory !== "all" ? subcategories[selectedCategory] || [] : Object.values(subcategories).flat();

  // Filter panel shared component
  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-100 py-4">
      <button
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-1"
        onClick={() => toggleSection(sectionKey)}
      >
        {title}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${openSections[sectionKey] ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {openSections[sectionKey] && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );

  const CheckOption = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 text-blush-500 focus:ring-blush-400 cursor-pointer"
      />
      <span className="text-sm text-gray-600 group-hover:text-gray-900 capitalize">{label}</span>
    </label>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
          {selectedCategory === "all" ? "All Products" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </h1>
        <p className="text-gray-500 mt-1">{filteredProducts.length} products</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSelectedSubcategories([]);
            }}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? "bg-blush-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, ingredients, concerns..."
          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blush-400 bg-gray-50"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters – desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearAll} className="text-xs text-blush-500 hover:underline">
                  Clear all ({activeFilterCount})
                </button>
              )}
            </div>

            <FilterSection title="Type" sectionKey="subcategory">
              {subcatsForCategory.map((sub) => (
                <CheckOption
                  key={sub}
                  label={sub}
                  checked={selectedSubcategories.includes(sub)}
                  onChange={() => toggleFilter(selectedSubcategories, setSelectedSubcategories, sub)}
                />
              ))}
            </FilterSection>

            <FilterSection title="Price" sectionKey="price">
              {priceRanges.map((r) => (
                <CheckOption
                  key={r.id}
                  label={r.label}
                  checked={selectedPriceRanges.includes(r.id)}
                  onChange={() => toggleFilter(selectedPriceRanges, setSelectedPriceRanges, r.id)}
                />
              ))}
            </FilterSection>

            <FilterSection title="Highlights" sectionKey="badge">
              {badges.map((b) => (
                <CheckOption
                  key={b}
                  label={b}
                  checked={selectedBadges.includes(b)}
                  onChange={() => toggleFilter(selectedBadges, setSelectedBadges, b)}
                />
              ))}
            </FilterSection>

            <FilterSection title="Skin Type" sectionKey="skinType">
              {skinTypes.map((s) => (
                <CheckOption
                  key={s}
                  label={s}
                  checked={selectedSkinTypes.includes(s)}
                  onChange={() => toggleFilter(selectedSkinTypes, setSelectedSkinTypes, s)}
                />
              ))}
            </FilterSection>

            <FilterSection title="Skin Concern" sectionKey="concern">
              {concerns.map((c) => (
                <CheckOption
                  key={c}
                  label={c}
                  checked={selectedConcerns.includes(c)}
                  onChange={() => toggleFilter(selectedConcerns, setSelectedConcerns, c)}
                />
              ))}
            </FilterSection>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {/* Sort + mobile filter bar */}
          <div className="flex items-center justify-between mb-6 gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-blush-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h2" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-blush-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-500 hidden sm:block">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-blush-400 bg-white"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedCategory !== "all" && (
                <Chip label={`Category: ${selectedCategory}`} onRemove={() => setSelectedCategory("all")} />
              )}
              {selectedSubcategories.map((s) => (
                <Chip key={s} label={s} onRemove={() => toggleFilter(selectedSubcategories, setSelectedSubcategories, s)} />
              ))}
              {selectedPriceRanges.map((r) => {
                const range = priceRanges.find((pr) => pr.id === r);
                return <Chip key={r} label={range?.label} onRemove={() => toggleFilter(selectedPriceRanges, setSelectedPriceRanges, r)} />;
              })}
              {selectedBadges.map((b) => (
                <Chip key={b} label={b} onRemove={() => toggleFilter(selectedBadges, setSelectedBadges, b)} />
              ))}
              {selectedSkinTypes.map((s) => (
                <Chip key={s} label={`Skin: ${s}`} onRemove={() => toggleFilter(selectedSkinTypes, setSelectedSkinTypes, s)} />
              ))}
              {selectedConcerns.map((c) => (
                <Chip key={c} label={c} onRemove={() => toggleFilter(selectedConcerns, setSelectedConcerns, c)} />
              ))}
            </div>
          )}

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-semibold">No products found</p>
              <p className="text-sm mt-1">Try adjusting your filters or search query</p>
              <button onClick={clearAll} className="mt-5 btn-primary text-sm">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setFilterOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-semibold">Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>

            <FilterSection title="Type" sectionKey="subcategory">
              {subcatsForCategory.map((sub) => (
                <CheckOption key={sub} label={sub} checked={selectedSubcategories.includes(sub)} onChange={() => toggleFilter(selectedSubcategories, setSelectedSubcategories, sub)} />
              ))}
            </FilterSection>
            <FilterSection title="Price" sectionKey="price">
              {priceRanges.map((r) => (
                <CheckOption key={r.id} label={r.label} checked={selectedPriceRanges.includes(r.id)} onChange={() => toggleFilter(selectedPriceRanges, setSelectedPriceRanges, r.id)} />
              ))}
            </FilterSection>
            <FilterSection title="Highlights" sectionKey="badge">
              {badges.map((b) => (
                <CheckOption key={b} label={b} checked={selectedBadges.includes(b)} onChange={() => toggleFilter(selectedBadges, setSelectedBadges, b)} />
              ))}
            </FilterSection>
            <FilterSection title="Skin Type" sectionKey="skinType">
              {skinTypes.map((s) => (
                <CheckOption key={s} label={s} checked={selectedSkinTypes.includes(s)} onChange={() => toggleFilter(selectedSkinTypes, setSelectedSkinTypes, s)} />
              ))}
            </FilterSection>
            <FilterSection title="Skin Concern" sectionKey="concern">
              {concerns.map((c) => (
                <CheckOption key={c} label={c} checked={selectedConcerns.includes(c)} onChange={() => toggleFilter(selectedConcerns, setSelectedConcerns, c)} />
              ))}
            </FilterSection>

            <div className="flex gap-3 mt-6 sticky bottom-0 bg-white pt-4 border-t">
              <button onClick={clearAll} className="flex-1 btn-outline text-sm py-3">
                Clear all
              </button>
              <button onClick={() => setFilterOpen(false)} className="flex-1 btn-primary text-sm py-3">
                Show {filteredProducts.length} results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <span className="flex items-center gap-1.5 bg-blush-50 text-blush-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blush-200">
      {label}
      <button onClick={onRemove} className="text-blush-400 hover:text-blush-700 leading-none text-base">
        ✕
      </button>
    </span>
  );
}
