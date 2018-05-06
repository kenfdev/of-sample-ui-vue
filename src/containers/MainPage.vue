<template>
  <md-app>
    <md-app-drawer md-permanent="clipped">
      <func-side-nav :functions="functions"
                     @selected="showFunction"
                     @new-func-requested="showNewFuncDialog"></func-side-nav>
      <new-func-dialog :show-dialog="isShowNewFuncDialog"
                       @closed="onDialogClose"
                       @func-created="onFuncCreated"></new-func-dialog>
    </md-app-drawer>

    <md-app-content>
      <func-detail v-if="selectedFunction"
                   :func="selectedFunction"
                   @invoked="onInvoke"
                   @deleted="onDelete"></func-detail>
      <p v-else>Select a Function</p>
      <md-snackbar md-position="left"
                   :md-duration="1000"
                   :md-active.sync="isShowToast">
        <span>{{ toastContent }}</span>
      </md-snackbar>
    </md-app-content>
  </md-app>
</template>

<script>
import NewFuncDialog from '@/containers/NewFuncDialog';
import FuncSideNav from '@/components/FuncSideNav';
import FuncDetail from '@/components/FuncDetail';

const FETCH_FUNCTIONS_DELAY = 3500;

export default {
  components: { FuncSideNav, FuncDetail, NewFuncDialog },
  data() {
    return {
      isShowNewFuncDialog: false,
      selectedFunction: null,
      functions: [],
      fetchFuncInterval: null,
      isShowToast: false,
      toastContent: '',
    };
  },
  mounted() {
    console.log('mounted')
    this.fetchFuncInterval = setInterval(() => {
      this.$functions.fetchFunctions()
        .then(data => {
          console.log('fetched', data);
          this.functions = data;
        })
    }, FETCH_FUNCTIONS_DELAY)
  },
  beforeDestroy() {
    clearInterval(this.fetchFuncInterval);
  },
  methods: {
    showNewFuncDialog() {
      this.isShowNewFuncDialog = true;
    },
    onDialogClose() {
      this.isShowNewFuncDialog = false;
    },
    showFunction(func) {
      this.selectedFunction = func;
    },
    onInvoke(invocation) {
      // FIXME: Invoke Function
      console.log(invocation);
    },
    showToast(content) {
      this.toastContent = content;
      this.isShowToast = true;
    },
    onFuncCreated() {
      this.showToast('Success');
      this.isShowNewFuncDialog = false;
    },
    onDelete(func) {
      this.$functions.delete(func)
        .then(() => {
          this.showToast('Success');
          this.selectedFunction = null;
        });
    }
  }
};
</script>

<style scoped>

</style>
