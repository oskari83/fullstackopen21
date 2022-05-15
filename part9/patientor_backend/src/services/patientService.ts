import patientData from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry } from '../types';

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

const addPatient = () => {
  return null;
};

export default {
  getNonSensitiveEntries,
  getEntries,
  addPatient
};