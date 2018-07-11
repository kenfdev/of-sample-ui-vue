<template>
  <!-- <div>
    <md-list-item :class="{ selected: isSelected }"
                  @click="selectItem(item)">
      <img v-if="item.icon"
           :src="item.icon"
           class="md-avatar"
           :alt="item.name"
           style="border-radius: 0" />
      <span v-if="!item.icon"
            class="md-avatar">{{ item.title | limit(1) }}</span>
      <div class="md-list-item-text"
           layout="column">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
      <md-button v-if="item.repo_url"
                 class="md-icon-button md-list-action"
                 @click="openLink(item.repo_url)">
        <md-icon class="link md-primary"
                 md-src="static/img/icons/ic_link_black_24px.svg"></md-icon>
      </md-button>
    </md-list-item>
    <md-divider class="md-inset"></md-divider>
  </div> -->
  <v-list-tile avatar>
    <v-list-tile-avatar :class="{ 'no-icon': !item.icon }">
      <img v-if="item.icon" :src="item.icon">
      <span v-else>{{ item.title | limit(1) }}</span>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action v-if="item.repo_url">
      <v-icon>link</v-icon>
    </v-list-tile-action>
  </v-list-tile>
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
.no-icon .v-avatar {
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  background-color: #1398d6;
  color: white;
}
</style>
