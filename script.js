// Liste complète des produits
const produits = [
  { id: 1, nom: "Pantalon jean", prix: 100000, image: "Images/images (1).jpeg", categorie: "Pantalon" },
  { id: 2, nom: "Chemise classique", prix: 75000, image: "Images/images (2).jpeg", categorie: "Chemise" },
  { id: 3, nom: "T-shirt blanc", prix: 30000, image: "Images/images (3).jpeg", categorie: "T-shirt" },
  { id: 4, nom: "Veste en cuir", prix: 250000, image: "Images/images (4).jpeg", categorie: "Veste" },
  { id: 5, nom: "Short sport", prix: 40000, image: "Images/images (5).jpeg", categorie: "Short" },
  { id: 6, nom: "Pull gris", prix: 85000, image: "Images/images (6).jpeg", categorie: "Pull" },
  { id: 7, nom: "Chaussures noires", prix: 150000, image: "Images/images (7).jpeg", categorie: "Chaussures" },
  { id: 8, nom: "Casquette rouge", prix: 25000, image: "Images/images (8).jpeg", categorie: "Casquette" },
  { id: 9, nom: "Montre argentée", prix: 120000, image: "Images/images (9).jpeg", categorie: "Accessoires" },
  { id: 10, nom: "Sac à dos", prix: 90000, image: "Images/images (10).jpeg", categorie: "Accessoires" },
  { id: 11, nom: "Lunettes de soleil", prix: 60000, image: "Images/images (11).jpeg", categorie: "Accessoires" },
  { id: 12, nom: "Ceinture en cuir", prix: 45000, image: "Images/images (12).jpeg", categorie: "Accessoires" },
  { id: 13, nom: "Chapeau élégant", prix: 38000, image: "Images/images (13).jpeg", categorie: "Chapeau" },
  { id: 14, nom: "Sandales été", prix: 48000, image: "Images/images (14).jpeg", categorie: "Chaussures" },
  { id: 15, nom: "Sweat capuche", prix: 98000, image: "Images/images (15).jpeg", categorie: "Sweat" },
  { id: 16, nom: "Débardeur sport", prix: 25000, image: "Images/images (16).jpeg", categorie: "T-shirt" },
  { id: 17, nom: "Jean slim", prix: 110000, image: "Images/images (17).jpeg", categorie: "Pantalon" },
  { id: 18, nom: "Blazer homme", prix: 200000, image: "Images/images (18).jpeg", categorie: "Veste" },
  { id: 19, nom: "Chaussures habillées", prix: 175000, image: "Images/images (19).jpeg", categorie: "Chaussures" },
  { id: 20, nom: "Maillot de foot", prix: 75000, image: "Images/images (20).jpeg", categorie: "Sport" },
  { id: 21, nom: "Écharpe laine", prix: 32000, image: "Images/images (21).jpeg", categorie: "Accessoires" },
  { id: 22, nom: "Gants hiver", prix: 28000, image: "Images/images (22).jpeg", categorie: "Accessoires" },
];

let panier = [];

function afficherProduits() {
  const conteneur = document.querySelector(".products");
  conteneur.innerHTML = "";
  produits.forEach(p => {
    conteneur.innerHTML += `
      <div class="produit">
        <img src="${p.image}" alt="${p.nom}" />
        <h3>${p.nom}</h3>
        <p>${p.prix.toLocaleString()} GNF</p>
        <button class="btn-ajouter" onclick="ajouterPanier(${p.id})">Ajouter au panier</button>
      </div>`;
  });
}

function ajouterPanier(id) {
  const produit = produits.find(p => p.id === id);
  panier.push(produit);
  afficherPanier();
  mettreAJourBadge();
}

function afficherPanier() {
  const conteneur = document.querySelector(".panier-items");
  conteneur.innerHTML = "";
  let total = 0;
  panier.forEach((item, index) => {
    total += item.prix;
    conteneur.innerHTML += `
      <div class="panier-item">
        <img src="${item.image}" alt="${item.nom}" />
        <p>${item.nom}</p>
        <p>${item.prix.toLocaleString()} GNF</p>
        <button class="btn-supprimer" onclick="supprimerDuPanier(${index})">Supprimer</button>
      </div>`;
  });
  document.querySelector(".total-panier").textContent = `Total: ${total.toLocaleString()} GNF`;
}

function supprimerDuPanier(index) {
  panier.splice(index, 1);
  afficherPanier();
  mettreAJourBadge();
}

function mettreAJourBadge() {
  const badge = document.getElementById("panier-count");
  badge.textContent = panier.length;
  badge.style.display = panier.length > 0 ? "inline-block" : "none";
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  afficherProduits();
  mettreAJourBadge();
});
