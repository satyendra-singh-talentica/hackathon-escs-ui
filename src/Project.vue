<script>
import { useApiService } from './api/api.service';

export default {
  data() {
    return {
      project: null,
      loading: false,
      api: useApiService(),
    };
  },
  methods: {
    async getProject(projectId) {
      this.loading = true;
      const projectData = await this.api.getProject(projectId);
      this.loading = false;
      if (projectData && projectData.id) {
        this.project = projectData;
      }
    }
  },
  mounted() {
    this.getProject(this.$route.params.id);
  },
}
</script>

<template>
  <div class="col-md-12 border border-primary p-3">

    <div v-if="project">
      <pre>{{ JSON.stringify(project, null, 4) }}</pre>
    </div>
  </div>
</template>