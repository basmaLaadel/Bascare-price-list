// Paths & max indices
const skincareImgFolder = "imgs/skincare";
const skincareTextFolder = "imgs/skincare";
const makeupImgFolder = "imgs/makeup";
const makeupTextFolder = "imgs/makeup";

const skincareMaxImg = 198;
const skincareMaxText = 200;
const makeupMaxImg = 198;
const makeupMaxText = 200;

async function loadDescription(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("File not found");
    return await res.text();
  } catch (e) {
    return null;
  }
}

// Short text (~6 words)
function shortText(text) {
  if (!text) return "";
  const words = text.split(/\s+/); // أي مسافة
  if (words.length <= 6) return text;
  return words.slice(0, 6).join(" ") + "...";
}

// Create product card
async function createCard(imgPath, textPath, category) {
  const desc = await loadDescription(textPath);
  if (!desc) return null; // لو الملف مش موجود، ما نعملش الكارت

  // Check image
  try {
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgPath;
      img.onload = resolve;
      img.onerror = reject;
    });
  } catch (e) {
    return null; // لو الصورة مش موجودة
  }

  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-category", category);

  card.innerHTML = `
    <img src="${imgPath}" alt="">
    <div class="content">
      <p>${shortText(desc)}</p>
    </div>
  `;

  // Modal
  card.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalText = document.getElementById("modal-text");

    // تحويل السطور الجديدة الى <br> عشان يظهر السطر الفاضي
    modalText.innerHTML = desc.replace(/\n/g, "<br>");
    modalImg.src = imgPath;
    modal.style.display = "block";
    modal.classList.add("show");
  });

  return card;
}

// Load skincare products
async function loadSkincare(productList) {
  let imgIndex = 1;
  let textIndex = 2;

  while (imgIndex <= skincareMaxImg && textIndex <= skincareMaxText) {
    const imgPath = `${skincareImgFolder}/${imgIndex}.jpg`;
    const textPath = `${skincareTextFolder}/${textIndex}.txt`;
    const card = await createCard(imgPath, textPath, "skincare");
    if (card) productList.appendChild(card);

    imgIndex += 2;
    textIndex += 2;
  }
}

// Load makeup products
async function loadMakeup(productList) {
  let imgIndex = 1;
  let textIndex = 2;

  while (imgIndex <= makeupMaxImg && textIndex <= makeupMaxText) {
    const imgPath = `${makeupImgFolder}/${imgIndex}.jpg`;
    const textPath = `${makeupTextFolder}/${textIndex}.txt`;
    const card = await createCard(imgPath, textPath, "makeup");
    if (card) productList.appendChild(card);

    imgIndex += 2;
    textIndex += 2;
  }
}

// Load all products
async function loadProducts() {
  const productList = document.getElementById("product-list");
  await loadSkincare(productList);
  await loadMakeup(productList);
}

// Filter setup
function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.style.display =
          category === "all" || card.dataset.category === category
            ? "block"
            : "none";
      });
    });
  });
}

// Modal close
window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");

  closeBtn.onclick = () => {
    modal.style.display = "none";
    modal.classList.remove("show");
  };

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modal.classList.remove("show");
    }
  };
});

// Run
window.onload = async () => {
  await loadProducts();
  setupFilters();
};
