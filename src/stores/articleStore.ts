import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';

export const useArticleStore = defineStore('article', () => {
  const articles = ref<any[]>([]);
  const page = ref<number>(1);
  const userId = Cookies.get('userId');

  const fetchArticles = async (searchQuery: string, myPosts: boolean, isLoadMore = false) => {
    const params = new URLSearchParams();
    params.append('page', page.value.toString());
    params.append('limit', myPosts && userId ? '1000' : '3');

    const url = `https://66bc281924da2de7ff69786f.mockapi.io/Blog?${params.toString()}`;
    console.log(`Fetching articles from URL: ${url}`);

    try {
      const response = await fetch(url);
      const data = await response.json();

      let filteredData = data;

      if (searchQuery) {
        filteredData = filteredData.filter((article: any) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (myPosts && userId) {
        filteredData = filteredData.filter((article: any) => article.author?.id === userId);
      }

      if (isLoadMore) {
        articles.value.push(...filteredData);
      } else {
        articles.value = filteredData;
        page.value = 1;
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return {
    articles,
    page,
    fetchArticles,
  };
});
