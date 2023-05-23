import { createAsyncThunk } from "@reduxjs/toolkit"

import { ProfileActionTypes } from "./profileActionTypes"
import {
  getUserByIdFromDbAxios,
  putUserFromDbAxios
} from '../../services/userDbService'

export const getProfileAction = createAsyncThunk(
  ProfileActionTypes.FETCH_AND_SAVE_PROFILE,
  async id => {
    return (await getUserByIdFromDbAxios(id)).data
  }
)

export const putProfileAction = createAsyncThunk(
  ProfileActionTypes.UPDATE_PROFILE,
  async user => {
    return (await putUserFromDbAxios(user)).data
  }
)
