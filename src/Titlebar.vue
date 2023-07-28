<script setup lang="ts">
</script>

<template>
  <div class="row p-2">
    <div class="text-end">
      <router-link to="/login" custom v-slot="{ navigate }">
        <button @click="navigate" role="link" type="button" class="btn btn-primary" data-bs-toggle="tooltip"
          data-bs-placement="down" title="Login to access and update your profile"><i class="fa fa-user"></i>
          Login</button>
      </router-link>
    </div>
  </div>
</template>
