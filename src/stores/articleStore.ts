import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { formatDate } from '@/utils';

export const useArticleStore = defineStore('article', () => {
  const articles = ref<any[]>([]);
  const latestArticle = ref<any | null>(null);
  const page = ref<number>(1);
  const userId = Cookies.get('userId');
  const error = ref<Error | null>(null);

  const fetchArticles = async (searchQuery: string, myPosts: boolean, isLoadMore = false) => {
    const params = new URLSearchParams();
    params.append('page', page.value.toString());
    params.append('limit', (myPosts && userId) || searchQuery ? '1000' : '3');

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

  const fetchLatestNews = async () => {
    const url = 'https://66bc281924da2de7ff69786f.mockapi.io/Blog/1';
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        latestArticle.value = {
          title: data.title,
          description: data.description,
          author: data.author?.name || 'Unknown',
          source: data.category,
          image: data.author?.image,
          publishedAt: formatDate(data.created_at)
        };
      }
    } catch (err) {
      console.error('Error fetching latest news:', err);
      error.value = err instanceof Error ? err : new Error('An unknown error occurred');
    }
  };

  return {
    articles,
    page,
    fetchArticles,
    latestArticle,
    fetchLatestNews,
    error
  };
});
