// Mock data for testing without backend
export const mockProducts = [
  {
    _id: "1",
    name: "iPhone 15 Pro Max",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    price: 149999,
    originalPrice: 159999,
    category: "mobiles",
    rating: 4.8,
    stock: 10,
    image: "https://picsum.photos/300/300?random=1",
    images: [
      "https://picsum.photos/300/300?random=1",
      "https://picsum.photos/300/300?random=2",
      "https://picsum.photos/300/300?random=3"
    ],
    reviews: [
      {
        user: "Rahul Sharma",
        rating: 5,
        comment: "Amazing phone! The camera quality is outstanding.",
        date: "2024-01-15"
      },
      {
        user: "Priya Patel",
        rating: 4,
        comment: "Great performance, but battery could be better.",
        date: "2024-01-10"
      }
    ]
  },
  {
    _id: "2",
    name: "MacBook Pro 16-inch",
    description: "Powerful laptop with M3 Pro chip, stunning display, and all-day battery life",
    price: 249999,
    originalPrice: 269999,
    category: "laptops",
    rating: 4.9,
    stock: 5,
    image: "https://picsum.photos/300/300?random=4",
    images: [
      "https://picsum.photos/300/300?random=4",
      "https://picsum.photos/300/300?random=5"
    ],
    reviews: [
      {
        user: "Amit Kumar",
        rating: 5,
        comment: "Perfect for development work. Super fast!",
        date: "2024-01-12"
      }
    ]
  },
  {
    _id: "3",
    name: "Sony WH-1000XM5 Headphones",
    description: "Premium noise-canceling headphones with exceptional sound quality",
    price: 29990,
    originalPrice: 34990,
    category: "electronics",
    rating: 4.7,
    stock: 15,
    image: "https://picsum.photos/300/300?random=6",
    images: [
      "https://picsum.photos/300/300?random=6",
      "https://picsum.photos/300/300?random=7"
    ],
    reviews: [
      {
        user: "Neha Gupta",
        rating: 5,
        comment: "Best noise cancellation I've ever experienced!",
        date: "2024-01-08"
      }
    ]
  },
  {
    _id: "4",
    name: "Apple Watch Series 9",
    description: "Advanced health features, bright display, and powerful S9 chip",
    price: 44990,
    originalPrice: 49990,
    category: "wearables",
    rating: 4.6,
    stock: 8,
    image: "https://picsum.photos/300/300?random=8",
    images: [
      "https://picsum.photos/300/300?random=8",
      "https://picsum.photos/300/300?random=9"
    ],
    reviews: [
      {
        user: "Karan Singh",
        rating: 4,
        comment: "Great fitness tracking and health features.",
        date: "2024-01-05"
      }
    ]
  },
  {
    _id: "5",
    name: "Samsung Galaxy S24 Ultra",
    description: "Flagship Android phone with S Pen, amazing camera, and premium build",
    price: 124999,
    originalPrice: 139999,
    category: "mobiles",
    rating: 4.7,
    stock: 12,
    image: "https://picsum.photos/300/300?random=10",
    images: [
      "https://picsum.photos/300/300?random=10",
      "https://picsum.photos/300/300?random=11"
    ],
    reviews: [
      {
        user: "Deepak Verma",
        rating: 5,
        comment: "The S Pen is incredibly useful for productivity!",
        date: "2024-01-14"
      }
    ]
  },
  {
    _id: "6",
    name: "iPad Pro 12.9-inch",
    description: "Professional tablet with M2 chip, Liquid Retina XDR display",
    price: 89990,
    originalPrice: 99990,
    category: "electronics",
    rating: 4.8,
    stock: 6,
    image: "https://picsum.photos/300/300?random=12",
    images: [
      "https://picsum.photos/300/300?random=12",
      "https://picsum.photos/300/300?random=13"
    ],
    reviews: [
      {
        user: "Anjali Nair",
        rating: 5,
        comment: "Perfect for digital art and design work!",
        date: "2024-01-11"
      }
    ]
  },
  {
    _id: "7",
    name: "Dell XPS 13 Laptop",
    description: "Ultra-portable laptop with stunning InfinityEdge display",
    price: 89990,
    originalPrice: 99990,
    category: "laptops",
    rating: 4.5,
    stock: 7,
    image: "https://picsum.photos/300/300?random=14",
    images: [
      "https://picsum.photos/300/300?random=14",
      "https://picsum.photos/300/300?random=15"
    ],
    reviews: [
      {
        user: "Rohit Mehta",
        rating: 4,
        comment: "Great portability and build quality.",
        date: "2024-01-09"
      }
    ]
  },
  {
    _id: "8",
    name: "AirPods Pro 2",
    description: "Premium wireless earbuds with active noise cancellation",
    price: 24990,
    originalPrice: 29990,
    category: "electronics",
    rating: 4.6,
    stock: 20,
    image: "https://picsum.photos/300/300?random=16",
    images: [
      "https://picsum.photos/300/300?random=16",
      "https://picsum.photos/300/300?random=17"
    ],
    reviews: [
      {
        user: "Sneha Reddy",
        rating: 5,
        comment: "Excellent sound quality and comfort!",
        date: "2024-01-13"
      }
    ]
  }
];

export const mockOrders = [
  {
    _id: "ORD001",
    status: "Processing",
    totalAmount: 149999,
    paymentMethod: "cod",
    shippingAddress: {
      fullName: "John Doe",
      address: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "9876543210"
    },
    items: [
      {
        productId: mockProducts[0],
        quantity: 1
      }
    ],
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    _id: "ORD002",
    status: "Shipped",
    totalAmount: 74980,
    paymentMethod: "card",
    shippingAddress: {
      fullName: "Jane Smith",
      address: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      phone: "9876543211"
    },
    items: [
      {
        productId: mockProducts[2],
        quantity: 2
      }
    ],
    createdAt: "2024-01-10T14:20:00Z"
  }
];
