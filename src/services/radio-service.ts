import axios from "axios";

const API_BASE_URL = "https://de1.api.radio-browser.info/json/stations/search";

export const getRadios = async (query = "", country = "", language = "", page = 1) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        limit: 10,
        offset: (page - 1) * 10,
        name: query,
        country,
        language,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar rádios:", error);
    return [];
  }
};
