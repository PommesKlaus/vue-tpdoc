<template>
  <div id="app">
    
    <header>
      <header-nav></header-nav>
    </header>

    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>    
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
