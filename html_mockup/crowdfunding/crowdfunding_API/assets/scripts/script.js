// Mobile menu
const HAMBURGUER_MENU_ICON = document.querySelector(".hamburger-menu");
const NAV_BAR_MENU = document.querySelector(".navbar__menu");
const NAV_LINK = document.querySelectorAll(".navbar__link");
const BODY = document.body;

HAMBURGUER_MENU_ICON.addEventListener("click", openMobileMenu);
NAV_LINK.forEach(n => n.addEventListener("click", closeMobileMenu));

function openMobileMenu() {
    HAMBURGUER_MENU_ICON.classList.toggle("active");
    NAV_BAR_MENU.classList.toggle("active");
    BODY.classList.toggle("block-scroll");
}

function closeMobileMenu() {
    HAMBURGUER_MENU_ICON.classList.remove("active");
    NAV_BAR_MENU.classList.remove("active");
    BODY.classList.remove("block-scroll");
}

function closeModalChangeIconColor() {
    document.getElementsByClassName("close-modal").style.fill = '#000';
}

// checked radio buttons with click on pack titles 
function onTierSelected(packNumber) {
    let sanitizedNumber = packNumber.replace(/[^0-9\.]+/g, '');
    document.getElementById("radio-pack" + sanitizedNumber).checked = true;
    radioButtonsChecked();
}

// Dinamic Radio Button and package color
function radioButtonsChecked() {

    const RADIO_BUTTONS = document.getElementsByName('fav_package');
    let cardBorder = document.getElementsByName("tier_id");
    let cardDisplayPledge = document.getElementsByClassName("tier__pledge");
    let inputPledge = document.getElementsByClassName("button");

    RADIO_BUTTONS.forEach((element,index) =>
    { 
        if(element.checked)
        {
            cardBorder[index].classList.add('primary-border');
            cardDisplayPledge[index].classList.add('tier_display');
            inputPledge[index].focus();
            inputPledge[index].required = true;
        }
        else{
            cardBorder[index].classList.remove('primary-border');
            cardDisplayPledge[index].classList.remove('tier_display');
        }
    });
}

// Close modal by click outside
const BASIC_BUTTON = document.getElementsByClassName("basic-button");
const MAIN_MODAL = document.getElementById("main-modal");
const CLOSE_MODAL = document.getElementsByClassName("close-modal");

Array.prototype.forEach.call(BASIC_BUTTON, function (element) {
    element.addEventListener('click', function () {
        if (!BODY.classList.contains("block-scroll")) {
            BODY.classList.toggle("block-scroll");
        }
    });
});

Array.prototype.forEach.call(CLOSE_MODAL, function (element) {
    element.addEventListener('click', function () {
        window.location.href = "index.html";
        BODY.classList.remove("block-scroll");
    });
});

window.onclick = function (event) {
    if (event.target == MAIN_MODAL) {
        window.location.href = "index.html";
        BODY.classList.remove("block-scroll");
    }
}