function createLoyalty(earnRule = etb => Math.floor(etb / 10)) {
  let points = 0;

  return {
    earn(etb) {
      points += earnRule(etb);
    },

    redeem(p) {
      points = Math.max(0, points - p);
    },

    balance() {
      return points;
    }
  };
}