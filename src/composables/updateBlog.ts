import { ref } from 'vue';

export function updateBlog() {
  const data = ref(null);
  const error = ref<Error | null>(null);

  const update = async (endpoint: string, payload: object) => {
    try {
      const response = await fetch(`https://66bc281924da2de7ff69786f.mockapi.io/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      data.value = await response.json();
    } catch (err) {
      error.value = err as Error;
    }
  };

  return { data, error, update };
}
