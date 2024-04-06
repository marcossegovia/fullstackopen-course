import axios from 'axios'

// before 3.12
// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
    .then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)
}

const deleteById = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
}

export default {getAll, create, update, deleteById}