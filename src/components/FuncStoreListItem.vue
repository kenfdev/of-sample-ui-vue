<template>
  <div>
    <md-list-item :class="{ selected: isSelected }" @click="selectItem(item)">
      <img v-if="item.icon" :src="item.icon" class="md-avatar" :alt="item.name" style="border-radius: 0" />
      <span v-if="!item.icon" class="md-avatar">{{ item.title | limit(1) }}</span>
      <div class="md-list-item-text" layout="column">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
      <md-button v-if="item.repo_url" class="md-icon-button md-list-action" @click="openLink(item.repo_url)">
        <md-icon class="md-primary" md-src="static/img/icons/ic_link_black_24px.svg"></md-icon>
      </md-button>
    </md-list-item>
    <md-divider class="md-inset"></md-divider>
  </div>
</template>

<script>

export default {
  props: ['item', 'isSelected'],
  methods: {
    selectItem(item) {
      this.$emit('selected', item);
    },
    openLink(url) {
      this.$emit('link-clicked', url);
    }
  }
};
</script>

<style scoped>
.md-list-item-text {
  white-space: normal;
}
</style>
