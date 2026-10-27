import { categories } from "../data/products.js";

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export function filterProducts(products, { q = "", categoryId = "all", inStockOnly = false }) {
  const term = q.trim().toLowerCase();

  return products.filter((p) => {
    if (categoryId !== "all" && p.categoryId !== categoryId) return false;
    if (inStockOnly && p.availability === "out-of-stock") return false;
    if (!term) return true;

    const categoryName = categories.find((c) => c.id === p.categoryId)?.name || "";
    const haystack = `${p.name} ${p.description} ${categoryName}`.toLowerCase();
    return haystack.includes(term);
  });
}

export function sortProducts(list, sort) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name-asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      // Featured first, otherwise keep the original order
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}