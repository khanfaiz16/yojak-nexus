// DEMO CATALOGUE - replace this file with the real catalogue when supplied.
// Prices are sample values only and are NOT confirmed client prices.
//
// availability: "in-stock" | "low-stock" | "out-of-stock"
// tone: colour of the demo image tile: "navy" | "teal" | "green" | "soft"
// stock: demo stock level (number)
// options (optional): { label: "Size", values: ["S", "M", "L"] }
// details (optional): list of short demo bullet points

export const categories = [
  {
    id: "essentials",
    name: "Everyday Essentials",
    blurb: "Demo category. Replace with a real product group.",
  },
  {
    id: "gifting",
    name: "Gifting",
    blurb: "Demo category. Replace with a real product group.",
  },
  {
    id: "seasonal",
    name: "Seasonal Picks",
    blurb: "Demo category. Replace with a real product group.",
  },
];

export const products = [
  {
    id: "sample-product-01",
    name: "Sample Product 01",
    categoryId: "essentials",
    price: 499,
    availability: "in-stock",
    stock: 25,
    tone: "navy",
    featured: true,
    description: "Demo description. Replace with real product details.",
    options: { label: "Size", values: ["Small", "Medium", "Large"] },
    details: ["Demo detail one", "Demo detail two", "Demo detail three"],
  },
  {
    id: "sample-product-02",
    name: "Sample Product 02",
    categoryId: "essentials",
    price: 649,
    availability: "in-stock",
    stock: 18,
    tone: "teal",
    featured: true,
    description: "Demo description. Replace with real product details.",
    options: { label: "Colour", values: ["Navy", "Teal", "Green"] },
    details: ["Demo detail one", "Demo detail two", "Demo detail three"],
  },
  {
    id: "sample-product-03",
    name: "Sample Product 03",
    categoryId: "gifting",
    price: 899,
    availability: "low-stock",
    stock: 3,
    tone: "green",
    featured: true,
    description: "Demo description. Replace with real product details.",
    options: { label: "Pack", values: ["Single", "Set of two"] },
    details: ["Demo detail one", "Demo detail two", "Demo detail three"],
  },
  {
    id: "sample-product-04",
    name: "Sample Product 04",
    categoryId: "gifting",
    price: 1199,
    availability: "in-stock",
    stock: 12,
    tone: "soft",
    featured: true,
    description: "Demo description. Replace with real product details.",
    details: ["Demo detail one", "Demo detail two", "Demo detail three"],
  },
  {
    id: "sample-product-05",
    name: "Sample Product 05",
    categoryId: "seasonal",
    price: 749,
    availability: "out-of-stock",
    stock: 0,
    tone: "teal",
    featured: false,
    description: "Demo description. Replace with real product details.",
    details: ["Demo detail one", "Demo detail two", "Demo detail three"],
  },
  {
    id: "sample-product-06",
    name: "Sample Product 06",
    categoryId: "seasonal",
    price: 999,
    availability: "in-stock",
    stock: 30,
    tone: "navy",
    featured: false,
    description: "Demo description. Replace with real product details.",
    details: ["Demo detail one", "Demo detail two", "Demo detail three"],
  },
];