import { Info } from "lucide-react";
import { orderDemoNotice } from "../utils/order.js";

export default function DemoNotice() {
  return (
    <p className="demo-notice" role="note">
      <Info size={18} aria-hidden="true" />
      <span>{orderDemoNotice}</span>
    </p>
  );
}