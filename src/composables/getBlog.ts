import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Cookies from 'js-cookie';

export function getBlog() {
  const route = useRoute();
  const router = useRouter();
  const blogId = route.params.blog_id as string;
  const blog = ref<any>(null);
  const userId = Cookies.get('userId');

  const fetchBlog = async () => {
    const url = `https://66bc281924da2de7ff69786f.mockapi.io/Blog/${blogId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      blog.value = data;
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  function formatDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  const navigateToEdit = () => {
    router.push({ name: 'BlogEdit', params: { blogId } });
  };

  onMounted(() => {
    fetchBlog();
  });

  return {
    blog,
    userId,
    formatDate,
    navigateToEdit,
    fetchBlog
  };
}
