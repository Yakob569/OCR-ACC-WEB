<template>
    <section>
        <div class="fortress">
            <div class="security">
              <div class="titile">
                <p style="color: #00d492; font-weight: bold; text-align: center;">The Fortress</p>
                <h2 style="font-weight: bold; color: white; font-size: 45px;">Institutional-Grade Security</h2>
                <div class="text">
                    <p style="color: grey; font-size: 16px; text-align: center;">Financial security is the core of our architecture. We utilize industry-leading AES-256 bit encryption and SOC2 Type II compliant infrastructure.</p>
                </div>
              </div>
              <div class="security-lest">
                <div class="lest">
                    <p>[object Object]</p>
                    <h3 style="font-weight: bold;">End-to-End Encryption</h3>
                    <p>Every byte is encrypted before it leaves your device, ensuring zero-knowledge privacy.</p>
                </div>
                <div class="lest">
                    <p>[object Object]</p>
                    <h3>End-to-End Encryption</h3>
                    <p>Every byte is encrypted before it leaves your device, ensuring zero-knowledge privacy.</p>
                </div>
                <div class="lest">
                    <p>[object Object]</p>
                    <h3>End-to-End Encryption</h3>
                    <p>Every byte is encrypted before it leaves your device, ensuring zero-knowledge privacy.</p>
                </div>                                
              </div>
            </div>
        </div>
        <div class="protfolio">
            <div class="ledger">
                <div class="protfolio-text">
                    <h1>Your Portfolio,Anywhere.</h1>
                    <h3>
                        The Ledger stays in perfect sync across your devices. Start an analysis on your desktop, and review on your tablet.

                    </h3>
                    <div class="protfolio-lest">
                        <p>[object Object]<b style="font-weight: bold; margin-left: 5px;">Desktop App</b></p>
                        <p>[object Object]<b style="font-weight: bold; margin-left: 5px;">iOS / Android</b></p>
                        <p>[object Object]<b style="font-weight: bold; margin-left: 5px;">Native iPad</b></p>
                    </div>
                </div>
                <div class="protfolio-img">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNimheBRdr-bo8FMIIXZjT0aPEGkYAxnCM8ZnixJAjisPwIoF5k4MzlSvdxx74vzXggd1em-5snYTQ7Efb1ffcJ7RL-qLl0G3ZPaa4FSz6YgGBKqLkWKnwbllLJZ-1OxMjkCpuIlZqfA33TfPCkzkjGLjC3atitO9a2q3VcxtmJZlFiztLRY3WYlUEEssbmdYPG3zSFD39Le7hiewIkLTD38hbGoqHs8bGn2bhec02fDbyqDhmx8FddhZJgjnqbqMo98fV2jxzjJM" alt="">
                </div>
            </div>
        </div>
        <div class="Experience">
            <div class="Experience-text">
            <div class="Experience-title">
                <h1>Experience the future of accounting.</h1>
                <h3>Join 20,000+ high-growth firms and individuals managing their wealth with The Ledger.</h3>
            </div>
            <div class="Experience-buton">
                <button style="border: none; color: #00554c; padding: 20px 15px; width: 220px; border-radius: 10px; font-size: 19px; font-weight: bold;">Get Started Free</button>
                <button style="border: 1px solid gainsboro; background-color: #00554c; color: white;  padding: 20px 15px; width: 200px; border-radius: 10px; font-size: 19px; font-weight: bold;">Talk to Sales</button>
            </div>
            </div>
        </div>
    </section>
</template>
<style scoped>

.fortress{
    display: flex;
    flex-direction: column;
    align-items: center;    
    justify-content: center;
    padding: 5rem 4rem;
    background-image: linear-gradient(90deg, #191c1d 50%, rgba(22,25,26,0.85) 50%),url(https://lh3.googleusercontent.com/aida-public/AB6AXuAPoQb0ZCwUXjLz_FNRNq4H_oqEfdeNeIS-BFLEAYBKskK1iMrpSRHmWufFT7S-YaevWDAm07UcKeLUB2Sp-yZZaObjBjj3BsuE2aq5mSypavbvc1dD6ei85dY-Eht8xAE6EU2TMmVTakMMpT7IZhE9rD2ERvXWX52tIaKtX4BqnDfdzqO4MQ0OImAjhjsQ7Iw9Bjt-YKX3iYMGD8wcovCZ34P3rWFd8xVUyQ6BKOdT3cBbLn5Kih8XmXEnpaPTrfRNPpJxoZbQnnw);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

}
.security{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem; 
}
.text p{
    max-width: 600px;
}
.security-lest{
    display: flex;
    align-items: center;
}
.lest{
    display: flex;
    flex-direction: column;
    align-items: start;
    border-left: 0.2px solid grey;
    padding: 1rem 1.5rem;
    color: white;
}
.lest p{
    max-width: 450px;
    font-size: 14px;
}
.protfolio{
    display: flex;
    align-items: center;
    justify-content: center;
}
.ledger{
    display: flex;
    align-items: center;
    gap: 5rem;
    max-width: 1200px;
    background-color: #f2f4f5;
    margin-top: 6rem;
    padding: 3rem;
    border-radius: 30px;
}
.protfolio-text h1{
    font-size: 45px;
    font-weight: bold;
}
.protfolio-text h3{
    color: #576160;
    max-width: 450px;
}
.protfolio-lest{
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.protfolio-img img{
    height: 500px;
    border-radius: 10px;
}
.Experience{
    display: flex;
    align-items: center;
    justify-content: center;
}
.Experience-text{
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    background-color: #00554c;
    color: white;
    max-width: 1500px;
    padding: 3rem 5rem;
    border-radius: 30px;    
    margin-top: 5rem;
}
.Experience-title{
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;    
}
.Experience-title h1{
    font-weight: bold;
    font-size: 50px;
}
.Experience-title h3{
    max-width: 620px;
    font-size: 18px;
    text-align: center;
}
.Experience-buton{
    display: flex;
    align-items: center;
    gap: 1rem;
    }
@media(max-width: 840px){
    .security{
        text-align: center;
    }
    .security-lest{
        display: flex;
        flex-direction: column;
        text-align: start;
        gap: 1.5rem;
    }
    .ledger{
        display: flex;
        flex-direction: column;
    }
    .Experience{
        padding: 1rem;
    }  
}
</style>