  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import Cookies from 'js-cookie';
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    userData: {
      full_name: string;
      email: string;
      picture: string;
      bio: string;
    };
  }>();

  const router = useRouter();

  const form = ref({
    full_name: '',
    email: '',
    picture: '',
    bio: ''
  });

  watch(
    () => props.userData,
    (newUserData) => {
      form.value = { ...newUserData };
    },
    { immediate: true }
  );

  const userId = Cookies.get('userId');


  const submitForm = async () => {
    if (!userId) {
      console.error('User ID not found in cookies');
      return;
    }

    try {
      const response = await fetch(`https://66bc281924da2de7ff69786f.mockapi.io/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUser = await response.json();
      console.log('User data updated:', updatedUser);
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
</script>

  <template>
    <div class="edit-form-container">
      <h2>Edit Profile</h2>
      <form @submit.prevent="submitForm">
        <div class="parts">
          <div class="part-1">
            <div class="form-group">
              <label for="full_name">Full Name</label>
              <input v-model="form.full_name" type="text" id="full_name" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input v-model="form.email" type="email" id="email" required />
            </div>
            <div class="form-group">
              <label for="bio">Bio</label>
              <textarea v-model="form.bio" id="bio" rows="4" required></textarea>
            </div>
          </div>
          <div class="part-2">
            <div class="form-group">
              <label for="picture">Profile Picture</label>
              <input v-model="form.picture" type="text" id="picture" required />
              <img v-if="form.picture" :src="form.picture" alt="Profile Picture" class="preview-image" />
            </div>
          </div>
        </div>
        <div class="button-div">
          <button class="submit-btn active" type="submit">Submit</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  </template>


<style scoped>
.edit-form-container {
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

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
  text-align: center;

}

form {
  display: flex;
  flex-direction: column;
}

.parts {
  width: 1216px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.part-1, .part-2 {
  width: 90%;
}

.part-2 {
  margin-top: 50px;
}

label {
  width: 91%;
  margin: 0 auto;
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
}

input,
textarea {
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 150px;
}

.preview-image {
  margin-top: 30px;
  width: 250px;
  height: 250px;
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

.submit-btn {
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
  background-color: white;
  color: black;
}

.cancel-btn {
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
  background-color: white;
  color: black;
}

.submit-btn:hover,
.cancel-btn:hover {
  color: white;
  background-color: #8769FF;
}


.active {
  color: white;
  background-color: #8769FF;
}

@media (max-width: 768px) {
  .edit-form-container {
    width: 90%;
    height: auto;
    padding: 15px;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
    align-items: center;
    justify-content: center;
    text-align: center;

  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    width: 91%;
    margin: 0 auto;
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    text-align: left;
  }

  input,
  textarea {
    width: 90%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
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

  .submit-btn {
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
    background-color: white;
    color: black;

  }

  .cancel-btn {
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
    background-color: white;
  }

  .active {
    color: white;
    background-color: #8769FF;
  }

}
</style>
