
export type StatusResponse = 'error' | 'success' | 'not-found'
export interface ResponseService<T> {
    data: T | T[],
    status: StatusResponse
}