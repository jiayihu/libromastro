import { TTransaction, TTransactionPayload } from '../types/transaction';
import { db } from './db';

export function getTransactions() {
  return db
    .ref('transactions')
    .list()
    .then((refs) => {
      return refs.documents.map((doc) => {
        return ({
          ...doc,
          id: doc.__meta__.id,
        } as unknown) as TTransaction;
      });
    });
}

export function postTransaction(transaction: TTransactionPayload) {
  return db
    .ref('transactions')
    .add(transaction)
    .then((ref) => {
      if (ref) return ref.get();
    })
    .then((doc) => (doc ? (({ ...doc, id: doc.__meta__.id } as unknown) as TTransaction) : null));
}
