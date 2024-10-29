<template>
  <div >
    <h1 >Страница с постами</h1>
    <my-input
        v-model="searchQuery"
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
      <my-select v-model="selectedSort" :options="sortOption">

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
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
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
      posts: [

      ],
      dialogVisible: false,
      isPostLoading:false,
      selectedSort:'',
      searchQuery:'',
      page:0,
      limit:10,
      totalPage:0,
      sortOption:[
        {value:'title', name:'По названию'},
        {value:'body', name:'По описанию'},
      ]
    }
  },
  methods:{
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
    async fetchPosts(){
      try {
        this.isPostLoading=true;
        setTimeout( async ()=>{
          const response= await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params:{
              _page: this.page,
              _limit: this.limit,
            }
          });
          this.posts=response.data;
          this.totalPage=Math.ceil( response.headers['x-total-count']/this.limit);
          this.isPostLoading=false;
        }, 100)

      }catch(e){
        alert('Errorka')
      }

    },
    async loadMorePosts(){
      try {
        this.page+=1;

        setTimeout( async ()=>{
          const response= await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params:{
              _page: this.page,
              _limit: this.limit,
            }
          });
          this.posts=[...this.posts,...response.data];
          this.totalPage=Math.ceil( response.headers['x-total-count']/this.limit);

        }, 100)

      }catch(e){
        alert('Errorka')
      }
    }
  },
  mounted() {
    this.fetchPosts();

    //Ниже код для отслеживания пересечения опр. части страницы,
    //позже был реализован в виде кастомной директивы Vintersection и перенесен в нее же
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0,
    // }
    // const callback= (entries, observer) =>{
    //   if(entries[0].isIntersecting && this.page < this.totalPage){
    //     this.loadMorePosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed:{
    sortedPosts(){
      return [...this.posts].sort((post1,post2)=> post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchedPosts(){
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

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