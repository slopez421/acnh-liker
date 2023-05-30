//global consts
const form = document.querySelector('form')
const villagerContainer = document.getElementById('villagersContainer')
const villagerContainerSearch = document.getElementById('villagersContainerSearch')
const team = document.getElementById('dreamTeam')

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
    <div class="button"><button>&#9825;</button></div>
    `
    const button = card.querySelector('button')
    button.addEventListener('click', (e) => {
        button.innerHTML = `&#x2764;`
        button.classList.add('activated-heart')
    })

    //add villager card to DOM
    container.appendChild(card)
}


// come back to this and figure out how to search through the
//villager list without needing id 
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
            //console.log(index)
            let allVillagerStats = villagerList[index]
            for (stats in allVillagerStats){
                let indivStat = allVillagerStats[stats]
                let villagerName = indivStat['name-USen']
               // console.log(indivStat)
                //console.log(villagerName)
               //console.log(stats)
                if(search === villagerName){
                    villagerContainer.style.display = "none";
                    villagerContainerSearch.style.display = "block";
                    
                    renderOneVillager(allVillagerStats, villagerContainerSearch)
                }

            }
        }
    })
}

team.addEventListener('click', handleClick)

function handleClick(e) {
console.log(e.target)
}