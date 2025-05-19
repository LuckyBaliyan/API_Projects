//Weather APi Project

let valuSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temp = document.getElementById('temprature');
let descript = document.getElementsByClassName('description');
let clouds = document.getElementById('clouds');
let humid = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
let main = document.querySelector('main');

console.log(humid);

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(valuSearch.value != ' '){
        searchWeather();
    }
})

let id = '9505fd1df737e20152fbd78cdb289b6a';

let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+id;

const searchWeather = ()=>{
    fetch(url + '&q=' +valuSearch.value).
    then(responsive => responsive.json()).
    then(data =>{console.log(data);
        if(data.cod == 200){
            city.querySelector('figcaption').innerText = data.name;
            city.querySelector('img').src = 'https://flagsapi.com/'+data.sys.country+'/shiny/32.png';

            temp.querySelector('img').src = 'http://openweathermap.org/img/wn/'+data.weather[0].icon+'@4x.png';
            temp.querySelector('figcaption span').innerText = data.main.temp;
            descript[0].innerText = data.weather[0].description;
            clouds.innerText = data.clouds.all;
            humid.innerText = data.main.humidity;
            pressure.innerText = data.main.pressure;
        }
        else{
            main.classList.add('errorClass');
            setTimeout(function(){
                main.classList.remove('errorClass');
            },1000);
        }

        valuSearch.value=' ';
    });
}

//Handling the InitailScreen I choose it to default at my TimeZone

const initApp = ()=>{
    valuSearch.value = 'Greater Noida';
    searchWeather();
}

initApp();