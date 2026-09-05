const API = "https://open.er-api.com/v6/latest/ETB";

const state = {
  rates: {},
  watchlist: [],
  currency: "USD",
  amount: 100,
};

const form = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const currencySelect = document.querySelector("#currency");
const result = document.querySelector("#result");
const addWatchButton = document.querySelector("#add-watch");
const watchlist = document.querySelector("#watchlist");
const status = document.querySelector("#status");

const STORAGE_KEY = "birr-watch";

function save() {
  const data = {
    watchlist: state.watchlist,
    currency: state.currency,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function load() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return;
  }

  try {
    const data = JSON.parse(saved);
    state.watchlist = data.watchlist || [];
    state.currency = data.currency || "USD";
  } catch (error) {
    console.log("Could not load saved data.");
  }
}

async function loadRates() {
  try {
    status.textContent = "Loading rates...";

    const response = await fetch(API);

    if (!response.ok) {
      throw new Error("Failed to load rates");
    }

    const data = await response.json();
    state.rates = data.rates;
    status.textContent = "";

    renderOptions();
  } catch (error) {
    console.error(error);
    status.textContent = "Could not load rates.";
  }
}

function renderOptions() {
  const currencies = Object.keys(state.rates);

  const options = currencies.map(function (currency) {
    return `
      <option value="${currency}">
        ${currency}
      </option>
    `;
  });

  currencySelect.innerHTML = options.join("");

  if (state.rates[state.currency]) {
    currencySelect.value = state.currency;
  } else if (currencies.length > 0) {
    state.currency = currencies[0];
    currencySelect.value = currencies[0];
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!state.rates || Object.keys(state.rates).length === 0) {
    result.textContent = "Rates are still loading. Please wait.";
    return;
  }

  const amount = Number(amountInput.value);

  if (amount <= 0) {
    result.textContent = "Enter a valid amount.";
    return;
  }

  const currency = currencySelect.value;
  state.amount = amount;
  state.currency = currency;

  const rate = state.rates[currency];
  const converted = amount * rate;
  const formatted = converted.toFixed(3);

  result.textContent = `${amount} ETB = ${formatted} ${currency}`;

  save();
});

addWatchButton.addEventListener("click", function () {
  const currency = currencySelect.value;

  if (!currency || state.watchlist.includes(currency)) {
    return;
  }

  state.watchlist.push(currency);
  save();
  renderWatchlist();
});

function renderWatchlist() {
  if (!state.rates || Object.keys(state.rates).length === 0) {
    return;
  }

  const lists = state.watchlist
    .map(function (currency) {
      const rate = state.rates[currency];

      return `
        <li data-currency="${currency}">
          ${currency} - 1 ETB = ${rate} ${currency}
          <button class="remove" type="button">
            Remove
          </button>
        </li>
      `;
    })
    .join("");

  watchlist.innerHTML = lists;
}

watchlist.addEventListener("click", function (event) {
  if (!event.target.matches(".remove")) {
    return;
  }

  const item = event.target.closest("li");
  const currency = item.dataset.currency;

  state.watchlist = state.watchlist.filter(function (item) {
    return item !== currency;
  });

  save();
  renderWatchlist();
});

async function init() {
  load();
  await loadRates();
  renderWatchlist();
}

init();