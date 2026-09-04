const defaultEarnRule = etb => Math.floor(etb / 10);

function createLoyalty(earnRule = defaultEarnRule) {
    let points = 0;

    return {
        earn(etb) {
            points += earnRule(etb);
        },

        redeem(amount) {
            points = Math.max(0, points - amount);
        },

        balance() {
            return points;
        }
    };
}

const card = createLoyalty();

card.earn(250);
card.redeem(10);

console.log("Card balance:", card.balance());

const holiday = createLoyalty(
    etb => Math.floor(etb / 10) * 2
);

holiday.earn(250);

console.log("Holiday balance:", holiday.balance());

holiday.redeem(1000);

console.log("After redeeming:", holiday.balance());

const secondCard = createLoyalty();

secondCard.earn(500);

console.log("Second card balance:", secondCard.balance());
console.log("First card balance:", card.balance());