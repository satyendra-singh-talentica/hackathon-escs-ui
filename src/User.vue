<script>
import HpCard from './HpCard.vue';
import ProjectCard from './ProjectCard.vue';
import UserCard from './UserCard.vue';
import { useApiService } from './api/api.service';
import { useUserStore } from './stores/user.store';

export default {
  data() {
    return {
      user: null,
      projects: null,
      hps: null,
      loading: false,
      api: useApiService(),
      userStore: useUserStore(),
    };
  },
  methods: {
    async getHps(userId) {
      this.loading = true;
      const hpData = await this.api.getHps(userId);
      this.loading = false;
      if (hpData && hpData.length) {
        this.hps = hpData;
      }
    },
    async getProjects(userId) {
      this.loading = true;
      const projectData = await this.api.getProjects(userId);
      this.loading = false;
      if (projectData && projectData.length) {
        this.projects = projectData;
      }
    },
    async getUser(userId) {
      const userData = await this.api.getUser(userId);
      if (userData && userData.id) {
        this.user = userData;
      }
    }
  },
  mounted() {
    if (this.$route.params.id !== this.userStore.getUserId) {
      this.getUser(this.$route.params.id);
      this.getProjects(this.$route.params.id);
      this.getHps(this.$route.params.id);
    } else {
      this.user = this.userStore;
      this.getProjects(this.userStore.getUserId);
      this.getHps(this.userStore.getUserId);
    }
  },
  components: { UserCard, ProjectCard, HpCard }
}
</script>

<template>
  <div class="col-md-12 border border-primary p-3">

    <div v-if="user">
      <UserCard :user="user" />
    </div>

    <div class="col-lg-12 ">
      <h6>Projects:</h6>
      <div v-if="projects && projects.length">
        <div v-for="(project) in projects">
          <ProjectCard :project="project" />
        </div>
      </div>
    </div>

    <div class="col-lg-12 ">
      <h6>Hard Problems:</h6>
      <div v-if="hps && hps.length">
        <div v-for="(hp) in hps">
          <HpCard :hp="hp" />
        </div>
      </div>
    </div>

  </div>
</template>