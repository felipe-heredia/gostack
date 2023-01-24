import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private getOutcome(): number {
    const transactionOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (acumulator, transaction) => (acumulator += transaction.value),
        0,
      );

    return transactionOutcome;
  }

  private getIncome(): number {
    const transactionIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (acumulator, transaction) => (acumulator += transaction.value),
        0,
      );

    return transactionIncome;
  }

  public all(): Transaction[] {
    const transaction = this.transactions;

    return transaction;
  }

  public getBalance(): Balance {
    const income = this.getIncome();
    const outcome = this.getOutcome();

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    const { total } = this.getBalance();

    if (transaction.type === 'outcome' && value > total) {
      throw Error('Ivalid Balance');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
