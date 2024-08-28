<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { postBlog } from '@/composables/postBlog';

const props = defineProps<{
  author: {
    id: string;
    name: string;
    image: string;
  }
}>();

const category = ref('');
const title = ref('');
const description = ref('');
const image = ref('');
const router = useRouter();
const { error, post } = postBlog();

const handleSubmit = async () => {
  const blogData = {
    category: category.value,
    title: title.value,
    description: description.value,
    created_at: Math.floor(Date.now() / 1000),
    author: props.author,
    image: image.value,
  };

  await post('Blog', blogData);

  if (error.value) {
    console.error('Failed to create blog:', error.value);
  } else {
    router.push({ name: 'home' });
  }
};
</script>

<template>
  <div class="create-blog-container">
    <h2 class="h2">Create New Blog</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="label" for="category">Category</label>
        <input v-model="category" id="category" type="text" required />
      </div>
      <div class="form-group">
        <label  class="label" for="title">Title</label>
        <input v-model="title" id="title" type="text" required />
      </div>
      <div class="form-group">
        <label class="label" for="description">Description</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>
      <div class="form-group">
        <label  class="label" for="image">Image URL</label>
        <input v-model="image" id="image" type="text" />
      </div>
      <div class="button-div">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.create-blog-container {
  width: 1216px;
  max-width: 1216px;
  height: 627px;
  top: 553px;
  left: 323px;
  margin: 0 auto;
  padding-top: 20px;
  background-color: #f6f6f7;
  border-radius: 12px;
}

.form-group {
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.h2 {
  text-align: center;
  margin-bottom: 20px;
}

.label {
  width: 91%;
  margin: 0 auto;
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
}

input, textarea {
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 150px;
}

.button-div {
  width: 91%;
  height: 48px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
}

button {
  width: 144px;
  height: 48px;
  font-family: 'Work', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #E8E8EA;
  gap: 10px;
  color: white;
  background-color: #8769FF;
  margin: 0 auto;
}

button:hover {
  font-weight: 600;
}

@media (max-width: 1250px) {
  .create-blog-container {
    width: 86%;
    padding: 20px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  max-width: 80%;
  margin: 0 auto;
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
}

  input,
textarea {
  max-width: 80%;
  max-width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
}

.form-group {
  width: 86%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.button-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}
}
</style>
