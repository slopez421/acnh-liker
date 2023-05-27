//fetch all villagers
function getAllVillagers(){
    fetch("https://acnhapi.com/v1a/villagers", {
        method: "GET"
    })
    .then((res) => res.json()) 
    //take the data promise and 
    .then(villagerData => villagerData.forEach(villager => renderOneVillager(villager)))
}

getAllVillagers()

function renderOneVillager(villager){
    //build villager card

    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
    <img src="${villager.icon_uri}" class="villager-picture">
    <p>Name: ${villager.name["name-USen"]}<br>
    Personality: ${villager.personality}<br>
    Birthday: ${villager['birthday-string']}<br>
    Catchphrase: "${villager['catch-phrase']}"</p>
    `
    //add villager card to DOM
    document.querySelector('#villagersContainer').appendChild(card)
}

