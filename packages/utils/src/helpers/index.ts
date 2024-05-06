import axios from 'axios';
import { IAPICall } from './apiCall.types';

export const makeGetApiCall = ({url, method, headers={}}:IAPICall) =>{
    return axios({
        url,
        method,
        headers,
    })
}