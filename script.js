// Paths & max indices
const skincareImgFolder = "imgs/skincare";
const skincareTextFolder = "imgs/skincare";
const makeupImgFolder = "imgs/makeup";
const makeupTextFolder = "imgs/makeup";

const skincareMaxImg = 83;
const skincareMaxText = 84;
const makeupMaxImg = 83;
const makeupMaxText = 84;

// Load description
async function loadDescription(path){
  try{
    const res = await fetch(path);
    if(!res.ok) throw new Error("File not found");
    return await res.text();
  }catch(e){ return null; }
}

// Short text (~6 words)
function shortText(text){
  const words = text.split(" ");
  if(words.length<=6) return text;
  return words.slice(0,6).join(" ") + "...";
}

// Create card
async function createCard(imgPath, textPath, category){
  const desc = await loadDescription(textPath);
  if(!desc) return null;

  try{
    await new Promise((resolve,reject)=>{
      const img = new Image();
      img.src = imgPath;
      img.onload=resolve;
      img.onerror=reject;
    });
  }catch(e){ return null; }

  const card = document.createElement("div");
  card.className="card";
  card.setAttribute("data-category",category);
  card.innerHTML=`<img src="${imgPath}" alt=""><div class="content"><p>${shortText(desc)}</p></div>`;

  const productList=document.getElementById("product-list");
  card.style.animationDelay=`${0.05*productList.children.length}s`;

  // Modal
  card.addEventListener("click",()=>{
    const modal=document.getElementById("modal");
    const modalImg=document.getElementById("modal-img");
    const modalText=document.getElementById("modal-text");
    modalImg.src=imgPath;
    modalText.textContent=desc;
    modal.style.display="block";
    setTimeout(()=>modal.classList.add("show"),10);
  });

  return card;
}

// Load skincare
async function loadSkincare(productList){
  let imgIndex=1,textIndex=2;
  while(imgIndex<=skincareMaxImg && textIndex<=skincareMaxText){
    const imgPath=`${skincareImgFolder}/${imgIndex}.jpg`;
    const textPath=`${skincareTextFolder}/${textIndex}.txt`;
    const card=await createCard(imgPath,textPath,"skincare");
    if(card) productList.appendChild(card);
    imgIndex+=2;textIndex+=2;
  }
}

// Load makeup
async function loadMakeup(productList){
  let imgIndex=1,textIndex=2;
  while(imgIndex<=makeupMaxImg && textIndex<=makeupMaxText){
    const imgPath=`${makeupImgFolder}/${imgIndex}.jpg`;
    const textPath=`${makeupTextFolder}/${textIndex}.txt`;
    const card=await createCard(imgPath,textPath,"makeup");
    if(card) productList.appendChild(card);
    imgIndex+=2;textIndex+=2;
  }
}

// Load all products
async function loadProducts(){
  const productList=document.getElementById("product-list");
  await loadSkincare(productList);
  await loadMakeup(productList);
}

// Filter
function setupFilters(){
  const buttons=document.querySelectorAll(".filter-btn");
  buttons.forEach(btn=>{
    btn.addEventListener("click",()=>{
      const category=btn.dataset.category;
      const cards=document.querySelectorAll(".card");
      cards.forEach(card=>{
        if(category==="all") card.style.display="block";
        else card.style.display=(card.dataset.category===category)?"block":"none";
      });
    });
  });
}

// Modal close
window.addEventListener("DOMContentLoaded",()=>{
  const modal=document.getElementById("modal");
  const closeBtn=document.querySelector(".close");
  closeBtn.onclick=()=>{
    modal.classList.remove("show");
    setTimeout(()=>modal.style.display="none",400);
  };
  modal.onclick=(e)=>{
    if(e.target===modal){
      modal.classList.remove("show");
      setTimeout(()=>modal.style.display="none",400);
    }
  };
});

// Run
window.onload=async()=>{
  await loadProducts();
  setupFilters();
};
