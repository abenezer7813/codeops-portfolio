const card = createLoyalty();

card.earn(250);
card.redeem(10);

console.log(card.balance());

const holiday = createLoyalty(etb => Math.floor(etb / 10) * 2);

holiday.earn(250);

console.log(holiday.balance());