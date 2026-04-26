<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { register } from '@/stores/auth'

const router = useRouter()
const route = useRoute()

const fullName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

async function onSubmit() {
  errorMessage.value = ''
  isSubmitting.value = true
  try {
    await register({
      email: email.value,
      password: password.value,
      fullName: fullName.value,
      phone: phone.value,
    })
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''
    router.push(redirect || '/app/dashboard')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Registration failed'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
    <section>
        <div class="design">
            <div class="account">
            <div class="financial">
                <div class="design-titile">
                    <h4>THE FINANCIAL ATELIER</h4>
                    <h1>Design Your Financial Future. </h1>
                    <p>A secure, curated environment where data meets intentional structure. 
                        Join the elite ledger for precise architectural management. </p>
                </div>
                <div class="margin">
                    <div class="error">
                        <h2>0,02%</h2>
                        <p>Error Margin</p>
                    </div>
                    <div class="encryption">
                        <h2>256-bit</h2>
                        <p>Encryption</p>
                    </div>
                </div>
                <div class="desing-img">

                </div>
            </div>
            <div class="log-in">
            <div class="create-account">
                <div class="create-titile">
                    <h2>Create Account</h2>
                    <p>Experience the precision of architectural finance.</p>
                </div>
                <form class="create-form" @submit.prevent="onSubmit">
                    <p v-if="errorMessage" style="color: #ba1a1a; font-size: 13px; font-weight: 600;">
                      {{ errorMessage }}
                    </p>
                    <div class="log">
                        <label for="">FULL NAME</label>
                        <input v-model="fullName" autocomplete="name" required type="text" placeholder="Julianne Moore">
                    </div>
                    <div class="log">
                        <label for="email">EMAIL ADDRESS</label>
                        <input v-model="email" autocomplete="email" required type="email" placeholder="Julianne@atelier.com">
                    </div>
                    <div class="log">
                        <label for="phone">PHONE</label>
                        <input v-model="phone" autocomplete="tel" required type="tel" placeholder="+251900112233">
                    </div>
                    <div class="log">
                        <label for="password">PASSWORD</label>
                        <input v-model="password" autocomplete="new-password" required style="font-weight: bold; " type="password" placeholder=".........">
                    </div>
                <div class="identity-button">
                    <button :disabled="isSubmitting" style="padding: 20px 15px; width: 100%; background-color: #005b51; color: white; border: none; border-radius: 6px; font-weight: 600; font-size: 18px; ">Establish Identity </button>
                </div>
            <div class="or">
                <span style="width: 150px; height: 1px; background-color: #808584;"></span>
                <p style="color: #808584; font-size: 12px;">Or continue with</p>
                <span style="width: 150px; height: 1px; background-color: #808584;"></span>
            </div>                                    
                </form>
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
            </div>
            <div class="protocol">
                <p> By proceeding, you consent to our comprehensive data governance and security protocols. </p>
            </div>
            </div>
            </div>
        </div>
            <footer>
                <div class="last">
                <div class="yare">
                <p>
                © 2024 The Architectural Ledger. All rights reserved. Precise Financial Management
                </p>
                </div>
                <div class="leste">
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                    <p>Compliance</p>
                </div>
                </div>
            </footer>        
    </section>
</template>
<style scoped>
section{
    padding-top: 6rem;
    background-color: #f4f5f6;
}
.design{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.account{
    max-width: 1200px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4rem;
    padding: 1rem;
}
.financial{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
}
.design-titile{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: start;
}
.design-titile h4{
    font-size: 13px;
    color: #005b51;
}
.design-titile h1{
    font-size: 65px;
    font-weight: bold;
    color: #005b51;
    max-width: 600px;
    line-height: 4.5rem;
}
.design-titile p{
    max-width: 350px;
    color: #51606d;
    font-size: 17px;
}
.margin{
    display: flex;
    gap: 7rem;
}
.margin h2{
 font-size: 30px;
 font-weight: 700;
 color: #005b51;   
}
.margin p{
    font-size: 13px;
    color: #51606d;
}
.desing-img{
    background: linear-gradient(50deg,rgba(249, 249, 251, 0.8)),url("https://lh3.googleusercontent.com/aida-public/AB6AXuCEYIgUGm_-ufA6x_v_4iGszP6m3sW7hxmve_8HscID9hWW98B3QNDux_h0XokAvEMIPqkg4d6QFG7Us6m1LT1rHD-f0Xqh7e9rT46uEKnI-5PzU7wr-B0iAm3dqBkg2cNrhlALrybs84d7CHV3p37xCHpVLGyTyjuCJxH4B5y9TyXkENvpCIlskA6EW5HW7gECjKT4jzhn4A7-wlfOgnq21Czp3YwgQf8Zecegkxy3v3lIFzT4xrF7c3yOGjT1tUxBCx8bae7I98M");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    max-width: 750px;
    width: 100%;
    height: 390px;
    box-shadow: 10px 20px 20px 10px rgba(201, 201, 208, 0.5);
    border-radius: 10px;
}
.log-in{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.create-account{
    padding:2.5rem;
    background-color: white;
    box-shadow: 0px 0px 10px 1px rgba(226, 226, 232, 0.8) ;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: start;
    border-radius: 10px;
    margin-top: 20px;
}
.create-titile{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.create-titile h2{
    font-weight: bold;
    font-size: 23px;
}
.create-titile p{
    color: #51606d;
}
.create-form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.log{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.log label{
    color: #005b51;
    font-size: 13px;
    font-weight: 600;
}
.log input{
    border: none;
    border-bottom: 0.5px solid rgb(67, 66, 66);
    padding: 15px 0;
    font-size: 16px;
    font-weight: 300;
    color: #51606d;
    width: 390px;
    outline: none;        
}
.log input:focus{
    border-bottom: 0.5px solid blue;
}
.or{
    display: flex;
    align-items: center;
    gap: 5px;
    text-align: center;
    margin-top: 2rem;
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
.protocol p{
    max-width: 400px;
    font-size: 11px;
    font-weight: 500;
    text-align: center;
    color: #51606d;
    margin-top: 1rem;
}
.last{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 3rem;
    margin-top: 5rem;
}
.last p{
    font-size: 13px;
    color: #51606d;
    cursor: pointer;
}
.last p:hover{
    color: #005b51;
}
.leste{
    display: flex;
    gap: 2rem;
}
@media (max-width: 940px) {
    .account {
        flex-direction: column;
        gap: 2rem;
    }
    .desing-img {
        height: 250px; 
    }

    .create-account {
        width: 100%;
        padding: 2rem;
    }

    .create-form {
        width: 100%;
    }

    .log input {
        width: 100%;
    }

    .app {
        width: 100%;
        justify-content: space-between;
    }
    .last{
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
