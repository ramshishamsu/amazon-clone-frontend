import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product._id);
  };

  const renderStars = (rating = 4) =>
    "⭐".repeat(Math.floor(rating));

  return (
    <div className="bg-white border rounded-lg hover:shadow-xl transition">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </Link>

      <div className="p-4">
        <span className="text-xs text-gray-500">
          {product.category}
        </span>

        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold mt-1 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <div className="text-yellow-500 text-sm">
          {renderStars(product.rating)}
        </div>

        <p className="text-xl font-bold mt-1">
          ₹{product.price}
        </p>

        <button
          onClick={handleAddToCart}
          className="amazon-btn w-full mt-3"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
