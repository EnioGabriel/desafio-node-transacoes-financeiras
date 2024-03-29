import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransictionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  // inicializando o array vazio
  constructor() {
    this.transactions = [];
  }

  // Listar transações
  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;

          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransictionDTO): Transaction {
    const transactions = new Transaction({ title, type, value });

    this.transactions.push(transactions);

    return transactions;
  }
}

export default TransactionsRepository;
