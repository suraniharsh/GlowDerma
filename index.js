const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const orders = [
    { id: 1, product: 'Anti-Aging Serum', quantity: 2 },
    { id: 2, product: 'Vitamin C Moisturizer', quantity: 1 },
    { id: 3, product: 'Hyaluronic Acid', quantity: 3 }
  ]

const products = [
  { id: 11, name: "Retinol Serum", price: 1200, availableQty: 50 },
  { id: 12, name: "Niacinamide Solution", price: 800, availableQty: 30 },
  { id: 14, name: "Peptide Moisturizer", price: 1500, availableQty: 100 },
  { id: 15, name: "Glycolic Acid Toner", price: 900, availableQty: 20 }
]

const shoppingCart = [];

  app.get("/", (req, res) => {
    res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here");
  });

app.get("/about", (req, res) => {
  res.send(`
    <h3>
      We are a premium skincare brand committed to bringing you
      dermatologist-approved, clean beauty products
    </h3>
  `);
});

app.get("/contact", (req, res) => {
  res.json({
    email: "care@glowderma.com",
    instagram: "http://instagram.com/glowderma",
    consultation: "http://glowderma.com/book-appointment",
  });
});

app.get("/products", (req, res) => {
  res.json([
    {
      name: "Hydrating Serum",
      price: "$25",
      description:
        "A lightweight serum that deeply hydrates and plumps the skin.",
    },
    {
      name: "Vitamin C Cream",
      price: "$30",
      description:
        "Brightens skin tone and reduces the appearance of dark spots.",
    },
  ]);
});

app.get("/orders/:orderID", (req, res) => {
  const orderID = Number(req.params.orderID);
  const order = orders.find((order) => order.id === orderID);

  if (!order) {
    res.status(404).json({ error: "Order Not Found" });
  } else {
    res.json(order);
  }
});

app.get("/products", (req, res) => {
  const name = req.query.name;
  const maxPrice = Number(req.query.maxPrice);

  if (name && maxPrice) {
    const filteredProducts = products.filter(
      (product) => product.name.includes(name) && product.price <= maxPrice
    );
    res.json(filteredProducts);
  } else if (name) {
    const filteredProducts = products.filter((product) =>
      product.name.includes(name)
    );
    res.json(filteredProducts);
  } else if (maxPrice) {
    const filteredProducts = products.filter(
      (product) => product.price <= maxPrice
    );
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

app.get("/cart", (req, res) => {
  res.json(shoppingCart);
});

app.post("/cart", (req, res) => {
  const { id, name, price, qty } = req.body;

  if (!id || !name || !price || !qty) {
    res.status(400).json({ error: "Missing fields" });
  } else {
    shoppingCart.push({ id, name, price, qty });
    res.json(shoppingCart);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
