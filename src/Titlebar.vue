<script>
import { useUserStore } from './stores/user.store';

export default {
    data() {
        return {
            userStore: useUserStore(),
        };
    },
    methods: {
        getPath() {
            return `/users/${this.userStore.getUserId}`;
        },
        print() {
            window.print();
        },
        addProject() {
            this.$router.push(`/add-project`)
        },
        addHp() {
            this.$router.push(`/add-hp`)
        }
    }
}
</script>

<template>
    <div class="row p-2">
        <div class="col d-flex">
            <p class="text-start flex-grow-1">
                <router-link v-if="$route.path !== '/'" to="/" custom v-slot="{ navigate }">
                    <button @click="navigate" role="link" type="button" class="btn btn-light"><i
                            class="fa fa-home"></i></button>
                </router-link>
            </p>

            <div class="d-inline-flex text-right ml-2">
                <button v-if="$route.path.includes('/users')" @click="print" type="button" class="btn btn-light"><i
                        class="fa fa-print"></i></button>
            </div>

            <div class="d-inline-flex text-right ml-2">
                <button v-if="$route.path.includes('/users') && userStore.getUserName" @click="addProject" type="button" class="btn btn-light"><i
                        class="fa fa-add"></i> Project</button>
            </div>

            <div class="d-inline-flex text-right ml-2">
                <button v-if="$route.path.includes('/users') && userStore.getUserName" @click="addHp" type="button" class="btn btn-light"><i
                        class="fa fa-add"></i> Hard Problem</button>
            </div>

            <div class="d-inline-flex text-right ml-2">
                <router-link v-if="userStore && userStore.getUserName" :to="getPath()" custom v-slot="{ navigate }">
                    <button @click="navigate" role="link" type="button" class="btn btn-light"><i class="fa fa-user"></i>
                        {{ userStore.getUserName }}</button>
                </router-link>
            </div>

            <div class="d-inline-flex text-right">
                <router-link v-if="($route.path !== '/login' && !userStore.getUserId)" to="/login" custom
                    v-slot="{ navigate }">
                    <button @click="navigate" role="link" type="button" class="btn btn-primary" data-bs-toggle="tooltip"
                        data-bs-placement="down" title="Login to access and update your profile"><i class="fa fa-user"></i>
                        Login</button>
                </router-link>
            </div>
        </div>
    </div>
</template>
