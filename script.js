'use strict';
const darkTheme = localStorage.getItem('darkTheme');
const body = document.querySelector('body');

if (darkTheme === "enabled") {
    body.classList.add('dark-theme');
}

const toggle = document.querySelector(".toggle");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");


// set intial toggle state
if (body.classList.contains('dark-theme')) {
    sun.classList.add('start');
    moon.classList.add('hidden');
    moon.classList.add('set');
} else {
    moon.classList.add('start');
    sun.classList.add('hidden');
    sun.classList.add('set');
}

toggle.addEventListener("click", () => {
    if (moon.classList.contains('start')) {
        moon.classList.remove('start');
        moon.classList.add('set');
        sun.classList.remove('hidden');
    } else {
        moon.classList.toggle('set');
        moon.classList.toggle('rise');
    }

    if(sun.classList.contains('start')) {
        sun.classList.remove('start');
        sun.classList.add('set');
        moon.classList.remove('hidden');
    } else {
        sun.classList.toggle('set');
        sun.classList.toggle('rise');
    }

    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('darkTheme', 'enabled');
    } else {
        localStorage.setItem('darkTheme', null);
    }
});