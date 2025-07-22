import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Filter, Search, Plus, Minus, Package, Truck, Shield } from 'lucide-react';

const Shop = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products', count: 24 },
    { id: 'supplements', name: 'Supplements', count: 8 },
    { id: 'equipment', name: 'Equipment', count: 6 },
    { id: 'apparel', name: 'Apparel', count: 5 },
    { id: 'accessories', name: 'Accessories', count: 5 },
  ];

  const products = [
    {
      id: 1,
      name: 'Premium Whey Protein',
      category: 'supplements',
      price: 49.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviews: 1247,
      image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'High-quality whey protein for muscle building and recovery',
      badge: 'Best Seller',
      inStock: true,
    },
    {
      id: 2,
      name: 'Adjustable Dumbbells Set',
      category: 'equipment',
      price: 299.99,
      originalPrice: 349.99,
      rating: 4.9,
      reviews: 856,
      image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Space-saving adjustable dumbbells for home workouts',
      badge: 'Sale',
      inStock: true,
    },
    {
      id: 3,
      name: 'Yoga Mat Premium',
      category: 'equipment',
      price: 39.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 2103,
      image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Non-slip premium yoga mat for all types of workouts',
      badge: null,
      inStock: true,
    },
    {
      id: 4,
      name: 'Pre-Workout Energy Boost',
      category: 'supplements',
      price: 34.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 743,
      image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Natural pre-workout supplement for enhanced performance',
      badge: 'New',
      inStock: true,
    },
    {
      id: 5,
      name: 'Athletic Performance Shirt',
      category: 'apparel',
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.5,
      reviews: 432,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Moisture-wicking athletic shirt for intense workouts',
      badge: null,
      inStock: true,
    },
    {
      id: 6,
      name: 'Smart Fitness Watch',
      category: 'accessories',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.8,
      reviews: 1567,
      image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Advanced fitness tracking with heart rate monitoring',
      badge: 'Featured',
      inStock: false,
    },
    {
      id: 7,
      name: 'Resistance Bands Set',
      category: 'equipment',
      price: 19.99,
      originalPrice: null,
      rating: 4.4,
      reviews: 892,
      image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete resistance bands set for strength training',
      badge: null,
      inStock: true,
    },
    {
      id: 8,
      name: 'BCAA Recovery Drink',
      category: 'supplements',
      price: 27.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 654,
      image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Essential amino acids for faster muscle recovery',
      badge: null,
      inStock: true,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'Best Seller': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'Sale': return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'New': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'Featured': return 'bg-gradient-to-r from-purple-500 to-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-2">DHYAN Store</h2>
        <p className="text-gray-300 text-lg">Premium fitness products to enhance your wellness journey</p>
      </div>

      {/* Search and Cart */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          />
        </div>
        <button
          onClick={() => setShowCart(true)}
          className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* Categories */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            {/* Product Image */}
            <div className="relative mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              {product.badge && (
                <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium text-white ${getBadgeColor(product.badge)}`}>
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  favorites.includes(product.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/20 text-gray-300 hover:text-red-400'
                }`}
              >
                <Heart className="w-4 h-4" fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
              </button>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-300 text-sm">{product.description}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-300 text-sm">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold text-xl">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className={`w-full py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  product.inStock
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">Free Shipping</h3>
          <p className="text-gray-300 text-sm">Free delivery on orders over $50</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">Quality Guarantee</h3>
          <p className="text-gray-300 text-sm">30-day money back guarantee</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-300 text-sm">2-3 business days delivery</p>
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-white/20 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Shopping Cart</h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-gray-400 text-sm">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold text-white">Total: ${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;