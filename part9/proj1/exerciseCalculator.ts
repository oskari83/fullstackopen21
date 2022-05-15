interface Info {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Dataparsed {
    dt: Array<number>;
    target: number;
}

const parseArguments2 = (args: Array<string>): Dataparsed => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 100) throw new Error('Too many arguments (100 maximum)');
    let targ = 0;
    if (!isNaN(Number(args[2]))) {
        targ = Number(args[2]);
    } else {
        throw new Error('Provided values were not numbers!');
    }

    const trainingVals: Array<number> = [];
    for (let i=3; i<args.length; i++){
        if(!isNaN(Number(args[i]))){
            trainingVals.push(Number(args[i]));
        }else{
            throw new Error('Provided values were not numbers!');
        }
    }
    return {
        dt: trainingVals,
        target: targ
    };
};

export const calculateExercises = (data: Array<number>, target: number): Info => {
    const days: number = data.length;
    let trainingD = 0;
    let sum = 0;
    data.forEach(function (item) {
        if(item>0){
            trainingD += 1;
        }
        sum += Number(item);
    });
    const averageTime: number = sum / days;
    let rating: number;
    let ratingDesc: string;
    let succ = false;
    if(averageTime>target){
        rating = 3;
        ratingDesc = "great you've reached your target!";
        succ = true;
    }else if(averageTime > (target/2)){
        rating = 2;
        ratingDesc = 'not too bad but could be better';
    }else{
        rating = 1;
        ratingDesc = 'you must do better next week';
    }
    return {
        periodLength: days,
        trainingDays: trainingD,
        success: succ,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: averageTime
    };
};

try {
    const { dt, target } = parseArguments2(process.argv);
    console.log(calculateExercises(dt, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}