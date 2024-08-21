<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PageHeader from '../components/PageHeader.vue';
import introImage from '../assets/landing_intro.png';
import BlogList from '@/components/BlogList.vue';

const latestArticle = ref<any>(null);
const searchQuery = ref<string>('');

const fetchLatestNews = async () => {
  const url = 'https://66bc281924da2de7ff69786f.mockapi.io/Blog/1';

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data) {
      latestArticle.value = {
        title: data.title,
        description: data.description,
        author: data.author.name || 'Unknown',
        source: data.category,
        image: data.author.image,
        publishedAt: formatDate(data.created_at)
      };
    }
  } catch (error) {
    console.error('Error fetching latest news:', error);
  }
};

function formatDate(timestamp: number) {
  const date = new Date(timestamp * 1000); 
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

const handleSearch = (query: string) => {
  searchQuery.value = query;
  console.log('Search query received in homePage:', searchQuery.value);
};

onMounted(() => {
  fetchLatestNews();
});
</script>

<template>
  <main>
    <PageHeader @search="handleSearch" :display="true"/>
    <div class="landing-container-wrap">
      <div class="landing-intro-image-container">
        <img :src="introImage" alt="Intro Image" class="landing-intro-image" />
        <div v-if="latestArticle" class="landing-top-blog-div">
          <div class="landing-blog-post">
            <div class="landing-blog-post-heading">
              <div class="landing-blog-post-badge">
                <span class="landing-blog-post-badge-text">
                  {{ latestArticle.source }}
                </span>
              </div>

              <h2 class="landing-blog-post-title">{{ latestArticle.title }}</h2>
            </div>
            <div class="landing-blog-post-meta">
              <div class="landing-blog-post-author-div">
                <img :src="latestArticle.image || introImage" alt="Author Image" class="landing-blog-post-author-image"/>
                <span class="landing-blog-post-author">{{ latestArticle.author }}</span>
              </div>
              <span class="landing-blog-post-date">{{ latestArticle.publishedAt }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="landing-news-container">
        <div class="landing-container-heading">
          <h3 class="landing-container-heading-text">Latest Post</h3>
        </div>
        <BlogList :searchQuery="searchQuery" :my_posts="false" />
      </div>
    </div>
  </main>
</template>

<style scoped>

.landing-container-wrap {
  max-width: 1220px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  background-color: white;
}

.landing-intro-image-container {
  width: 100%;
  max-width: 1220px;
  height: 664px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.landing-intro-image {
  width: 100%;
  height: auto;
  max-height: 600px;
  border-radius: 12px;
}

.landing-top-blog-div {
  position: absolute;
  width: 90%;
  max-width: 598px;
  height: 304px;
  max-height: 304px;
  bottom: 20px;
  left: 5%;
  right: 5%;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0px 12px 24px -6px rgba(24, 26, 42, 0.12);
  padding: 20px;
  box-sizing: border-box;
}

.landing-blog-post {
  padding: 20px;
  gap: 16px;
}

.landing-blog-post-heading {
  margin-bottom: 16px;
}

.landing-blog-post-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: #4B6BFB;
  text-align: center;
}

.landing-blog-post-badge-text {
  font-family: 'Work', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
}

.landing-blog-post-title {
  font-weight: 600;
  font-size: 36px;
  line-height: 32px;
  color: #181A2A;
  font-family: 'Work', sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.landing-blog-post-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

.landing-blog-post-author-div {
  display: flex;
  align-items: center;
}

.landing-blog-post-author {
  font-family: 'Work', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #97989F;
}

.landing-blog-post-author-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
}

.landing-blog-post-date {
  font-family: 'Work', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #97989F;
}

.landing-news-container {
  width: 100%;
}

.landing-container-heading {
  margin-bottom: 20px;
}

.landing-container-heading-text {
  font-family: 'Work', sans-serif;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
}

@media (max-width: 768px) {
  .landing-container-wrap {
    padding: 10px;
    margin-top: 50px;
  }

  .landing-blog-post-title {
    font-size: 20px;
    line-clamp: 2;
    -webkit-line-clamp: 2;
  }
  .landing-intro-image-container {
    max-width: 100%;
    max-height: 500px;
  }

  .landing-top-blog-div {
    width: 90%;
    height: 230px;
    padding: 15px;
    position: relative;
    transform: translateY(-50%);
  }

  .landing-blog-post-meta {
    flex-direction: row;
    align-items: flex-start;
    margin-top: 10px;
  }

  .landing-blog-post-date {
    margin-top: 5px;
  }
}

@media (max-width: 480px) {
  .landing-container-wrap {
    padding: 10px;
    margin-top: 20px;
  }

  .landing-intro-image-container {
    max-width: 100%;
    max-height: 354px;
  }
  .landing-top-blog-div {
    height: 200px;
  }

  .landing-blog-post-title {
    font-size: 18px;
    line-height: 25px;
  }

  .landing-blog-post-meta {
    font-size: 14px;
    flex-direction: column;
  }

  .landing-blog-post-author-image {
    width: 28px;
    height: 28px;
  }

  .landing-container-heading-text {
    font-size: 20px;
  }
  .landing-blog-post-date {
    margin-top: 5px;
    margin-left: 15%;
    font-size: 12px;
  }
}

@media (max-width: 350px) {
  .landing-intro-image-container {
    max-width: 100%;
    max-height: 280px;
  }
  .landing-top-blog-div {
    height: 230px;
  }
}
</style>
