import React, { useState, useEffect } from "react";
import axios from "axios";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/inventory");
        setInventoryItems(response.data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const handleBuy = async (item) => {
    const quantityToBuy = parseInt(
      prompt(`How many "${item.name}" would you like to buy? (Available: ${item.quantity})`)
    );

    if (isNaN(quantityToBuy) || quantityToBuy <= 0) {
      alert("❌ Please enter a valid quantity.");
      return;
    }

    if (quantityToBuy > item.quantity) {
      alert("⚠️ Not enough stock available.");
      return;
    }

    // Update frontend state
    const updatedItems = inventoryItems.map((invItem) =>
      invItem._id === item._id
        ? { ...invItem, quantity: invItem.quantity - quantityToBuy }
        : invItem
    );
    setInventoryItems(updatedItems);

    // Optional: Send request to backend to update stock
    try {
      await axios.put(`http://localhost:5000/api/inventory/${item._id}`, {
        action: "decrease",
        amount: quantityToBuy,
      });
      alert(`✅ You purchased ${quantityToBuy} of ${item.name}`);
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("❌ Something went wrong while purchasing.");
    }
  };

  if (loading) return <div style={{ textAlign: "center" }}>Loading inventory...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Available Inventory</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
        }}
      >
        {inventoryItems.map((item) => (
          <div
            key={item._id}
            style={{
              width: "260px",
              padding: "1rem",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3>{item.name}</h3>
            <p>{item.description || "No description available."}</p>
            <p><strong>Price:</strong> ₹{item.price}</p>
            <p><strong>Available:</strong> {item.quantity}</p>
            <button
              onClick={() => handleBuy(item)}
              style={{
                marginTop: "10px",
                padding: "0.6rem 1.2rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;





