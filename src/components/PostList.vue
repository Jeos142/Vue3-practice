<template>
 <div v-if="posts.length>0">
   <h3> Список пользователей</h3>
   <transition-group name="user-list">
     <post-item v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
     />
   </transition-group>

 </div>
  <h2 v-else style="color:red"> List is empty</h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
export default {
  components: {PostItem},
  props:{
    posts:{
      type:Array,
      required:true
    }
  }
}
</script>

<style  scoped>
  .post{
  padding: 15px;
  border: 2px solid teal;
  margin-top:15px;
}
  .user-list-item {
    display: inline-block;
  }
  .user-list-enter-active,
  .user-list-leave-active {
    transition: all 0.4s ease;
  }
  .user-list-enter-from,
  .user-list-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
.user-list-move{
  transition: transform .8s ease;
}
</style>