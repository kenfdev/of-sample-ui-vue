<template>
  <div>
    <md-app-toolbar>
      <a href="https://www.openfaas.com/" target="_blank"><img src="static/img/icon.png" alt="OpenFaaS Icon" width="60px" height="60px" class="md-avatar" /></a>
      <h3 class="md-title">&nbsp; OpenFaaS Portal</h3>
    </md-app-toolbar>
    <md-content>
      <md-list>
        <md-list-item @click="deployNewFunction()">
          <md-icon md-src="static/img/icons/ic_shop_two_black_24px.svg"></md-icon>
          <span class="md-list-item-text">Deploy New Function</span>
        </md-list-item>
      </md-list>
      <md-field v-if="isSearchVisible">
        <label>Search for Function</label>
        <md-input v-model="search"></md-input>
      </md-field>
      <md-list>
        <md-list-item @click="functionSelected(func)" v-for="(func, index) in viewableFunctions" :key="index">
          {{func.name}}
        </md-list-item>
      </md-list>
    </md-content>

  </div>
</template>

<script>
export default {
  props: ['functions'],
  data() {
    return {
      search: '',
    };
  },
  computed: {
    isSearchVisible() {
      return this.functions && this.functions.length > 0;
    },
    viewableFunctions() {
      return this.functions.filter(f => f.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    deployNewFunction() {
      this.$emit('new-func-requested');
    },
    functionSelected(func) {
      this.$emit('selected', func);
    }
  }
}
</script>

<style>

</style>
