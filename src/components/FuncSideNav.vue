<template>
  <div>
    <!-- <md-app-toolbar class="indigo"
                    md-elevation="0">
      <a href="https://www.openfaas.com/"
         target="_blank"><img src="static/img/icon.png"
             alt="OpenFaaS Icon"
             width="60px"
             height="60px" /></a>
      <h3 class="md-title">&nbsp; OpenFaaS Portal</h3>
    </md-app-toolbar>
    <md-content class="layout-padding">
      <md-list>
        <md-list-item @click="deployNewFunction()">
          <md-icon md-src="static/img/icons/ic_shop_two_black_24px.svg"></md-icon>
          <span class="primary md-list-item-text">Deploy New Function</span>
        </md-list-item>
      </md-list>
      <md-field v-if="isSearchVisible">
        <label>Search for Function</label>
        <md-input v-model="search"></md-input>
      </md-field>
      <md-list class="function-list">
        <div v-for="(func, index) in viewableFunctions"
             :key="index">
          <md-list-item @click="functionSelected(func)"
                        :class="{ selected: isFuncSelected(func) }">
            {{func.name}}
          </md-list-item>
          <md-divider v-if="!(index === viewableFunctions.length - 1)"></md-divider>
        </div>
      </md-list>
    </md-content> -->
    <v-toolbar color="indigo" flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            OpenFaaS Portal
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile @click="deployNewFunction()">
        <v-list-tile-action>
          <v-icon>shop_two</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Deploy New Function</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-for="(func, index) in viewableFunctions" :key="index" @click="functionSelected(func)">

        <v-list-tile-content>
          <v-list-tile-title>{{ func.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </div>
</template>

<script>
export default {
  props: ['functions', 'selectedFunction'],
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
    },
    isFuncSelected(func) {
      return this.selectedFunction && this.selectedFunction.name === func.name;
    }
  }
}
</script>

<style scoped>
</style>
