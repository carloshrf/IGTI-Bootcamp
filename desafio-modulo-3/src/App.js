import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Installments from './components/Installments';

import css from './app.module.css';

export default function App() {
  const [initialValue, setInitialValue] = useState('');
  const [monthInstallment, setMonthInstallment] = useState(0);
  const [period, setPeriod] = useState(0);
  const [installments, setInstallments] = useState({});

  const setValue = (value) => {
    setInitialValue(value);
  }

  const setmonthInstallmentValue = (value) => {
    setMonthInstallment(value);
  }

  const setPeriodValue = (value) => {
    setPeriod(value);
  }

  const calculateInstallments = (initialValue, installment, period) => {
    const installments = [];

    var profit = 0;
    var totalProfit = 0;
    var previousValue = initialValue;
    var accumulated = initialValue;

    for (let id = 1; id <= period; id++) {
      
      profit = (profit + previousValue) * (installment / 100);
      accumulated = accumulated + profit;
      previousValue = accumulated - profit;
      totalProfit += profit;

      installments.push({
        id,
        accumulated: accumulated.toFixed(2),
        profit: totalProfit.toFixed(2),
        percentage: (((accumulated*100) / initialValue) - 100).toFixed(2),
      });
    }

    return installments;
  }

  useEffect(() => {
    const installment = calculateInstallments(initialValue, monthInstallment, period);

    setInstallments(installment);
  }, [initialValue, monthInstallment, period]);

  return (
    <div className={css.main}>
      <div style={{fontSize: '32px', textAlign: 'center', marginBottom: '20px'}}>React juros compostos</div>

      <Form 
        setValue={setValue} 
        setmonthInstallmentValue={setmonthInstallmentValue} 
        setPeriodValue={setPeriodValue} 
      />
      <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {
          !!initialValue &&
          !!monthInstallment &&
          <Installments installments={installments}/>
        }
      </div>
    </div>
  );
}
