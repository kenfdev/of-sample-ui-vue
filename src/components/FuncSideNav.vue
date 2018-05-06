<template>
  <div>
    <md-app-toolbar class="indigo"
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
    </md-content>

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
.md-toolbar {
  background-color: rgb(63, 81, 181);
}

.md-content.md-theme-default {
  background-color: rgb(255, 255, 255);
}

.md-list-item-button {
  font-size: 16px;
}

.function-list .md-list-item-button {
  height: 88px;
}

.md-toolbar h3.md-title {
  color: rgba(255, 255, 255, 0.87);
  margin-left: 0px;
}

.layout-padding {
  padding: 16px;
}

.md-list-item-content > .md-icon:first-child {
  margin-right: 16px;
}

.md-field {
  margin-bottom: 8px;
}
</style>
