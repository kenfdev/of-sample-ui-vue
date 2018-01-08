<template>
  <md-app>
    <md-app-toolbar>
      <h3 class="md-title">Default</h3>
    </md-app-toolbar>
    <md-app-drawer md-permanent="clipped">
      <func-list :functions="functions" :selected="showFunction"></func-list>
    </md-app-drawer>

    <md-app-content>
      <func-detail v-if="selectedFunction" :func="selectedFunction" :on-invoke="onInvoke"></func-detail>
      <p v-else>Select a Function</p>
    </md-app-content>
  </md-app>
</template>

<script>
import FuncList from '@/components/FuncList';
import FuncDetail from '@/components/FuncDetail';

export default {
  components: { FuncList, FuncDetail },
  data() {
    return {
      selectedFunction: null,
      // FIXME: mock data
      functions: [
        { name: 'Function A', replicas: 1, invocationCount: 1, image: 'image/function-a' },
        { name: 'Function B', replicas: 1, invocationCount: 1, image: 'image/function-b' },
      ]
    };
  },
  methods: {
    showFunction(func) {
      this.selectedFunction = func;
    },
    onInvoke(invocation) {
      // FIXME: Invoke Function
      console.log(invocation);
    }
  }
};
</script>

<style scoped>

</style>
