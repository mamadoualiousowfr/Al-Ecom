// Données produits
const produits = {
  Pantalon: [
    { id: 1, nom: "Pantalon jean", prix: 100000, image: "Images/images (1).jpeg" },
    { id: 2, nom: "Pantalon jean", prix: 100000, image: "Images/images (2).jpeg" },
    { id: 3, nom: "Pantalon jean", prix: 110000, image: "Images/images.jpeg" }
  ],
  Chaussures: [
    { id: 4, nom: "jordan 1", prix: 230000, image: "Images/téléchargement (1).jpeg" },
    { id: 5, nom: "jordan 2", prix: 220000, image: "Images/téléchargement (2).jpeg" },
    { id: 6, nom: "jordan 1", prix: 230000, image: "Images/téléchargement (5).jpeg" },
    { id: 7, nom: "jordan 11", prix: 250000, image: "Images/téléchargement (6).jpeg" },
    { id: 8, nom: "jordan 5", prix: 220000, image: "Images/téléchargement (7).jpeg" },
    { id: 9, nom: "jordan 4", prix: 230000, image: "Images/téléchargement (8).jpeg" },
    { id: 10, nom: "jordan 3", prix: 200000, image: "Images/téléchargement (9).jpeg" }
  ],
  Casquette: [
    { id: 11, nom: "Casquette", prix: 50000, image: "Images/téléchargement (3).jpeg" },
    { id: 12, nom: "Casquette", prix: 40000, image: "Images/téléchargement (10).jpeg" }
  ],
  Cullotte: [
    { id: 13, nom: "Cullotte", prix: 70000, image: "Images/téléchargement (4).jpeg" },
    { id: 14, nom: "Cullotte", prix: 60000, image: "Images/téléchargement (26).jpeg" }
  ],
  Maillot: [
    { id: 15, nom: "Ivory Cost", prix: 150000, image: "Images/téléchargement (11).jpeg" },
    { id: 16, nom: "Real Madrid", prix: 150000, image: "Images/téléchargement (14).jpeg" },
    { id: 17, nom: "Real Madrid", prix: 150000, image: "Images/téléchargement (15).jpeg" },
    { id: 18, nom: "Barcelone", prix: 150000, image: "Images/téléchargement (16).jpeg" },
    { id: 19, nom: "Barcelone", prix: 150000, image: "Images/téléchargement (18).jpeg" },
    { id: 20, nom: "Barcelone", prix: 150000, image: "Images/téléchargement (19).jpeg" },
    { id: 21, nom: "Guinea", prix: 150000, image: "Images/téléchargement (20).jpeg" },
    { id: 22, nom: "Ivory Cost", prix: 150000, image: "Images/téléchargement (22).jpeg" }
  ]
};

// Utilitaire : récupère un paramètre dans l'URL
function getUrlParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param) || '';
}

