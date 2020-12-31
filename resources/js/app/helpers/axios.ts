import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

export default axios.create({
    baseURL: '/api',
});

export const getConfig = (token: any) => {
    const config: AxiosRequestConfig = {
        cancelToken: token
    }
    return config;
}

export const getCancelSource = () => {
    const cancelToken = axios.CancelToken;
    return cancelToken.source();
}
export const cancel = (source: CancelTokenSource) => {
    source.cancel();
};