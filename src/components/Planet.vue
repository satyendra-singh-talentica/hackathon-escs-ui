<script lang="ts">
import { defineComponent } from 'vue';
import { useStarWarsApiService } from '../api/starwarsapi.service';
import TabularView, { type Header } from '../components/generic-components/TabularView.vue';


export default defineComponent({
    setup() {
        const swapi = useStarWarsApiService();
        return { swapi };
    },
    data() {
        const headers: Header[] = [
            {
                name: 'Name',
                key: 'name',
                type: 'text',
                sortable: true,
            },
            {
                name: 'Diameter',
                key: 'diameter',
                type: 'number',
                align: 'right',
                sortable: true,
            },
            {
                name: 'Gravity',
                key: 'gravity',
                type: 'number',
                align: 'right',
            },
            {
                name: 'Pupulation',
                key: 'population',
                type: 'number',
                align: 'right',
                sortable: true,
            }
        ];
        const planets: Planet[] = [];
        return {
            headers,
            planets,
            totalPlanets: -1,
            pageNumber: 1,
            showLoadMore: false,
        };
    },
    methods: {
        async getPlanets() {
            const planetsData = await this.swapi.getPlanets(this.pageNumber);
            if (planetsData) {
                this.showLoadMore = planetsData.next ? true : false;
                this.totalPlanets = planetsData.count;
                if (planetsData.results && planetsData.results.length) {
                    this.planets = [...this.planets, ...planetsData.results];
                    this.pageNumber += 1;
                } else {
                    this.showLoadMore = false;
                }
            }
        }
    },
    async created() {
        await this.getPlanets();
    },
    components: { TabularView, }
});
</script>

<template>
    <div class="my-4">
        <div class="row mb-4">
            <div class="col">
                <div class="card">
                    <div class="card-header h6">
                        Planets <span v-if="totalPlanets >= 0">({{ totalPlanets }})</span>
                    </div>
                    <div class="card-body">
                        <TabularView :headers='headers' :data='planets' showRowNumbers />
                        <div class="text-center">
                            <button v-if="showLoadMore" @click="getPlanets" type="button" class="btn btn-link">Load
                                More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
