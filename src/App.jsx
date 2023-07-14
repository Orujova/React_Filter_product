import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let url = "https://fakestoreapi.com/products";
    if (category) {
      url += `/category/${category}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  }, [category]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <div className="label_container">
        <label>
          Filter by category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </label>
        <label>
          Search products:
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </label>
      </div>

      <section>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt="" />
            <h3>{product.title.slice(0, 15) + "..."}</h3>
            <h1>${product.price}</h1>
            <h4>{product.category}</h4>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