// Affiche les produits sur produits.html
function afficherProduits() {
  const container = document.getElementById('produits');
  if (!container) return;

  const categorie = getUrlParam('categorie').toLowerCase();
  const search = getUrlParam('search').toLowerCase();

  let liste = [];
  Object.entries(produits).forEach(([cat, items]) => {
    if (!categorie || cat.toLowerCase() === categorie) {
      liste = liste.concat(items.map(p => ({ ...p, categorie: cat })));
    }
  });

  if (search) {
    liste = liste.filter(p => p.nom.toLowerCase().includes(search));
  }

  container.innerHTML = '';

  if (liste.length === 0) {
    container.innerHTML = `<p style="color: var(--orange); font-weight: 700;">Aucun produit trouvé.</p>`;
    return;
  }

  liste.forEach(produit => {
    const div = document.createElement('div');
    div.className = 'produit';

    div.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}" />
      <h4>${produit.nom}</h4>
      <p>${produit.prix.toLocaleString()} GNF</p>
      <button data-id="${produit.id}">Ajouter au panier</button>
    `;

    const btn = div.querySelector('button');
    btn.addEventListener('click', () => {
      ajouterAuPanier(produit);
    });

    container.appendChild(div);
  });
}

// Ajoute un produit au panier localStorage
function ajouterAuPanier(produit) {
  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  const index = panier.findIndex(p => p.id === produit.id);

  if (index !== -1) {
    panier[index].quantite++;
  } else {
    panier.push({ ...produit, quantite: 1 });
  }
  localStorage.setItem('panier', JSON.stringify(panier));
  alert(`"${produit.nom}" ajouté au panier.`);
  afficherPanier();
}

// Affiche le panier sur panier.html
function afficherPanier() {
  const container = document.getElementById('panier-container');
  if (!container) return;

  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  container.innerHTML = '';

  if (panier.length === 0) {
    container.innerHTML = '<p>Votre panier est vide.</p>';
    const totalElem = document.getElementById('total-prix');
    if (totalElem) totalElem.textContent = '0 GNF';
    return;
  }

  let total = 0;

  panier.forEach(item => {
    total += item.prix * item.quantite;

    const div = document.createElement('div');
    div.className = 'article-panier';

    div.innerHTML = `
      <img src="${item.image}" alt="${item.nom}" class="image-panier" />
      <div class="infos-panier">
        <h4>${item.nom}</h4>
        <p>Prix unitaire : ${item.prix.toLocaleString()} GNF</p>
        <div class="quantite-controls">
          <button class="moins" data-id="${item.id}">-</button>
          <span>${item.quantite}</span>
          <button class="plus" data-id="${item.id}">+</button>
        </div>
        <p>Sous-total : ${(item.prix * item.quantite).toLocaleString()} GNF</p>
      </div>
      <button class="btn-supprimer" data-id="${item.id}">Supprimer</button>
    `;

    container.appendChild(div);
  });

  const totalElem = document.getElementById('total-prix');
  if (totalElem) totalElem.textContent = total.toLocaleString() + ' GNF';

  container.querySelectorAll('button.plus').forEach(btn => {
    btn.addEventListener('click', () => {
      modifierQuantite(btn.dataset.id, 1);
    });
  });

  container.querySelectorAll('button.moins').forEach(btn => {
    btn.addEventListener('click', () => {
      modifierQuantite(btn.dataset.id, -1);
    });
  });

  container.querySelectorAll('button.btn-supprimer').forEach(btn => {
    btn.addEventListener('click', () => {
      supprimerProduit(btn.dataset.id);
    });
  });
}

// Modifie la quantité d’un produit dans le panier
function modifierQuantite(id, delta) {
  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  const index = panier.findIndex(p => p.id == id);
  if (index === -1) return;

  panier[index].quantite += delta;
  if (panier[index].quantite < 1) panier[index].quantite = 1;

  localStorage.setItem('panier', JSON.stringify(panier));
  afficherPanier();
}

// Supprime un produit du panier
function supprimerProduit(id) {
  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  panier = panier.filter(p => p.id != id);
  localStorage.setItem('panier', JSON.stringify(panier));
  afficherPanier();
}

// Vide le panier
function viderPanier() {
  localStorage.removeItem('panier');
  afficherPanier();
}

// Met à jour la classe active dans le menu selon la page
function menuActif() {
  const liens = document.querySelectorAll('nav a');
  const chemin = window.location.pathname.split('/').pop();
  liens.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === chemin);
  });
}

// Initialisation selon la page
window.addEventListener('load', () => {
  menuActif();

  if (document.getElementById('produits')) {
    afficherProduits();
  }

  if (document.getElementById('panier-container')) {
    afficherPanier();

    const btnVider = document.getElementById('vider-panier');
    if (btnVider) {
      btnVider.addEventListener('click', () => {
        if (confirm('Voulez-vous vraiment vider le panier ?')) {
          viderPanier();
        }
      });
    }
  }
});
