<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const props = defineProps<{
  searchQuery: string;
  my_posts: Boolean;
}>();

const articles = ref<any[]>([]);
const page = ref(1);
const router = useRouter();
const userId = Cookies.get('userId');

const fetchArticles = async (isLoadMore = false) => {
  let url = `https://66bc281924da2de7ff69786f.mockapi.io/Blog?page=${page.value}&limit=3`;

  if (props.searchQuery) {
    url += `&search=${encodeURIComponent(props.searchQuery)}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    let filteredData = data;
    if (props.my_posts && userId) {
      filteredData = data.filter((article: any) => article.author?.id === userId);
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

function formatDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function loadMore() {
  page.value += 1;
  fetchArticles(true);
}

function navigateToBlog(blogId: string) {
  router.push({ name: 'BlogPage', params: { blog_id: blogId } });
}

const buttonText = computed(() => {
  return Cookies.get('userId') ? 'Load More' : 'View More';
});

onMounted(() => {
  fetchArticles();
});

watch(
  () => props.searchQuery,
  (newQuery) => {
    page.value = 1;
    fetchArticles();
  }
);
</script>



<template>
  <div class="blog-list">
    <div 
    v-for="(article, index) in articles" 
    :key="index" 
    class="blog-item"
    @click="navigateToBlog(article.id)" 
    >
      <img :src="article.image" alt="news Image" class="blog-image" />
      <div class="blog-item-header">
        <div class="blog-item-badge">
          <span class="blog-item-badge-text">{{ article.category }}</span>
        </div>
        <h3 class="blog-item-title">{{ article.title }}</h3>
      </div>
      <div class="blog-item-meta">
        <div class="blog-item-author-div">
          <img :src="article.author.image" alt="Author Image" class="blog-item-author-image" />
          <span class="blog-item-author">{{ article.author.name }}</span>
        </div>
        <span class="blog-item-date">{{ formatDate(article.created_at) }}</span>
      </div>
    </div>
  </div>
  <div class="view-more-button-div">
    <button @click="loadMore" class="view-more-button">{{ buttonText }}</button>
  </div>
</template>

<style scoped>
.blog-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding-bottom: 50px;
  justify-content: center;
}

.blog-item {
  flex-basis: calc((100% - 48px) / 3);
  box-sizing: border-box;
  padding: 16px;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid #E8E8EA;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;
  cursor: pointer;
}

.blog-image {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.blog-item-header {
  display: flex;
  flex-direction: column;
}

.blog-item-badge {
  width: 97px;
  height: 28px;
  padding: 6px 10px 0px 10px;
  gap: 4px;
  border-radius: 6px;
  background-color: #eeeff8;
  text-align: center;
}

.blog-item-badge-text {
  font-family: 'Work', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #4B6BFB;
}

.blog-item-title {
  font-family: 'Work', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  color: #181A2A;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.blog-item-meta {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 10px;
  align-items: center;
}

.blog-item-author-div {
  display: flex;
  align-items: center;
}

.blog-item-author-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
}

.blog-item-author {
  font-family: 'Work', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #97989F;
}

.blog-item-date {
  font-family: 'Work', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #97989F;
  margin-left: auto;
}

.view-more-button-div {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.view-more-button {
  padding: 10px 20px;
  font-family: 'Work', sans-serif;
  border-radius: 6px;
  border: 1px solid #696A75;
  font-size: 16px;
  font-weight: 500;
  color: #696A75;
  background-color: white;
}

@media (max-width: 1024px) {
  .blog-item {
    flex-basis: calc((100% - 48px) / 2);
  }
}

@media (max-width: 768px) {
  .blog-item {
    flex-basis: calc((100% - 48px) / 2);
  }
  
  .blog-list {
    gap: 16px;
  }
  .blog-item-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .blog-item-author-image {
    width: 36px;
    height: 36px;
}

.blog-item-author {
  font-family: 'Work', sans-serif;
  font-size: 16px;
}

.blog-item-date {
  margin-top: 5px;
    margin-left: 20%;
    font-size: 12px;
}
}

@media (max-width: 480px) {
  .blog-item {
    padding: 12px;
    flex-basis: calc((100% - 48px));
  }

  .blog-item-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
}

  .blog-item-badge-text {
    font-size: 12px;
  }

  .blog-item-meta {
    flex-direction: column;
  }

  .blog-item-author-image {
    width: 28px;
    height: 28px;
}

.blog-item-author {
  font-family: 'Work', sans-serif;
  font-size: 14px;
}

.blog-item-date {
  margin-top: 5px;
    margin-left: 15%;
    font-size: 12px;
}

  .view-more-button {
    width: 100%;
  }
}
</style>
