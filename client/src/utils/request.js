import axios from 'axios';

export const request = async () => {
	let res = await axios.get('http://localhost:3333/plants');
	let data = res.data;
	return data;
};
