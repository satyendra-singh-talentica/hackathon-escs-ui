<script>
import { useApiService } from './api/api.service';
import { useUserStore } from './stores/user.store';

export default {
  data() {
    return {
      hpName: '',
      hpDoclink: '',
      hpDescription: '',
      hpTech: '',
      loading: false,
      userStore: useUserStore(),
      api: useApiService(),
    };
  },
  methods: {
    async createHp() {
      this.loading = true;
      const hpData = await this.api.createHp({
        userId: this.userStore.getUserId,
        name: this.hpName,
        description: this.hpDescription,
        doclink: this.hpDoclink,
        tech: this.hpTech,
      });
      this.loading = false;
      if (hpData && hpData.id) {
        this.$router.push(`/users/${this.userStore.getUserId}`)
      }
    },
    async refineDescription() {
      this.loading = true;
      const resp = await this.api.createAIPrompt({
        prompt: `Write a brief description for ${this.hpDescription}`
      });
      this.loading = false;
      if (resp) {
        this.hpDescription = resp;
      }
    }
  }
}
</script>

<template>
  <div class="col-md-10 offset-md-1 mt-5 border border-primary p-3">
    <form @submit.prevent="createHp">
      <div class="mb-3">
        <label for="hpnameinput" class="form-label">Hard Problem Title</label>
        <input type="text" v-model="hpName" class="form-control" id="hpnameinput" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="hpdescriptioninput" class="form-label">Hard Problem Description</label>
        <input type="text" v-model="hpDescription" class="form-control" id="hpdescriptioninput"
          aria-describedby="emailHelp">
      </div>
      <div class="row mb-3">
        <div class="col-mb-6">
          <button v-bind:disabled="loading" class="btn btn-sm btn-secondary" @click.prevent="refineDescription">{{ loading ? `Refining...` : `Refine with AI`}}</button>
        </div>
      </div>
      <div class="mb-3">
        <label for="hpdoclinkinput" class="form-label">Doc Link</label>
        <input type="text" v-model="hpDoclink" class="form-control" id="hpdoclinkinput"
          aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="hptechinput" class="form-label">Tech Stack</label>
        <input type="text" v-model="hpTech" class="form-control" id="hptechinput" aria-describedby="emailHelp">
      </div>
      <button v-bind:disabled="loading" type="submit" class="btn btn-primary">Add Hard Problem</button>
  </form>
</div></template>