<template>
  <div id="app">

    <router-view></router-view>
    
  </div>
</template>

<script>
import HeaderNav from './components/header/HeaderNav'

export default {
  name: 'app',
  components: {
    'header-nav': HeaderNav
  }
}
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

main {
  margin-top: 75px;
  height: 100%;
}

</style>
