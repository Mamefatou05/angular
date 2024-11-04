export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  status: number;
  error?: any;
  pagination?: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    pageSize: number;
  };
}
