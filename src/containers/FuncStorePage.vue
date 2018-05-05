<template>
  <div>
    <md-content>
      <md-field>
        <label>Search for Function</label>
        <md-input v-model="search"></md-input>
      </md-field>
      <md-list>
        <div v-for="(func, index) in viewableFunctions" :key="index">
          <md-list-item @click="functionSelected(func)">
            <img v-if="func.icon" :src="func.icon" class="md-avatar" :alt="func.name" style="border-radius: 0" />
            <span v-if="!func.icon" class="md-avatar">{{ func.title | limit(1) }}</span>
            <div class="md-list-item-text" layout="column">
              <h3>{{ func.title }}</h3>
              <p>{{ func.description }}</p>
            </div>
            <md-button v-if="func.repo_url" class="md-icon-button md-list-action" @click="openRepo(func.repo_url)">
              <md-icon class="md-primary" md-src="static/img/icons/ic_link_black_24px.svg"></md-icon>
            </md-button>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
        </div>
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
.md-list-item-text {
  white-space: normal;
}
</style>
