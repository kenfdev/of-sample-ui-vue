<template>
  <md-dialog :md-active.sync="isDialogActive" @md-closed="close()">
    <md-dialog-title>Preferences</md-dialog-title>

    <md-tabs md-dynamic-height>
      <md-tab md-label="General">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
      </md-tab>

      <md-tab md-label="Activity">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
      </md-tab>

    </md-tabs>

    <md-dialog-actions>
      <md-button class="md-primary" @click="close()">Close</md-button>
      <md-button class="md-primary" @click="deploy()">Deploy</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
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
    };
  },
  methods: {
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
