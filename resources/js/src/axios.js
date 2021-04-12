// axios
import axios from 'axios';

window.axios = axios;

const baseURL = ''

export default axios.create({
  baseURL
  // You can add your headers here
})
