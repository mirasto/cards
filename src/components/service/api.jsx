import axios from "axios";

const instance = axios.create({
	baseURL: 'https://randomuser.me/api/?results=20'
})

export const fetchUsers = async () => {
	const response = await instance.get()
	return response.data.results;
}