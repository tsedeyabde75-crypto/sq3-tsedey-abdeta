const standardRule = (etb) => Math.floor(etb / 10);
const doublePointsRule = (etb) => Math.floor(etb / 10) * 2;

function createLoyalty(earnRule = standardRule) {
  let points = 0;

  return {
    earn(etb) {
      if (typeof etb !== 'number' || etb < 0) return;
      points += earnRule(etb);
    },

    redeem(amount) {
      if (typeof amount !== 'number' || amount <= 0 || amount > points) {
        return false;
      }
      points -= amount;
      return true;
    },

    balance() {
      return points;
    }
  };
}

const standardCard = createLoyalty();
standardCard.earn(250);
standardCard.redeem(10);
console.log(standardCard.balance());

const holidayCard = createLoyalty(doublePointsRule);
holidayCard.earn(250);
console.log(holidayCard.balance());