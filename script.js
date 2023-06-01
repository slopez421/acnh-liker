//all global consts

const bodyColor = document.getElementById('bodyColor')
const form = document.querySelector('form')
const villagerContainer = document.getElementById('villagersContainer')
const villagerContainerSearch = document.getElementById('villagersContainerSearch')
const team = document.getElementById('dreamTeam')
const likesContainer = document.getElementById('villagersContainerLikes')
const home = document.getElementById('home')

//fetch all villagers
function getAllVillagers(){
    fetch("https://acnhapi.com/v1a/villagers", {
        method: "GET"
    })
    .then((res) => res.json()) 
    //take the data promise and for Each item in the array
    //render the villager information and append it
    .then(villagerData => villagerData.forEach(villager => renderOneVillager(villager, villagerContainer)))
}

getAllVillagers()

function renderOneVillager(villager, container){
    //build villager card

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

    //add villager card to DOM
    container.appendChild(card)
    
}


//event listeners

// submit event uses a for loop to search through each villager
//until the villager name matches the target search value
form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    //search will give us the exact value being put into the search bar on our form
    const search = e.target.search.value
    e.preventDefault()
    console.log(search)

    fetch(`https://acnhapi.com/v1a/villagers/`, {
        method: "GET"
    })
    .then((res) => res.json()) 
    //take the data promise and for Each item in the array
    //render the villager information and append it
    .then(villagerList => {
        for (index in villagerList){
            //index here represents the array items [0-300]
            //allVillagerStats represents the stats for Villagers within each array item
            let allVillagerStats = villagerList[index]
            for (stats in allVillagerStats){
                let indivStat = allVillagerStats[stats]
                let villagerName = indivStat['name-USen']
                if(search === villagerName){
                    //when the search matches the name, render that villager
                    //into a separate container and display only that container
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

// create logo and append to the dom
function createLogo() {
let logo = document.createElement('div')
logo.innerHTML= `
<img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Animal_Crossing_Leaf.svg/512px-Animal_Crossing_Leaf.svg.png?20220815231826" />`
bodyColor.appendChild(logo)}

createLogo()