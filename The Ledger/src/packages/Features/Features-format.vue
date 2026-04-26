<template>
    <div class="processing">
<div class="Autonomous">
    <div class="processing-text">
        <div class="processing-titil">
        <p style="font-size: 16px; font-weight: 500; color: #000;">[object Object]</p>
        <h2 style="font-weight: bold; font-size:30px; color: #000;">Autonomous Processing</h2>
            <p style="color: grey; font-weight: 600;">Our proprietary neural engines leverage deep learning to analyze paper receipts, 
                digital invoices, and complex bank statements with 99.9% accuracy.
            </p>
            </div>
             <div class="processing-img">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtNU6rlGWXkUuw0AU1BCYk5307VEn1vV5HyJRtAZhjxAe8OaRldr3ZIQHgfoybj8h1OZak1mgwdaXHSGXPM7dtXy4Z4b4MIayS6t0BoQjyPjVVnT7C1JgTW3h0Vds98xXS9RBJMH1KyN0CAKP9oF2-hhUKpH5MT6XolxHsc1Y6LVfG1bPM6ZGEv8PItcCvT-485TO9fKGWprCkc8zqbPp6L0utAWlI-JUu-TVtN9D_JAonXbjdS0wbLgFJ5LW25u2Qs67PA_mnG28" alt="">
        </div>
    </div>
    <div class="metadta">
        <h2 style="font-weight: bold;">Metadata Enrichment</h2>
        <div class="lest">
            <p s>[object Object]<b style="font-weight: bold; margin-left: 10px;">Geographic Tagging</b></p>
            <p>[object Object]<b style="font-weight: bold; margin-left: 10px;">Smart Classification</b></p>
            <p>[object Object]<b style="font-weight: bold; margin-left: 10px;">Tax Compliance Check</b></p>
        </div>
        <div class="extraction">
            <p style="font-size: 13px;">"Extraction completed in 0.4s with high confidence."</p>
        </div>
    </div>
</div> 
</div>
 <div class="format">
  <div class="Portability">
    <div class="Universal">
       <div class="Universal-img-card">
        <div class="card-one">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoXKvAMcFmWW-yh42u1HmIDYhkWbCabSvZEF2KNapxyra2Faiumv_P0ehCwlXclBbYyf-AH4akI166NUcQYJ3fJ5A08tkGZLt5k2n23bgeSSriQ90SdwuIYi5B43-aK6EPabgRh-2wtMtWSR2veWxqiRh7bcHmgVzVnpEZ-_o0fOLvZ-rLG0yvWJzEbXSGQUuZ9fRUr1W2PPypS9rXX7SvcafKI8vCsmHe5okpGSTLvkCys39LHPm-DLAnZ5eWBgO5EBqn03-8siw" alt="">
        </div>
        <div class="card-two">
         <img src="" alt="">
         <p>FORMATS</p>
         <h2>XLSX, CSV, PDF</h2>
        </div>
       </div>
        <div class="Universal-note">
           <div class="note-lest">
            <button style="border: none; background-color:  rgb(229, 219, 219); padding: 5px; width: 100px; border-radius: 10px;"></button>
            <button style="border: none; background-color: #1d5c4c; padding: 4px; width: 50px; border-radius: 10px;"></button> 
           </div>
           <div class="note">
             <button style="border: none; background-color: #E5E2E2; padding: 4px; width: 350px; border-radius: 10px;"></button>
             <button style="border: none; background-color: #E5E2E2; padding: 4px; width: 320px; border-radius: 10px;"></button>
             <button style="border: none; background-color: #E5E2E2; padding: 4px; width: 300px; border-radius: 10px;"></button>
           </div>
        </div>
    </div>
    <div class="Universal-text">
        <div class="Universal-tiitle">
            <h3>Universal Portability</h3>
            <h1>Your Data, Your Format.</h1>
            <p style="margin-bottom: 0.5rem;">
                The Ledger isn't a walled garden. Export your entire transaction history or specific custom-filtered reports into
                 Excel-ready CSVs or boardroom-quality PDFs with a single click.
            </p>
        </div>
        <div class="Universal-lest">
            <p>[object Object]<b>Custom Field Mapping</b></p>
            <p>[object Object]<b>Scheduled Monthly Auto-Reports</b></p>
            <p>[object Object]<b>Direct API Integration for Developers</b></p>
        </div>
    </div>
  </div>
  </div>
