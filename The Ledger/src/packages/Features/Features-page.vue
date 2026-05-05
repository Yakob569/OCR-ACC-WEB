<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
<section>
    <div class="product">
    <div class="ecoststem">
        <div class="product-ecoststem">
            <div class="title">
                <h5> Product Ecosystem </h5>
                <div class="lo">
                <h1>Financial intelligence,<span>redefined.</span></h1>
                </div>
            </div>        
        <div class="note">
            <p>Every transaction tells a story. The Ledger uses advanced AI to 
                decode your financial data, providing editorial-grade 
                clarity and institutional security in one seamless interface.
             </p>
             <div class="buton">
                <button @click="router.push('/getstarted')" style="padding: 15px 20px; background-color: #005b51; color: white; border: none; border-radius: 6px; font-weight: 700; font-size: 16px; cursor: pointer;">Start Designing Your Future</button>
                <button style="padding: 15px 25px; background-color: #d4e4f4; border: none; border-radius: 6px; color: gray; font-weight: 700; font-size: 16px;">View Demo</button>
             </div>
        </div>
        </div>
        <div class="product-img">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9r2kStM9FWXZy8hX0Z2Q2AOxlZrJbLFAYrHvT6zSHQeouGIceg7MO2QTnPKQu3CwWrmdWjGzrmraRthQ15o6l1bf9q9-kwbwqFNi7-ENX_OhDYrifBfKF-n0xIHaKscTNN1s-MbsXk6nUz2T1us4U0GkkCrC3vEpjkVlxX5M3onYWvs0Rbj8MfwmDC5ekyizHbS5PuyDb8kDCobQ609Ll1UF8wzUzfg1dFX1d5REyJ40D5o4c1rS6WyQIsIjOWHHO7H_gvE7uNFs" alt="">
            <div class="total">
                <p>TOTAL MANAGED</p>
                <p style="color: #005b51; text-align: center; font-size: 25px; font-weight: bold;">$4.2M</p>
            </div>
        </div>
    </div>
    </div>
    <div class="adcancerd">
        <div class="ai">
            <h3>Advanced AI Extraction</h3>
            <p>Our proprietary neural engines leverage deep learning to analyze paper receipts, digital invoices, 
                and complex adcancerdbank statements with 99.9% accuracy.</p>
        </div>
        <div class="englne">
            <h3> Explore Engine [object Object</h3>
        </div>
    </div>
</section>
</template>
<style scoped>
section{
    margin-top: -7rem;
}
.product{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}
.ecoststem{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10rem;
    align-items: center;
}
.product-ecoststem{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.title{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;   
}
.title h5{
    font-size: 15px;
    color: #005148;
    font-weight: 600;
}
.title h1{
font-size: 72px;
max-width: 50px;
font-weight: bold;
line-height: 5rem;
}
.title h1 span{
    display: flex;
    font-weight: bold;
    color: #005148;
}
.note{
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
}
.note p{
    max-width: 450px;
    color:gray;
    font-weight: 500;
    font-size: 17px;
}
.buton{
    display: flex;
    gap: 10px;
    align-items: center;
}
.product-img{
    position: relative;
}
.product-img img{
    height: 500px;
    border-radius: 10px;
}
.total{
    position: absolute;
    bottom: 5px;
    background-color: white;
    border-radius: 6px;
    padding: 1rem;
}
.total p{
    font-size: 13px;
    font-weight: 400;
    color: rgb(65, 64, 64);
}
.adcancerd{
    display: flex;
    align-items: last baseline;
    background-color:#f2f4f5 ;
    padding: 3rem;
    justify-content: space-around;
    margin-top: 3rem;
}
.ai h3{
    font-size: 35px;
    font-weight: bold;
}
.ai p{
    max-width: 600px;
    font-size: 15px;
    font-weight: 700;
    color: rgb(65, 64, 64);
}
.englne h3{
    color: #005148;
    font-weight: bold;
}
@media(max-width:890px){
    .product{
        display: flex;
        align-items: center;
        justify-content: start;
        flex-direction: column;
        
    }
    .ecoststem{
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .title h1{
        font-size: 55px;
        min-width: 100px;
        width: 100%;
    }
    .lo h1{
        max-width: 700px;
    }
    .note p{
        max-width: 650px;
    }
    .adcancerd{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: flex-end;
    }

}
@media(max-width:480px){
    .product{
        justify-content: start;
        align-items: start;
        padding: 10px;
    }
     .ecoststem{
        gap: 5rem;
        align-items: start;
     }
    .title h1{
        font-size: 50px;
        line-height: 3.5rem;
    }
    .note p{
        max-width: 350px;
    }
    .product-img img{
        height: 380px;
    }
    .total{
        padding: 10px;
    }    
}
@media(max-width:360px){
    .product{
        justify-content: start;
        align-items: start;
        padding: 10px;
    }
     .ecoststem{
        gap: 5rem;
        align-items: start;
     }
    .title h1{
        font-size: 50px;
        line-height: 3.5rem;
    }
    .note p{
        max-width: 350px;
    }
    .product-img img{
        height: 330px;
    }
    .total{
        padding: 10px;
    }
}
</style>