<template>
  <md-app>
    <md-app-drawer md-permanent="clipped">
      <func-side-nav :functions="functions" :selected="showFunction"></func-side-nav>
    </md-app-drawer>

    <md-app-content>
      <func-detail v-if="selectedFunction" :func="selectedFunction" :on-invoke="onInvoke"></func-detail>
      <p v-else>Select a Function</p>
    </md-app-content>
  </md-app>
</template>

<script>
import FuncSideNav from '@/components/FuncSideNav';
import FuncDetail from '@/components/FuncDetail';

export default {
  components: { FuncSideNav, FuncDetail },
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
