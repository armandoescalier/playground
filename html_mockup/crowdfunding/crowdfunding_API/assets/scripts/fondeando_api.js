const PROJECT_ID = 5;
const API_TOKEN = "token_here";
const BASE_URL = 'https://some_api_link_here.com/api/v1/';
const PROJECTS_URL = BASE_URL + 'projects/' + PROJECT_ID;
const PROJECT_URL = PROJECTS_URL + '.json';
const BOOKMARK_URL = PROJECTS_URL + '/bookmark.json';

const GET_PROJECT_ELEMENTS = {
    method: 'GET',
    headers: {
        'X-api-token': API_TOKEN,
    }
};

async function fetchFondeando() {
    const RESPONSE = await fetch(PROJECT_URL, GET_PROJECT_ELEMENTS);
    const DATA = await RESPONSE.json();
    return DATA;
}

fetchFondeando()
    .then(DATA => {

        /* Project info */
        document.getElementById("project_title").innerHTML = DATA.name;
        document.getElementById("project_subtitle").innerHTML = DATA.subtitle;
        document.getElementById("about_description").innerHTML = DATA.about;
        changeBookmarkStyle(DATA.is_bookmarked_by_current_user);

        /* Project backed stats */
        // Total backed amount
        const TOTAL_BACKED_AMOUNT = (DATA.total_backed_amount.cents) / 100;
        document.getElementById("total_backed_amount").innerHTML = "$" + TOTAL_BACKED_AMOUNT.toLocaleString('en-US');

        const MINIMUM_FUNDING_AMOUNT = (DATA.minimum_funding.cents) / 100;
        document.getElementById("minimum_funding_amount").innerHTML = "of $" + MINIMUM_FUNDING_AMOUNT.toLocaleString('en-US') + " backed";

        // Total backers (persons)
        document.getElementById("total_backers").innerHTML = DATA.total_backers;

        // Days left
        getDaysLeft(DATA.close_project_at);

        // Progress Bar
        const TOTAL_BACKED_PERCENT = (TOTAL_BACKED_AMOUNT * 100) / MINIMUM_FUNDING_AMOUNT;
        document.getElementById("backed_progress_bar").value = TOTAL_BACKED_PERCENT;

        /* Generate dinamic tier cards */
        createMainTierCards(DATA.tiers);

        // Modals
        document.getElementById("about-modal").innerHTML = " Want to support us in bringing " + DATA.name + " out in the world?";
        // Generate dinamic tier cards option
        createPledgeTierCards(DATA.tiers);

        // Confirmation modal
        document.getElementById("confirmation-modal-text").innerHTML =
            "Your pledge brings us one step closer to sharing " + DATA.name + " worldwide. You will get an email once our campaign is completed.";
    })
    .catch(err => console.log(err));

function getDaysLeft(closeProjectDate) {
    const DATE_NOW = new Date();
    const DATE_CLOSE_PROJECT = new Date(closeProjectDate);
    const DIFFERENCE_IN_TIME = DATE_CLOSE_PROJECT.getTime() - DATE_NOW.getTime();
    const DAYS_LEFT = Math.trunc(DIFFERENCE_IN_TIME / (1000 * 3600 * 24));
    document.getElementById("days_left").innerHTML = DAYS_LEFT;
}

function focusTier(tierId) {
    window.location.href = "#main-modal";
    document.getElementById('pack' + tierId).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
}

function changeBookmarkStyle(bookmarkState) {
    if (bookmarkState) {
        document.getElementById("bookmark-icon").classList.add("booked");
        document.getElementById("bookmark-circle").classList.add("booked");
        document.getElementById("bookmark-button").classList.add("booked");
        document.getElementById("bookmark-button").textContent = 'Bookmarked';

        document.getElementById("bookmark-icon").setAttribute("data-bookmark-status","true");
        document.getElementById("bookmark-button").setAttribute("data-bookmark-status","true");
    } else {
        document.getElementById("bookmark-icon").classList.remove("booked");
        document.getElementById("bookmark-circle").classList.remove("booked");
        document.getElementById("bookmark-button").classList.remove("booked");
        document.getElementById("bookmark-button").textContent = 'Bookmark';

        document.getElementById("bookmark-icon").setAttribute("data-bookmark-status","false");
        document.getElementById("bookmark-button").setAttribute("data-bookmark-status","false");
    }
}

function bookmarkState(currentBookmarkState) {
    return !currentBookmarkState;
}

async function postBookmarkState(currentBookmarkState) {
    try {
        const NEW_BOOKMARK_STATE = bookmarkState(currentBookmarkState);

        const UPDATE = {
            "project": {
                "project_id": PROJECT_ID,
            },
            "bookmarked": NEW_BOOKMARK_STATE,
        };

        const POST_OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-api-token': API_TOKEN,
            },
            body: JSON.stringify(UPDATE),
        };

        fetch(BOOKMARK_URL, POST_OPTIONS)
            .then(response => {
                if (!response.ok) {
                    window.alert("Network response was not ok. Please try again.");
                    throw Error(response.status);
                }
                else {
                    window.location.href = 'index.html';
                }
                return response.json();
            }).then(UPDATE => {
                console.log(UPDATE);
            }).catch(e => {
                console.log(e);
            });
    } catch (err) {
        console.error(`ERROR: ${err}`);
    }
}

