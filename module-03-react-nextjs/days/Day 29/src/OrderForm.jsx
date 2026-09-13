import { useState } from "react";

export default function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  const isValidPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Order submitted for ${form.name} in ${form.area}!`);
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>Delivery Details</h3>
      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
        />
      </div>

      <div>
        <label>Phone (TeleBirr): </label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="0911223344 or +251911223344"
        />
        {form.phone && !isValidPhone && (
          <p className="err">Use 09... or +2519...</p>
        )}
      </div>

      <div>
        <label>Area: </label>
        <select name="area" value={form.area} onChange={handleChange}>
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Piassa">Piassa</option>
        </select>
      </div>

      <button type="submit" disabled={!isValidPhone || !form.name}>
        Pay with TeleBirr
      </button>
    </form>
  );
}