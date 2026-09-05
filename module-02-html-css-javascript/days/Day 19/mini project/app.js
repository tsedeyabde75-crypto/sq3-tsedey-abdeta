const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#item-name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

function updateTotal() {
  const items = list.querySelectorAll("li");
  let total = 0;

  items.forEach((item) => {
    const price = Number(item.dataset.price);
    if (!isNaN(price)) {
      total += price;
    }
  });

  totalEl.textContent = total.toFixed(2);
}

function addRow(name, price) {
  const li = document.createElement("li");
  li.dataset.price = price;

  const textSpan = document.createElement("span");
  textSpan.className = "item-text";
  textSpan.textContent = `${name} - ${price} ETB`;

  const delBtn = document.createElement("button");
  delBtn.className = "del-btn";
  delBtn.textContent = "Delete";

  li.append(textSpan, delBtn);
  list.append(li);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);

  if (!name || isNaN(price) || price <= 0) return;

  addRow(name, price);
  form.reset();
  updateTotal();
});

list.addEventListener("click", (e) => {
  if (e.target.matches(".del-btn")) {
    e.target.closest("li").remove();
    updateTotal();
  } else {
    const row = e.target.closest("li");
    if (row) {
      row.classList.toggle("bought");
    }
  }
});