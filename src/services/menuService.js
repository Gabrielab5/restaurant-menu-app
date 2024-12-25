import axios from 'axios'

export const fetchMenuData = async () => {
  try {
    const response = await axios.get('path-to-your-json-file/Alchemy_Menu.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
};
