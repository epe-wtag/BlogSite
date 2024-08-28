import { ref, watch, type Ref } from 'vue';
import Cookies from 'js-cookie';

export function useFetchArticles(searchQuery: Ref<string>, myPosts: Ref<boolean>) {
  const articles = ref<any[]>([]);
  const page = ref(1);
  const userId = Cookies.get('userId');

  const fetchArticles = async (isLoadMore = false) => {
    let url = `https://66bc281924da2de7ff69786f.mockapi.io/Blog?page=${page.value}&limit=3`;
    

    if (myPosts.value && userId) {
      url = `https://66bc281924da2de7ff69786f.mockapi.io/Blog?page=${page.value}&limit=1000`;
    }


    console.log(`Fetching articles from URL: ${url}`); 

    try {
      const response = await fetch(url);
      const data = await response.json();

      let filteredData = data;

      if (searchQuery.value) {
        filteredData = filteredData.filter((article: any) => 
          article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      if (myPosts.value && userId) {
        filteredData = filteredData.filter((article: any) => article.author?.id === userId);
      }

      if (isLoadMore) {
        articles.value.push(...filteredData);
      } else {
        articles.value = filteredData;
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  watch(
    [searchQuery, myPosts],
    () => {
      page.value = 1;
      fetchArticles();
    },
    { immediate: true }
  );

  return {
    articles,
    page,
    fetchArticles,
  };
}
