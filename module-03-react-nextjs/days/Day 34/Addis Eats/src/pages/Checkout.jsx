import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { validate } from "../utils/validate";
import Field from "../components/Field";

export default function Checkout() {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items) || [];
  const clearCart = useCartStore((state) => state.clearCart);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  const showError = (field) => touched[field] && errors[field];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleBlur(field) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    });

    if (hasErrors) {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementById(firstError)?.focus();
      }
      return;
    }

    if (submitting) return;
    setSubmitting(true);
    setServerError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (clearCart) clearCart();
      alert("Order placed successfully!");
      navigate("/", { replace: true });
    } catch (err) {
      setServerError("Failed to place order. Please try again.");
      const firstError = Object.keys(errors)[0] || "name";
      document.getElementById(firstError)?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem" }}>
      <h2>Addis Eats Checkout</h2>

      {serverError && (
        <div
          role="alert"
          style={{
            padding: "0.75rem",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "6px",
            marginBottom: "1rem",
          }}
        >
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Field
          id="name"
          name="name"
          label="Full Name"
          value={form.name}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          error={showError("name")}
          placeholder="e.g. Abebe Bikila"
        />

        <Field
          id="phone"
          name="phone"
          type="tel"
          label="TeleBirr Phone Number"
          value={form.phone}
          onChange={handleChange}
          onBlur={() => handleBlur("phone")}
          error={showError("phone")}
          placeholder="0911223344 or +251911223344"
        />

        <Field
          id="area"
          name="area"
          type="select"
          label="Delivery Area"
          value={form.area}
          onChange={handleChange}
          onBlur={() => handleBlur("area")}
          error={showError("area")}
        >
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Megenagna">Megenagna</option>
          <option value="Piassa">Piassa</option>
        </Field>

        <Field
          id="notes"
          name="notes"
          type="textarea"
          label="Delivery Notes (Optional)"
          value={form.notes}
          onChange={handleChange}
          onBlur={() => handleBlur("notes")}
          placeholder="e.g. Near Edna Mall, 2nd floor"
          rows={3}
        />

        <button
          type="submit"
          disabled={submitting || (Object.keys(touched).length > 0 && hasErrors)}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: submitting ? "#9ca3af" : "#d97706",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting
            ? "Sending your order..."
            : `Order ${totalAmount} ETB`}
        </button>
      </form>
    </div>
  );
}