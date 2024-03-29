export interface IResponse<T> {
    status: boolean;
    msg: string;
    data: T[];
}
