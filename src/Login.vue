<script>
import { useApiService } from './api/api.service';
import { useUserStore } from './stores/user.store';

export default {
  data() {
    return {
      email: '',
      loading: false,
      userStore: useUserStore(),
      api: useApiService(),
    };
  },
    methods: {
    async getUser() {
      this.loading = true;
      const userData = await this.api.getUser(this.email);
      this.loading = false;
      if (userData && userData.id) {
        this.userStore.setUser(userData);
        this.$router.push('/users')
      }
    },
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