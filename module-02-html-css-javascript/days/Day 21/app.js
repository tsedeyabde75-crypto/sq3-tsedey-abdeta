const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
const STORAGE_KEY = "signups";

const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorMsg = document.querySelector("#error-message");
const countDisplay = document.querySelector("#signup-count");

function loadSignups() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (err) {
    return [];
  }
}

function saveSignups(signups) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(signups));
}

function updateCountUI() {
  const signups = loadSignups();
  countDisplay.textContent = `Signups so far: ${signups.length}`;
}

function validate(name, phone) {
  if (name.length < 2) {
    return "Enter your full name.";
  }
  if (!PHONE_REGEX.test(phone)) {
    return "Enter a valid phone.";
  }
  return "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const error = validate(name, phone);

  if (error) {
    errorMsg.textContent = error;
    return;
  }

  errorMsg.textContent = "";

  const signups = loadSignups();
  signups.push({ name, phone });
  saveSignups(signups);

  form.reset();
  updateCountUI();
});

document.addEventListener("DOMContentLoaded", updateCountUI);