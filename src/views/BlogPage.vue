<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PageHeader from '../components/PageHeader.vue';

const route = useRoute();
const blogId = route.params.blog_id;
const blog = ref<any>(null);

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

onMounted(() => {
  fetchBlog();
});
</script>

<template>
  <main>
    <PageHeader :display="false"/>
  <div class="blog-container" v-if="blog">
    <div class="blog-category">{{ blog.category }}</div>
    <h1 class="blog-title">{{ blog.title }}</h1>
    <div class="blog-meta">
      <img :src="blog.author.image" alt="Author Image" class="blog-author-image" />
      <div class="blog-author-info">
        <div class="blog-author">{{ blog.author.name }}</div>
        <div class="blog-date">{{ formatDate(blog.created_at) }}</div>
      </div>
    </div>
    <img :src="blog.image" alt="blog Image" class="blog-image" />
    <div class="blog-description" v-html="blog.description"></div>
  </div>
  </main>
</template>

<style scoped>
.blog-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
}

.blog-title {
  max-width: 800px;
  font-size: 36px;
  line-height: 40px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #181A2A;
  font-family: 'Work', sans-serif;
  gap: 16px;
}

.blog-meta {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.blog-author-image {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 10px;
  margin-bottom: 5px;
}

.blog-author-info {
  width: 266px;
  height: 28px;
  gap: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between!important;

}

.blog-author {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #696A75;
  font-family: 'Work', sans-serif;
}

.blog-date {
  font-size: 14px;
  line-height: 20px;
  color: #97989f;
  font-family: 'Work', sans-serif;
  color: #696A75;
}

.blog-category {
  width: 101px;
  height: 32px;
  line-height: 20px;
  padding: 12px 12px 0px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: #4B6BFB;
  font-family: 'Work', sans-serif;
  justify-content: center;
  text-align: center;

}

.blog-image {
  width: 100%;
  max-height: 462px;
  border-radius: 12px;

}

.blog-description {
  font-family: 'Source Serif Pro', serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  color: #3B3C4A;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .blog-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .blog-meta {
    align-items: flex-start;
  }

  .blog-author-info {
    max-width: 70%;
    margin-top: 10px;
    gap: 5px;
  }

  .blog-author {
    font-size: 0.85rem;
  }

  .blog-date {
    font-size: 0.75rem;
  }

  .blog-category {
    font-size: 0.85rem;
    padding: 10px 3px 0px 3px;
  }

  .blog-image {
    height: auto;
    margin: 15px 0;
  }

  .blog-description {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .blog-title {
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .blog-author-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
  }
  .blog-meta {
    margin-top: 20px;
    flex-direction: column;
    align-items: flex-start;
  }

  .blog-author {
    font-size: 0.7rem;
  }

  .blog-date {
    font-size: 0.7rem;
  }

  .blog-category {
    font-size: 0.8rem;
    padding: 10px 5px 0px 5px;
  }

  .blog-description {
    font-size: 0.75rem;
  }
}

@media (max-width: 350px) {
  .blog-title {
    font-size: 1.1rem;
    line-height: 1.3;
  }

  .blog-description {
    font-size: 0.7rem;
  }
}

</style>

