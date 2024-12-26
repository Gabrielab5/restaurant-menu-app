

export const fetchMenuData = async () => {
  try {
    const response = await fetch('/Alchemy_Menu.json'); 
    if (!response.ok) {
      throw new Error('Failed to fetch menu data');
    }
    return await response.json(); 
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error; 
  }
};
