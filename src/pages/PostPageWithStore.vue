<template>
  <div >
    <h1 >Страница с постами Store</h1>
    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Search..."
        v-focus
    >
    </my-input>
    <div class="app__btns">
      <my-button
          @click="showDialog"
          style="margin:15px 0;"
      >
        Создать пост
      </my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOption">

      </my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>

    <post-list
        v-if="!isPostLoading"
        v-bind:posts="sortedAndSearchedPosts"
        @remove="removePost"
    >
    </post-list>
    <div v-else>Loading.....</div>
    <div v-intersection="loadMorePosts" class="observer"> </div>
  </div>
</template>
<script>
import PostForm  from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {mapState, mapMutations,mapActions,mapGetters} from "vuex";
export default {
  components:{
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,PostForm
  },
  data(){
    return{
      dialogVisible: false,
    }
  },
  methods:{
    ...mapMutations({
      setPage:'post/setPage',
      setSearchQuery:'post/setSearchQuery',
      setSelectedSort:'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
    createPost(post){
      this.posts.push(post);
      this.dialogVisible = false; //скрывает окно создания поста
    },
    removePost(post){
      this.posts=this.posts.filter(p => p.id !== post.id); //пересоздает массив постов с вычетом удаленного
    },
    showDialog(){
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed:{
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading:state => state.post.isPostLoading,
      selectedSort:state => state.post.selectedSort,
      searchQuery:state => state.post.searchQuery,
      page:state => state.post.page,
      limit:state => state.post.limit,
      totalPage:state => state.post.totalPage,
      sortOption:state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts:'post/sortedPosts',
      sortedAndSearchedPosts:'post/sortedAndSearchedPosts',
    })
  },
}
</script>
<style>
form{
  display: flex;
  flex-direction: column;

}
.app__btns{
  display: flex;
  justify-content: space-between;
}
.observer{
  height: 30px;
  background: green;
}
</style>