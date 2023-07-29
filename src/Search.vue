<script>
import { useApiService } from './api/api.service';

export default {
    data() {
        return {
            searchString: '',
            searchResults: null,
            loading: false,
            api: useApiService(),
        };
    },
    methods: {
        async getSearchResults() {
            this.loading = true;
            const searchData = await this.api.getSearch(this.searchString);
            this.loading = false;
            if (searchData && searchData.projects && searchData.projects.length) {
                this.searchResults = searchData.projects;
            }
        },
        projectDetail(project) {
            this.$router.push(`/projects/${project.id}`);
        }
    }
}
</script>

<template>
    <div class="col-md-8 offset-md-2 mt-5 border border-primary p-3">
        <!-- <div class="input-group">
            <input @change="getSearchResults" type="text" v-model="searchString" class="form-control"
                placeholder="Search... Tech | Project" aria-label="search-query">
            <div class="input-group-append">
                <span class="input-group-text p-3"><i class="fa fa-search"></i></span>
            </div>
        </div> -->

        <form @submit.prevent="getSearchResults">
            <div class="input-group">
                <input type="text" v-model="searchString" class="form-control" placeholder="Search... Tech | Project"
                    aria-label="search-query">
                <div class="input-group-append">
                    <button type="submit" class="btn"><i class="fa fa-search"></i></button>
                </div>
            </div>
        </form>

    </div>


    <div v-if="searchString && searchResults && searchResults.length" class="col-md-8 offset-md-2 mt-1 border border-primary p-3">
        <div v-for="(project, index) in searchResults" class="card mb-3" @click="() => projectDetail(project)">
            <div class="card-body">
                <h5 class="card-title">{{ project.name }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ project.tech.join() }}</h6>
            </div>
        </div>
    </div>
</template>
