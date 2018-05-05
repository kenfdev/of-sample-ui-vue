<template>
  <md-dialog :md-active.sync="isDialogActive" @md-opened="opened()" @md-closed="close()">
    <md-dialog-title>Deploy A New Function</md-dialog-title>

    <md-dialog-content>
      <md-tabs md-dynamic-height>
        <md-tab md-label="From Store">
          <func-store-page :functions="storeFunctions"></func-store-page>
        </md-tab>

        <md-tab md-label="Manually">
          <manual-deploy-page></manual-deploy-page>
        </md-tab>
      </md-tabs>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="close()">Close</md-button>
      <md-button class="md-primary" @click="deploy()">Deploy</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import axios from 'axios';
import FuncStorePage from '@/containers/FuncStorePage';
import ManualDeployPage from '@/containers/ManualDeployPage';

export default {
  components: { FuncStorePage, ManualDeployPage },
  props: ['showDialog'],
  watch: {
    showDialog(val, oldVal) {
      if (val !== oldVal) {
        this.isDialogActive = val;
      }
    }
  },
  data() {
    return {
      isDialogActive: false,
      storeFunctions: [],
    };
  },
  methods: {
    opened() {
      axios.get('https://raw.githubusercontent.com/openfaas/store/master/store.json')
        .then(res => {
          this.storeFunctions = res.data;
        })
        .catch(err => {
          console.error(err);
          this.message = 'Unable to reach GitHub.com';
        });
    },
    close() {
      this.$emit('closed');
    },
    deploy() {
      this.$emit('submitted');
    }
  }
}
</script>

<style scoped>
.md-dialog {
  max-width: 768px;
}
</style>
