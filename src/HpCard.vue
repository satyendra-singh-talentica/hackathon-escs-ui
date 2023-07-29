<script>
export default {
  props: {
    hp: Object
  },
  methods: {
  },
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title mb-2">{{ hp.name }}</h5>
      <p class="card-text">{{ hp.description }}</p>
      <p v-if="hp.doclink" class="card-text">Doc : <a v-bind:href="hp.doclink">{{ hp.doclink }}</a></p>
      <p class="card-text">Tech Stack : {{ hp.tech.join(', ') }}</p>
    </div>
  </div>
</template>
