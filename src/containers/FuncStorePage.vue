<template>
  <div>
    <md-content>
      <md-field>
        <label>Search for Function</label>
        <md-input v-model="search"></md-input>
      </md-field>
      <md-list>
        <md-list-item @click="functionSelected(func)" v-for="(func, index) in viewableFunctions" :key="index">
          <img v-if="func.icon" :src="func.icon" class="md-avatar" :alt="func.name" style="border-radius: 0" />
          <span v-if="!func.icon" class="md-avatar">{{ func.title | limit(1) }}</span>
          <div class="md-list-item-text" layout="column">
            <h3>{{ func.title }}</h3>
            <p>{{ func.description }}</p>
          </div>
          <md-icon v-if="func.repo_url" class="link md-secondary" @click="openRepo(func.repo_url)" aria-label="repo-link" md-svg-src="img/icons/ic_link_black_24px.svg"></md-icon>
          <!-- <md-divider md-inset ng-if="!$last"></md-divider> -->
        </md-list-item>
      </md-list>
    </md-content>
  </div>
</template>

<script>
import FuncStoreListItem from '@/components/FuncStoreListItem';
export default {
  components: { FuncStoreListItem },
  props: ['functions'],
  data() {
    return {
      search: '',
    };
  },
  computed: {
    viewableFunctions() {
      return this.functions.filter(f => f.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    openRepo(url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style scoped>

</style>
