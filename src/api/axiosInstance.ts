import axios from 'axios'

// Create an Axios instance with default options
const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

export default axiosInstance
