import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { formatDate } from '@/utils'

export function getBlog() {
  const route = useRoute();
  const router = useRouter();
  const blogId = route.params.blog_id as string;
  const blog = ref<any>(null);
  const userId = Cookies.get('userId');
  const loading = ref(true);

  const fetchBlog = async () => {
    const url = `https://66bc281924da2de7ff69786f.mockapi.io/Blog/${blogId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      blog.value = data;
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      loading.value = false;
    }
  };

  const navigateToEdit = () => {
    router.push({ name: 'BlogEdit', params: { blogId } });
  };

  onMounted(() => {
    fetchBlog();
  });

  return {
    blog,
    userId,
    loading,
    formatDate,
    navigateToEdit,
    fetchBlog
  };
}
