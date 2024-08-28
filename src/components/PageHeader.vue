<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '@/composables/useUser';

const props = defineProps<{
  display: boolean;
}>();

const emit = defineEmits(['search']);

const { userName, isLoggedIn, handleLogout } = useUser();
const searchQuery = ref<string>('');

function onSearch() {
  console.log('Search triggered with query:', searchQuery.value);
  emit('search', searchQuery.value);
}

</script>

<template>
  <header class="header">
    <RouterLink to="/" class="header__website-name">WellBlog</RouterLink>
    <div v-if="props.display" class="header__search-container">
      <input 
        type="text" 
        class="header__search-bar" 
        placeholder="Search..." 
        v-model="searchQuery" 
        @keyup.enter="onSearch" 
      />
      <span class="header__search-icon">
        <font-awesome-icon :icon="['fas', 'search']" />
      </span>
    </div>
    <div v-if="isLoggedIn" class="header__profile-links">
      <span class="wellcome">Welcome</span>
      <RouterLink class="profile-link" to="/profile">{{ userName }}</RouterLink>
      <RouterLink class="icon-div" to="/" @click="handleLogout">
        <arrow-left-start-on-rectangle-icon class="icon" />
      </RouterLink>
    </div>
    <div v-else class="header__auth-links">
      <RouterLink class="link" to="/login">Login</RouterLink>
      <span class="slash">/</span>
      <RouterLink class="link" to="/signup">Signup</RouterLink>
    </div>
  </header>
</template>


<style scoped>
.header {
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  margin-top: 70px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;

}

.header__website-name {
  font-size: 32px;
  font-weight: 400;
  color: #000000;
  flex: 1;
  line-height: 20px;
  text-align: left;
  text-decoration: none;
}

.header__search-container {
  position: relative;
  flex: 2;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin-left: 150px;
  border: 1px solid transparent;
}

.header__search-bar {
  width: 100%;
  padding: 8px 10px;
  padding-right: 30px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #F4F4F5;
  font-size: 16px;
}

.header__search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #52525B;
}

.wellcome {
  width: 93px;
  height: 22px;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  margin-left: 40px;
  margin-right: 10px;
}

.profile-link {
  width: 93px;
  height: 22px;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  text-decoration: none;
  color: #49A4CB;
}

.header__auth-links {
  width: 158px;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin-top: 10px;
}

.link {
  text-decoration: none;
  color: #0D58B0;
  font-weight: 400;
  font-size: 20px;
  gap: 10px;
}

.link:hover {
  text-decoration: underline;
}

.slash {
  padding: 0 10px;
  color: #000000;
  font-size: 20px;
}

.icon-div {
  width: 24px;
  height: 22px;
  padding: 2px 3px 2px 1px;
  margin-left: 10px;
}

.icon {
  width: 20px;
  height: 20px;
  left: 1px;
  color: #0F172A;
  text-decoration: none;
}

@media (max-width: 768px) {
  .header__website-name {
    font-size: 20px;
  }

  .header__search-bar {
    font-size: 14px;
  }

  .header__search-container {
    margin-left: 0px;
  }

  .wellcome {
    font-size: 14px;
  }

  .profile-link {
    font-size: 14px;
  }

  .header__auth-links {
    font-size: 14px;
    text-align: center;
  }

  .link {
    font-size: 14px;
    margin: 0 5px;
  }

  .slash {
    padding: 0 5px;
  }
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  .header__search-container {
    margin-left: 0px;
  }

  .wellcome {
    font-size: 14px;
  }

  .profile-link {
    font-size: 14px;
  }

  .header__website-name,
  .header__search-container,
  .header__auth-links {
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .header__profile-links {
    width: 100%;
    justify-content: center;
    text-align: center;
    margin-top: 10px;
  }

  .header__search-bar {
    font-size: 14px;
    padding: 6px 8px;
  }
}

@media (max-width: 350px) {
  .header__profile-links {
    width: 100%;
    justify-content: center;
    text-align: center;
    margin-top: 10px;
  }

  .wellcome {
    font-size: 14px;
  }

  .profile-link {
    font-size: 14px;
  }
}
</style>
