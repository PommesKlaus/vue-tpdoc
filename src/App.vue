<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

.center {
  display: block;
  margin: auto;
}

.group {
  border-bottom: 1px solid #eee;
  color: #616161;
  margin-top:50px;
}
</style>
