import axios from 'axios';

export default axios.create({
	baseURL: 'https://cs361-project-backend.herokuapp.com'
});