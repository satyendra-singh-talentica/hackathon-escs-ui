<script setup lang="ts">
import { ref } from 'vue';
import { useApiService } from './api/api.service';
import { useUser } from './stores/user.store';

const email = ref('');
const loading = ref(false);
const api = useApiService();
const user = useUser();

async function getUser() {
  loading.value = true;
  const userData = await api.getUser(email.value);
  loading.value = false;
  if (userData && userData.id) {
    user.setUser(userData);
  }
}
</script>

<template>
  <div class="col-md-8 offset-md-2 mt-5 border border-primary p-3">
    <form @submit.prevent="getUser">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">Provide your company email.</div>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>
