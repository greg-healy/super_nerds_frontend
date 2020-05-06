import axios from 'axios';

let baseURL = 'http://127.0.0.1:5000';
if (process.env.FLASK_API_URL) {
	baseURL = process.env.FLASK_API_URL;
}

export default axios.create({ baseURL });