</template>
<style scoped>

.processing{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f2f4f5;
    color: rgb(190, 189, 189);
}
.Autonomous{
    display: flex;
    padding: 10px;
    gap: 2rem;
    max-width: 1200px;
    height: 700px;
}
.processing-text{
    width: 70%;
    height: 100%;
    padding: 2rem;
    background-color: white;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.processing-titil{
    height: 30%;
    width: 60%;

}
.processing-titil p{
    width: 100%;
}
.processing-img{
    height: 70%;
    width: 90%;

}
.processing-img img{
    height: 100%;
    width: 70%;
    border-radius: 10px;
}
.processing-img img:hover{
    transform: scale(1.1);
}
.metadta{
    width: 35%;
    height: 100%;
    background-color: #006a6a;
    gap: 10rem;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    color: white;
    border-radius: 6px;
    position: relative;
}
.lest{
    display: flex;
    flex-direction: column;
    gap: 3rem;
}
.extraction{
    padding: 1rem;
    background-color: #1a7979;
    border-radius: 10px;
    position: absolute;
    bottom: 10%;
    left: 10%;
    right:10%;
}
.format{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 4rem;
    background-color:#f8f9fa;
}
.Portability{
    display: flex;
    gap: 5rem;
    align-items: center;
}
.Universal{
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.Universal-img-card{
    display: flex;
    align-items: center;
    gap: 2rem;
}
.card-one{
    padding: 1.5rem;
    background-color:#e7e8e9;
    border-radius: 6px;
    box-shadow: 0px 2px 0px 1px rgba(70, 70, 90, 0.15);
}
.card-one img{
    height: 170px;
}
.card-two{
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    box-shadow: 0px 1px 0px 1px rgba(148, 148, 156, 0.15);
    background-color: white;
    height: 225px;
    border-radius: 6px;
}
.Universal-tiitle p{
    max-width: 500px;
}
.Universal-note{
    box-shadow: 0px 1px 0px 1px rgba(135, 135, 143, 0.15);
    background-color: white;
    padding: 1rem;
    border-radius: 6px;
}
.note-lest{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.note{
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    gap: 1rem;
}
.Universal-text{
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 2rem;
    padding: 10px;
}
.Universal-tiitle{
    align-items: start;
}
.Universal-tiitle h3{
color: #1a7979;
font-size: 15px;
}
.Universal-tiitle h1{
    font-weight: 600;
    font-size: 35px;
}
.Universal-lest{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
}
@media(max-width: 840px){
    .processing{
        align-items: start;
        padding: 1rem;
    }
   .Autonomous{
    display: flex;
    flex-direction: column;
    height: 1200px;
   }
   .processing-text{
    width: 100%;
    height: 100%;
   }
   .processing-img{
    width: 100%;
    margin-top: 1rem;
   }
   .metadta{
    width: 80%;
    height: 100%;
    gap: 3rem;
   }
   .lest{
    gap: 2rem;
   }
   .format{
    display: flex;
    justify-content: start;
    align-items: start;
    padding: 2rem;
    width: 100%;
   }
   .Portability{
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 2rem;
    width: 100%;
   }
   .Universal{
    width: 100%;
   }
   .card-one img{
    height: 240px;
   }
   .card-two{
    height: 300px;
    width: 300px;
   }
   .Universal-tiitle p{
    margin-bottom: -1rem;
   }
   .Universal-lest{
    gap: 1rem;
   }
}

</style>