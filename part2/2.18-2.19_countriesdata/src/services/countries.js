import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'


const getAll = name => {
  return axios.get(baseUrl + 'all')
    .then( response => {
      return response.data.filter(c => c.name.common.includes(name));
    })
}


export default {getAll}