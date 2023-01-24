import { getCustomRepository } from 'typeorm';
import { isUuid } from 'uuidv4';

import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    if (!id || !isUuid(id)) {
      throw new AppError('Invalid transaction id', 404);
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactionExists = await transactionsRepository.findOne(id);

    if (!transactionExists) {
      throw new AppError('Transaction not found', 404);
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
