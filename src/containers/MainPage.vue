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
import NewFuncDialog from '@/components/NewFuncDialog';
import FuncSideNav from '@/components/FuncSideNav';
import FuncDetail from '@/components/FuncDetail';

export default {
  components: { FuncSideNav, FuncDetail, NewFuncDialog },
  data() {
    return {
      isShowNewFuncDialog: false,
      selectedFunction: null,
      // FIXME: mock data
      functions: [
        { name: 'Function A', replicas: 1, invocationCount: 1, image: 'image/function-a' },
        { name: 'Function B', replicas: 1, invocationCount: 1, image: 'image/function-b' },
      ]
    };
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
