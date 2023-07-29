<script>
export default {
  props: {
    user: Object,
    min: Boolean,
  },
  methods: {
    getExperience() {
      const doj = new Date(this.user.dateOfJoining);
      const now = new Date();
      let diff = (now.getTime() - doj.getTime()) / 1000;
      diff /= (60 * 60 * 24);
      return Math.abs(Math.round(diff / 365.25));
    }
  },
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title mb-2">{{ user.name }} | {{ user.designation }}</h5>
      <h6 class="card-subtitle mb-3 text-muted">{{ user.email }}</h6>
      <div v-if="!min">
        <p class="card-text">Work experience : {{ getExperience() }} years</p>
        <p class="card-text">{{ user.github }}</p>
      </div>
    </div>
  </div>
</template>
