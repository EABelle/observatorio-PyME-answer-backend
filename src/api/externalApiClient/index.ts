import Axios from 'axios';
import {externalTemplatesURL} from '../config';

const axios = Axios.create();

export const getTemplates = (params ?: any) => {
    return axios.get(externalTemplatesURL, {
        params,
    });
};
