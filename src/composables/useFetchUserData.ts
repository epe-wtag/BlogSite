import { ref } from 'vue';
import Cookies from 'js-cookie';

export function useFetchUserData() {
  const userId = Cookies.get('userId');
  const userData = ref({
    id: '',
    full_name: '',
    email: '',
    picture: '',
    bio: '',
  });

  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = await fetch(`https://66bc281924da2de7ff69786f.mockapi.io/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        userData.value = await response.json();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('User ID not found in cookies');
    }
  };

  return { userData, fetchUserData };
}
