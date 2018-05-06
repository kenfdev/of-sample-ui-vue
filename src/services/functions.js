import Vue from 'vue';
import axios from 'axios';

Vue.mixin({
  beforeCreate() {
    const options = this.$options;
    if (options.functions) {
      this.$functions = options.functions;
    } else if (options.parent && options.parent.$functions) {
      this.$functions = options.parent.$functions;
    }
  }
});

class FunctionsService {
  fetchFunctions() {
    return axios.get('../system/functions').then(res => res.data);
  }
  fetchStore() {
    return axios
      .get('https://raw.githubusercontent.com/openfaas/store/master/store.json')
      .then(res => res.data);
  }
  create(func) {
    return axios.post('../system/functions', func).then(res => res.data);
  }
  delete(func) {
    return axios
      .delete('../system/functions', {
        data: {
          functionName: func.name
        }
      })
      .then(res => res.data);
  }
}

export const makeFunctionsService = () => {
  return new FunctionsService();
};
