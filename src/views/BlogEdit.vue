<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getBlog } from '@/composables/getBlog';
import { updateBlog } from '@/composables/updateBlog';
import PageHeader from '@/components/PageHeader.vue';
import TextEditor from '@/components/TextEditor.vue';

const { blog, userId, formatDate, fetchBlog } = getBlog(); 
const router = useRouter();
const { error, update } = updateBlog();

const category = ref('');
const title = ref('');
const description = ref('');
const image = ref('');

watch(blog, (newBlog) => {
  if (newBlog) {
    console.log('Fetched blog data:', newBlog); 
    category.value = newBlog.category || '';
    title.value = newBlog.title || '';
    description.value = newBlog.description || '';
    image.value = newBlog.image || '';
  }
}, { immediate: true }); 


const handleUpdate = async () => {
  if (!blog.value) return;

  const blogData = {
    ...blog.value,
    category: category.value,
    title: title.value,
    description: description.value,
    image: image.value,
  };

  await update(`Blog/${blog.value.id}`, blogData);

  if (error.value) {
    console.error('Failed to update blog:', error.value);
  } else {
    router.push({ name: 'BlogPage', params: { id: blog.value.id } });
  }
};


onMounted(() => {
  fetchBlog(); 
});
</script>

<template>
  <main>
    <PageHeader :display="false"/>
    <div class="edit-blog-container" v-if="blog">
      <h2>Edit Blog</h2>
      <form @submit.prevent="handleUpdate">
        <div class="form-group">
          <label for="category">Category</label>
          <input v-model="category" id="category" type="text" required />
        </div>
        <div class="form-group">
          <label for="title">Title</label>
          <input v-model="title" id="title" type="text" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <TextEditor v-model="description" id="description" class="description"/>
        </div>
        <div class="form-group">
          <label for="image">Image URL</label>
          <input v-model="image" id="image" type="text" />
        </div>
        <div class="button-div">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  </main>
</template>


<style scoped>
.edit-blog-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 150px;
}

.button-div {
  text-align: right;
}

button {
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid #E8E8EA;
  color: white;
  background-color: #8769FF;
}

button:hover {
  font-weight: 600;
}

.description {
  width: 100%!important;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
