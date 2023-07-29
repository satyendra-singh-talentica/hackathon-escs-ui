<script>
import { useApiService } from './api/api.service';
import { useUserStore } from './stores/user.store';

export default {
  data() {
    return {
      projects: null,
      loading: false,
      api: useApiService(),
      userStore: useUserStore(),
    };
  },
  methods: {
    async getProjects() {
      this.loading = true;
      const projectData = await this.api.getProjects(this.userStore.getUserId);
      this.loading = false;
      if (projectData && projectData.length) {
        this.projects = projectData;
      }
    }
  },
  mounted() {
    this.getProjects();
  },
}
</script>

<template>
  <div class="col-md-12 border border-primary p-3">

    <div v-if="userStore">
      <pre>{{ JSON.stringify(userStore, null, 4) }}</pre>
    </div>

    <div v-if="projects && projects.length">
      <pre>{{ JSON.stringify(projects, null, 4) }}</pre>
    </div>
  </div>
</template>