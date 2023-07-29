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
        }
    }
}
</script>

<template>
    <div class="row p-2">
        <div class="text-end">

            <button v-if="$route.path.includes('/users')" @click="print" type="button" class="btn btn-light"><i
                    class="fa fa-print"></i></button>

            <router-link v-if="$route.path !== '/'" to="/" custom v-slot="{ navigate }">
                <button @click="navigate" role="link" type="button" class="btn btn-light"><i
                        class="fa fa-home"></i></button>
            </router-link>

            <router-link v-if="userStore && userStore.getUserName" :to="getPath()" custom v-slot="{ navigate }">
                <button @click="navigate" role="link" type="button" class="btn btn-light"><i class="fa fa-user"></i>
                    {{ userStore.getUserName }}</button>
            </router-link>

            <router-link v-if="($route.path !== '/login' && !userStore.getUserId)" to="/login" custom v-slot="{ navigate }">
                <button @click="navigate" role="link" type="button" class="btn btn-primary" data-bs-toggle="tooltip"
                    data-bs-placement="down" title="Login to access and update your profile"><i class="fa fa-user"></i>
                    Login</button>
            </router-link>
        </div>
    </div>
</template>
