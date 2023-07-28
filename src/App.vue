<script setup lang="ts">
import Titlebar from './Titlebar.vue';


</script>

<template>
  <div>
    <Titlebar />
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
