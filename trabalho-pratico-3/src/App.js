import React, {Component} from 'react';
import ReadOnlyInput from './components/ReadOnlyInput/';
import GraphBar from './components/GraphBar/';
import { calculateIrrfDeduction, calculateInssDeduction } from './helpers/functions';
import CurrencyInput from 'react-currency-input';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      bruteSalary: 0,
      inssBase: 0,
      inssDeduction: 0,
      inssDeductionPercent: 0,
      irpfBase: 0,
      irpfDeduction: 0,
      irpfDeductionPercent: 0,
      netSalary: 0,
      netSalaryPercent: 0
    };
  }

  setAllStates = (
    bruteSalary,
    inssBase,
    inssDeduction,
    inssDeductionPercent,
    irpfBase,
    irpfDeduction,
    irpfDeductionPercent,
    netSalary,
    netSalaryPercent
  ) => {
    this.setState({
      bruteSalary,
      inssBase,
      inssDeduction,
      inssDeductionPercent,
      irpfBase,
      irpfDeduction,
      irpfDeductionPercent,
      netSalary,
      netSalaryPercent
    });
  }

  handleSalary = (e) => {
    const [_, salaryValue] = e.target.value.split(' ');
    const salary = Number(salaryValue.replace(/\./g,'').replace(',','.'));
    const { inssDeduction } = calculateInssDeduction(salary);
    const inssPercent = salary !== 0 ? this.calculatePercentage(salary, inssDeduction).toFixed(2) : '';
    const { irpfDeduction } = salary - inssDeduction <=1903.98 ? 
      { irpfDeduction: 0 } : 
      calculateIrrfDeduction((salary-inssDeduction));
    const irpfDeductionPercent = salary !== 0.00 ? this.calculatePercentage(salary, irpfDeduction).toFixed(2) : '';
    const netSalary = salary - inssDeduction - irpfDeduction;
    const netSalaryPercent = salary !== 0.00 ? this.calculatePercentage(salary, netSalary).toFixed(2) : '';
    
    this.setAllStates(
      salary,
      salary,
      inssDeduction,
      inssPercent,
      salary - inssDeduction,
      irpfDeduction,
      irpfDeductionPercent,
      netSalary,
      netSalaryPercent
    );
  };
  
  calculatePercentage = (base, variation) => {
    return (variation * 100)/base;
  }

  render() {
    const {
      bruteSalary,
      inssBase, 
      inssDeduction,
      inssDeductionPercent, 
      irpfBase, 
      irpfDeduction, 
      irpfDeductionPercent,
      netSalary,
      netSalaryPercent
    } = this.state;

    return (
      <>
        <div>
          <p style={{fontWeight: 'bold', fontSize: '30px', textAlign: 'center', marginBottom:'10px'}}>React Salário</p>
          <div className="brute-salary">

            <label>Saláro Bruto</label>
              <CurrencyInput 
                prefix='R$ ' 
                decimalSeparator=',' 
                thousandSeparator='.' 
                onChangeEvent={this.handleSalary}
                value={bruteSalary}
              />

          </div>  
        </div>

        <div className='deduction'>
          <ReadOnlyInput label='Base INSS:' value={inssBase} />
          <ReadOnlyInput label='Desconto INSS:' value={inssDeduction} suffix={!!inssDeductionPercent ? `(${inssDeductionPercent} %)` : '' } color='#e67e22'/>
          <ReadOnlyInput label='Base IRPF:' value={irpfBase} />
          <ReadOnlyInput label='Desconto IRPF:' value={irpfDeduction} suffix={!!irpfDeductionPercent ? `(${irpfDeductionPercent} %)` : '' } color='#c0392b' />
        </div>
        
        <div>
          <ReadOnlyInput label='Salário Liquido' value={netSalary} suffix={!!netSalaryPercent ? `(${netSalaryPercent} %)` : '' } color='#16a085'/>
        </div>

        <div style={{width: '100%', display: 'flex', marginTop: '50px'}}>
          <GraphBar percent={inssDeductionPercent} color={'#e67e22'} />
          <GraphBar percent={irpfDeductionPercent} color={'#c0392b'} />
          <GraphBar percent={netSalaryPercent} color={'#16a085'} />
        </div>'
      </>
    );
  };
}