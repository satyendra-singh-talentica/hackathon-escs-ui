<script>
import { useApiService } from './api/api.service';
import { useUserStore } from './stores/user.store';

export default {
  data() {
    return {
      projectName: '',
      projectClientName: '',
      projectDescription: '',
      projectStartDate: '',
      projectEndDate: '',
      projectTech: '',
      loading: false,
      userStore: useUserStore(),
      api: useApiService(),
    };
  },
  methods: {
    async createProject() {
      this.loading = true;
      const projectData = await this.api.createProject({
        userId: this.userStore.getUserId,
        name: this.projectName,
        client: this.projectClientName,
        description: this.projectDescription,
        tech: this.projectTech,
        startDate: this.projectStartDate,
        endDate: this.projectEndDate,
      });
      this.loading = false;
      if (projectData && projectData.id) {
        this.$router.push(`/users/${this.userStore.getUserId}`)
      }
    },
    async refineDescription() {
      this.loading = true;
      const resp = await this.api.createAIPrompt({
        prompt: `Refine and correct grammer in : ${this.projectDescription}`
      });
      this.loading = false;
      if (resp) {
        this.projectDescription = resp;
      }
    }
  }
}
</script>

<template>
  <div class="col-md-10 offset-md-1 mt-5 border border-primary p-3">
    <form @submit.prevent="createProject">
      <div class="mb-3">
        <label for="projectnameinput" class="form-label">Project Name</label>
        <input type="text" v-model="projectName" class="form-control" id="projectnameinput" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="projectclientnameinput" class="form-label">Project's Client Name</label>
        <input type="text" v-model="projectClientName" class="form-control" id="projectclientnameinput"
          aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="projectdescriptioninput" class="form-label">Project Description</label>
        <input type="text" v-model="projectDescription" class="form-control" id="projectdescriptioninput"
          aria-describedby="emailHelp">
      </div>
      <div class="row mb-3">
        <div class="col-mb-6">
          <button v-bind:disabled="loading" class="btn btn-sm btn-secondary" @click.prevent="refineDescription">{{ loading ? `Refining...` : `Refine with AI`}}</button>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="projectstartdateinput" class="form-label">Start Date</label>
          <input type="date" v-model="projectStartDate" class="form-control" id="projectstartdateinput"
            aria-describedby="emailHelp">
        </div>
        <div class="col-md-6">
          <label for="projectenddateinput" class="form-label">End Date</label>
          <input type="date" v-model="projectEndDate" class="form-control" id="projectenddateinput"
            aria-describedby="emailHelp">
        </div>
      </div>
      <div class="mb-3">
        <label for="projecttechinput" class="form-label">Tech Stack</label>
        <input type="text" v-model="projectTech" class="form-control" id="projecttechinput" aria-describedby="emailHelp">
      </div>
      <button v-bind:disabled="loading" type="submit" class="btn btn-primary">Add Project</button>
    </form>
  </div>
</template>