function createMainTierCards(tiersData) {

    let tier = document.getElementById("tier");

    for (let data of tiersData) {

        let min_pledge = data.minimum_plegde.cents / 100;

        let newElement = document.createElement('div');
        newElement.innerHTML =
            `
        <section class="card card-with-border" id="tier_card${data.id}">
        <div class="tier tier--vertical">
            <div>
        <!-- Titulo del paquete y cantidad -->
                            <section class="tier__top-section project-page">
                                <h3>${data.name}</h3>
                                <p class="tier__pledge-range">Pledge $ ${min_pledge.toLocaleString('en-US')} or more</p>
                            </section>
                            <!-- Descripcion del paquete -->
                            <section class="tier__description project-page">
                                <p>${data.description}</p>
                            </section>

                            </div>
                            <div>
                            <!-- cantidad restante y boton de rewards -->
                            <section class="tier__bottom-section">
                                <div class="available-items">
                                    <h1 class="available-items__quantity">${data.available_rewards.toLocaleString('en-US')}</h1>
                                    <p class="available-items__text">left</p>
                                </div>
                                <button class="basic-button basic-button--rewards"
                                    onclick="focusTier(${data.id})" id="button-rewards${data.id}">Select
                                    Reward</button>
                            </section>
                            </div>
                            </div>
                            </section>
        `;
        tier.appendChild(newElement);

        if (data.available_rewards == 0) {
            document.getElementById('tier_card' + data.id).classList.add('card--disabled');
            document.getElementById('button-rewards' + data.id).disabled = true;
        }
    }
}

function createPledgeTierCards(tiersData) {

    let tier = document.getElementById("tierOption");

    for (let data of tiersData) {

        let min_pledge = data.minimum_plegde.cents / 100;
        let tier_id = "pack" + data.id;
        let newElement = document.createElement('div');
        newElement.innerHTML = `

        <section class="card card-with-border" id="${tier_id}" name="tier_id">
        <!-- Radio button e información del paquete -->
        <div class="tier">
            <!-- Radio button -->
            <div class="tier__radio-button-box">
                <aside>
                    <label class="custom-radio-button">
                        <input type="radio" name="fav_package" id="radio-pack${data.id}"
                            onclick="onTierSelected(this.id)">
                        <span class="custom-radio-button__checkmark"></span>
                    </label>
                </aside>
                <section class="tier__top-section">
                    <section class="tier__top-info">
                        <h3 class="tier__title" id="title-pack${data.id}" onclick="onTierSelected(this.id)">${data.name}</h3>
                        <section>
                            <p class="tier__pledge-range">Pledge $ ${min_pledge.toLocaleString('en-US')} or more</p>
                        </section>
                    </section>

                    <!-- Cantidad restante de items -->
                    <section class="available-items available-items--desktop">
                        <section class="available-items">
                            <h2 class="available-items__quantity">${data.available_rewards.toLocaleString('en-US')}</h1>
                        </section>
                        <section class="available-items">
                            <p class="available-items__text">left</p>
                        </section>
                    </section>
                </section>
            </div>

            <!-- Titulo del paquete y cantidad -->
            <div>
                <!-- Descripcion del paquete -->
                <section class="tier__description">
                    <p>${data.description}</p>
                </section>
                <section class="available-items available-items--mobile">
                    <section class="available-items">
                        <h2 class="available-items__quantity">${data.available_rewards.toLocaleString('en-US')}</h2>
                    </section>
                    <section class="available-items">
                        <p class="available-items__text">left</p>
                    </section>
                </section>
            </div>
        </div>
        <!-- Sección para ingresar cantidad -->
        <section class="tier__pledge" id="enter-pledge${data.id}">
            <!-- Input y boton continue -->
            <p class="tier__pledge-text">Enter your pledge</p>
            <div>
            <FORM id="FORM${data.id}" action="javascript:postPledge(${data.id})">
                <input type="number" name="pledge_input" class="button" id="input-pack${data.id}" min="${min_pledge}" >
                <button class="basic-button basic-button--continue" type="submit" value="Submit" >Continue</button>
                </FORM>
                    </div>
        </section>
        </section>
        `;
        tier.appendChild(newElement);

        if (data.available_rewards == 0) {
            document.getElementById('pack' + data.id).classList.add('card--disabled');
            document.getElementById('radio-pack' + data.id).disabled = true;
        }
    }
}

// POST Request for pledge tiers
async function postPledge(formID) {
    try {
        const FORM = document.getElementById("FORM" + formID);
        let data = new FormData(FORM);

        const UPDATE = {
            pledge:
            {
                tier_id: formID,
                pledge_amount: data.get('pledge_input'),
                user_id: 12,
            }
        };

        const POST_OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-api-token': API_TOKEN,
            },
            body: JSON.stringify(UPDATE),
        };

        fetch(BASE_URL + 'pledges.json', POST_OPTIONS)
            .then(response => {
                if (!response.ok) {
                    window.alert("Network response was not ok. Please try again.");
                    throw Error(response.status);
                }
                else {
                    window.location.href = '#confirmation-modal';
                }
                return response.json();
            }).then(UPDATE => {
                console.log(UPDATE);
            }).catch(e => {
                console.log(e);
            });
    } catch (err) {
        console.error(`ERROR: ${err}`);
    }
}