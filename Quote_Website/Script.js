//Api First Project And Im Exicited --

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const generateButton = document.querySelector(".generate");
const postButton = document.querySelector(".post");

const api_url = "https://api.quotable.io/random";

async function generateQuote(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
}

generateQuote(api_url);


generateButton.addEventListener("click",()=>{
    generateQuote(api_url);
});

postButton.addEventListener("click",Tweet);


function Tweet(){
    window.open("https://twitter.com/intent/tweet?text="+quote.innerHTML +  "--by " + author.innerHTML, "Tweet Window","width=600,height=300");
}
