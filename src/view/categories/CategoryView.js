import React, { useState, useEffect } from 'react';

function CategoryView() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetch(`/api/products?category=${category}&price=${price}`)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [category, price]);

  return (
    <div>
      <form>
        <label>
          Category:
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </label>
        <label>
          Max price:
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </label>
      </form>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryView