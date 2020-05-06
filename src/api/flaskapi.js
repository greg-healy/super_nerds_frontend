import axios from 'axios';

let baseURL = 'http://127.0.0.1:5000';
console.log(process.env.FLASK_API_URL);
if (process.env.FLASK_API_URL !== undefined) {
	baseURL = process.env.FLASK_API_URL;
}

export default axios.create({ baseURL });
