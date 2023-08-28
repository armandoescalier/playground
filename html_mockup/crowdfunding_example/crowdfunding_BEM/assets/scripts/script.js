
// Menu 
const hamburger = document.querySelector(".hamburger-menu");
const navMenu = document.querySelector(".navbar__menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".navbar__link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


// close modal X change color
function closeModalChangeIconColor(){
    document.getElementsByClassName("close-modal").style.fill ='#000';
}


// Bookmark Color
let first_click = true;

function bookmarkClick() {
    if (first_click) {
        document.getElementById("bookmark-circle").style.fill = 'hsl(176, 72%, 28%)';
        document.getElementById("bookmark-path").style.fill = '#fff';
        document.getElementById("bookmark-button").textContent = 'Bookmarked';
        document.getElementById("bookmark-button").style.color = 'hsl(176, 72%, 28%)';
        first_click = false;
    } else {
        document.getElementById("bookmark-circle").style.fill = '#2F2F2F';
        document.getElementById("bookmark-path").style.fill = '#fff';
        document.getElementById("bookmark-button").textContent = 'Bookmark';
        document.getElementById("bookmark-button").style.color = 'hsl(0, 0%, 48%)';
        first_click = true;
    }
}

// Bookmark icon change color on hover
function bookmarkIconColorEnter(){
    if (first_click) {
    document.getElementById("bookmark-circle").style.fill = 'hsl(0, 0%, 48%)';
    document.getElementById("bookmark-path").style.fill = 'hsl(0, 0%, 70%)';
    }
}

function bookmarkIconColorLeave(){
    if (first_click) {
    document.getElementById("bookmark-circle").style.fill = '#2F2F2F';
    document.getElementById("bookmark-path").style.fill = '#B1B1B1';
    }
}

// Radio Button and package color

function radioButtonsChecked() {
    if (document.getElementById('radio-pack1').checked) {
        document.getElementById("pack1").style.borderWidth = '2px';
        document.getElementById("pack1").style.borderColor = 'hsl(176, 50%, 47%)';
        document.getElementById("pack2").style.borderWidth = '1px';
        document.getElementById("pack2").style.borderColor = 'hsl(0, 0%, 70%)';
        document.getElementById("pack3").style.borderWidth = '1px';
        document.getElementById("pack3").style.borderColor = 'hsl(0, 0%, 70%)';
        document.getElementById("enter-pledge1").style.display = 'flex';
        document.getElementById("enter-pledge2").style.display = 'none';
        document.getElementById("enter-pledge3").style.display = 'none';
        document.getElementById("input-pack1").focus();
    } else if (document.getElementById('radio-pack2').checked) {
        document.getElementById("pack1").style.borderWidth = '1px';
        document.getElementById("pack1").style.borderColor = 'hsl(0, 0%, 70%)';
        document.getElementById("pack3").style.borderWidth = '1px';
        document.getElementById("pack3").style.borderColor = 'hsl(0, 0%, 70%)';
        document.getElementById("pack2").style.borderWidth = '2px';
        document.getElementById("pack2").style.borderColor = 'hsl(176, 50%, 47%)';
        document.getElementById("enter-pledge2").style.display = 'flex';
        document.getElementById("enter-pledge1").style.display = 'none';
        document.getElementById("enter-pledge3").style.display = 'none';
        document.getElementById("input-pack2").focus();
    } else if (document.getElementById('radio-pack3').checked) {
        document.getElementById("pack1").style.borderWidth = '1px';
        document.getElementById("pack1").style.borderColor = 'hsl(0, 0%, 70%)';
        document.getElementById("pack2").style.borderWidth = '1px';
        document.getElementById("pack2").style.borderColor = 'hsl(0, 0%, 70%)';
        document.getElementById("pack3").style.borderWidth = '2px';
        document.getElementById("pack3").style.borderColor = 'hsl(176, 50%, 47%)';
        document.getElementById("enter-pledge3").style.display = 'flex';
        document.getElementById("enter-pledge1").style.display = 'none';
        document.getElementById("enter-pledge2").style.display = 'none';
        document.getElementById("input-pack3").focus();
    }
}

// checked radio buttons with click on pack titles 
function titlePacksOnClick(packNumber){
    let sanitizedNumber = packNumber.replace(/[^0-9\.]+/g, '');
    
    document.getElementById("radio-pack"+sanitizedNumber).checked = true;  
    radioButtonsChecked();
}