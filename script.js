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
    nom: "T-shirt blanc",
    prix: 75000,
    image: "Images/images (2).jpeg",
    categorie: "T-shirt"
  },
  {
    id: 3,
    nom: "Chaussures sport",
    prix: 200000,
    image: "Images/images (3).jpeg",
    categorie: "Chaussures"
  },
  {
    id: 4,
    nom: "Casquette rouge",
    prix: 40000,
    image: "Images/images (4).jpeg",
    categorie: "Accessoires"
  },
  {
    id: 5,
    nom: "Robe élégante",
    prix: 150000,
    image: "Images/images (5).jpeg",
    categorie: "Robe"
  },
  {
    id: 6,
    nom: "Montre homme",
    prix: 300000,
    image: "Images/images (6).jpeg",
    categorie: "Accessoires"
  },
  {
    id: 7,
    nom: "Téléphone Samsung",
    prix: 2500000,
    image: "Images/images (7).jpeg",
    categorie: "Téléphonie"
  }
];

// Affichage des produits
if (document.getElementById("produits")) {
  const container = document.getElementById("produits");
  produits.forEach((produit) => {
    const div = document.createElement("div");
    div.className = "produit";
    div.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}" />
      <h3>${produit.nom}</h3>
      <p>${produit.prix.toLocaleString()} GNF</p>
      <button onclick="ajouterPanier(${produit.id})">Ajouter au panier</button>
    `;
    container.appendChild(div);
  });
}

// Gestion du panier
function getPanier() {
  return JSON.parse(localStorage.getItem("panier")) || [];
}

function setPanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
  majCompteurPanier();
}

function ajouterPanier(idProduit) {
  const panier = getPanier();
  panier.push(idProduit);
  setPanier(panier);
  alert("Produit ajouté au panier !");
}

function majCompteurPanier() {
  const compteur = document.getElementById("compteur-panier");
  const panier = getPanier();
  if (compteur) {
    compteur.textContent = panier.length;
    compteur.style.display = panier.length > 0 ? "inline-block" : "none";
  }
}

function afficherPanier() {
  const panier = getPanier();
  const container = document.getElementById("panier-container");
  const totalElement = document.getElementById("total-prix");

  if (!container || !totalElement) return;

  container.innerHTML = "";

  if (panier.length === 0) {
    container.innerHTML = "<p>Votre panier est vide.</p>";
    totalElement.textContent = "0 GNF";
    return;
  }

  let total = 0;
  panier.forEach((id) => {
    const produit = produits.find((p) => p.id === id);
    if (produit) {
      total += produit.prix;
      const div = document.createElement("div");
      div.className = "produit-panier";
      div.innerHTML = `
        <img src="${produit.image}" alt="${produit.nom}" />
        <span>${produit.nom} - ${produit.prix.toLocaleString()} GNF</span>
      `;
      container.appendChild(div);
    }
  });

  totalElement.textContent = `${total.toLocaleString()} GNF`;
}

document.addEventListener("DOMContentLoaded", () => {
  majCompteurPanier();
  afficherPanier();

  const viderBtn = document.getElementById("vider-panier");
  if (viderBtn) {
    viderBtn.addEventListener("click", () => {
      localStorage.removeItem("panier");
      afficherPanier();
      majCompteurPanier();
    });
  }
});
