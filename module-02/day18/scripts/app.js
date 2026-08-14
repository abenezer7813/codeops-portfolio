const transactions = [
  { id: 1, customer: "Almaz", amount: 250, type: "debit" },
  { id: 2, customer: "Dawit", amount: 600, type: "credit" },
  { id: 3, customer: "Tigist", amount: 180, type: "debit" }
];

function totalByType(txns, type) {
  return txns
    .filter(t => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0);
}

function formatReceipts(txns) {
  return txns.map(({ customer, amount }) =>
    `${customer}: ${amount} ETB`
  );
}

function updateTransaction(txn, newAmount) {
  return {
    ...txn,
    amount: newAmount
  };
}

console.log(`Debits: ${totalByType(transactions, "debit")} ETB`);
console.log(`Credits: ${totalByType(transactions, "credit")} ETB`);

console.log(formatReceipts(transactions));

const updatedTransaction = updateTransaction(transactions[0], 300);

console.log(updatedTransaction);