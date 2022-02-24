export interface Student {
  id?: number;
  name: string;
  spec: string;
  group: number;
  year: number;
}

export interface Company {
  id?: number;
  name: string;
}

export interface StudentEvent {
  id?: number;
  date: string;
  text: string;
  companyId: number | null;
  studentId: number;

  company: Company | undefined;
  student: Student | undefined;
}

export interface Spec {
  name: string;
}
