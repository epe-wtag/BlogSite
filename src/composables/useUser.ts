import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';

export function useUser() {
  const userName = ref<string>('');
  const isLoggedIn = ref<boolean>(false);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`https://66bc281924da2de7ff69786f.mockapi.io/user/${userId}`);
      const data = await response.json();

      if (response.ok) {
        const fullName = data.full_name || '';
        userName.value = fullName.split(' ')[0];
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const checkLoginStatus = () => {
    isLoggedIn.value = !!Cookies.get('userId');
    if (isLoggedIn.value) {
      const userId = Cookies.get('userId');
      if (userId) {
        fetchUserData(userId);
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove('userId');
    isLoggedIn.value = false;
    userName.value = '';
  };

  onMounted(() => {
    checkLoginStatus();
  });

  return {
    userName,
    isLoggedIn,
    handleLogout,
  };
}
