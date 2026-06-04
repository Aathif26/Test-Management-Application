export type TestStatus = 'Active' | 'Draft' | 'Unpublished';

export interface TestItem {
  id: string;
  name: string;
  subject: string;
  status: TestStatus;
  createdDate: string;
}

export const mockTests: TestItem[] = [
  { id: '1', name: 'Midterm Exam - Mathematics', subject: 'Math', status: 'Active', createdDate: '2023-10-12' },
  { id: '2', name: 'Quiz 1 - Physics', subject: 'Physics', status: 'Active', createdDate: '2023-10-15' },
  { id: '3', name: 'Final Exam - History', subject: 'History', status: 'Draft', createdDate: '2023-10-20' },
  { id: '4', name: 'Weekly Test - English', subject: 'English', status: 'Unpublished', createdDate: '2023-10-22' },
  { id: '5', name: 'Pop Quiz - Chemistry', subject: 'Chemistry', status: 'Active', createdDate: '2023-10-25' },
  { id: '6', name: 'Midterm Exam - Biology', subject: 'Biology', status: 'Draft', createdDate: '2023-10-26' },
  { id: '7', name: 'Assignment 1 - Computer Science', subject: 'Computer Science', status: 'Active', createdDate: '2023-10-28' },
  { id: '8', name: 'End of Year Exam - Geography', subject: 'Geography', status: 'Unpublished', createdDate: '2023-11-01' },
  { id: '9', name: 'Quiz 2 - Physics', subject: 'Physics', status: 'Draft', createdDate: '2023-11-05' },
  { id: '10', name: 'Final Exam - Mathematics', subject: 'Math', status: 'Active', createdDate: '2023-11-10' },
];

export const stats = {
  total: 124,
  active: 82,
  draft: 25,
  unpublished: 17
};
