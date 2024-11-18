// src/utils/api/transformData.ts
import { Scholarship } from './api';

export const transformScholarshipData = (data: any[]): Scholarship[] => {
  return data.map((item) => ({
    id: item.id,
    date: "", 
    title: item.programName,
    subtitle: item.department_name,
    amount: `${item.min_point} ~ ${item.max_point}`,
    minPoint:item.min_Point,
    maxPoint: item.max_point,
    logoSrc: "/placeholder.svg",
  }));
};