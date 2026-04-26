import { createRouter,createWebHistory } from "vue-router";
import Features from "@/components/Features.vue";
import LogIn from "@/components/Log-in.vue";
import GetStarted from "@/components/Get-Started.vue";
const router=createRouter({
    history:createWebHistory(import.meta.env.BASE-URL),
    routes:[
        {
         path:'/',
         name:'home',
         component:Features
        },
        {
         path:'/login',
         name:'LogIn',
         component:LogIn
        },
        {
         path:'/getstarted',
         name:'GetStarted',
         component:GetStarted
        }                
    ]
   })
   export default router