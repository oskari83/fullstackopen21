import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patientData.find(d => d.id === id);
  return entry;
};

const addPatient = ( entry: NewPatientEntry): PatientEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const nwId: string = uuid();
    const newPatientEntry = {
      id: nwId,
      ...entry
    };

    patientData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  getEntries,
  addPatient,
  findById
};