/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weightKg = Number(req.query.weight);
    const heightCm = Number(req.query.height);
    if(!weightKg || !heightCm || weightKg <0 || heightCm<0){
        res.send({
            error: "malformatted parameters"
        });
    }
    const calcresponse: string = calculateBmi(heightCm, weightKg);
    res.send({
        weight: weightKg,
        height: heightCm,
        bmi: calcresponse
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const arr = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const targt = req.body.target;
    if (!targt || !arr){
      return res.send({ error: "parameters missing" }).status(400);
    }
    if (!Array.isArray(arr) || isNaN(Number(targt))){
      return res.send({ error: "malformatted parameters" }).status(400);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const calcResp = calculateExercises(arr,targt);
    return res.json(calcResp);
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});