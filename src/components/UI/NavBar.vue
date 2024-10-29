<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/about')" style="margin-left: 20px">About</my-button>
      <my-button @click="$router.push('/posts')" style="margin-left: 20px">Default post list</my-button>
      <my-button @click="$router.push('/store')" style="margin-left: 20px">With Store</my-button>
      <my-button @click="$router.push('/composition')" style="margin-left: 20px">With CompositionAPI </my-button>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
.navbar{
  height: 70px;
  background: lightblue;
  box-shadow: 2px 2px 4px  gray;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.navbar__btns{
  margin-left: auto;
  margin-right: 10px;

}
</style>