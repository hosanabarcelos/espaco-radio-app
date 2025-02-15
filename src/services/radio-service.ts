import axios from "axios";

const API_BASE_URL = "https://de1.api.radio-browser.info/json/stations/search";

export const getRadios = async (offset = 0, limit = 50) => {
	try {
		const response = await axios.get(`${API_BASE_URL}?limit=${limit}&offset=${offset}`);
		return (response.data || []).filter(radio => radio.name?.trim() !== "");
	} catch (error) {
		console.error("Erro ao buscar rádios:", error);
		return [];
	}
};
