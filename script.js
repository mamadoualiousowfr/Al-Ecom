document.addEventListener("DOMContentLoaded", () => {
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
      nom: "Chaussure blanche",
      prix: 250000,
      image: "Images/images (2).jpeg",
      categorie: "Chaussures"
    },
    {
      id: 3,
      nom: "Casquette sport",
      prix: 75000,
      image: "Images/images (3).jpeg",
      categorie: "Casquette"
    },
    {
      id: 4,
      nom: "Maillot foot",
      prix: 150000,
      image: "Images/images (4).jpeg",
      categorie: "Maillot"
    },
    {
      id: 5,
      nom: "Cullotte élégante",
      prix: 60000,
      image: "Images/images (5).jpeg",
      categorie: "Cullotte"
    }
  ];

  const pageProduits = document.getElementById("produits");
  const panierContainer = document.getElementById("panier-container");
  const totalPrix = document.getElementById("total-prix");
  const boutonVider = document.getElementById("vider-panier");
  const panierCountIcon = document.createElement("span");

  panierCountIcon.id = "panier-count";
  panierCountIcon.textContent = "0";
  document.querySelector('a[href="panier.html"]').appendChild(panierCountIcon);

  function getPanier() {
    return JSON.parse(localStorage.getItem("panier")) || [];
  }

  function setPanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
  }

  function ajouterAuPanier(produit) {
    const panier = getPanier();
    panier.push(produit);
    setPanier(panier);
    alert(`Produit ajouté : ${produit.nom}`);
    mettreAJourCompteur();
  }

  function mettreAJourCompteur() {
    const panier = getPanier();
    panierCountIcon.textContent = panier.length;
  }

  function afficherProduits() {
    produits.forEach((produit) => {
      const div = document.createElement("div");
      div.className = "produit";
      div.innerHTML = `
        <img src="${produit.image}" alt="${produit.nom}" />
        <h3>${produit.nom}</h3>
        <p>${produit.prix.toLocaleString()} GNF</p>
        <button onclick='ajouterAuPanier(${JSON.stringify(produit)})'>Ajouter au panier</button>
      `;
      pageProduits.appendChild(div);
    });
  }

  function afficherPanier() {
    const panier = getPanier();
    panierContainer.innerHTML = "";
    if (panier.length === 0) {
      panierContainer.innerHTML = "<p>Votre panier est vide.</p>";
      totalPrix.textContent = "0 GNF";
      return;
    }

    let total = 0;
    const fragment = document.createDocumentFragment();

    panier.forEach((item, index) => {
      total += item.prix;
      const div = document.createElement("div");
      div.className = "produit-panier";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.nom}" />
        <div>
          <h4>${item.nom}</h4>
          <p>${item.prix.toLocaleString()} GNF</p>
        </div>
      `;
      fragment.appendChild(div);
    });

    panierContainer.appendChild(fragment);
    totalPrix.textContent = total.toLocaleString() + " GNF";
  }

  if (pageProduits) {
    afficherProduits();
    mettreAJourCompteur();
  }

  if (panierContainer && totalPrix) {
    afficherPanier();
    mettreAJourCompteur();
  }

  if (boutonVider) {
    boutonVider.addEventListener("click", () => {
      localStorage.removeItem("panier");
      afficherPanier();
      mettreAJourCompteur();
    });
  }
});
