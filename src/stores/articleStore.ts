import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';

export const useArticleStore = defineStore('article', () => {
  const articles = ref<any[]>([]);
  const page = ref<number>(1);
  const userId = Cookies.get('userId');

  const fetchArticles = async (searchQuery: string, myPosts: boolean, isLoadMore = false) => {
    let url = `https://66bc281924da2de7ff69786f.mockapi.io/Blog?page=${page.value}&limit=3`;

    if (myPosts && userId) {
      url = `https://66bc281924da2de7ff69786f.mockapi.io/Blog?page=${page.value}&limit=1000`;
    }

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
        filteredData = filteredData.filter((article: any) => {
          return article.author?.id === userId;
        });
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
