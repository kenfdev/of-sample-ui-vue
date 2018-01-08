<template>
  <md-list>
    <md-list-item @click="functionSelected(func)" v-for="(func, index) in functions" :key="index">
      {{func.name}}
    </md-list-item>
  </md-list>
</template>

<script>
export default {
  props: ['functions', 'selected'],
  methods: {
    functionSelected(func) {
      this.selected(func);
    }
  }
}
</script>

<style>

</style>
