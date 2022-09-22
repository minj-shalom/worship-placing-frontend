export type JSendStatus = 'error' | 'failed' | 'success' | 'fail';

interface JSendBasicResponseBody {
  status: JSendStatus;
}

export interface JSendSuccessResponse<T> extends JSendBasicResponseBody {
  status: 'success';
  data: T;
}

export interface JSendFailureResponse<T> extends JSendBasicResponseBody {
  status: 'failed';
  data: T;
  message: string;
}

export interface JSendResponse<T> {
  status: JSendStatus;
  message?: string;
  data?: T;
  code?: number;
}
