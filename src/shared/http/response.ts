export function successResponse<T>(data: T, message: string, alerts: string[] = []) {
  return {
    data,
    alerts,
    message,
  };
}
