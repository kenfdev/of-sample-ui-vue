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
.md-icon.md-icon-image.link svg {
  fill: #303aa5;
  opacity: 0.6;
}

.md-app-internal-drawer .md-app-scroller {
  overflow: hidden;
}
.md-content.md-theme-default {
  color: rgba(0, 0, 0, 0.87);
  background-color: rgb(250, 250, 250);
}
.md-app-content {
  padding: 0;
}
.md-field.md-has-value .md-textarea {
  font-size: 19px;
}

.md-app-content .md-card {
  margin: 8px;
}

.md-field.md-theme-default:after {
  background-color: rgba(0, 0, 0, 0.12);
}
.md-field.md-theme-default.md-has-textarea:not(.md-autogrow):after {
  border-color: rgba(0, 0, 0, 0.12);
}
.layout-padding {
  padding: 8px;
}

.md-field.md-has-textarea:not(.md-autogrow) label {
  left: 0px;
}

.md-field.md-has-textarea:not(.md-autogrow) .md-textarea {
  resize: none;
  padding: 0px;
}

.md-field.md-has-textarea:not(.md-autogrow):before,
.md-field.md-has-textarea:not(.md-autogrow):after {
  border-radius: 0px;
  border-left: 0;
  border-right: 0;
  border-top: 0;
}
.md-dialog .md-tabs-navigation {
  display: block;
}
.md-dialog > .md-dialog-container {
  width: 100%;
}
.md-list.md-theme-default .md-list-item.selected .md-list-item-container {
  background-color: rgba(158, 158, 158, 0.2);
}
.md-radio .md-radio-label {
  padding-left: 10px;
}
.md-radio.md-theme-default.md-checked .md-radio-container {
  border-color: rgba(63, 81, 181, 0.87);
}
.md-radio.md-theme-default.md-checked .md-radio-container:after {
  background-color: rgba(63, 81, 181, 0.87);
}
.md-radio.md-theme-default.md-checked .md-ripple {
  color: black;
}
.primary {
  color: rgb(63, 81, 181);
  font-weight: 500;
}
.md-button.md-theme-default.md-raised:not([disabled]) {
  color: rgb(33, 33, 33);
  background-color: rgb(250, 250, 250);
}
.md-field.md-theme-default label {
  color: rgba(0, 0, 0, 0.38);
}
.md-button.md-icon-button {
  margin: 0 6px;
}
</style>
