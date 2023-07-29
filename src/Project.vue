<script>
import ProjectCard from './ProjectCard.vue';
import UserCard from './UserCard.vue';
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
        },
        userDetail(userId) {
          this.$router.push(`/users/${userId}`);
        }
    },
    mounted() {
        this.getProject(this.$route.params.id);
    },
    components: { ProjectCard, UserCard }
}
</script>

<template>
  <div class="col-md-12 border border-primary p-3">

    <div v-if="project">
      <h5>Project:</h5>
      <ProjectCard :project="project" />

      <h5>Author:</h5>
      <UserCard :user="project.user" min @click="() => userDetail(project.user.id)" />
    </div>
  </div>
</template>