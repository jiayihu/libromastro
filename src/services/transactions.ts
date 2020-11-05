import { Document } from 'firebase-firestore-lite';
import { TTransaction, TTransactionPayload } from '../types/transaction';
import { db } from './db';

const docToTrans = (doc: Document): TTransaction => {
  return ({
    ...doc,
    id: doc.__meta__.id,
    date: new Date(doc.date),
  } as unknown) as TTransaction;
};

export function getTransactions() {
  return db
    .ref('transactions')
    .list({ pageSize: 1000 })
    .then((refs) => {
      return refs.documents.map(docToTrans).sort((t1, t2) => (t1.date > t2.date ? -1 : 1));
    });
}

export function postTransaction(transaction: TTransactionPayload) {
  return db
    .ref('transactions')
    .add({
      ...transaction,
      date: transaction.date.toISOString(),
    })
    .then((ref) => {
      if (ref) return ref.get();
    })
    .then((doc) => (doc ? docToTrans(doc) : null));
}
