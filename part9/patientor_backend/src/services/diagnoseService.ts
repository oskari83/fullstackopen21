import diagnoseData from '../../data/diagnoses';
import { DiagnosisEntry } from '../types';

const getEntries = (): Array<DiagnosisEntry> => {
  return diagnoseData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};