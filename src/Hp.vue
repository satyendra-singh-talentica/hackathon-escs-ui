<script>
import HpCard from './HpCard.vue';
import UserCard from './UserCard.vue';
import { useApiService } from './api/api.service';

export default {
  data() {
    return {
      hp: null,
      loading: false,
      api: useApiService(),
    };
  },
  methods: {
    async getHp(hpId) {
      this.loading = true;
      const hpData = await this.api.getHp(hpId);
      this.loading = false;
      if (hpData && hpData.id) {
        this.hp = hpData;
      }
    },
    userDetail(userId) {
      this.$router.push(`/users/${userId}`);
    }
  },
  mounted() {
    this.getHp(this.$route.params.id);
  },
  components: { HpCard, UserCard }
}
</script>

<template>
  <div class="col-md-12 border border-primary p-3">

    <div v-if="hp">
      <h6>Hard-Problem:</h6>
      <HpCard :hp="hp" />

      <h6>Author:</h6>
      <UserCard :user="hp.user" min @click="() => userDetail(hp.user.id)" />
    </div>
  </div>
</template>