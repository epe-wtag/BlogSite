import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';


interface Article {
  title: string;
  description: string;
  author: {
    id?: string;
    name?: string;
    image?: string;
  };
  category: string;
  created_at: string;
  source?: string; 
}

export const useArticleStore = defineStore('article', () => {
  const articles = ref<Article[]>([]);
  const latestArticle = ref<Article | null>(null);
  const page = ref<number>(1);
  const userId = Cookies.get('userId');
  const error = ref<Error | null>(null);
  const isLoading = ref<boolean>(false); 

  const fetchArticles = async (searchQuery: string, myPosts: boolean, isLoadMore = false) => {
    isLoading.value = true; 
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
        filteredData = filteredData.filter((article: Article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (myPosts && userId) {
        filteredData = filteredData.filter((article: Article) => article.author?.id === userId);
      }

      if (isLoadMore) {
        articles.value.push(...filteredData);
      } else {
        articles.value = filteredData;
        page.value = 1; 
      }
    } catch (fetchError) {
      console.error('Error fetching articles:', fetchError);
      error.value = fetchError instanceof Error ? fetchError : new Error('An unknown error occurred');
    } finally {
      isLoading.value = false; 
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
          author: {
            id: data.author?.id,
            name: data.author?.name || 'Unknown',
            image: data.author?.image,
          },
          category: data.category,
          created_at: data.created_at,
          source: data.category, 
        } as Article;
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
    error,
    isLoading,
  };
});
