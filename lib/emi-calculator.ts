export type EmiPaymentBreakdown = {
  loanAmount: number;
  monthlyEmi: number;
  numberOfPayments: number;
  monthlyBreakdown: {
    principal: number;
    interest: number;
    totalPayment: number;
  };
  yearlyBreakdown: {
    principal: number;
    interest: number;
    totalPayment: number;
  };
};

type EmiInput = {
  annualInterestRate: number;
  downPayment: number;
  loanTermYears: number;
  propertyPrice: number;
};

export function calculateEmiPaymentBreakdown({
  annualInterestRate,
  downPayment,
  loanTermYears,
  propertyPrice,
}: EmiInput): EmiPaymentBreakdown {
  const loanAmount = Math.max(propertyPrice - downPayment, 0);
  const numberOfPayments = Math.max(Math.round(loanTermYears * 12), 1);
  const monthlyRate = Math.max(annualInterestRate, 0) / 100 / 12;
  const monthlyEmi =
    loanAmount === 0
      ? 0
      : monthlyRate === 0
        ? loanAmount / numberOfPayments
        : (loanAmount * monthlyRate * (1 + monthlyRate) ** numberOfPayments) /
          ((1 + monthlyRate) ** numberOfPayments - 1);
  const totalPayment = monthlyEmi * numberOfPayments;
  const totalInterest = Math.max(totalPayment - loanAmount, 0);
  const yearOnePayments = Math.min(12, numberOfPayments);
  const yearOneTotal = monthlyEmi * yearOnePayments;
  let yearOneBalance = loanAmount;
  let yearOneInterest = 0;
  for (let index = 0; index < yearOnePayments; index += 1) {
    const interest = yearOneBalance * monthlyRate;
    yearOneInterest += interest;
    yearOneBalance = Math.max(yearOneBalance - (monthlyEmi - interest), 0);
  }
  const yearOnePrincipal = Math.min(loanAmount, loanAmount - yearOneBalance);

  return {
    loanAmount,
    monthlyEmi,
    numberOfPayments,
    monthlyBreakdown: {
      principal: loanAmount,
      interest: totalInterest,
      totalPayment,
    },
    yearlyBreakdown: {
      principal: yearOnePrincipal,
      interest: Math.max(yearOneTotal - yearOnePrincipal, 0),
      totalPayment: yearOneTotal,
    },
  };
}
