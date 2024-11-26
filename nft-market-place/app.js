const COLLECTIONS_DUMP=COLLECTIONS;
const createCategories = () => {
    const filterCategorieEl = document.querySelector(".filter__categories");
    let categories = ["all"];

    // Kategorileri oluşturma
    COLLECTIONS_DUMP.forEach((item) => {
        if (categories.findIndex((c) => c === item.category) === -1) {
            categories.push(item.category);
        }
    });

    // Kategori çevirici (isimler)
    const categorySwitcher = {
        all: "All",
        sport: "Sport",
        collectibles: "Collectibles",
        art: "Art",
        photography: "Photography",
        music: "Music",
    };

    // Kategorileri DOM'a ekleme
    categories.forEach((category) => {
        let categoryHTML = `
            <li class="${category === "all" ? "active" : ""}" 
                onclick="filterCategories(this)" data-category="${category}">
                ${categorySwitcher[category]}
            </li>`;
        filterCategorieEl.insertAdjacentHTML("beforeend", categoryHTML);
    });
};

// Filtreleme fonksiyonu
const filterCategories = (categoryEl) => {
    const lastActiveEl=document.querySelector("li.active");
    lastActiveEl.classList.remove("active");
    categoryEl.classList.add("active");
    if (categoryEl.dataset.category == "all") {
        COLLECTIONS=COLLECTIONS_DUMP;
      
    }
    else{
        COLLECTIONS=COLLECTIONS_DUMP.filter(
            (collection)=>collection.category==categoryEl.dataset.category);
    }


  listCollections();
};

// Koleksiyonları listeleme
const listCollections = () => {
    const collectionEl = document.querySelector(".collections");
    collectionEl.innerHTML="";
    COLLECTIONS.forEach((collection) => {
        let collectionsItemHtml = `
            <div class="collections__item">
                <a class="collection_container" href="${collection.link}">
                    <img class="collection__img" src="${collection.img}" height="300" />
                    <div class="collection__info">
                        <strong class="collection__title">${collection.name}</strong> <br />
                        <span>${collection.author}</span>
                    </div>
                    <div class="collection__price">
                        <strong>${collection.price} ETH</strong>
                        <img
                            src="./images/ethereum-logo.png"
                            width="24"
                            height="24"
                            alt=""
                        />
                    </div>
                    <button>Show Detail</button>
                </a>
            </div>`;
        collectionEl.insertAdjacentHTML("beforeend", collectionsItemHtml);
    });
};
const searchCollections=(searchKey)=>{
    if(searchKey.length>1){
    COLLECTIONS=COLLECTIONS_DUMP.filter((c)=>c.name.toLowerCase().includes(searchKey.toLowerCase()));
    }
    else{
        COLLECTIONS=COLLECTIONS_DUMP;
    }
    listCollections();
    
}
// Fonksiyonları çağır
createCategories();
listCollections();
