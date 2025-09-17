const html = document.querySelector('html');
const body = document.querySelector('body');

const heroContainer = document.querySelector('#hero-wrapper');
const heroVideoWrapper = document.querySelector('#hero-video-wrapper');
const heroVideo = document.querySelector('#hero-video');
const heroTitle = document.querySelector('#hero-title');

const ourFutureTitle = document.querySelector('#our-future h1')
const ourFuturePs = document.querySelectorAll('#our-future p');
const ourFutureImage = document.querySelector('#our-future-image');

const airplaneSticky = document.querySelector('#airplane');
const airplaneContainer = document.querySelector('#airplane-container');
const airplane = document.querySelector('#airplane-wrapper');
const airplaneText = document.querySelector('#airplane-wrapper h1')
const airplaneImage = document.querySelector('#airplane img');

const threatTitle = document.querySelector('#threat h1');
const threatPs = document.querySelectorAll('#threat p');

const carsWrapper = document.querySelector('#cars-wrapper');
const carsVideo = document.querySelector('#cars-video')
const cars = document.querySelector('#cars-wrapper');
const carsText = document.querySelector('#cars-wrapper h1');

const losing = document.querySelector("#losing");
const losingTitle = document.querySelector('#losing h2');
const losingSpan = document.querySelectorAll('#losing span');

const glacierB = document.querySelector('#glacier img:last-of-type');

const timelineElements = document.querySelectorAll('.timeline-element');
const timelineElement = document.querySelector('.first');
const timelineImages = document.querySelectorAll('.img-container')
const timelineText = document.querySelectorAll('.timeline-wrapper');

const actionElements = document.querySelectorAll('.action-element');

const pivotalTitle = document.querySelector('#pivotal h1');

const statsTitle = document.querySelector('#stats h1')
const statsCarbonTitle = document.querySelector('#carbon h4');
const statsMeltTitle = document.querySelector('#melt h4');
const statsData = document.querySelectorAll('#stats .data');
const statsCarbon = document.querySelector('#carbon span:first-of-type');
const statsMelt = document.querySelector('#melt span:first-of-type');

/* --------------------------------------- Utility Functions --------------------------------------- */

function setMaxHeight(element) {
    element.style.height = html.offsetWidth > html.offsetHeight ? `100vw` : `100vh`;
}

function setMaxWidth(element) {
    element.style.width = html.offsetWidth > html.offsetHeight ? `100vw` : `100vh`;
}

function buildThreshold() {
    let thresholds = [];
    let numSteps = 100;

    for(let i = 1.0; i <= numSteps; i++) {
    thresholds.push(i/numSteps);
    }

    thresholds.push(0);
    return thresholds;
}

function handleYFade(entries) {
    for(const entry of entries) {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    }
}

function handleXFade(entries) {
    for(const entry of entries) {
        entry.target.style.transform = 'translateX(0)';
    }
}

/* --------------------------------------- Set Values --------------------------------------- */
setMaxHeight(heroVideo);
setMaxHeight(airplaneImage);
carsWrapper.style.height = `${carsVideo.clientHeight}px`;

// resize image handler
window.addEventListener('resize', () => {
    setMaxHeight(heroVideo);
    setMaxHeight(airplaneImage);
    carsWrapper.style.height = `${carsVideo.clientHeight}px`;
});


/* --------------------------------------- Hero Section --------------------------------------- */

document.addEventListener('scroll', handleHeroVideo);
document.addEventListener('scroll', handleHeroTitle);

function handleHeroVideo() {
    if(window.scrollY > 20) {
        heroVideoWrapper.style.height = `80vh`;
    }

    if(window.scrollY <= 50) {
        heroVideoWrapper.style.width = `100vw`;
        heroVideoWrapper.style.borderRadius = '0';
    }

    if(window.scrollY > 50) {
        heroVideoWrapper.style.width = `33vw`;
        heroVideoWrapper.style.borderRadius = '1vw';
    }
}

function handleHeroTitle() {
    // video title fade in
    if(window.scrollY > 30) {
        heroTitle.style.opacity = `1`;
        heroTitle.style.filter = `blur(0)`;
        document.removeEventListener('scroll', handleHeroTitle);
    }
}

