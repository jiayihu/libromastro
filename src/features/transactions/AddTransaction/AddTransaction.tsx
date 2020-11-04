import React, { useState } from 'react';
import { TCurrency, TTransaction, TTransactionPayload } from '../../../types/transaction';
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
import { Currency } from '../../../ui/Currency/Currency';
import { assertNever } from '../../../utils';

export type AddTransactionProps = {
  onSubmit: (transaction: TTransactionPayload) => void;
};

export function AddTransaction(props: AddTransactionProps) {
  const [type, setType] = useState<TTransaction['type']>('DEPOSIT');
  const types: Array<TTransaction['type']> = ['DEPOSIT', 'WITHDRAW', 'BUY', 'SELL'];

  const [currency, setCurrency] = useState<TTransaction['currency']>('EUR');
  const currencies: Array<TCurrency> = ['EUR', 'USD'];

  const [amount, setAmount] = useState(0);

  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(0);

  const isStockTrans = type === 'BUY' || type === 'SELL';

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    switch (type) {
      case 'DEPOSIT':
      case 'WITHDRAW':
        props.onSubmit({
          type,
          currency,
          date: new Date().toISOString(),
          amount,
        });
        break;
      case 'BUY':
      case 'SELL':
        props.onSubmit({
          type,
          currency,
          date: new Date().toISOString(),
          amount,
          symbol,
          price,
        });
        break;
      default:
        assertNever(type);
    }
  };

  return (
    <div>
      <Form className="border p-3 rounded shadow-sm" onSubmit={handleSubmit}>
        <Row form className="mb-3">
          <Col>
            <CustomInput
              type="select"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as TTransaction['type'])}
            >
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
                value={currency}
                onChange={(e) => setCurrency(e.target.value as TTransaction['currency'])}
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
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                {!isStockTrans ? (
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <Currency name={currency} />
                    </InputGroupText>
                  </InputGroupAddon>
                ) : null}
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        {isStockTrans ? (
          <Row form>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  id="symbol"
                  placeholder="Ticker (e.g. IBM)"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <Currency name={currency} />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        ) : null}
        <Row>
          {isStockTrans ? (
            <Col>
              <div>
                Total: <Currency name={currency}>{amount * price}</Currency>
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
