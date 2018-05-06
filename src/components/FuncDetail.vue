<template>
  <div>
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ func.name }}</div>
        </md-card-header-text>

        <md-button class="md-icon-button"
                   @click="deleteFunc()">
          <md-icon md-src="static/img/icons/ic_delete_black.svg"></md-icon>
        </md-button>
        <md-dialog-confirm :md-active.sync="isShowDeleteDialog"
                           md-title="Delete Function"
                           :md-content="`Are you sure you want to delete ${func.name}?`"
                           md-confirm-text="OK"
                           md-cancel-text="CANCEL"
                           @md-confirm="onDeleteConfirm" />

      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <md-field class="md-layout-item">
            <label>Replicas</label>
            <md-input v-model="func.replicas"
                      readonly></md-input>
          </md-field>
          <md-field class="md-layout-item">
            <label>Invocation Count</label>
            <md-input v-model="func.invocationCount"
                      readonly></md-input>
          </md-field>
        </div>
        <div class="md-layout">
          <md-field class="md-layout-item">
            <label>Image</label>
            <md-input v-model="func.image"
                      readonly></md-input>
          </md-field>
        </div>
      </md-card-content>
    </md-card>
    <md-card>
      <md-card-header>
        <div class="md-title">Invoke Function</div>
      </md-card-header>

      <md-card-content>
        <md-button class="md-raised"
                   @click="invoke()">Invoke</md-button>
        <div>
          <md-radio v-model="invocation.contentType"
                    value="text">Text</md-radio>
          <md-radio v-model="invocation.contentType"
                    value="json">JSON</md-radio>
          <md-radio v-model="invocation.contentType"
                    value="binary">Download</md-radio>
        </div>
        <md-field>
          <label>Request Body</label>
          <md-textarea v-model="invocation.request"
                       cols="80"
                       rows="4"></md-textarea>
        </md-field>
        <div class="md-layout">
          <md-field class="md-layout-item">
            <label>Response Status</label>
            <md-input v-model="invocationStatus"
                      readonly></md-input>
          </md-field>
          <md-field class="md-layout-item">
            <label>Round-trip (s)</label>
            <md-input v-model="roundTripDuration"
                      readonly></md-input>
          </md-field>
        </div>
        <md-field>
          <label>Response Body</label>
          <md-textarea v-model="invocationResponse"
                       :disabled="true"
                       cols="80"
                       rows="10"></md-textarea>
        </md-field>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  props: ['func'],
  data() {
    return {
      invocation: {
        contentType: 'text',
        request: '',
      },
      invocationStatus: '',
      roundTripDuration: '',
      invocationResponse: '',
      isShowDeleteDialog: false,
    }
  },
  methods: {
    invoke() {
      this.$emit('invoked', this.invocation);
    },
    deleteFunc() {
      this.isShowDeleteDialog = true;
    },
    onDeleteConfirm() {
      this.$emit('deleted', this.func);
    },
  }
}
</script>

<style scoped>
.md-radio {
  display: flex;
}
</style>
