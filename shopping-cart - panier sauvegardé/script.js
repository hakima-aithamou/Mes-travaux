let itemList = document.querySelector('.items');
let listPanier = document.getElementById('list-panier');
let totalcaisse = document.querySelector('.totalCaisse');
let total = document.querySelector('#total');
let tax = document.querySelector('.tax');
let soustotal = document.querySelector('.soustotal');
let panierContainer = document.getElementById("container-panier");
let montrer = document.getElementById('montrer');
let caisse = document.getElementById('buttons');
let btnEffacer = document.getElementById('btnEffacer');
let prixTotal = 0;
let listStorage = [];
let panierCourses = [];

let items = [
    {
        index: 1,
        quantité: 0,
        nom: "Souris",
        image: src = "Images/Souris.png",
        prix: 50
    },
    {
        index: 2,
        quantité: 0,
        nom: 'Clavier',
        image: src = "Images/clavier.png",
        prix: 150
    },
    {
        index: 3,
        quantité: 0,
        nom: 'Écran',
        image: src = "Images/écran.png",
        prix: 300
    },
    {
        index: 4,
        quantité: 0,
        nom: 'Speakers',
        image: src = "Images/Speakers.png",
        prix: 20
    },
    {
        index: 5,
        quantité: 0,
        nom: 'Tour',
        image: src = "Images/la tour.png",
        prix: 200
    },
    {
        index: 6,
        quantité: 0,
        nom: 'Laptop',
        image: src = "Images/laptop.png",
        prix: 1000
    }
]
// -----------------------Initilaliser Items--------------------
function initItem() {

    listStorage = JSON.parse(localStorage.getItem('panierCourses'));
    total.innerHTML = (listStorage == null) ? 0 : listStorage.length;

    for (let i = 0; i < items.length; i++) {
        let value = items[i];
        let card = document.createElement('div');
        card.setAttribute('class', 'item-Afficher');
        card.innerHTML = `
            <img src="${value.image}" class="card-img-top" alt="...">
            <div class="nom-prix-bouton"> 
                <h4 class="cart-h4">${value.nom} ${value.prix}$</h4>
                <button class="AjouterAuPanier" onclick="AjouterAuPanier(${i}, ${value.index})">Ajouter au panier</button>
            </div>`;
        itemList.appendChild(card);
    };
}

//------------------Ajouter au panier ---------------------
function AjouterAuPanier(indice, index) {
    listStorage = (listStorage == null) ? listStorage = [] : listStorage;
    if (Rechercherindex(index) == -1) {
        let item = items[indice];
         item.quantité = 1;
        listStorage.push(item);
    }
    else {
        listStorage[Rechercherindex(index)].quantité += 1;
    }
    total.innerHTML = listStorage.length;
    localStorage.setItem('panierCourses', JSON.stringify(listStorage));
};

//----------------- Afficher le panier ----------------
function AfficherPanier() {
    total.innerHTML = listStorage.length;
    if (listStorage.length > 0) {
        panierContainer.style.display = 'block';
        console.log(listStorage);
        listPanier.innerHTML = '';
        prixTotal = 0;
        let h = 10;
        panierContainer.style.height = h + 'em';
        listStorage.forEach((value) => {
            if (value != null) {
                prixTotal += value.prix * value.quantité;
                let panierItem = document.createElement('div');
                panierItem.setAttribute('class', 'quant');
                panierItem.innerHTML = `
                   
                        <img id = cart-image src="${value.image}" >
                        <h5 id = "nom">${value.nom}</h5>
                        <h6 id = "prix">${value.prix.toString()}$</h6>
                        <button id = "quantitéMoins" onclick="moinsQuantité(${value.index}, ${value.quantité})">-</button>
                        <h5 id="count">${value.quantité}</h5>
                        <button id = "quantitéPlus" onclick="plusQuantité(${value.index}, ${value.quantité})">+</button>
                `;
                listPanier.appendChild(panierItem);
                h += 5;
                panierContainer.style.height = h + 'em';
            }
        });

        // Calculer sous-total, taxes, et total
        soustotal.innerText = prixTotal.toFixed(2) + "$";
        tax.innerText = (prixTotal * 0.13).toFixed(2) + "$"; // 13% de taxes
        totalcaisse.innerText = (prixTotal + parseFloat(tax.innerText)).toFixed(2) + "$";
    }
    else
        panierContainer.style.display = 'none';
};
//-------------------Rechercher index ---------------
function Rechercherindex(index) {
    let indice = -1;
    if (listStorage.length > 0) {
        for (let i = 0; i < listStorage.length; i++) {
            if (listStorage[i].index == index)
                indice = i;
        }
    }
    return indice;
}
//----------------réduire un item du panier-----------------
function moinsQuantité(index, quantité) {
    let ind = Rechercherindex(index);
    if (quantité == 1) {
        listStorage.splice(ind, 1);
    } else {
        let quant = listStorage[ind].quantité - 1;
        listStorage[ind].quantité = quant;
        prixTotal -= quant * listStorage[ind].prix;
    }
    localStorage.setItem('panierCourses', JSON.stringify(listStorage));
    AfficherPanier();
};
//----------------ajouter un item au panier --------------
function plusQuantité(index, quantité) {
    let ind = Rechercherindex(index);
    let quant = listStorage[ind].quantité + 1;
    listStorage[ind].quantité = quant;
    prixTotal += quant * listStorage[ind].prix;
    localStorage.setItem('panierCourses', JSON.stringify(listStorage));
    AfficherPanier();
};
//----------------vider le panier ----------------
function viderPanier() {
    listStorage = [];
    total.innerHTML = listStorage.length;
    AfficherPanier();

};
//----------------initialiser le magasin --------
initItem();
//------------Afficher et montrer le panier ----------
montrer.addEventListener('click', AfficherPanier);
//------------vider le panier ----------
btnEffacer.addEventListener('click', viderPanier);



