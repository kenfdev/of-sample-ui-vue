<template>
  <!-- <md-dialog :md-active.sync="isDialogActive"
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
  </md-dialog> -->
  <v-dialog v-model="isDialogActive" scrollable persistent width="70%">
    <v-card>
      <v-card-title class="indigo">
        <span class="headline">Deploy a new function</span>
      </v-card-title>
      <v-card-text>
        <v-tabs slider-color="pink">
          <v-tab href="#tab-1" ripple>
            From Store
          </v-tab>
          <v-tab href="#tab-2" ripple>
            Manually
          </v-tab>
          <v-tab-item id="tab-1">
            <func-store :functions="storeFunctions" @selected="storeFuncSelected"></func-store>
          </v-tab-item>
          <v-tab-item id="tab-2">
            <func-form ref="form" :model="newFunction" @submitted="newFunctionSubmitted"></func-form>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close()">Close Dialog</v-btn>
        <v-btn color="blue darken-1" flat @click.native="submitNewFunction()">Deploy</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FuncStore from '@/components/FuncStore';
import FuncForm from '@/components/FuncForm';

export default {
  components: { FuncStore, FuncForm },
  props: ['showDialog'],
  watch: {
    showDialog(val, oldVal) {
      if (val === oldVal) {
        return;
      }
      this.isDialogActive = val;
      if (val === true) {
        this.opened();
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
      this.$functions.fetchStore()
        .then(data => {
          this.storeFunctions = data;
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
      this.$functions.create(func)
        .then(res => {
          this.$emit('func-created', res);
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
span.md-dialog-title.md-title {
  background-color: rgb(63, 81, 181);
  color: rgba(255, 255, 255, 0.87);
  margin-bottom: 0;
  padding-top: 21px;
  padding-bottom: 17px;
}
</style>
