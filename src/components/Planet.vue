<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStarWarsApiService } from '../api/starwarsapi.service';
import TabularView, { type Header } from '../components/generic-components/TabularView.vue';


export default defineComponent({
    components: { TabularView },
    setup() {
        const swapi = useStarWarsApiService();

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
                name: 'Population',
                key: 'population',
                type: 'number',
                align: 'right',
                sortable: true,
            },
        ];

        const planets = ref<Planet[]>([]);
        const totalPlanets = ref(0);
        const pageNumber = ref(1);

        const getPlanets = async () => {
            const planetsData = await swapi.getPlanets(pageNumber.value);
            if (planetsData) {
                setTotalPlanets(planetsData.count);
                if (planetsData.results && planetsData.results.length) {
                    setPlanets(planetsData.results);
                    incrementPageNumber();
                }
            }
        };

        const setTotalPlanets = (count: number) => {
            totalPlanets.value = count;
        };

        const setPlanets = (newPlanets: Planet[]) => {
            planets.value = [...planets.value, ...newPlanets];
        };

        const incrementPageNumber = () => {
            pageNumber.value += 1;
        };

        onMounted(async () => {
            await getPlanets();
        });

        return {
            headers,
            planets,
            totalPlanets,
            getPlanets,
        };
    },
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
                            <button v-if="planets.length < totalPlanets" @click="getPlanets" type="button"
                                class="btn btn-link">Load
                                More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
