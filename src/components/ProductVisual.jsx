import { Gift, Package, Sparkles } from "lucide-react";

const icons = {
  essentials: Package,
  gifting: Gift,
  seasonal: Sparkles,
};

// Branded placeholder tile. Replace with real product photography later.
export default function ProductVisual({ tone = "navy", categoryId, ratio }) {
  const Icon = icons[categoryId] || Package;

  return (
    <div
      className={`pv pv-${tone}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      role="img"
      aria-label="Demo product image placeholder"
    >
      <Icon size={44} strokeWidth={1.4} aria-hidden="true" />
      <span className="pv-tag">Demo image</span>
    </div>
  );
}