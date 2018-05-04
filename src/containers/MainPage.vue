<template>
  <md-app>
    <md-app-drawer md-permanent="clipped">
      <func-side-nav :functions="functions" @selected="showFunction" @new-func-requested="showNewFuncDialog"></func-side-nav>
      <new-func-dialog :show-dialog="isShowNewFuncDialog" @closed="onDialogClose" @submitted="deployFunction"></new-func-dialog>
    </md-app-drawer>

    <md-app-content>
      <func-detail v-if="selectedFunction" :func="selectedFunction" @invoked="onInvoke"></func-detail>
      <p v-else>Select a Function</p>
    </md-app-content>
  </md-app>
</template>

<script>
import NewFuncDialog from '@/containers/NewFuncDialog';
import FuncSideNav from '@/components/FuncSideNav';
import FuncDetail from '@/components/FuncDetail';
import axios from 'axios';

const FETCH_FUNCTIONS_DELAY = 3500;

export default {
  components: { FuncSideNav, FuncDetail, NewFuncDialog },
  data() {
    return {
      isShowNewFuncDialog: false,
      selectedFunction: null,
      functions: [],
      fetchFuncInterval: null,
    };
  },
  mounted() {
    console.log('mounted')
    this.fetchFuncInterval = setInterval(() => {
      axios.get('../system/functions')
        .then(res => {
          console.log('fetched', res.data);
          this.functions = res.data;
        })
    }, FETCH_FUNCTIONS_DELAY)
  },
  beforeDestroy() {
    clearInterval(this.fetchFuncInterval);
  },
  methods: {
    showNewFuncDialog() {
      console.log(this.isShowNewFuncDialog);
      this.isShowNewFuncDialog = true;
      console.log(this.isShowNewFuncDialog);
    },
    onDialogClose() {
      this.isShowNewFuncDialog = false;
    },
    deployFunction() {
      this.isShowNewFuncDialog = false;
    },
    showFunction(func) {
      this.selectedFunction = func;
    },
    onInvoke(invocation) {
      // FIXME: Invoke Function
      console.log(invocation);
    }
  }
};
</script>

<style scoped>

</style>
