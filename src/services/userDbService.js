import api, { EndPoints } from "../api/axios"

export async function getUserByIdFromDbAxios(id) {
  return await api.get(`http://127.0.0.1:8000/apis/users/1`)
}

export async function putUserFromDbAxios(user) {
  return await api.put(`http://127.0.0.1:8000/apis/users/${user.id}`, user)
}
