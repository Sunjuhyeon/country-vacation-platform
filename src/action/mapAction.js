import { createAsyncThunk } from '@reduxjs/toolkit';
import {getData} from '../reducer/dataReducer'
import axios from axios;
import { response } from 'express';

export const action = {
  getEmployees : createAsyncThunk('GET/EMPLOYEES', async () => {
    return axios({
      method: 'get',
      url: 'http://api.data.go.kr/openapi/tn_pubr_public_frhl_exprn_vilage_api'
    }).then(response => response.data);
  })
}
