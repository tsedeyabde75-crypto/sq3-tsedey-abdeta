const searchForm = document.querySelector("#search-form");
const countryInput = document.querySelector("#country-input");
const factsOutput = document.querySelector("#facts");

function renderFact(parent, label, value) {
  const p = document.createElement("p");
  p.className = "fact-item";
  
  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;
  
  p.appendChild(strong);
  p.appendChild(document.createTextNode(value));
  parent.appendChild(p);
}

async function showCountry(name) {
  factsOutput.className = "facts-card loading";
  factsOutput.textContent = "Loading...";

  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");
    if (!res.ok) throw new Error("API server issue");
    
    const flagData = await res.json();
    const foundFlag = flagData.data.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );

    const infoRes = await fetch("https://countriesnow.space/api/v0.1/countries/capital", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: name })
    });
    
    if (!infoRes.ok) {
      throw new Error("Country not found. Please check the spelling.");
    }

    const capitalData = await infoRes.json();

    const popRes = await fetch("https://countriesnow.space/api/v0.1/countries/population", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: name })
    });
    const popData = await popRes.json();

    factsOutput.className = "facts-card";
    factsOutput.innerHTML = "";

    if (foundFlag && foundFlag.flag) {
      const img = document.createElement("img");
      img.src = foundFlag.flag;
      img.alt = `Flag of ${name}`;
      img.className = "flag";
      factsOutput.appendChild(img);
    }

    renderFact(factsOutput, "Name", capitalData.data.name || name);
    renderFact(factsOutput, "Capital", capitalData.data.capital || "N/A");

    let popValue = "N/A";
    if (popData?.data?.populationCounts?.length) {
      const lastEntry = popData.data.populationCounts.slice(-1)[0];
      popValue = lastEntry.value.toLocaleString();
    }
    renderFact(factsOutput, "Population", popValue);

    renderFact(factsOutput, "ISO Code", capitalData.data.iso2 || "N/A");

  } catch (err) {
    factsOutput.className = "facts-card error";
    factsOutput.textContent = err.message || "Could not load data. Please try again.";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = countryInput.value.trim();
  if (query) {
    showCountry(query);
  }
});

showCountry("ethiopia");