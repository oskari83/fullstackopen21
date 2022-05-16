import { NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseField = (data: unknown): string => {
    if (!data || !isString(data)) {
      throw new Error('Incorrect or data');
    }
    return data;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseField(name),
    dateOfBirth: parseField(dateOfBirth),
    ssn: parseField(ssn),
    gender: parseField(gender),
    occupation: parseField(occupation)
  };

  return newEntry;
};

export default toNewPatientEntry;