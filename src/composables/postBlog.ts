export function postBlog() {
  const CreateNewBlog = async (endpoint: string, payload: object): Promise<[any, Error | null]> => {
    let data = null;
    let error = null;

    try {
      const response = await fetch(`https://66bc281924da2de7ff69786f.mockapi.io/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      data = await response.json();
    } catch (err) {
      error = err as Error;
    }

    return [data, error];
  };

  return { CreateNewBlog };
}
