<template>
  <div>
    <md-content>
      <md-field>
        <label>Search for Function</label>
        <md-input v-model="search"></md-input>
      </md-field>
      <md-list>
        <func-store-list-item :item="func" v-for="(func, index) in viewableFunctions" :key="index" @selected="functionSelected" @link-clicked="openRepo"></func-store-list-item>
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
    functionSelected(func) {
      console.log('selected', func);
    },
    openRepo(url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style scoped>
</style>
