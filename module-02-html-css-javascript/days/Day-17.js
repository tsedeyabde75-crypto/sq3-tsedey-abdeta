function vat(amount, rate = 0.15) {
  return amount * rate;
}

const vatArrow = (amount, rate = 0.15) => amount * rate;

function makeCounter() {
  let count = 0;
  return () => ++count;
}

function discountBy(rate) {
  return (price) => price * (1 - rate);
}

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

console.log("Exercise 3 - Member Price (1000 ETB):", memberPrice(1000));
console.log("Exercise 3 - Sale Price (1000 ETB):", salePrice(1000));

function applyToAll(list, fn) {
  const result = [];
  for (const item of list) {
    result.push(fn(item));
  }
  return result;
}

const prices = [100, 250, 500];
const pricesWithVat = applyToAll(prices, (p) => p * 1.15);
console.log("Exercise 4 - Prices with VAT:", pricesWithVat);

const cities = ["Addis Ababa", "Hawassa", "Bahir Dar"];
console.log("Exercise 5 - Cities:");
cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});

console.log("\n==========================================");
console.log("Mini-Project: Loyalty Points Module");
console.log("==========================================\n");

function createLoyalty(earnRule = (etb) => Math.floor(etb / 10)) {
  let points = 0;

  return {
    earn(etb) {
      if (etb > 0) {
        points += earnRule(etb);
      }
    },
    redeem(amount) {
      if (amount > 0 && points >= amount) {
        points -= amount;
        return true;
      }
      return false;
    },
    balance() {
      return points;
    }
  };
}

const card1 = createLoyalty();
card1.earn(250);
console.log(`Card 1 Balance after earning 250 ETB: ${card1.balance()}`);

card1.redeem(10);
console.log(`Card 1 Balance after redeeming 10 points: ${card1.balance()}`);

const failedRedeem = card1.redeem(100);
console.log(`Redemption successful for 100 points? ${failedRedeem}`);
console.log(`Card 1 Balance remains safe: ${card1.balance()}`);

const doublePointsRule = (etb) => Math.floor(etb / 10) * 2;
const card2 = createLoyalty(doublePointsRule);

card2.earn(250);
console.log(`Card 2 Balance (Holiday Double Points, 250 ETB): ${card2.balance()}`);

console.log(`Card 1 Balance remains independent: ${card1.balance()}`);