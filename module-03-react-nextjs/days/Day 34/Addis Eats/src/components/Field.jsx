import React from "react";

export default function Field({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  children,
  ...props
}) {
  const errorId = `${id}-error`;

  return (
    <div className="form-field" style={{ marginBottom: "1.25rem" }}>
      <label
        htmlFor={id}
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}
      >
        {label}
      </label>

      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc" }}
          {...props}
        >
          {children}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc" }}
          {...props}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc" }}
          {...props}
        />
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.25rem" }}
        >
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}