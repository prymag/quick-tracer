import request from "../helpers/axios";

const path = '/people';

export interface IPeople {
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
        data: IPeople[]
    }
}

export const getAll = (): Promise<IAllResponse> => {
    return request.get(`${path}`);
}

export const getItem = (id: number) => {
    request.get(`${path}/${id}`);
}

export const updateItem = (id: number, body: IPeople) => {
    request.patch(`${path}/${id}`)
}

export const deleteItem = (id: number) => {
    request.delete(`${path}/${id}`);
}



