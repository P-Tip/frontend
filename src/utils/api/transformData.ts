// src/utils/api/transformData.ts
import { Scholarship } from './api';

export const transformScholarshipData = (data: any[]): Scholarship[] => {
  return data.map((item) => ({
    id: item.id,
    date: "", 
    title: item.programName,
    subtitle: item.department_name,
    amount: `${item.minpoint} ~ ${item.maxpoint}`,
    maxPoint: item.maxpoint,
    logoSrc: "/placeholder.svg",
  }));
};