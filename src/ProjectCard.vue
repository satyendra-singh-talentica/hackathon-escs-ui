<script>
import KeyValuePair from './KeyValuePair.vue';

export default {
  props: {
    project: Object
  },
  methods: {
    getDate(date) {
      const now = new Date(date);
      const monthsInText = ['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      return `${now.getDate()} ${monthsInText[now.getMonth()]} ${now.getFullYear()}`;
    },
    getStartDate() {
      return this.getDate(this.project.startDate);
    },
    getEndDate() {
      return this.getDate(this.project.endDate);
    }
  },
  components: { KeyValuePair }
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title mb-2">{{ project.name }} | {{ project.client }}</h5>
      <h6 class="card-subtitle mb-3 text-muted">{{ getStartDate() }} {{ project.endDate ? ` - ${getEndDate()}` :
        '' }}</h6>
      <p class="card-text">{{ project.description }}</p>
      <p class="card-text">Tech Stack : {{ project.tech.join(', ') }}</p>
    </div>
  </div>
</template>
