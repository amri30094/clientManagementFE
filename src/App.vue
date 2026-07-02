<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #f5f7fb;
  font-family: 'Poppins', sans-serif;
}

* {
  box-sizing: border-box;
}

.v-application {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f5f7fb !important;
}

.v-main {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
