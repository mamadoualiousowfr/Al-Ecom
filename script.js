// Données produits exactes fournies
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

// Affichage produits dans l'HTML
function afficherProduits() {
  const container = document.getElementById("liste-produits");
  container.innerHTML = "";
  for (let categorie in produits) {
    produits[categorie].forEach(prod => {
      const div = document.createElement("div");
      div.className = "produit";
      div.innerHTML = `
        <img src="${prod.image}" alt="${prod.nom}" />
        <h3>${prod.nom}</h3>
        <p>${prod.prix.toLocaleString()} GNF</p>
        <button class="btn-ajouter" onclick="ajouterAuPanier(${prod.id}, '${categorie}')">Ajouter au panier</button>
      `;
      container.appendChild(div);
    });
  }
}

let panier = [];

function ajouterAuPanier(id, categorie) {
  const produit = produits[categorie].find(p => p.id === id);
  if (produit) {
    panier.push(produit);
    updatePanier();
  }
}

function updatePanier() {
  const count = document.getElementById("panier-count");
  count.textContent = panier.length;
  localStorage.setItem("panier", JSON.stringify(panier));
}

window.onload = () => {
  afficherProduits();
  const stored = localStorage.getItem("panier");
  if (stored) {
    panier = JSON.parse(stored);
    updatePanier();
  }
};
