// ========== Données produits (exemple) ==========
const produits = [
  {
    id: 1,
    nom: "Pantalon jean",
    prix: 100000,
    image: "Images/images (1).jpeg",
    categorie: "Pantalon"
  },
  {
    id: 2,
    nom: "Chaussures Nike",
    prix: 250000,
    image: "Images/images (2).jpeg",
    categorie: "Chaussures"
  },
  {
    id: 3,
    nom: "Casquette stylée",
    prix: 50000,
    image: "Images/images (3).jpeg",
    categorie: "Casquette"
  }
];

// ========== Affichage des produits ==========
if (document.getElementById("produits")) {
  const conteneurProduits = document.getElementById("produits");
  conteneurProduits.innerHTML = "";

  produits.forEach((produit) => {
    const produitDiv = document.createElement("div");
    produitDiv.className = "produit";
    produitDiv.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}" />
      <h3>${produit.nom}</h3>
      <p>${produit.prix.toLocaleString()} GNF</p>
      <button onclick='ajouterAuPanier(${JSON.stringify(produit)})'>Ajouter au panier</button>
    `;
    conteneurProduits.appendChild(produitDiv);
  });
}

// ========== Fonction ajouter au panier ==========
function ajouterAuPanier(produit) {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  panier.push(produit);
  localStorage.setItem("panier", JSON.stringify(panier));
  alert(`Produit ajouté : ${produit.nom}`);
  mettreAJourCompteurPanier();
}

// ========== Chargement du panier ==========
if (document.getElementById("panier-container")) {
  afficherPanier();
}

function afficherPanier() {
  const panier = JSON.parse(localStorage.getItem("panier")) || [];
  const conteneur = document.getElementById("panier-container");
  const totalPrix = document.getElementById("total-prix");
  conteneur.innerHTML = "";

  if (panier.length === 0) {
    conteneur.innerHTML = "<p>Votre panier est vide.</p>";
    totalPrix.textContent = "0 GNF";
    return;
  }

  let total = 0;
  panier.forEach((produit, index) => {
    total += produit.prix;

    const div = document.createElement("div");
    div.className = "item-panier";
    div.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}" />
      <div>
        <h4>${produit.nom}</h4>
        <p>${produit.prix.toLocaleString()} GNF</p>
        <button onclick="supprimerDuPanier(${index})">Supprimer</button>
      </div>
    `;
    conteneur.appendChild(div);
  });

  totalPrix.textContent = `${total.toLocaleString()} GNF`;
  mettreAJourCompteurPanier();
}

function supprimerDuPanier(index) {
  const panier = JSON.parse(localStorage.getItem("panier")) || [];
  panier.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(panier));
  afficherPanier();
}

document.getElementById("vider-panier")?.addEventListener("click", () => {
  localStorage.removeItem("panier");
  afficherPanier();
});

// ========== Mise à jour compteur dans le menu ==========
function mettreAJourCompteurPanier() {
  const panier = JSON.parse(localStorage.getItem("panier")) || [];
  const liens = document.querySelectorAll("a[href='panier.html']");
  liens.forEach((lien) => {
    lien.textContent = `Panier (${panier.length})`;
  });
}

// ========== Appeler la fonction à chaque chargement ==========
window.addEventListener("DOMContentLoaded", () => {
  mettreAJourCompteurPanier();
});
