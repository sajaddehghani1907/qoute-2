const btnQoute = document.getElementById("new-qoute");
const apiAddres = "https://api.quotable.io";
const sentence = document.querySelector (".quote");
const authorName = document.querySelector(".name");
const copyBtn = document.querySelector (".copy");
const speechBtn = document.querySelector (".speech");
const recitation = window.speechSynthesis;
const tweetBtn = document.querySelector (".twitter")
const authorBtn =document.getElementById ("new-author")
let clickBtn;
requsted();

 async function requsted() {
  
  try {
      const information = await fetch(`${apiAddres}/random`);
      const data = await information.json();
      clickBtn = data.authorSlug;
      addQoute(data);
  } catch (error) {
    console.log(error);
  }
};

btnQoute.addEventListener("click", (e) => {
  requsted();
  btnQoute.classList.add("loading");
  btnQoute.innerText = "Qoute loading....";
  btnQoute.classList.remove("loading");
  btnQoute.innerText = "New Quote";
});


function addQoute(quoteData) {
    sentence.innerText = quoteData.content; 
    authorName.innerText = quoteData.author;   
};

copyBtn.addEventListener("click", () =>{
  navigator.clipboard.writeText(sentence.innerText);
} );

speechBtn.addEventListener("click" , ()=>{
    const read = new SpeechSynthesisUtterance (`${sentence.innerText} by ${authorName.innerText}`);
    recitation.speak(read);
    /* read.volume = 1;
    read.rate = 1; 
    read.pitch=1;*/
}) ;

 
    
tweetBtn.addEventListener("click" , ()=>{
    const tweet = `https://twitter.com/intent/tweet?url=${sentence.innerText}`;
    window.open(tweet, "_blank");
});

authorBtn.addEventListener("click",async ()=>{
try {
  const BtnInform =await fetch (`${apiAddres}/authors/slug/${clickBtn}`);
  const authorEsm = await BtnInform.json();
  const adrresAuthorn= authorEsm.link;
  console.log(adrresAuthorn);
  window.location.href = adrresAuthorn;
} catch (error) {
  console.log(error);
}

});


 