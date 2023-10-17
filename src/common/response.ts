export interface ResponseApiCommon<T> {
  success: boolean;
  message: string;
  data: T
}

export function responseApiCommon<T>(success: boolean = false, message: string = '', data?: T): ResponseApiCommon<T> {
  return {
    success,
    message,
    data,
  };
}