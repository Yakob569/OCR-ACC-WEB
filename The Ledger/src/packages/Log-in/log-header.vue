<script setup>
import { useRouter } from 'vue-router';
const route=useRouter()
</script>
<template>
    <section>
        <div class="the-Ledger">
         <div class="ledger-logo">
            <h2 style="font-weight: bold; font-size: 20px; color:#005b51;">The Architectural Ledger</h2>
         </div>
         <div class="ledger-lest">
            <div class="lest">
            <a href="#">Contact Support</a>
            <a href="#">Security</a>
            <a href="#">About</a>
            </div>
            <div class="ledeger-buton">
             <button @click="route.push('/getstarted')"  style="padding: 10px 20px; background-color: #005b51; color: white; border: none; border-radius: 6px; font-weight: 700; font-size: 18px; " >Get Started</button>
            </div>
         </div>
        </div>
    </section>
</template>
<style scoped>
.the-Ledger{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    box-shadow: 0px 0px 3px 1px rgba(213, 212, 212, 0.5);
    opacity: 0.98;
    background-color: white;
    z-index: 1;
    position: fixed;
    top: 0;
    width: 100%;
}
.ledger-logo h2{
    padding: 0px 1rem;
}
.ledger-lest{
    display: flex;
    align-items: center;
    gap: 2rem;
}
.lest{
    display: flex;
    gap: 2rem;
}
.lest a{
    color:#71717a ;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
}
.lest a:hover{
    color: #005b51;
}
@media(max-width: 840px){
    .the-Ledger{
        display: flex;
        justify-content: start;
    }
    .ledger-logo h2{
        padding: 0px 2rem;
        font-size: 20px;
 
    }
    .ledger-lest{
        display: none;
    }
 
}
</style>