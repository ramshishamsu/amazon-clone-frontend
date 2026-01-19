import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductByIdApi } from "../api/productApi";
import { useCart } from "../context/CartContext";
import { isLoggedIn } from "../utils/auth";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProductByIdApi(id).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return null;

  // ✅ ADD TO CART HANDLER
  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      navigate("/login", {
        state: { redirectTo: `/product/${id}` }
      });
      return;
    }

    await addToCart(product._id, quantity);
    navigate("/cart"); // Amazon shows cart confirmation
  };

  // ✅ BUY NOW HANDLER
  const handleBuyNow = async () => {
    if (!isLoggedIn()) {
      navigate("/login", {
        state: { redirectTo: "/checkout" }
      });
      return;
    }

    await addToCart(product._id, quantity);
    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Images */}
      <div>
        <img
          src={product.images[selectedImage]}
          alt={product.name}
          className="w-full h-96 object-cover rounded"
        />

        <div className="flex gap-2 mt-3">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              onClick={() => setSelectedImage(idx)}
              className={`w-20 h-20 cursor-pointer border ${
                selectedImage === idx ? "border-yellow-400" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-2xl font-bold text-green-600 mt-2">
          ₹{product.price}
        </p>

        <p className="mt-4">{product.description}</p>

        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="amazon-btn flex-1"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="border px-6 py-2 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
