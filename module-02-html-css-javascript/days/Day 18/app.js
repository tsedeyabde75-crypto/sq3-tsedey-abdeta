import { transactions } from "./transactions.js";
import { totalByType, generateReceipts, updateTransaction } from "./report.js";

console.log("=== TeleBirr Transaction Report ===");

const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");

console.log(`Total Credits: ${totalCredits} ETB`);
console.log(`Total Debits:  ${totalDebits} ETB`);

console.log("\n--- Transaction Receipts ---");
const receipts = generateReceipts(transactions);
receipts.forEach((receipt) => console.log(receipt));

console.log("\n--- Immutable Update Demonstration ---");
const updatedTransactions = updateTransaction(transactions, 1, { amount: 300 });

console.log("Original Txn #1 Amount:", transactions[0].amount, "ETB");
console.log("Updated Txn #1 Amount: ", updatedTransactions[0].amount, "ETB");