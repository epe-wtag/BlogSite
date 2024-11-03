import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

export function useUpdateUser() {
  const router = useRouter();
  const userId = Cookies.get('userId');

  const updateUser = async (userData: {
    full_name: string;
    email: string;
    picture: string;
    bio: string;
  }) => {
    if (!userId) {
      console.error('User ID not found in cookies');
      return;
    }

    try {
      const response = await fetch(`https://66bc281924da2de7ff69786f.mockapi.io/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUser = await response.json();
      console.log('User data updated:', updatedUser);
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return { updateUser };
}
