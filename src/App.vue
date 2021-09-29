<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { useStore } from "./vuex";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    const store = useStore();
    let res = { name: 333 };
    store.commit("setInfo", res); //存储
    const getStoreId = store.state.id; //调用
    console.log(getStoreId);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
