<template>
  <div id="app">
    <main-page></main-page>
  </div>
</template>

<script>
import MainPage from '@/containers/MainPage';

export default {
  name: 'app',
  components: { MainPage }

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
.md-list.md-theme-default .md-list-item.selected .md-list-item-container {
  background-color: rgba(0, 0, 0, 0.12);
}
</style>
