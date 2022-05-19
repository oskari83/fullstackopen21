import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseField = (data: unknown): string => {
    if (!data || !isString(data)) {
      throw new Error('Incorrect or missing data');
    }
    return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gendr: unknown): string => {
  if (!gendr || !isString(gendr) || !isGender(gendr)) {
    throw new Error('Incorrect or missing gender');
  }
  return gendr;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseField(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseField(ssn),
    gender: parseGender(gender),
    occupation: parseField(occupation),
    entries: []
  };

  return newEntry;
};

export default toNewPatientEntry;