import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import {
  TBankTransaction,
  TCurrency,
  TStockTransaction,
  TTransaction,
  TTransactionPayload,
} from '../../types/transaction';
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import { Currency } from '../../ui/Currency';
import { assertNever } from '../../utils';

function isStockTransaction(transaction: TTransactionPayload): transaction is TStockTransaction {
  return transaction.type === 'BUY' || transaction.type === 'SELL';
}

const initialBankForm = (type: TBankTransaction['type']): TTransactionPayload => {
  return {
    type,
    currency: 'USD',
    date: new Date(),
    amount: 0,
  };
};

const initialStockForm = (type: TStockTransaction['type']): TTransactionPayload => {
  return {
    type,
    currency: 'USD',
    date: new Date(),
    symbol: '',
    amount: 0,
    price: 0,
  };
};

export type AddTransactionProps = {
  transaction: TTransaction | null;
  onSubmit: (transaction: TTransactionPayload) => void;
};

export function AddTransaction(props: AddTransactionProps) {
  const { transaction } = props;
  const types: Array<TTransaction['type']> = ['DEPOSIT', 'WITHDRAW', 'BUY', 'SELL'];
  const currencies: TCurrency[] = ['USD', 'EUR'];
  const [form, setForm] = useState<TTransactionPayload>(initialStockForm('BUY'));

  useEffect(() => {
    if (transaction) setForm(transaction);
  }, [transaction]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value as TTransaction['type'];

    switch (type) {
      case 'DEPOSIT':
      case 'WITHDRAW':
        setForm(initialBankForm(type));
        break;
      case 'BUY':
      case 'SELL':
        setForm(initialStockForm(type));
        break;
      default:
        assertNever(type);
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currency = e.target.value as TCurrency;
    setForm({ ...form, currency });
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    props.onSubmit(form);
  };

  return (
    <div>
      <Form className={cx(formStyle, 'shadow-sm')} onSubmit={handleSubmit}>
        <Row form className={css({ marginBottom: '1rem' })}>
          <Col>
            <CustomInput type="select" id="type" value={form.type} onChange={handleTypeChange}>
              {types.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </CustomInput>
          </Col>
        </Row>
        <Row form>
          <Col>
            <FormGroup>
              <CustomInput
                type="select"
                id="currency"
                value={form.currency}
                onChange={handleCurrencyChange}
              >
                {currencies.map((currency) => (
                  <option value={currency} key={currency}>
                    {currency}
                  </option>
                ))}
              </CustomInput>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                />
                {!isStockTransaction(form) ? (
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <Currency name={form.currency} />
                    </InputGroupText>
                  </InputGroupAddon>
                ) : null}
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        {isStockTransaction(form) ? (
          <Row form>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  id="symbol"
                  placeholder="Ticker (e.g. IBM)"
                  value={form.symbol}
                  onChange={(e) => setForm({ ...form, symbol: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <Currency name={form.currency} />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        ) : null}
        <Row>
          {isStockTransaction(form) ? (
            <Col>
              <div>
                Total: <Currency name={form.currency}>{form.amount * form.price}</Currency>
              </div>
            </Col>
          ) : null}
          <Col className="text-right pl-0">
            <Button type="submit">Add transaction</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

const formStyle = css({
  border: '1px solid #dee2e6',
  padding: '1rem',
  borderRadius: '0.25rem',
});
