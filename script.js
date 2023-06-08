const bodyColor = document.getElementById('bodyColor')
const form = document.querySelector('form')
const villagerContainer = document.getElementById('villagersContainer')
const villagerContainerSearch = document.getElementById('villagersContainerSearch')
const team = document.getElementById('dreamTeam')
const likesContainer = document.getElementById('villagersContainerLikes')
const home = document.getElementById('home')
const logo = document.getElementsByClassName('logo')
const body = document.querySelector('body')

function getAllVillagers(){
    fetch("https://acnhapi.com/v1a/villagers", {
        method: "GET"
    })
    .then((res) => res.json()) 
    .then(villagerData => villagerData.forEach(villager => renderOneVillager(villager, villagerContainer)))
}

getAllVillagers()

function renderOneVillager(villager, container){

    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
    <img src="${villager.icon_uri}" class="villager-picture">
    <p>Name: ${villager.name["name-USen"]}<br>
    Personality: ${villager.personality}<br>
    Birthday: ${villager['birthday-string']}<br>
    Catchphrase: "${villager['catch-phrase']}"</p>
    <div><button>&#x2764;</button></div>
    `
    const button = card.querySelector('button')
    button.addEventListener('click', (e) => {
        const heart = e.target
        heart.classList.toggle('activated-heart')
        let villagerClone = card.cloneNode(true)
        likesContainer.appendChild(villagerClone)
    })

    container.appendChild(card)
    
}

form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
   
    const search = e.target.search.value
    e.preventDefault()

    fetch(`https://acnhapi.com/v1a/villagers/`, {
        method: "GET"
    })
    .then((res) => res.json()) 
    .then(villagerList => {
        for (index in villagerList){
            let allVillagerStats = villagerList[index]
            for (stats in allVillagerStats){
                let indivStat = allVillagerStats[stats]
                let villagerName = indivStat['name-USen']
                if(search === villagerName){
                    villagerContainer.style.display = "none";
                    likesContainer.style.display = "none";
                    villagerContainerSearch.style.display = "block";
                    renderOneVillager(allVillagerStats, villagerContainerSearch)
                }

            }
        }
    })
}

team.addEventListener('click', () => {
    villagerContainer.style.display = "none";
    villagerContainerSearch.style.display = "none";
    likesContainer.style.display = "block";
})

home.addEventListener('click', () => {
    villagerContainer.style.display = "block";
    villagerContainerSearch.style.display = "none";
    likesContainer.style.display = "none";
})


function createLogo() {
let logo = document.createElement('div')
logo.innerHTML= `
<img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Animal_Crossing_Leaf.svg/512px-Animal_Crossing_Leaf.svg.png?20220815231826" />`
bodyColor.appendChild(logo)
}

createLogo()

function createDarkMode() {
    let modeText = document.createElement('div');
    modeText.classList = 'modeText';
    modeText.textContent = `Dark Mode`;
    bodyColor.appendChild(modeText)

    modeText.addEventListener('mouseover', () => {
        body.classList.toggle('darkMode')
        villagerContainer.classList.toggle('darkMode')
        villagerContainerSearch.classList.toggle('darkMode')
        likesContainer.classList.toggle('darkMode')
        form.classList.toggle('darkMode')
        home.classList.toggle('darkMode')
        team.classList.toggle('darkMode')
    })
}

createDarkMode()
