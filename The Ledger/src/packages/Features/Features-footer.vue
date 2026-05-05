<template>
    <section>
        <footer>
            <div class="ledger">
                <div class="the-ledger">
                    <h2>The Ledger</h2>
                    <p>The high-end editorial standard for modern financial management.</p>
                </div>
                <div class="two-line">
                <div class="product">
                    <h2 style="font-size: 17px; font-weight: bold; color:#00554c;">Product</h2>
                    <div style="display: flex; flex-direction: column; gap: 1rem;" class="line">
                        <p>FEATURES</p>
                        <p>PRICING</p>
                        <p>API DOCS</p>
                    </div>
                </div>
                <div class="Company">
                    <h2 style="font-size: 17px; font-weight: bold; color:#00554c;">Company</h2>
                    <div style="display: flex; flex-direction: column; gap: 1rem;" class="line">
                        <p>CONTACT SALES</p>
                        <p>SECURITY</p>
                        <p>STATUS</p>
                    </div>
                </div>
                </div>
                <div class="Legal">
                    <h2 style="font-size: 17px; font-weight: bold; color:#00554c;">Legal</h2>
                    <div style="display: flex; flex-direction: column; gap: 1rem;" class="line">
                        <p>PRIVACY POLICY</p>
                        <p>TERMS OF SERVICE</p>
                    </div>
                </div>
            </div>
        </footer>
        <div class="year">
            <p>© 2024 The Financial Ledger. All rights reserved.</p>        </div>
    </section>
</template>
<style scoped>
footer{
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 1px 1px rgba(202, 202, 204, 0.5);
    padding: 4rem 2rem;
}
.ledger{
    display: flex;
    gap: 6rem;
}
.the-ledger p{
    max-width: 300px;
    color:#576160;
}
.two-line{
    display: flex;
    gap: 6rem;
}
.line{
    margin-top: 1rem;
}
.line p{
font-size: 14px;
font-weight: 500;
color: #576160;
}
.line p:hover{
    color:#00554c ;
    cursor: pointer;
}
.year{
 margin-top: 3rem;
 display: flex;
 align-items: center;
 padding: 1rem 2rem;
 justify-content: space-between;   
}
.year p{
    color: #576160;
}
@media(max-width:840px){
    footer{
        align-items: start;
        padding: 1rem 2rem;
        justify-content: start;
    }
    .ledger{
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }
    .two-line{
        display: flex;
        gap: 15rem;
    }
    .year{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }   
    .year p{
        font-size: 13px;
    }
}
@media(max-width:480px){
    .two-line{
        flex-direction: column;
        gap: 4rem;
    }
}
@media(max-width:360px){
    .two-line{
        flex-direction: column;
        gap: 4rem;
    }
}
</style>