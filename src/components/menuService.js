const axios  = require('axios');

export const fetchMenuData = async () => {
  try {
    const response = await axios.get('/Alchemy_Menu.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
};
