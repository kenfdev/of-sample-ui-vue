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
  queryFunction(func) {
    return axios.get(`../system/function/${func.name}`).then(res => res.data);
  }
  fetchStore() {
    return axios
      .get('https://raw.githubusercontent.com/openfaas/store/master/store.json')
      .then(res => res.data);
  }
  create(func) {
    return axios.post('../system/functions', func).then(res => res.data);
  }
  invoke(func, invocation) {
    let requestContentType =
      invocation.contentType === 'json' ? 'application/json' : 'text/plain';

    if (invocation.contentType === 'binary') {
      requestContentType = 'binary/octet-stream';
    }
    const responseType =
      invocation.contentType === 'binary'
        ? 'arraybuffer'
        : invocation.contentType;

    return axios.post(`../function/${func.name}`, invocation.request, {
      headers: {
        'Content-Type': requestContentType
      },
      responseType
    });
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
