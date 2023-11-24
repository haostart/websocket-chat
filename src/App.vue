<!-- eslint-disable -->
<template>
  <div id="app">
    <KeepAlive v-if="$route.meta.KeepAlive">
      <router-view />
    </KeepAlive>

    <router-view v-else />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const route = useRoute();

    return {
      $route: route,
    };
  },
});
</script>
