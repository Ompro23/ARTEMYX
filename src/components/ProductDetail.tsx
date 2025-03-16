import React, { useState } from 'react';

interface Product {
  name: string;
  description: string;
  price: number;
  sizes: string[];
}

const ProductDetail: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div>
        <label htmlFor="size">Size:</label>
        <select id="size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          {product.sizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
