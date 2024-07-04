import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

export const fetchGitHubUsers = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    const data = response.data.slice(0, 15);
    return {
      ...response,
      data
    }
  }
  catch (error) {
    throw new Error('Failed to fetch data');
  }
};