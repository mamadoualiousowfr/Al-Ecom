const produits = [
  { id: 1, nom: "Pantalon jean", prix: 100000, image: "Images/images (1).jpeg", categorie: "Pantalon" },
  { id: 2, nom: "T-shirt blanc", prix: 50000, image: "Images/images (2).jpeg", categorie: "T-shirt" },
  { id: 3, nom: "Téléphone Samsung", prix: 2500000, image: "Images/images (3).jpeg", categorie: "Téléphonie" },
  { id: 4, nom: "Chaussures sport", prix: 120000, image: "Images/images (4).jpeg", categorie: "Chaussures" },
  { id: 5, nom: "Casquette stylée", prix: 35000, image: "Images/images (5).jpeg", categorie: "Accessoires" },
];

let panier = JSON.parse(localStorage.getItem('panier')) || [];

function afficherProduits() {
  const container = document.getElementById('produits');
  if (!container) return;
  container.innerHTML = '';
  produits.forEach(produit => {
    const div = document.createElement('div');
    div.className = 'produit';
    div.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}">
      <h3>${produit.nom}</h3>
      <p>${produit.prix.toLocaleString()} GNF</p>
      <button onclick="ajouterAuPanier(${produit.id})">Ajouter au panier</button>
    `;
    container.appendChild(div);
  });
}

function ajouterAuPanier(id) {
  const produit = produits.find(p => p.id === id);
  if (produit) {
    panier.push(produit);
    localStorage.setItem('panier', JSON.stringify(panier));
    majBadgePanier();
    alert(`${produit.nom} a été ajouté au panier !`);
  }
}

function afficherPanier() {
  const container = document.getElementById('panier-container');
  const totalPrix = document.getElementById('total-prix');
  if (!container) return;

  container.innerHTML = '';
  let total = 0;

  panier.forEach((produit, index) => {
    const div = document.createElement('div');
    div.className = 'produit';
    div.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}">
      <h3>${produit.nom}</h3>
      <p>${produit.prix.toLocaleString()} GNF</p>
      <button onclick="supprimerDuPanier(${index})">Supprimer</button>
    `;
    container.appendChild(div);
    total += produit.prix;
  });

  totalPrix.textContent = `${total.toLocaleString()} GNF`;
}

function supprimerDuPanier(index) {
  panier.splice(index, 1);
  localStorage.setItem('panier', JSON.stringify(panier));
  afficherPanier();
  majBadgePanier();
}

function viderPanier() {
  panier = [];
  localStorage.setItem('panier', JSON.stringify(panier));
  afficherPanier();
  majBadgePanier();
}

function majBadgePanier() {
  const nav = document.querySelector('nav');
  let badge = document.getElementById('cart-count');

  if (!badge) {
    const lien = [...nav.children].find(a => a.href.includes("panier.html"));
    badge = document.createElement('span');
    badge.id = 'cart-count';
    lien.appendChild(badge);
  }

  badge.textContent = panier.length;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('produits')) afficherProduits();
  if (document.getElementById('panier-container')) afficherPanier();
  const btnVider = document.getElementById('vider-panier');
  if (btnVider) btnVider.addEventListener('click', viderPanier);
  majBadgePanier();
});
