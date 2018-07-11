<template>
  <v-app>
    <v-navigation-drawer permanent>
      <func-side-nav :functions="functions" :selected-function="selectedFunction" @selected="showFunction" @new-func-requested="showNewFuncDialog"></func-side-nav>
      <new-func-dialog :show-dialog="isShowNewFuncDialog" @closed="onDialogClose" @func-created="onFuncCreated"></new-func-dialog>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <!-- <func-detail v-if="selectedFunction" :func="selectedFunction" :invocation-in-progress="invocationInProgress" :invocation-status="invocationStatus" :round-trip-duration="roundTripDuration" :invocation-response="invocationResponse" @invoked="onInvoke" @deleted="onDelete"></func-detail> -->
        <!-- <p v-else>Select a Function</p> -->
      </v-container>
    </v-content>
  </v-app>
  <!-- <md-app>
    <md-app-drawer md-permanent="clipped"
                   class="md-elevation-3">
      <func-side-nav :functions="functions"
                     :selected-function="selectedFunction"
                     @selected="showFunction"
                     @new-func-requested="showNewFuncDialog"></func-side-nav>
      <new-func-dialog :show-dialog="isShowNewFuncDialog"
                       @closed="onDialogClose"
                       @func-created="onFuncCreated"></new-func-dialog>
    </md-app-drawer>

    <md-app-content>
      <func-detail v-if="selectedFunction"
                   :func="selectedFunction"
                   :invocation-in-progress="invocationInProgress"
                   :invocation-status="invocationStatus"
                   :round-trip-duration="roundTripDuration"
                   :invocation-response="invocationResponse"
                   @invoked="onInvoke"
                   @deleted="onDelete"></func-detail>
      <p v-else>Select a Function</p>
      <md-snackbar md-position="left"
                   :md-duration="1000"
                   :md-active.sync="isShowToast">
        <span>{{ toastContent }}</span>
      </md-snackbar>
    </md-app-content>
  </md-app> -->
</template>

<script>
import NewFuncDialog from '@/containers/NewFuncDialog';
import FuncSideNav from '@/components/FuncSideNav';
import FuncDetail from '@/components/FuncDetail';

import { tryDownload, uuidv4 } from '@/shared';

const FETCH_FUNCTIONS_DELAY = 3500;
const QUERY_FUNCTION_DELAY = 2500;

export default {
  components: { FuncSideNav, FuncDetail, NewFuncDialog },
  data() {
    return {
      isShowNewFuncDialog: false,
      selectedFunction: null,
      functions: [],
      fetchFuncInterval: null,
      queryFuncInterval: null,
      isShowToast: false,
      toastContent: '',
      invocationInProgress: false,
      invocationStart: null,
      invocationStatus: '',
      roundTripDuration: '',
      invocationResponse: '',
    };
  },
  mounted() {
    console.log('mounted')
    this.fetchFuncInterval = setInterval(() => {
      this.loadFunctions();
    }, FETCH_FUNCTIONS_DELAY)

    this.queryFuncInterval = setInterval(() => {
      if (!this.selectedFunction) {
        return;
      }
      this.$functions.queryFunction(this.selectedFunction)
        .then(data => {
          const updatedSelectedFunction = Object.assign({}, this.selectedFunction, {
            ready: data && data.availableReplicas > 0,
          })
          this.selectedFunction = updatedSelectedFunction;
        });
    }, QUERY_FUNCTION_DELAY)

    this.loadFunctions();
  },
  beforeDestroy() {
    clearInterval(this.fetchFuncInterval);
    clearInterval(this.fetchFuncInterval);
  },
  methods: {
    loadFunctions() {
      this.$functions.fetchFunctions()
        .then(data => {
          console.log('fetched', data);
          this.functions = data;
        })
    },
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
      this.invocationInProgress = true;
      this.invocationResponse = '';
      this.invocationStatus = null;
      this.roundTripDuration = '';
      this.invocationStart = new Date().getTime()

      this.$functions.invoke(this.selectedFunction, invocation)
        .then(response => {
          const { data, status } = response;

          if (invocation.contentType === 'binary') {
            var filename = uuidv4();

            if (this.selectedFunction.labels) {
              var ext = this.selectedFunction.labels['com.openfaas.ui.ext'];
              if (ext && ext.length > 0) {
                filename = filename + '.' + ext;
              }
            }

            var caught = tryDownload(data, filename);
            if (caught) {
              console.log(caught);
              this.invocationResponse = caught
            } else {
              this.invocationResponse = data.byteLength + ' byte(s) received';
            }
          } else {
            if (typeof data === 'object') {
              this.invocationResponse = JSON.stringify(data, null, 2);
            } else {
              this.invocationResponse = data;
            }
          }

          this.invocationInProgress = false;
          this.invocationStatus = status;
          var now = new Date().getTime();
          this.roundTripDuration = (now - this.invocationStart) / 1000;
          this.showToast('Success');
        }).catch(error1 => {
          // FIXME: fix logic
          console.error(error1);
          this.invocationInProgress = false;
          this.invocationResponse = error1.statusText + '\n' + error1.data;
          this.invocationStatus = error1.status;
          var now = new Date().getTime();
          this.roundTripDuration = (now - this.invocationStart) / 1000;

          this.showToast('Error');
        });
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
.md-drawer {
  width: 320px;
  min-height: 100vh;
}
</style>
