export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "We need a name for the delivery";
  }

  const phoneCleaned = form.phone.replace(/\s+/g, "");
  if (!/^(?:\+251|0)9\d{8}$/.test(phoneCleaned)) {
    errors.phone = "Use 09... or +2519... (TeleBirr number)";
  }

  if (!form.area) {
    errors.area = "Please select a delivery area";
  }

  return errors;
}