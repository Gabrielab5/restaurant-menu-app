const axios  = require('axios');
//const BASE_URL = "./Alchemy_Menu.json";

/**
 * Fetches the menu data from the JSON file.
 * @returns {Promise<Object>} The menu data.
 * @throws {Error} If the fetch fails.
 */

export const fetchMenuData = async () => {
  try {
    const response = await axios.get('/Alchemy_Menu.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw new Error('Unable to fetch menu data. Please try again later.');
  }
};
