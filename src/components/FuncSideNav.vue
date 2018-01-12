<template>
  <div>
    <md-app-toolbar>
      <a href="https://www.openfaas.com/" target="_blank"><img src="static/img/icon.png" alt="OpenFaaS Icon" width="60px" height="60px" class="md-avatar" /></a>
      <h3 class="md-title">&nbsp; OpenFaaS Portal</h3>
    </md-app-toolbar>
    <md-content>
      <md-list>
        <md-list-item @click="newFunction()">
          <md-icon md-src="static/img/icons/ic_shop_two_black_24px.svg"></md-icon>
          <span class="md-list-item-text">Deploy New Function</span>
        </md-list-item>
        <new-func-dialog :show-dialog="showNewFuncDialog" :on-close="onClose" :on-deploy="onDeploy"></new-func-dialog>
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
import NewFuncDialog from '@/components/NewFuncDialog';
export default {
  components: { NewFuncDialog },
  props: ['functions', 'selected'],
  data() {
    return {
      search: '',
      showNewFuncDialog: false,
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
    newFunction() {
      console.log(this.showNewFuncDialog);
      this.showNewFuncDialog = true;
      console.log(this.showNewFuncDialog);
    },
    onClose() {
      this.showNewFuncDialog = false;
    },
    onDeploy() {
      this.showNewFuncDialog = false;
    },
    functionSelected(func) {
      this.selected(func);
    }
  }
}
</script>

<style>

</style>
