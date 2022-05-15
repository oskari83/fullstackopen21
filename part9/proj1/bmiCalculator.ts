interface BmiValues {
    heigthCm: number;
    weightKg: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
      return {
        heigthCm: Number(args[0]),
        weightKg: Number(args[1])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / ((height/100)**2);
    if(bmi<18.5){
        return 'Underweight (unhealthy weight)';
    }else if(bmi>=18.5 && bmi<25){
        return 'Normal (healthy weight)';
    }else if(bmi>=25 && bmi<30){
        return 'Overweight (unhealthy weight)';
    }else if(bmi>=30 && bmi<35){
        return 'Obese (very unhealthy weight)';
    }else{
        return 'Extremely obese (highly unhealthy weight)';
    }
};

try {
    const { heigthCm, weightKg } = parseArguments(process.argv);
    console.log(calculateBmi(heigthCm, weightKg));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

export { calculateBmi };