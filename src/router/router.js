// ПОСТРАНИЧНАЯ НАВИГАЦИЯ
import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import UserPage from "@/pages/UserPage.vue";
import About from "@/pages/About.vue";
import PosidPage from "@/pages/PosidPage.vue";
import PostPageWithStore from "@/pages/PostPageWithStore.vue";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi.vue";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path:'/posts',
        component: UserPage
    },
    {
        path:'/about',
        component: About
    },
    {
        path:'/posts/:id',
        component: PosidPage
    },
    {
        path:'/store',
        component: PostPageWithStore
    },
    {
        path:'/composition',
        component: PostPageCompositionApi
    },
]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})
export default router;