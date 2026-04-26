<script setup>
import { useRouter } from 'vue-router';
const router=useRouter()
</script>
<template>
    <section>
  <nav>
    <div class="the-ledger">
        <div class="ledger-logo">
            <h3>The Ledger</h3>
        </div>
        <div class="ledger-lest">
            <a  @click="router.push('/')" style="font-weight: 600; color:#003427; border-bottom: 3px solid #003427;" href="#">Features</a>
            <a  class="click" href="#">Solutions</a>
            <a class="click" href="#">Pricing</a>
        </div>
        <div class="ledger-button">
            <button @click="router.push('/login')" style="padding: 5px 10px; border: none; background-color: white; color:rgb(79, 85, 135); font-weight: 700; font-size: 19px;">Log In</button>
            <button @click="router.push('/getstarted')" style="padding: 15px 25px; background-color: #005b51; color: white; border: none; border-radius: 6px; font-weight: 700; font-size: 18px; " >Get Started</button>
        </div>
    </div>
  </nav>
    </section>
</template>
<style scoped>
nav{
position: fixed;
width: 100%;
padding: 1rem 2rem;
z-index: 100;
box-shadow: 10px 1px 55px 2px  rgba(70, 70, 90, 0.12);
background-color: white;
top: 0;
opacity: 0.97;
}
.the-ledger{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5px 20px;
}
.ledger-logo h3{
  font-size: 30px;
  font-weight: bold;
  color:#1d5c4c;
}
.ledger-lest{
    display: flex;
    align-items: center;
    gap: 4rem;
}
.ledger-lest a{
    font-size: 19px;
    font-weight: 600;
    text-decoration: none;    
}
.click{
    color: rgb(79, 85, 135);
    transition: .4s;
}
.click:hover{
    color: #003427;
}
.ledger-button{
    display: flex;
    align-items: center;
}
@media(max-width:840px){
    .the-ledger{
        justify-content: space-between;
    }
    .ledger-logo h3{
        font-size: 25px;
    }
    .ledger-lest{
        display: none;
    }
  
}
</style>