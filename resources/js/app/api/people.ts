import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import request, { getConfig, getCancelSource, cancel } from "../helpers/axios";

const path = '/people';

export interface IPerson {
    id: number,
    firstname: string,
    lastname: string,
    middlename: string,
    email: string,
    birthdate: string,
    gender: number
}

export interface IAllResponse {
    data: {
        data: IPerson[]
    }
}

export const getAll = (source: CancelTokenSource): Promise<IAllResponse> => request.get(`${path}`, getConfig(source.token));
export const getItem = (id: number) => request.get(`${path}/${id}`);
export const updateItem = (id: number, body: IPerson) => request.patch(`${path}/${id}`)
export const deleteItem = (id: number) => request.delete(`${path}/${id}`);
export { getCancelSource, cancel }