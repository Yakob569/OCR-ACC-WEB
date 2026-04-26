<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '@/stores/auth'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

async function onSubmit() {
  errorMessage.value = ''
  isSubmitting.value = true
  try {
    await login({ email: email.value, password: password.value })
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''
    router.push(redirect || '/app/dashboard')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Login failed'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
    <section>
        <div class="log-in">
           <div class="log">
            <div class="log-img">
                <div class="log-img-note">
                <h1 style="font-weight: bold; font-size: 50px; color: white;">Architecture of <span style="color: #90f4e3; font-weight: bold;">Financial Integrity.</span></h1>
                <p>Access your high-precision financial ledger. Designed for the architectural
                   and engineering sectors where every decimal counts.
                </p>
                </div>
            </div>
            <div class="sign">
            <form class="log-form" @submit.prevent="onSubmit">
                <div class="log-text">
                    <h3 style="font-size: 13px; color: #005b51; font-weight: 600;">Secure Gateway</h3>
                    <h2 style="font-weight: bold; font-size: 35px;">Welcome Back</h2>
                    <p>Please enter your credentials to access 
                        the atelier.
                    </p>
                </div>
                <p v-if="errorMessage" style="color: #ba1a1a; font-size: 13px; font-weight: 600; width: 350px;">
                  {{ errorMessage }}
                </p>
                <div class="log-email">
                  <label style="font-size: 13px; color: #444e4d; font-weight: 600;">Email Address</label>
                  <input v-model="email" autocomplete="email" required type="email" placeholder="name@firm.com">
                </div>
                <div class="log-Password">
                   <div class="passwor-text">
                    <label style="font-size: 13px; color: #444e4d; font-weight: 600;">Password</label>
                    <p style="font-size: 13px; color:#005b51; font-weight: 600;">Forgot Password?</p>
                   </div>
                   <div class="Password-in">
                    <input v-model="password" autocomplete="current-password" required type="password" placeholder=". . . . . .">
                   </div> 
                </div>
                <div class="butn">
                <button :disabled="isSubmitting" style="padding: 10px 20px; width: 350px; background-color: #005b51; color: white; border: none; border-radius: 6px; font-weight: 700; font-size: 18px; ">Sign in to Ledger</button>
                </div>
            <div class="or">
                <span style="width: 100px; height: 0.5px; background-color: #808584;"></span>
                <p style="color: #808584; font-size: 12px;">Or continue with</p>
                <span style="width: 100px; height: 0.5px; background-color: #808584;"></span>
            </div>
            <div class="app">
             <div class="google">
                <button style=" width: 150px; padding: 12px 15px; background-color: white; border: 0.5px solid rgba(228, 228, 230, 0.5); border-radius: 6px;">
                <svg width="40" height="19" viewBox="0 0 48 48">
                <path fill="#51606d" d="M24 9.5c3.54 0 6.69 1.22 9.18 3.6l6.85-6.85C35.64 2.36 30.21 0 24 0 14.61 0 6.27 5.38 2.24 13.22l7.98 6.19C12.26 13.3 17.65 9.5 24 9.5z"/>
                <path fill="#51606d" d="M46.1 24.55c0-1.64-.15-3.21-.42-4.73H24v9h12.4c-.54 2.9-2.18 5.36-4.66 7.04l7.18 5.58c4.2-3.87 6.62-9.58 6.62-16.89z"/>
                <path fill="#51606d" d="M10.22 28.41A14.5 14.5 0 0 1 9.5 24c0-1.53.26-3.01.72-4.41l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.85.92 7.5 2.56 10.6l7.66-6.19z"/>
                <path fill="#51606d" d="M24 48c6.48 0 11.92-2.13 15.9-5.79l-7.18-5.58c-2 1.34-4.56 2.14-8.72 2.14-6.35 0-11.74-3.8-13.78-9.41l-7.66 6.19C6.27 42.62 14.61 48 24 48z"/>
                </svg>
                <p>Google</p>
               </button>                
             </div>
             <div class="apple">
                <button style="width: 150px; padding: 12px 15px; background-color: white; border: 0.5px solid rgba(228, 228, 230, 0.5); border-radius: 6px;">
            <svg width="40" height="20" viewBox="0 0 24 24" fill="black">
            <path fill="#51606d" d="M16.365 1.43c0 1.14-.463 2.206-1.24 2.983-.82.82-2.14 1.45-3.287 1.356-.146-1.08.43-2.235 1.24-3.045.86-.86 2.29-1.48 3.287-1.294zM20.5 17.2c-.38.88-.84 1.7-1.38 2.47-.74 1.04-1.7 2.34-3.01 2.36-1.16.02-1.46-.75-3.04-.75s-1.93.73-3.02.77c-1.28.05-2.26-1.32-3-2.36-2.06-2.9-3.63-8.19-1.52-11.86 1.05-1.83 2.94-2.99 4.98-3.02 1.14-.02 2.22.77 3.04.77.82 0 2.35-.95 3.96-.81.67.03 2.56.27 3.77 2.03-.1.06-2.25 1.31-2.23 3.91.02 3.1 2.73 4.13 2.77 4.15-.02.07-.44 1.5-1.32 3.31z"/>
            </svg>
                <p>Apple</p>
                </button>
             </div>
            </div>
            <div class="create">
                <p style="font-size: 13px; color: #808584;">New to the atelier? <b @click="router.push('/getstarted')" style="cursor: pointer; color: #005b51; font-weight: 700;">Create Account</b></p>
            </div>                
            </form>
            </div>
           </div> 
        </div>
    </section>
</template>

<style scoped>
section{
    margin-top: 6rem;
}
.log-in{
    display:flex;
    justify-content: center;
    padding: 1rem;
}
.log{
    display: flex;
    gap: 2rem;
    height: 800px;
    align-items: stretch;
    width: 100%;
    max-width: 1100px;
    border-radius: 10px;
    box-shadow: 1px 1px 3px 3px rgba(232, 232, 236, 0.5);
    overflow: hidden;
}
.log-img{
    flex: 1;
    min-width: 0;
    background: linear-gradient(50deg,rgba(49, 159, 109, 0.6)),url("https://lh3.googleusercontent.com/aida-public/AB6AXuBC8uKmvfHnM75P5x-bt38PPN4ThN5hWctmvDdp6wqPq4cg_Whi_6yDzpaxNWlJcebu240ilqQfKvJo1OLaoYWmzlFo1JwY6wa4ioqLkWuTaWQXSjv0aWRu-PO4pjYXIVLY4D44sTUEeqD6IZGA-IrUE5zzS2pIQ8DF-eHgMcegUjZkwpLxM0bOP53ikJUaCCAIs2_AUIOjicac8EVL6P7WwsNmwNfXQEjOovZQTqFTYdh_RhvD7hljfLomJDOQW8BIcLLDrTpXs8Q");
    background-size: cover;
    background-position: center;
    position: relative;
}
.log-img-note{
    position: absolute;
    bottom: 5%;
    left: 10%;
}
.log-img-note h1{
max-width: 500px;
}
.log-img-note p{
    max-width: 400px;
    color: #90ffed;
}
.sign{
    display: flex;
   align-items: start;
}
.log-form{
    display: flex;
    flex-direction: column;
    gap: 3rem;
    max-width: 450px;
    width: 100%;
    align-items: center;
}
.log-text{
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.log-email{
    display: flex;
    flex-direction: column;
    gap: 1px;
}
.log-email input{
    border: none;
    border-bottom: 0.5px solid rgb(225, 222, 222);
    padding: 15px 0;
    font-size: 17px;
    width: 350px;
    outline: none;
}
.log-email input:focus{
    border-bottom: 1px solid black;
}
.passwor-text{
    display: flex;
    justify-content: space-between;
    width: 350px;
}
.Password-in input{
    border: none;
    border-bottom: 0.5px solid rgb(225, 222, 222);
    padding: 15px 0;
    font-size: 20px;
    font-weight: bold;
    width: 350px;
    outline: none;    
}
.Password-in input:focus{
    border-bottom: 1px solid black;
}
.butn{
    display: flex;
    align-items: start;
}
.or{
    display: flex;
    align-items: center;
    gap: 5px;
}
.app{
    display: flex;
    gap: 2rem;
}
.google button{
    display: flex;
    align-items: center;
    justify-content: center;
}
.apple button{
    display: flex;
    align-items: center;
    justify-content: center;
}
.google p{
    font-weight: 600;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: #51606d;
}
@media (max-width: 950px) {
  .log {
    flex-direction: column;
    align-items: center;  
    height: auto;
    width: 90%;
  }

  .log-img {
    display: none; 
  }

  .log-form {
    width: 100%;
    padding: 2rem;
  }
  .butn button {
    width: 100%;
  }

  .app {
    width: 100%;
    justify-content: space-between;
  } 
}
</style>