/* --------------------------------------- Our Underwater Future --------------------------------------- */

const observerOurFutureImage = new IntersectionObserver(handleXFade, {threshold: 0.1});
const observerOurFutureText = new IntersectionObserver(handleYFade, {threshold: 0.4});

observerOurFutureImage.observe(ourFutureImage);
observerOurFutureText.observe(ourFutureTitle);

for(const p of ourFuturePs) {
    observerOurFutureText.observe(p);
}

/* --------------------------------------- Airplane --------------------------------------- */

const observerAirplane = new IntersectionObserver(handleAirplane, { threshold: buildThreshold() });

function handleAirplane(entry) {
    if(entry[0].isIntersecting) {
        document.addEventListener('scroll', handleAirplaneText);
    }

    if(!entry[0].isIntersecting) {
        document.removeEventListener('scroll', handleAirplaneText);
    }
}

observerAirplane.observe(airplaneSticky);

let airplanePrevY = 0;
let airplaneImageResize = 60;
let airplaneImageStep = 0.14576;
let airplaneTextScroll = -100;
let airplaneTextStep = airplaneSticky * 0.05;

function handleAirplaneText() {
    const top = airplaneSticky.offsetTop;
    const currentY = window.scrollY;

    if(currentY >= airplanePrevY) {
        airplane.style.width = `${airplaneImageResize}vw`;
        airplane.style.height = `${airplaneImageResize }vh`;
        airplaneText.style.transform = `translateY(-50%) translateX(${-airplaneTextScroll}vw)`;

        airplaneImageResize+=airplaneImageStep;
        airplaneTextScroll+=1;
    } else {
        airplane.style.width = `${airplaneImageResize }vw`;
        airplane.style.height = `${airplaneImageResize }vh`;
        airplaneText.style.transform = `translateY(-50%) translateX(${-airplaneTextScroll}vw)`;

        airplaneImageResize-=airplaneImageStep;
        airplaneTextScroll-=1;
    }

    airplanePrevY = currentY;
}

/* --------------------------------------- Rising Threat --------------------------------------- */

const observerThreat = new IntersectionObserver(handleYFade, {threshold: 0.4});

observerThreat.observe(threatTitle);
for(const p of threatPs) {
    observerThreat.observe(p);
}

/* --------------------------------------- Cars --------------------------------------- */

let carsPrevY = 0;
let carsPrevRatio = 0;

const observerCars = new IntersectionObserver(handleCars,{threshold: buildThreshold()});

function handleCars(entries) {
    for(const entry of entries) {
        const currentY = entry.boundingClientRect.y;
        const currentRatio = entry.intersectionRatio;
        if(entry.isIntersecting) {

            if(entry.intersectionRatio > 0.5) {
                carsText.style.opacity = 1;
            }
            
            // scrolling down and ratio increasing
            if(carsPrevRatio < currentRatio && carsPrevY > currentY) {
                entry.target.style.width = `${100 - 20 * entry.intersectionRatio}vw`;
                carsText.style.fontSize = `calc(${6 * entry.intersectionRatio}vw + 12px)`
            }

            // scrolling down and ratio decreasing
            if(carsPrevRatio > currentRatio && carsPrevY > currentY && entry.intersectionRatio > 0.6) {
                entry.target.style.width = `${100 - 20 / entry.intersectionRatio}vw`;
            }
    
            // scrolling up and ratio is decreasing
            if(carsPrevRatio > currentRatio && carsPrevY < currentY) {
                entry.target.style.width = `${100 - 20 * entry.intersectionRatio}vw`;
                carsText.style.fontSize = `calc(${6 * entry.intersectionRatio}vw + 12px)`
            }

            // scrolling up and ratio is increasing
            if(carsPrevRatio < currentRatio && carsPrevY < currentY && entry.intersectionRatio > 0.6) {
                entry.target.style.width = `${100 - 20 / entry.intersectionRatio}vw`;
            }
        }
        carsPrevY = currentY;
        carsPrevRatio = currentRatio;
    }
}

observerCars.observe(cars)

