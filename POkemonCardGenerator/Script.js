//
const url = 'https://pokeapi.co/api/v2/pokemon/';
const card = document.getElementById('card');
const btn = document.getElementById('btn');
const typeColor = {
    bug:"#26de81",
    dragon:"#ffeaa7",
    electric:"#fed330",
    fairy:"#FF0069",
    fighting:"#30336b",
    fire:"#f0932b",
    flying:"#81ecec",
    grass:"#00b894",
    ground:"#EFB49",
    ghost:"#a55eea",
    ice:"#74b9ff",
    normal:"#95afc0",
    poison:"#6c5ce7",
    psychic:"#a29bfe",
    rock:"#2d3436",
    water:"#0190FF",
};

let getPokeData = ()=>{
    let id = Math.floor(Math.random()*150)+1;
    console.log(id);
    const finalUrl = url + id;
    // Fetch Generated Url

    fetch(finalUrl)
    .then((response) => response.json())
    .then((data)=>{generateCard(data)});
}

let generateCard = (data) =>{
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokename = data.name[0].toUpperCase()+data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefence = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    const themeColor = typeColor[data.types[0].type.name];

    card.innerHTML = `
          <p class="hp">
                <span>HP</span>
                ${hp}
            </p>

            <img src=${imgSrc} alt="">

            <h2 class="poke-name">${pokename}</h2>

            <div class="types">
            </div>

            <div class="stats">

                <div>
                    <h3>${statAttack}</h3>
                    <p>Attack</p>
                </div>

                <div>
                    <h3>${statDefence}</h3>
                    <p>Defence</p>
                </div>

                <div>
                    <h3>${statSpeed}</h3>
                    <p>Speed</p>
                </div>

            </div>
        `;

  appendTypes(data.types);
  StyleCard(themeColor);
}

let appendTypes = (types)=>{
    console.log(types);
    types.forEach((items) => {
        let span = document.createElement("span");
        span.textContent = items.type.name;
        document.querySelector(".types").appendChild(span);
    });
};

let StyleCard = (color) =>{
    card.style.background = `radial-gradient(
        circle at 50% 0%, ${color} 36%, #ffffff 36%
    )`;

    card.querySelectorAll(".types span").forEach((typeColor)=>{
        typeColor.style.backgroundColor = color;
    })
};

btn.addEventListener("click",getPokeData);
window.addEventListener("load",getPokeData);

