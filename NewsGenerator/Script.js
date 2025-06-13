document.addEventListener("DOMContentLoaded",()=>{
    
//const apiKey = "d593f9c57b5943b08fa605ae5f29a4c4";
//const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

const apiKey = 'ba7c75d01emshd6979adde30835cp128c3fjsn46bc6df06a24';
const apiUrl = 'https://real-time-news-data.p.rapidapi.com/topic-news-by-section?topic=TECHNOLOGY&section=CAQiSkNCQVNNUW9JTDIwdk1EZGpNWFlTQldWdUxVZENHZ0pKVENJT0NBUWFDZ29JTDIwdk1ETnliSFFxQ2hJSUwyMHZNRE55YkhRb0FBKi4IACoqCAoiJENCQVNGUW9JTDIwdk1EZGpNWFlTQldWdUxVZENHZ0pKVENnQVABUAE&limit=500&country=US&lang=en'

function smooothyWithLennis() {
    const lenis = new Lenis({
        smooth: true, // Enable smooth scrolling
        duration: 1.2, 
        easing: (t) => t * (2 - t), // Easing function for the scroll animation
        direction: 'vertical', 
        gestureDirection: 'vertical',
        smoothTouch: true, 
        touchMultiplier: 2, 
    });
    lenis.on('scroll', ScrollTrigger.update);

    /**
     * Recursive function to handle the requestAnimationFrame loop.
     * Continuously updates the Lenis instance with the current time.
     * 
     * @param {DOMHighResTimeStamp} time - The current time in milliseconds.
     */
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

smooothyWithLennis();

function initalRendered(){
    const elem = document.querySelector('nav');

    gsap.set(elem,{opacity:0,blur:'50px'});

    gsap.to(elem,{
        opacity:1,
        blur:0,
        ease:"Powe4.InOut",
        duration:2.5,
    })
}


gsap.registerPlugin(ScrollTrigger);

function animateContent() {
  const articles = document.querySelectorAll('.news-article');
  let count = 0;
  articles.forEach((article) => {
    if(count == 0){
        gsap.from(article.querySelector('h2'),{
            opacity:0,
            duration:3.7,
            delay:.3,
            ease:"Power3.Out",
        });

        gsap.from(article.querySelector('.box'),{
            clipPath:'inset(100% 0 0 0)',
            duration:.8,
            delay:.3,
            ease:"Power4.Out",
        });

        gsap.from(article.querySelector('img'),{
            scale:1.1,
            delay:.3,
            duration:1.2,
            ease:"Power3.Out",
        });

        //this the peak of my jugaad...
        gsap.from(article.querySelectorAll('p'),{
            clipPath:'inset(0 0 100% 0)',
            y:5,
            delay:.3,
            ease:"Expo.InOut",
            duration:.5,
            stagger:.086,
        })

        gsap.from(article.querySelectorAll('a'),{
            clipPath:'inset(0 0 100% 0)',
            y:20,
            delay:.3,
            ease:"Expo.InOut",
            duration:.5,
            stagger:.086,
        })

        count++;
    }
    else{
    
        gsap.from(article.querySelector('h2'),{
            opacity:0,
            ease:"Power3.Out",
            scrollTrigger: {
                trigger: article,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
                toggleActions: "play none none reverse",
            },
        });

        gsap.from(article.querySelector('.box'),{
            clipPath:'inset(100% 0 0 0)',
            ease:"Power4.Out",
            scrollTrigger: {
                trigger: article,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
                toggleActions: "play none none reverse",
            },
        });

        gsap.from(article.querySelector('img'),{
            scale:1.2,
            delay:.2,
            ease:"Power3.Out",
            scrollTrigger: {
                trigger: article,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
                toggleActions: "play none none reverse",
            },
        });

        //this the peak of my jugaar...
        gsap.from(article.querySelectorAll('p'),{
            clipPath:'inset(0 0 100% 0)',
            y:20,
            stagger:.086,
             scrollTrigger: {
                trigger: article.querySelectorAll('p'),
                start: "top 80%",
                end: "top 30%",
                scrub: true,
                toggleActions: "play none none reverse",
            },
        })

        gsap.from(article.querySelectorAll('a'),{
            clipPath:'inset(0 0 100% 0)',
            y:5,
            stagger:.086,
             scrollTrigger: {
                trigger: article.querySelectorAll('a'),
                start: "top 80%",
                end: "top 30%",
                scrub: true,
                toggleActions: "play none none reverse",
            },
        });
    }
  });
}

async function fetchNews(){
    /*try{
        const response = await fetch(apiUrl);
        const data  = await response.json();
        console.log(data);
        initalRendered();
        displayNews(data);
        animateContent();
    }
    catch{
        document.write('Network Or Api Failure');
    }*/

  const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ba7c75d01emshd6979adde30835cp128c3fjsn46bc6df06a24',
		'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
    	}
    };
    
    try {
    	const response = await fetch(apiUrl, options);
    	const result = await response.json();
        console.log(result);
        const data = result.data;
    	console.log(data);
        initalRendered();
        displayNews(data);
        animateContent();
    } catch (error) {
    	console.error(error);
        const errorMess = document.createElement('div');
        errorMess.innerHTML = `<p>Network Or Api Faliuer</p>`;
        document.appendChild = errorMess;
    }
}

function filterNews(gerne){
   const allArticles = document.querySelectorAll('.news-article');
   let hasNews = false;
   allArticles.forEach((article)=>{
    const title = article.querySelector('h2').textContent.toLowerCase();
    const description = article.querySelector('p').textContent.toLowerCase();
    if(title.includes(gerne) || description.includes(gerne)){
        article.style.display = 'flex';
        hasNews = true;
    }else{
        article.style.display = 'none';
    }
   });

   const noNewsHeading = document.querySelector('.no-news-heading');
   if(!hasNews){
    if(!noNewsHeading){
        const heading = document.createElement('h2');
        heading.className = 'no-news-heading';
        heading.textContent =  'No Current News For This Gerne !';
        document.querySelector('section').appendChild(heading);
    }
    
   }else if(noNewsHeading){
      noNewsHeading.remove();
   }

   ScrollTrigger.refresh();  //used to recalculate the start and end of scrollAnimation acc to no of divs left
}

const searchInput = document.querySelector('input');
searchInput.addEventListener('input',(e)=>{
    const gerne = e.target.value.toLowerCase();
    if( gerne === " "){
        document.querySelector('section').innerHTML = ' ';
    }
    filterNews(gerne);
});


fetchNews();


function displayNews(data){
    const newsContainer = document.querySelector(".wrapper");
    newsContainer.innerHTML = ` `;

    const AnonymusForNullValues = "Anonymous";
    data.forEach((element) => {
        if(element.snippet !== null && element.photo_url !== null 
        && element.link !== null && element.title !== null 
        && element.published_datetime_utc !== null){
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');
        articleElement.innerHTML = `
        <div class=" w-1/2 upper">
        <h2 class="text-4xl text-black-500 font-extrabold w-[100%] headings">${element.title}</h2>
        <p class="mt-5 text-4xl font-semibold paras">${element.snippet}</p>
        <p class="mt-5 text-wrap leading-[1.2] text-[16px] paras2">By ${element.authors.length == 1?element.authors:AnonymusForNullValues}</p>
        <a href="${element.link}" target="_blank" class="mt-3 font-bold text-[#FF4500] underline cursor-cell anchor">Read More</a>
        </div>
        <div class="lower">
        <div class="w-[23vw] h-[29vw] bottom-0 mb-2 rounded overflow-hidden mr-[30px] box"><img src = "${element.photo_url}" alt="${element.title}" class="w-[100%] h-[100%] object-cover"></div>
        <p class="space font-semibold text-black-500 published">${element.published_datetime_utc}</p>
        </div>
        `;
        newsContainer.appendChild(articleElement);
        }
    });

    let headingColor = gerenarteHeadingsColor();
    document.querySelectorAll('.news-article h2').forEach((Heading)=>{
        Heading.style.color = headingColor; 
    })
}

function gerenarteHeadingsColor(){
    const colors = ['#1A237E','#B71C1C','#1B5E20','#37474F','#4A148C','#d48002f6'];
    return colors[Math.floor(Math.random() * colors.length)];
}


});



