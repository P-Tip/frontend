// src/utils/api.ts
import axios from 'axios';

// Scholarship 데이터 타입
export interface Scholarship {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  amount: string;
  logoSrc?: string;
  maxPoint: number;
}

interface SearchParams {
  name?: string;
  minPoint?: number;
  department?: string;
  consonant?: string;
}

// 장학금 데이터를 가져오는 API 호출 함수
export const fetchScholarships = async (params: SearchParams = {}): Promise<Scholarship[]> => {
  try {
    let url = `/api/award`;
    const queryParts = [];

    // name이 있으면 쿼리에 추가
    if (params.name) {
      queryParts.push(`name=${encodeURIComponent(params.name)}`);
    }

    // minPoint가 있으면 문자열로 변환하여 point 쿼리에 추가
    if (params.minPoint !== undefined) {
      queryParts.push(`point=${encodeURIComponent(params.minPoint.toString())}`);
    }

    // department가 있으면 쿼리에 추가
    if (params.department) {
      queryParts.push(`department=${encodeURIComponent(params.department)}`);
    }

    // consonant가 있으면 쿼리에 추가
    if (params.consonant) {
      queryParts.push(`consonant=${encodeURIComponent(params.consonant)}`);
    }

    // 쿼리 파라미터가 있을 때만 URL 수정
    if (queryParts.length > 0) {
      url = `/api/award/filter?${queryParts.join('&')}`;
    }

    const response = await axios.get(url);
    return response.data as Scholarship[];
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    return [];
  }
};

// 학식 메뉴 데이터 타입
export interface CafeteriaMenuItem {
  date: string;
  haksik_type: string;
  haksik_items: string | string[];
}

// 학식 메뉴 데이터를 가져오는 API 호출 함수
export const fetchCafeteriaMenu = async (): Promise<CafeteriaMenuItem[]> => {
  try {
    const response = await axios.get('/api/haksik/upcoming'); // 프록시 설정으로 로컬 경로 호출
    return response.data as CafeteriaMenuItem[]; // 학식 데이터 반환
  } catch (error) {
    console.error("Error fetching cafeteria menu:", error);
    return [];
  }
};