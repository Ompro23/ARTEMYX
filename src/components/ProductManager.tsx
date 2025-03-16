import React, { useState } from 'react';

interface Product {
  name: string;
  description: string;
  price: number;
  size: string;
  image: string;
}

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({ name: '', description: '', price: 0, size: '', image: '' });

  const handleAddProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct({ name: '', description: '', price: 0, size: '', image: '' });
  };

  return (
    <div>
      <h2>Product Management</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Size"
        value={newProduct.size}
        onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newProduct.image}
        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
      />
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name} - {product.description} - ${product.price} - {product.size}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManager;
