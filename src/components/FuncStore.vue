<template>
  <div>
    <md-content>
      <md-field>
        <label>Search for Function</label>
        <md-input v-model="search"></md-input>
      </md-field>
      <md-list>
        <func-store-list-item v-for="(func, index) in viewableFunctions"
                              :key="index"
                              :item="func"
                              :is-selected="isFunctionSelected(func)"
                              @selected="functionSelected"
                              @link-clicked="openRepo">
        </func-store-list-item>
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
      selectedFunction: null,
      search: '',
    };
  },
  computed: {
    viewableFunctions() {
      return this.functions.filter(f => f.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    isFunctionSelected(func) {
      return this.selectedFunction && this.selectedFunction.name === func.name;
    },
    functionSelected(func) {
      this.selectedFunction = func;
      this.$emit('selected', func);
    },
    openRepo(url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style scoped>
.md-list.md-theme-default {
  background-color: transparent;
}
</style>
