import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

import { ProfileActionTypes } from "./profileActionTypes"
import {
  getUserByIdFromDbAxios,
  putUserFromDbAxios
} from '../../services/userDbService'

export const getProfileAction = createAsyncThunk(
  ProfileActionTypes.FETCH_AND_SAVE_PROFILE,
  async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/apis/users/1`);
    return response.data;

    console.log(response)
  }
);





export const putProfileAction = createAsyncThunk(
  ProfileActionTypes.UPDATE_PROFILE,
  async user => {
    return (await putUserFromDbAxios(user)).data
  }
)
