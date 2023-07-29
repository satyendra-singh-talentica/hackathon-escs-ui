<script>
import { useApiService } from './api/api.service';

export default {
    data() {
        return {
            searchString: '',
            searchResults: null,
            loading: false,
            activeTab: 'projects',
            api: useApiService(),
        };
    },
    methods: {
        async getSearchResults() {
            this.loading = true;
            const searchData = await this.api.getSearch(this.searchString);
            this.loading = false;
            if (searchData) {
                this.searchResults = searchData;
            }
        },
        projectDetail(project) {
            this.$router.push(`/projects/${project.id}`);
        },
        hpDetail(hp) {
            this.$router.push(`/hps/${hp.id}`);
        },
        getTabClass(tabId) {
            return this.activeTab === tabId ? 'nav-link active' : 'nav-link';
        },
        getTabBodyClass(tabId) {
            return this.activeTab === tabId ? 'tab-pane mb-3 fade show active' : 'tab-pane mb-3 fade';
        },
        setActiveTab(tabId) {
            this.activeTab = tabId;
        }
    }
}
</script>

<template>
    <div class="col-md-8 offset-md-2 mt-5 border border-primary p-3">
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

    <div v-if="searchString && searchResults" class="col-md-8 offset-md-2 mt-1 border border-primary p-3">
        <nav class="nav nav-tabs" id="nav-tab" role="tablist">
            <a v-bind:class="getTabClass('projects')" @click="setActiveTab('projects')" data-bs-toggle="tab" href="#"
                role="tab" aria-controls="nav-home" aria-selected="true">Projects ({{ searchResults.projects.length
                }})</a>
            <a v-bind:class="getTabClass('hps')" @click="setActiveTab('hps')" data-bs-toggle="tab" href="#" role="tab"
                aria-controls="nav-home" aria-selected="true">Hard-Problems ({{ searchResults.hps.length
                }})</a>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div v-bind:class="getTabBodyClass('projects')" role="tabpanel" aria-labelledby="nav-home-tab">
                <div v-for="(project, index) in searchResults.projects" class="card mb-3"
                    @click="() => projectDetail(project)">
                    <div class="card-body">
                        <h5 class="card-title">{{ project.name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ project.tech.join(", ") }}</h6>
                    </div>
                </div>
            </div>
            <div v-bind:class="getTabBodyClass('hps')" role="tabpanel" aria-labelledby="nav-home-tab">
                <div v-for="(hp, index) in searchResults.hps" class="card mb-3" @click="() => hpDetail(hp)">
                    <div class="card-body">
                        <h5 class="card-title">{{ hp.name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ hp.tech.join(", ") }}</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
