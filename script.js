// Données produits
const produits = [
  { id: 1, nom: "Pantalon jean", prix: 100000, image: "Images/images (1).jpeg", categorie: "Pantalon" },
  { id: 2, nom: "Chaussures Nike", prix: 200000, image: "Images/images (2).jpeg", categorie: "Chaussures" },
  { id: 3, nom: "Casquette Rouge", prix: 50000, image: "Images/images (3).jpeg", categorie: "Casquette" },
  { id: 4, nom: "Cullotte Femme", prix: 30000, image: "Images/images (4).jpeg", categorie: "Cullotte" },
  { id: 5, nom: "Maillot PSG", prix: 150000, image: "Images/images (5).jpeg", categorie: "Maillot" },
];

// Récupère le panier depuis localStorage
function getPanier() {
  return JSON.parse(localStorage.getItem("panier")) || [];
}

// Sauvegarde le panier
function savePanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
  updateBadge();
}

// Met à jour l’icône du panier
function updateBadge() {
  const panier = getPanier();
  const total = panier.reduce((acc, p) => acc + p.quantite, 0);
  const nav = document.querySelector("nav");
  let badge = document.getElementById("panier-badge");

  if (!badge) {
    badge = document.createElement("span");
    badge.id = "panier-badge";
    badge.className = "badge-panier";
    const lienPanier = [...nav.querySelectorAll("a")].find(a => a.href.includes("panier.html"));
    lienPanier.appendChild(badge);
  }
  badge.textContent = total > 0 ? total : "";
}

// Affiche les produits dans produits.html
function afficherProduits() {
  const conteneur = document.getElementById("produits");
  if (!conteneur) return;

  const params = new URLSearchParams(window.location.search);
  const categorie = params.get("categorie");
  const search = params.get("search");

  const filtres = produits.filter(p => {
    return (!categorie || p.categorie === categorie) &&
           (!search || p.nom.toLowerCase().includes(search.toLowerCase()));
  });

  conteneur.innerHTML = "";
  filtres.forEach(prod => {
    const div = document.createElement("div");
    div.className = "produit";
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.nom}" />
      <h3>${prod.nom}</h3>
      <p>${prod.prix.toLocaleString()} GNF</p>
      <button onclick="ajouterAuPanier(${prod.id})">Ajouter au panier</button>
    `;
    conteneur.appendChild(div);
  });
}

// Ajouter un produit au panier
function ajouterAuPanier(id) {
  const panier = getPanier();
  const prod = panier.find(p => p.id === id);
  if (prod) {
    prod.quantite += 1;
  } else {
    panier.push({ id, quantite: 1 });
  }
  savePanier(panier);
  alert("Produit ajouté au panier !");
}

// Affiche les produits dans panier.html
function afficherPanier() {
  const conteneur = document.getElementById("panier-container");
  if (!conteneur) return;

  const panier = getPanier();
  if (panier.length === 0) {
    conteneur.innerHTML = "<p>Votre panier est vide.</p>";
    document.getElementById("total-prix").textContent = "0 GNF";
    return;
  }

  conteneur.innerHTML = "";
  let total = 0;

  panier.forEach(item => {
    const produit = produits.find(p => p.id === item.id);
    total += produit.prix * item.quantite;

    const div = document.createElement("div");
    div.className = "ligne-panier";
    div.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}" />
      <div class="infos">
        <h4>${produit.nom}</h4>
        <p>${produit.prix.toLocaleString()} GNF x ${item.quantite}</p>
        <div class="quantite">
          <button onclick="modifierQuantite(${item.id}, -1)">-</button>
          <span>${item.quantite}</span>
          <button onclick="modifierQuantite(${item.id}, 1)">+</button>
          <button onclick="supprimerDuPanier(${item.id})">Supprimer</button>
        </div>
      </div>
    `;
    conteneur.appendChild(div);
  });

  document.getElementById("total-prix").textContent = `${total.toLocaleString()} GNF`;
}

// Modifier quantité
function modifierQuantite(id, delta) {
  const panier = getPanier();
  const prod = panier.find(p => p.id === id);
  if (!prod) return;

  prod.quantite += delta;
  if (prod.quantite <= 0) {
    const index = panier.indexOf(prod);
    panier.splice(index, 1);
  }
  savePanier(panier);
  afficherPanier();
}

// Supprimer un produit du panier
function supprimerDuPanier(id) {
  const panier = getPanier().filter(p => p.id !== id);
  savePanier(panier);
  afficherPanier();
}

// Vider le panier
const vider = document.getElementById("vider-panier");
if (vider) {
  vider.onclick = () => {
    localStorage.removeItem("panier");
    afficherPanier();
    updateBadge();
  };
}

// Initialisation
window.onload = () => {
  afficherProduits();
  afficherPanier();
  updateBadge();
};
