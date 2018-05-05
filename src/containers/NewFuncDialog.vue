<template>
  <md-dialog :md-active.sync="isDialogActive"
             @md-opened="opened()"
             @md-closed="close()">
    <md-dialog-title>Deploy A New Function</md-dialog-title>

    <md-dialog-content>
      <md-tabs md-dynamic-height>
        <md-tab md-label="From Store">
          <func-store :functions="storeFunctions"
                      @selected="storeFuncSelected"></func-store>
        </md-tab>

        <md-tab md-label="Manually">
          <func-form ref="form"
                     :model="newFunction"
                     @submitted="newFunctionSubmitted"></func-form>
        </md-tab>
      </md-tabs>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary"
                 @click="close()">Close</md-button>
      <md-button class="md-primary"
                 @click="submitNewFunction()">Deploy</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import axios from 'axios';
import FuncStore from '@/components/FuncStore';
import FuncForm from '@/components/FuncForm';

export default {
  components: { FuncStore, FuncForm },
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
      newFunction: {},
      isDialogActive: false,
      storeFunctions: [],
    };
  },
  methods: {
    storeFuncSelected(func) {
      this.newFunction = func;
    },
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
    submitNewFunction() {
      this.$refs.form.submit();
    },
    newFunctionSubmitted(func) {
      axios.post('../system/functions', func)
        .then(res => {
          console.log('success', res);
        })
        .catch(err => {
          console.error('error', err);
        })
    }
  }
}
</script>

<style scoped>
.md-dialog {
  width: 70%;
}
</style>
