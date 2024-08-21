<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import PageHeader from '../components/PageHeader.vue';
import BlogList from '@/components/BlogList.vue';
import EditForm from '@/components/EditForm.vue';

const userId = Cookies.get('userId');  
const searchQuery = ref<string>('');

const userData = ref({
  full_name: '',
  email: '',
  picture: '',
  bio: '',
});

const isEditVisible = ref(false);

const toggleEditContainer = () => {
  isEditVisible.value = !isEditVisible.value;
};


const fetchUserData = async () => {
  if (userId) {
    try {
      const response = await fetch(`https://66bc281924da2de7ff69786f.mockapi.io/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      userData.value = data;  
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('User ID not found in cookies');
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<template>
    <main>
      <PageHeader :display="false"/>
      <div class="create-edit-div">
        <div class="create-div">
          <plus-circle-icon class="plus-icon" />
        </div>
        <div class="edit-div" @click="toggleEditContainer">
          <pencil-square-icon class="edit-icon" />
        </div>
      </div>

      <div class="user-div">
        <div class="user-info-div">
            <div class="user-info">
                <img :src="userData.picture" alt="Profile Picture" class="user-image"/>
                <div class="user-name-and-email">
                    <div class="user-name">{{ userData.full_name }}</div>
                    <div class="user-email">{{ userData.email }}</div>
                </div>
            </div>
          <div class="user-bio">
            {{ userData.bio }}
          </div>
          <div class="user-media">
            <div class="social-icon-div">
                <font-awesome-icon icon="fa-brands fa-facebook-f" class="social-icon" />
            </div>
            <div class="social-icon-div">
                <font-awesome-icon icon="fa-brands fa-twitter" class="social-icon" />
            </div>
            <div class="social-icon-div">
                <font-awesome-icon icon="fa-brands fa-instagram" class="social-icon" />
            </div>
            <div class="social-icon-div">
                <font-awesome-icon icon="fa-brands fa-youtube" class="social-icon" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="isEditVisible" class="edit-container">
        <EditForm :userData="userData"/>
      </div>

      <div class="my-posts">
        <div class="my-post-header">
            My Published Blogs
        </div>
        <div class="blog-container">
            <BlogList :searchQuery="searchQuery" :my_posts="true" />
        </div>

      </div>
    </main>
  </template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
}
.create-edit-div {
    width: 100%;
    height: 20px;
    max-width: 1220px;
    margin: 0 auto;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
}
.create-div, .edit-div {
    width: 20px;
    height: 20px;
    text-decoration: none;
}
.plus-icon, .edit-icon {
    width: 20px;
    height: 20px;
    top: 2px;
    left: 2px;

}
.user-div {
    background-color: #F6F6F7;
    width: 1216px;
    max-width: 1216px;
    height: 344px;
    border-radius: 12px;
    padding: 20pxpx;
    gap: 10PX;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
.user-info {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 64px;
    gap: 16px;
    margin-top: 40px;
    margin-bottom: 20px;
}
.user-image {
    height: 64px;
    width: 64px;
    border-radius: 50%
}
.user-name-and-email {
    display: flex;
    flex-direction: column;
}
.user-name {
    color: #181A2A;
    font-family: 'Work', sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    text-align: left;
}
.user-email {
    color: #696A75;
    font-family: 'Work', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
}
.user-bio {
    width: 668px;
    justify-content: center;
    margin: 0 auto;
    font-family: 'Work', sans-serif;
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
    color: #3B3C4A;
}
.user-media {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 152px;
    height: 32px;
    gap: 8px;
    margin: 0 auto;
    margin-top: 30px;
}
.social-icon-div {
    padding: 8px 8px 8px 8px;
    gap: 8px;
    border-radius: 6px;
    background-color: #696A75;
}
.social-icon {
    color: white;
    width: 16px;
    height: 16px;
    padding: 0%;
}
.my-posts {
    width: 1216px;
    max-width: 1216px;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 30px;
}
.my-post-header {
    font-family: 'Work', sans-serif;
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
}
.blog-container {
    margin-top: 20px;
}


@media (max-width: 1250px) {
    .my-posts {
        width: 100%;
    }
    .user-div {
        width: 90%;

    }
    .my-post-header {
        font-size: 20px;
    }

}

@media (max-width: 768px) {
    .create-edit-div {
        max-width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .create-div, .edit-div {
        width: 24px;
        height: 24px;
    }

    .plus-icon, .edit-icon {
        width: 24px;
        height: 24px;
    }

    .user-div {
        width: 90%;
        height: auto;
        padding: 15px;
    }

    .user-info {
        height: auto;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .user-image {
        height: 48px;
        width: 48px;
    }

    .user-name {
        font-size: 18px;
    }

    .user-email {
        font-size: 12px;
    }

    .user-bio {
        width: 100%;
        font-size: 16px;
        line-height: 22px;
    }

    .user-media {
        width: auto;
        height: auto;
        flex-direction: row;
        justify-content: center;
        gap: 6px;
    }

    .social-icon-div {
        padding: 6px;
    }

    .social-icon {
        width: 14px;
        height: 14px;
    }
    .my-posts {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .create-edit-div {
        padding-top: 15px;
        padding-bottom: 15px;
        justify-content: center;
    }

    .create-div, .edit-div {
        width: 28px;
        height: 28px;
    }

    .plus-icon, .edit-icon {
        width: 28px;
        height: 28px;
    }

    .user-div {
        width: 100%;
        height: auto;
        padding: 10px;
    }

    .user-info {
        height: auto;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .user-image {
        height: 40px;
        width: 40px;
    }

    .user-name {
        font-size: 16px;
    }

    .user-email {
        font-size: 10px;
    }

    .user-bio {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
    }

    .user-media {
        width: auto;
        height: auto;
        flex-direction: row;
        justify-content: center;
        gap: 4px;
    }

    .social-icon-div {
        padding: 4px;
    }

    .social-icon {
        width: 12px;
        height: 12px;
    }
}

@media (max-width: 350px) {
    .create-edit-div {
        padding-top: 20px;
        padding-bottom: 20px;
        justify-content: center;
    }

    .create-div, .edit-div {
        width: 32px;
        height: 32px;
    }

    .plus-icon, .edit-icon {
        width: 32px;
        height: 32px;
    }

    .user-div {
        width: 100%;
        height: auto;
        padding: 5px;
    }

    .user-info {
        height: auto;
        flex-direction: column;
        align-items: center;
        gap: 6px;
    }

    .user-image {
        height: 32px;
        width: 32px;
    }

    .user-name {
        font-size: 14px;
    }

    .user-email {
        font-size: 8px;
    }

    .user-bio {
        width: 100%;
        font-size: 12px;
        line-height: 18px;
    }

    .user-media {
        width: auto;
        height: auto;
        flex-direction: row;
        justify-content: center;
        gap: 2px;
    }

    .social-icon-div {
        padding: 2px;
    }

    .social-icon {
        width: 10px;
        height: 10px;
    }
}
</style>