/* --------------------------------------- Losing Ecosystem --------------------------------------- */

const obersverLosing = new IntersectionObserver(handleLosingText, {threshold: [0, 0.5, 1]});

function handleLosingText(entries) {
    for(const entry of entries) {
        if(entry.isIntersecting > 0.5) {
            entry.target.style.transform = 'translateY(0vw)';
        }

        if(entry.intersectionRatio > 0.5) {
            losingSpan.forEach( span => span.style.color = 'var(--almost-periwinkle)');
        }
    }
}

obersverLosing.observe(losingTitle);

/* --------------------------------------- Glacier --------------------------------------- */

const options = {
    rootMargin: '0px 0px -20% 0px',
    threshold: buildThreshold()
}

const observerGlacier = new IntersectionObserver(handleGlacier, options);

let glacierPrevY = 0;
let glacierPrevR = 0;
let fade = 0.09;

function handleGlacier(entries) {
    for(const entry of entries) {
        const currentY = entry.boundingClientRect.y;
        const currentRatio = entry.intersectionRatio;

        if(glacierPrevR < currentRatio && glacierPrevY > currentY && entry.isIntersecting) {
            entry.target.style.opacity = `${entry.intersectionRatio}`;
            glacier.style.transform = `translateY(${entry.intersectionRatio * 5}vh)`;
        }

        if(glacierPrevR > currentRatio && glacierPrevY < currentY && entry.isIntersecting) {
            entry.target.style.opacity = `${entry.intersectionRatio}`;
            glacier.style.transform = `translateY(${entry.intersectionRatio * 5}vh)`;
        }

        glacierPrevY = currentY;
        glacierPrevR = currentRatio;
    }
}

observerGlacier.observe(glacierB);

/* --------------------------------------- Timeline --------------------------------------- */

const timelineElementHeight = timelineElements[0].clientHeight;
const timelineStep = 100/(timelineElements.length+4);

for(let i = 0; i < timelineElements.length; i++) {
    timelineElements[i].style.top = `${i * timelineStep * 1.2 + (timelineStep)}%`;
}

const observerTimeline = new IntersectionObserver(handleYFade);
observerTimeline.observe(timelineElement);
timelineImages.forEach( image => observerTimeline.observe(image));
timelineText.forEach( text => observerTimeline.observe(text));

/* --------------------------------------- Call To Action --------------------------------------- */

const observerAction = new IntersectionObserver(handleYFade);
actionElements.forEach( element => observerAction.observe(element));

/* --------------------------------------- Pivotal --------------------------------------- */

const observerPivotal = new IntersectionObserver(handlePivotalTitle, {threshold: 0.3});

function handlePivotalTitle(entries) {
    for(entry of entries) {
        if(entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateX(0)';
        }
    }
}

observerPivotal.observe(pivotalTitle);

/* --------------------------------------- Stats --------------------------------------- */

const carbonDioxideAPI = 'https://global-warming.org/api/co2-api';
const arcticMeltAPI = 'https://global-warming.org/api/arctic-api';

// get carbon dioxide data
const fetchCarbonDioxide = fetch(carbonDioxideAPI);
fetchCarbonDioxide
    .then( response => response.json())
    .then( data => statsCarbon.textContent = `${data.co2[data.co2.length-1].trend}`);

// get arctic melt data
const fetchArticMelt = fetch(arcticMeltAPI);
fetchArticMelt
    .then( response => response.json())
    .then( data => {
        let base = 0;
        let current = 0;

        // get extent from 1979 to 2010
        for(let i = 0; i < 32; i++) {
            base += data.arcticData[i].extent;
        }

        // get total extent
        for(let i = 0; i < data.arcticData.length; i++) {
            current += data.arcticData[i].extent;
        }
        // calculate extent difference
        const extent = parseFloat(((base/31) - (current/(data.arcticData.length))) / (base/31) * 100).toFixed(2);
        statsMelt.textContent = extent;
    });

const observerStats = new IntersectionObserver(handleYFade);
observerStats.observe(statsTitle);
observerStats.observe(statsCarbonTitle);
observerStats.observe(statsMeltTitle);
statsData.forEach( data => observerStats.observe(data));