"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Check, Loader2, AlertCircle } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { PriceTag } from "@/components/ui/PriceTag";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

type PaymentMethod = "mpesa" | "tigo" | "airtel" | "cod";
type Step = "details" | "payment" | "confirm";

interface DeliveryForm {
  fullName: string;
  phone: string;
  altPhone: string;
  city: string;
  area: string;
  address: string;
  notes: string;
}

const cities = ["Arusha", "Moshi", "Dar es Salaam", "Mwanza", "Other"];

const paymentMethods: { id: PaymentMethod; label: string; desc: string; color: string }[] = [
  { id: "mpesa", label: "M-Pesa", desc: "Pay via M-Pesa. You will receive a push notification to confirm.", color: "#4CAF50" },
  { id: "tigo", label: "Tigo Pesa", desc: "Pay via Tigo Pesa — fast and secure.", color: "#0099CC" },
  { id: "airtel", label: "Airtel Money", desc: "Pay via Airtel Money.", color: "#E30613" },
  { id: "cod", label: "Cash on Delivery", desc: "Pay cash when you receive your order.", color: "#6B6B70" },
];

const DELIVERY_FEE: Record<string, number> = {
  Arusha: 3000,
  Moshi: 5000,
  "Dar es Salaam": 8000,
  Mwanza: 8000,
  Other: 10000,
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState<DeliveryForm>({
    fullName: "", phone: "", altPhone: "",
    city: "Arusha", area: "", address: "", notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  const total = subtotal();
  const deliveryFee = DELIVERY_FEE[form.city] ?? 8000;
  const grandTotal = total + deliveryFee;

  function validateDetails(): boolean {
    if (!form.fullName.trim()) { setError("Please enter your full name."); return false; }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number (at least 10 digits)."); return false;
    }
    if (!form.area.trim()) { setError("Please enter your delivery area/neighbourhood."); return false; }
    if (!form.address.trim()) { setError("Please enter your delivery address."); return false; }
    setError("");
    return true;
  }

  async function handlePayment() {
    setProcessing(true);
    setError("");
    try {
      // -- STUB: Replace with real PesaPal / Selcom API call ----------------
      // PesaPal flow:
      //   1. POST /api/checkout/initiate  { items, form, paymentMethod, total: grandTotal }
      //   2. Backend calls PesaPal SubmitOrderRequest, gets redirect URL
      //   3. Redirect user to PesaPal hosted payment page
      //   4. PesaPal IPN callback hits /api/pesapal/ipn, verifies & updates order
      //
      // Selcom / M-Pesa push flow:
      //   1. POST /api/checkout/mpesa-push with { phone, amount, reference }
      //   2. Customer gets push on phone, enters PIN
      //   3. IPN confirms payment, order status updated
      // -----------------------------------------------------------------------
      await new Promise((r) => setTimeout(r, 2500));
      const fakeOrderId = `PP-${Date.now().toString(36).toUpperCase()}`;
      setOrderId(fakeOrderId);
      clearCart();
      setStep("confirm");
    } catch {
      setError("Payment failed. Please try again or contact us on WhatsApp.");
    } finally {
      setProcessing(false);
    }
  }

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="font-display font-bold text-xl text-brand-black mb-4">Your cart is empty</p>
        <Link href="/shop" className="text-brand-orange font-display font-semibold hover:text-brand-deep">
          &larr; Back to shop
        </Link>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="font-display font-black text-brand-black text-3xl mb-2">
          Order confirmed! Asante.
        </h1>
        <p className="text-brand-gray font-body mb-2">Your order number:</p>
        <p className="font-display font-black text-brand-orange text-2xl mb-6">{orderId}</p>
        <p className="text-brand-black/70 font-body text-sm leading-relaxed mb-8">
          You&apos;ll receive a WhatsApp message and SMS to {form.phone} confirming your order.
          Delivery to {form.city} within {form.city === "Arusha" ? "4 hours" : "2-3 days"}.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/255719363738?text=Hi! My order number is ${orderId}. I would like to track it.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-display font-bold px-6 py-3"
          >
            Track via WhatsApp
          </a>
          <Link href="/shop" className="inline-flex items-center justify-center border-2 border-brand-orange text-brand-orange font-display font-semibold px-6 py-3 hover:bg-brand-orange hover:text-white transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 text-sm font-body mb-10">
        {(["details", "payment"] as Step[]).map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="w-4 h-4 text-brand-gray" />}
            <span className={cn(
              "font-display font-semibold",
              step === s ? "text-brand-orange" : i < ["details", "payment"].indexOf(step) ? "text-brand-black" : "text-brand-gray"
            )}>
              {i + 1}. {s === "details" ? "Delivery Details" : "Payment"}
            </span>
          </span>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === "details" && (
            <div className="bg-white border border-black/8 p-6">
              <h2 className="font-display font-bold text-xl text-brand-black mb-6">
                Delivery Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Full Name *" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} placeholder="Your full name" />
                <FormField label="Phone Number *" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+255 7XX XXX XXX" />
                <FormField label="Alternative Phone (Optional)" type="tel" value={form.altPhone} onChange={(v) => setForm({ ...form, altPhone: v })} placeholder="+255 7XX XXX XXX" />
                <div>
                  <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">City *</label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black focus:outline-none focus:border-brand-orange"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>{c} — Delivery TSh {formatPrice(DELIVERY_FEE[c] ?? 10000)}</option>
                    ))}
                  </select>
                </div>
                <FormField label="Area / Neighbourhood *" value={form.area} onChange={(v) => setForm({ ...form, area: v })} placeholder="e.g. Njiro, Kijenge, Sinoni..." />
                <FormField label="Detailed Address *" value={form.address} onChange={(v) => setForm({ ...form, address: v })} placeholder="Landmarks or directions (near...)" />
                <div className="sm:col-span-2">
                  <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">Additional Notes (Optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Special delivery instructions..."
                    rows={3}
                    className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black focus:outline-none focus:border-brand-orange resize-none"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 mt-4 text-red-600 text-sm font-body bg-red-50 p-3 border-l-4 border-red-500">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <button
                onClick={() => { if (validateDetails()) setStep("payment"); }}
                className="mt-6 w-full bg-brand-orange text-white font-display font-bold text-base py-4 rounded hover:bg-brand-deep transition-colors flex items-center justify-center gap-2"
              >
                Continue to Payment <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-white border border-black/8 p-6">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setStep("details")} className="text-brand-gray hover:text-brand-black transition-colors text-sm font-body">
                  &larr; Back
                </button>
                <h2 className="font-display font-bold text-xl text-brand-black">Choose Payment Method</h2>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {paymentMethods.map((pm) => (
                  <label
                    key={pm.id}
                    className={cn(
                      "flex items-start gap-4 p-4 border-2 cursor-pointer transition-colors",
                      paymentMethod === pm.id ? "border-brand-orange bg-brand-orange/3" : "border-black/10 hover:border-brand-orange/50"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={pm.id}
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id)}
                      className="mt-1 accent-brand-orange"
                    />
                    <div>
                      <p className="font-display font-bold text-sm" style={{ color: pm.color }}>{pm.label}</p>
                      <p className="text-brand-gray text-xs font-body mt-0.5">{pm.desc}</p>
                      {paymentMethod === pm.id && pm.id !== "cod" && (
                        <p className="text-brand-black/70 text-xs font-body mt-2 bg-brand-warm px-3 py-2">
                          We will send a push to {form.phone} for TSh {formatPrice(grandTotal)}. Enter your PIN to confirm.
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {error && (
                <div className="flex items-start gap-2 mb-4 text-red-600 text-sm font-body bg-red-50 p-3 border-l-4 border-red-500">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-brand-orange text-white font-display font-bold text-base py-4 rounded hover:bg-brand-deep transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing payment...</>
                ) : (
                  <>Pay Now — TSh {formatPrice(grandTotal)} &rarr;</>
                )}
              </button>
              <p className="text-xs text-brand-gray font-body text-center mt-3">
                Secure payment via PesaPal / Selcom.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-black/8 p-5 sticky top-24">
            <h3 className="font-display font-bold text-brand-black mb-4 pb-4 border-b border-black/8">Summary</h3>
            <ul className="flex flex-col gap-3 mb-4">
              {items.map((item) => (
                <li key={`${item.product.id}__${item.selectedVariant ?? ""}`} className="flex gap-3">
                  <div className="w-10 h-10 bg-[#F5F5F3] flex-shrink-0 flex items-center justify-center text-lg">
                    {item.product.image || "📦"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-display font-semibold text-brand-black leading-snug line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-brand-gray font-body">&times;{item.quantity}</p>
                  </div>
                  <PriceTag price={item.product.price * item.quantity} size="sm" className="flex-shrink-0" />
                </li>
              ))}
            </ul>
            <div className="border-t border-black/8 pt-4 flex flex-col gap-2 text-sm font-body">
              <div className="flex justify-between">
                <span className="text-brand-gray">Items</span>
                <span>TSh {formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-gray">Delivery ({form.city})</span>
                <span>TSh {formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-black/8">
                <span className="text-brand-black font-display">Total</span>
                <PriceTag price={grandTotal} size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black placeholder:text-brand-gray focus:outline-none focus:border-brand-orange"
      />
    </div>
  );
}
