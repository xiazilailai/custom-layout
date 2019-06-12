<template>
  <div id="app">
    <div class="main">

    </div>
    <div class="side">

    </div>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
}
.main{
  flex: 1;
  height: 100%;
  overflow: auto;
  border-right: 1px solid #dddddd; 
}
.side{
  width: 400px;
  height: 100%;
  overflow: auto;
}
</style>
