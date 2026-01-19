import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsApi } from "../api/productApi";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  // 🔑 URL is the source of truth
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const rating = searchParams.get("rating") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {};

      if (search) params.search = search;
      if (category) params.category = category;
      if (rating) params.rating = rating;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      console.log("Loading products with params:", params);

      const res = await getProductsApi(params);
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category, rating, minPrice, maxPrice]);

  // 🔄 Update URL params safely
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">

        {/* LEFT – FILTERS */}
        <div className="lg:col-span-1 border p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear all
            </button>
          </div>

          {/* SEARCH */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search products..."
              className="border p-2 w-full rounded text-sm"
              value={search}
              onChange={(e) => updateParam("search", e.target.value)}
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Category
            </label>
            <select
              className="border p-2 w-full rounded text-sm"
              value={category}
              onChange={(e) => updateParam("category", e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="mobiles">Mobiles</option>
              <option value="laptops">Laptops</option>
              <option value="electronics">Electronics</option>
              <option value="wearables">Wearables</option>
            </select>
          </div>

        {/* PRICE RANGE */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Price Range
          </label>
          <input
            type="number"
            placeholder="Min Price"
            className="border p-2 w-full rounded mb-2 text-sm"
            value={minPrice}
            onChange={(e) => updateParam("minPrice", e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border p-2 w-full rounded text-sm"
            value={maxPrice}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
          />
        </div>

        {/* RATING */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Minimum Rating
          </label>
          <select
            className="border p-2 w-full rounded text-sm"
            value={rating}
            onChange={(e) => updateParam("rating", e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="4">4★ & above</option>
            <option value="3">3★ & above</option>
            <option value="2">2★ & above</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          {products.length} products found
        </div>
      </div>

      {/* RIGHT – PRODUCTS */}
      <div className="lg:col-span-3">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  </div>
  );
};

export default Home;
