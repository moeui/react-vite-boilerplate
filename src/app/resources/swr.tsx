import Axios from 'axios'

// Axios
// async function queryUsers(url, params) {
//     return axios(url, { params: JSON.parse(params) });
//   }
export const users = params => ['/api/users', JSON.stringify(params)]
