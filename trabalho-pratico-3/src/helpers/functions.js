export const calculateIrrfDeduction = (salary) => {
  console.log('salario: ', salary)
  if (salary >= 1903.99 && salary <= 2826.65) {
    return { irpfDeduction: Number(((salary * 0.075) - 142.80).toFixed(2)) };
  }

  if (salary >= 2826.66 && salary <= 3751.05) {
    return { irpfDeduction: Number(((salary * 0.15) - 354.80).toFixed(2)) };
  }

  if (salary >= 3751.06 && salary <= 4664.68) {
    return { irpfDeduction: Number(((salary * 0.225) - 636.13).toFixed(2)) };
  }

  if (salary >= 4664.69) {
    return { irpfDeduction: Number(((salary * 0.275) - 869.36).toFixed(2)) };
  }
};

export const calculateInssDeduction = (salary) => {
  var value = salary < 1045 ? 
    Number((salary * 0.075).toFixed(2)) 
    : Number((1045 * 0.075).toFixed(2));
  
    if (salary <= 1045) {
    return { inssDeduction: Number(value) }
  }
  
  if (salary > 2089.60) {
    value += inssDeductionFunction(2089.60, 1045, 0.09);
  } else {
    value += inssDeductionFunction(salary, 1045, 0.09);
    
    return { inssDeduction: Number(value.toFixed(2)) };
  }

  if (salary > 3134.40) {
    value += inssDeductionFunction(3134.40, 2089.60, 0.12);
  } else {
    value += inssDeductionFunction(salary, 2089.60, 0.12);
    
    return { inssDeduction: Number(value.toFixed(2)) };
  }

  if (salary > 6101.06) {

    return { inssDeduction: 713.10 };
  } else {
    value += inssDeductionFunction(salary, 3134.40, 0.14);
    
    return { inssDeduction: Number(value.toFixed(2)) };      
  }
};

const inssDeductionFunction = (value, base, percent) => {
  return Number(((value - base) * percent).toFixed(2));
}
