import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import request, { getConfig, getCancelSource, cancel } from "../helpers/axios";

const path = '/people';

export interface IPerson {
    id?: number,
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

export interface IItemResponse {
    data: {
        data: IPerson
    }
}

export const getAll = (source: CancelTokenSource): Promise<IAllResponse> => request.get(`${path}`, getConfig(source.token));
export const getItem = (id: number, source: CancelTokenSource): Promise<IItemResponse> => request.get(`${path}/${id}`, getConfig(source.token));
export const addItem = (body: IPerson, source: CancelTokenSource): Promise<IItemResponse> => request.post(`${path}`, body, getConfig(source.token));
export const updateItem = (id: number, body: IPerson, source: CancelTokenSource) => request.patch(`${path}/${id}`, body, getConfig(source.token))
export const deleteItem = (id: number) => request.delete(`${path}/${id}`);
export { getCancelSource, cancel }