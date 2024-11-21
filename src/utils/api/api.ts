import axios from 'axios';

// 장학금 데이터 타입
export interface Scholarship {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  amount: string;
  logoSrc?: string;
  minPoint: number;
  maxPoint: number;
  departmentName?: string;
}

// 검색 파라미터 타입
interface SearchParams {
  name?: string;
  minPoint?: number;
  department?: string;
  consonant?: string;
}

// 학과 데이터 타입
export interface Department {
  departmentName: string;
  location: string;
  internalNum: string;
}

// 학식 메뉴 데이터 타입
export interface CafeteriaMenuItem {
  date: string;
  haksik_type: string;
  haksik_items: string | string[];
}

// 강의 데이터 타입
export interface CourseData {
  course_no: string;
  title: string;
  course_type: string;
  credit: number;
  pass: string;
  grade: number;
  course_time: string;
  classroom: string;
  major: string | null;
  professor: string;
}
export interface CourseSearchParams {
  title?: string;            // 과목명
  professor?: string;        // 교수명
  courseNo?: string;         // 과목 코드
  classroom?: string;        // 강의실
  major?: string;            // 전공
  grade?: number;            // 최소 학년
  credit?: number;          // 학점 
  courseTypes?: string;      // 강의 유형 (쉼표로 구분된 문자열)
  times?: string;            // 시간 (쉼표로 구분된 문자열)
}
// ----------------- API 호출 함수들 -----------------

// 장학금 데이터를 검색하는 함수
export const fetchScholarships = async (params: SearchParams = {}): Promise<Scholarship[]> => {
  try {
    let url = `/api/award`;
    const queryParts = [];

    if (params.name) {
      queryParts.push(`name=${encodeURIComponent(params.name)}`);
    }
    if (params.minPoint !== undefined) {
      queryParts.push(`point=${encodeURIComponent(params.minPoint.toString())}`);
    }
    if (params.department) {
      queryParts.push(`department=${encodeURIComponent(params.department)}`);
    }
    if (params.consonant) {
      queryParts.push(`consonant=${encodeURIComponent(params.consonant)}`);
    }

    if (queryParts.length > 0) {
      url = `/api/award/search?${queryParts.join('&')}`;
    }

    const response = await axios.get(url);
    return response.data as Scholarship[];
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    return [];
  }
};

// 학과 데이터를 가져오는 함수
export const fetchDepartments = async (consonant: string): Promise<Department[]> => {
  try {
    const url = `/api/award/filter?consonant=${encodeURIComponent(consonant)}`;
    const response = await axios.get(url);

    if (!Array.isArray(response.data)) {
      console.error("Unexpected API response format:", response.data);
      return [];
    }

    return response.data.map((item: any) => ({
      departmentName: item.departmentName || "Unnamed Department",
      location: item.location || "위치 정보 없음",
      internalNum: item.internalNum || "내부 번호 없음",
    }));
  } catch (error) {
    console.error("Error fetching departments by consonant:", error);
    return [];
  }
};

// 학식 메뉴 데이터를 가져오는 함수
export const fetchCafeteriaMenu = async (): Promise<CafeteriaMenuItem[]> => {
  try {
    const response = await axios.get('/api/haksik/upcoming');
    return response.data as CafeteriaMenuItem[];
  } catch (error) {
    console.error("Error fetching cafeteria menu:", error);
    return [];
  }
};

// 강의 데이터를 가져오는 함수
export const fetchCourseData = async (
  params: CourseSearchParams = {}
): Promise<CourseData[]> => {
  try {
    // 기본 URL 설정
    let url = "/api/course/search";
    const queryParts: string[] = [];
    // 파라미터에 따라 쿼리 추가
    if (params.title) {
      queryParts.push(`title=${params.title}`);
    }
    if (params.professor) {
      queryParts.push(`professor=${params.professor}`);
    }
    if (params.courseNo) {
      queryParts.push(`courseNo=${params.courseNo}`);
    }
    if (params.classroom) {
      queryParts.push(`classroom=${params.classroom}`);
    }
    if (params.major) {
      queryParts.push(`major=${params.major}`);
    }
    if (params.grade) {
      queryParts.push(`grade=${params.grade}`);
    }
    if (params.credit) {
      queryParts.push(`credits=${params.credit}`);
    }
    if (params.courseTypes) {
      queryParts.push(`courseTypes=${params.courseTypes}`);
    }
    if (params.times) {
      queryParts.push(`times=${params.times}`); 
    }

    // 쿼리 문자열 추가
    if (queryParts.length > 0) {
      url = `${url}?${queryParts.join("&")}`;
    }

    console.log("Generated URL:", url); // 디버깅용 로그

    // API 호출
    const response = await axios.get(url);
    return response.data as CourseData[];
  } catch (error) {
    console.error("Error fetching course data:", error);
    return [];
  }
};

export const fetchFilteredCourses = async (
  params: { [key: string]: string }
): Promise<CourseData[]> => {
  try {
     // 디버깅 로그 추가
     console.log("[fetchFilteredCourses] Received Parameters:", params);
    const response = await fetchCourseData(params); 
     // API 응답 로그 추가
     console.log("[fetchFilteredCourses] API Response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching filtered courses:", error);
    return [];
  }
};