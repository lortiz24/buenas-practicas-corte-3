import { ResponseService } from "./statusResponse";

export interface HttpAdapter<T> {
    getAll(): Promise<ResponseService<T>>
}
