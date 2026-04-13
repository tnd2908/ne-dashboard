export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  title: string;
  department: string;
  image: string;
}

export interface Project {
  id: string;
  name: string;
  image: string;
  duration: string;
  startDate: string;
  status: string;
  users: string[];
  description: string;
  category: string;
  progress: number;
}
