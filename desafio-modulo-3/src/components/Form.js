import React from 'react';
import css from './form.module.css';

export default function Form({ setValue, setmonthInstallmentValue, setPeriodValue }) {
  const handleValueChange = (event) => {
    setValue(Number(event.target.value));
  }

  const handleInstallmentChange = (event) => {
    setmonthInstallmentValue(Number(event.target.value));
  }

  const handlePeriodChange = (event) => {
    setPeriodValue(Number(event.target.value));
  }

  return (
    <div className={css.form}>
      <div className={css.input}>
        <label>Montante inicial:</label>
        <input type="text" onChange={handleValueChange}/>
      </div>
      <div className={css.input}>
        <label>Taxa de juros mensal:</label>
        <input type="text" onChange={handleInstallmentChange} />
      </div>
      <div className={css.input}>
        <label>Período (meses):</label>
        <input type="text" onChange={handlePeriodChange} />
      </div>
    </div>
  );
}
