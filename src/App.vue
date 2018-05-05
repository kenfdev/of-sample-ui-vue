<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.md-dialog .md-tabs-content {
  /* overflow: scroll !important; */
}
.md-dialog .md-tabs-navigation {
  display: block;
}
.md-dialog > .md-dialog-container {
  width: 100%;
}
</style>
