let fetchBtn = document.querySelector('#fetch-btn');
let displayArea = document.querySelector('#display-area');

let BIN_ID = '6980db4e43b1c97be9601c5c';
let URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;

fetchBtn.onclick = async () => {
    displayArea.innerHTML = '<p>Venturing into the wild...</p>';
    
    try {
        let response = await fetch(URL);
        let data = await response.json();
        
        let animals = data.record; 

        let animal = animals[Math.floor(Math.random() * animals.length)];

        renderAnimalCard(animal);
    } catch (error) {
        displayArea.innerHTML = '<p>The animals are hiding. Try again later.</p>';
        console.error("Fetch Error:", error);
    }
};

function renderAnimalCard(obj) {
    displayArea.innerHTML = '';

    let card = document.createElement('div');
    card.className = 'animal-card';

    let title = document.createElement('h2');
    title.textContent = obj.animal;

    let details = document.createElement('p');
    details.innerHTML = `<strong>Habitat:</strong> ${obj.habitat} <br> 
                         <strong>Size:</strong> ${obj.average_size_m}m | <strong>Weight:</strong> ${obj.average_weight_kg}kg`;

    let aggLabel = document.createElement('div');
    aggLabel.className = 'stat-label';
    aggLabel.textContent = `Aggressiveness: ${obj.aggressiveness}/5`;
    
    let aggBar = document.createElement('div');
    aggBar.className = 'bar-bg';
    let aggFill = document.createElement('div');
    aggFill.className = 'bar-fill';
    
    aggFill.style.width = '0%';
    aggFill.style.backgroundColor = obj.aggressiveness > 3 ? '#e63946' : '#f4a261';

    aggBar.appendChild(aggFill);
    card.append(title, details, aggLabel, aggBar);
    displayArea.appendChild(card);
    
    // I used AI here to add a slight delay for the bar animation effect. I wasnt sure how to add it myself.
    setTimeout(() => {
        aggFill.style.width = `${(obj.aggressiveness / 5) * 100}%`;
    }, 50);
}