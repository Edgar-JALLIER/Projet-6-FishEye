const main = document.querySelector("#main");
const header = document.querySelector(".header-accueil");
const modal = document.querySelector("#contact_modal");
const body = document.querySelector("#body");
const closeModalBtn = document.querySelector(".close-modal");
const openModalBtn = document.querySelector(".contact_button");
const closeLightboxBtn = document.querySelector(".lightbox_button-close");
const lightbox = document.querySelector(".lightbox_modal");
const btnDropdown = document.querySelector(".trieur_dropdown-button");
const iconDropdown = document.querySelector("#icon-fleche");
const listDropdown = document.querySelector(".trieur_dropdown-menu");
const allBtnList = document.querySelectorAll(".dropdown_menu-item");
const keyCodes = {
  escape: 27,
  enter: 13,
};
let isOpen = false;

function changementDuTrieur() {
  const allBtnList = document.querySelectorAll(".dropdown_menu-item");
  if (isOpen === false) {
    btnDropdown.setAttribute("aria-expanded", "true");
    iconDropdown.classList.add("trieur_button-icon-moove");
    listDropdown.classList.remove("hide");
    isOpen = true;
  } else {
    btnDropdown.setAttribute("aria-expanded", "false");
    iconDropdown.classList.remove("trieur_button-icon-moove");
    listDropdown.classList.add("hide");
    isOpen = false;
  }
  for (let btn of allBtnList) {
    btn.addEventListener("click", setName);
    btn.addEventListener("keydown", forKeybords);
  }
}

function forKeybords(e) {
  if (e.which === keyCodes.enter) {
    setName(e.target);
  }
}

function setName(e) {
  const btnDropdown = document.querySelector(".trieur_dropdown-button");
  //fonction conditionnel pour gérer l'évènement au clavier puisque avec clavier le this n'est pas reconnu (qui est normalement le btn cliqué)
  btnDropdown.textContent = this.window ? e.innerText : this.innerText;
  changementDuTrieur();
  trieurDeMedias(btnDropdown);
}

function trieurDeMedias(optionDeTri) {
  console.log("option de tri", optionDeTri);
  let actualPostsNodeList = document.querySelectorAll(".media_container");
  let actualPostsArray = Array.from(actualPostsNodeList);
  console.log("test 2", actualPostsArray);
  let actualPostDataArray = [];
  for (let post of actualPostsArray) {
    let imagePost = post.querySelector(".card_link").children[0];
    let srcOfImage = imagePost.getAttribute("src").split("assets/images/media/")[1];
    let tagOfPost = imagePost.tagName;
    let anActualPostData = {
      title: post.getAttribute("data-titre"),
      likes: Number(post.getAttribute("data-like")),
      date: post.getAttribute("data-date-publication"),
      id: post.getAttribute("data-post-id"),
    };
    if (tagOfPost === "IMG") {
      anActualPostData = {
        ...anActualPostData,
        image: srcOfImage,
      };
    } else {
      anActualPostData = {
        ...anActualPostData,
        video: srcOfImage,
      };
    }
    actualPostDataArray.push(anActualPostData);
  }

  let notreOptionDeTri = optionDeTri.innerText.toLowerCase();

  const lesImages = document.querySelectorAll(".media_container");
  lesImages.forEach((image) => {
    image.remove();
  });
  likeTotal = 0;
  envoiDesdonnéesDesMedia(trieurDeListe(actualPostDataArray, notreOptionDeTri));
}
btnDropdown.addEventListener("click", changementDuTrieur);

function trieurDeListe(liste, valeurDeTri) {
  let tableauFinal = [];
  switch (valeurDeTri) {
    case "titre":
      {
        tableauFinal = liste.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      }
      break;
    case "popularité":
      {
        tableauFinal = liste.sort((a, b) => {
          return b.likes - a.likes;
        });
      }
      break;
    case "date":
      {
        tableauFinal = liste.sort((a, b) => {
          const date1 = new Date(a.date)
          const date2 = new Date(b.date)
          return date2 - date1;
        });
      }
      break;
  }
  return tableauFinal;
}

closeModalBtn.addEventListener("click", function () {
  closeModal();
});

closeLightboxBtn.addEventListener("click", function () {
  closeLighbox();
});

function displayModal() {
  modal.style.display = "block";
  body.style.overflow = "hidden";
  modal.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
  closeModalBtn.focus();
}

function closeLighbox() {
  lightbox.style.display = "none";
  body.style.overflow = "";
  lightbox.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
  ImageLightbox.removeAttribute("src");
  videoLightbox.removeAttribute("src");
  ImageLightbox.removeAttribute("alt");
  videoLightbox.removeAttribute("alt");
}

const bouttonEnvoyer = document.querySelector(".envoyer_button");
const errorNom = document.querySelector(".error_nom");
const errorPrenom = document.querySelector(".error_prenom");
const errorEmail = document.querySelector(".error_email");
const prenom = document.querySelector("#prenom");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

nom.addEventListener("change", function () {
  if (nom.validity.valid === false) {
    nom.ariaInvalid = true;
    nom.style.border = "3px solid red";
    errorNom.innerHTML = "Veuillez entrer un nom valide";
  } else {
    nom.ariaInvalid = false;
    nom.style.border = "3px solid green";
    errorNom.innerHTML = "";
  }
});

prenom.addEventListener("change", function () {
  if (prenom.validity.valid === false) {
    prenom.ariaInvalid = true;
    prenom.style.border = "3px solid red";
    errorPrenom.innerHTML = "Veuillez entrer un prénom valide";
  } else {
    prenom.ariaInvalid = false;
    prenom.style.border = "3px solid green";
    errorPrenom.innerHTML = "";
  }
});

email.addEventListener("change", function () {
  if (email.validity.valid === false) {
    email.ariaInvalid = true;
    email.style.border = "3px solid red";
    errorEmail.innerHTML = "Veuillez entrer un Email valide";
  } else {
    email.ariaInvalid = false;
    email.style.border = "3px solid green";
    errorEmail.innerHTML = "";
  }
});

bouttonEnvoyer.addEventListener("click", function (e) {
  e.preventDefault();
  if (prenom.validity.valid === true && nom.validity.valid === true && email.validity.valid === true) {
    console.log("Prénom =", prenom.value);
    console.log("Nom =", nom.value);
    console.log("Email =", email.value);
    console.log("Message =", message.value);
  } else {
    alert("Veuillez remplir les champs manquants");
  }
});

function closeModal() {
  modal.style.display = "none";
  body.style.overflow = "";
  modal.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
}

window.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && modal.ariaHidden == "false") {
    closeModal();
  }
});

window.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && lightbox.ariaHidden == "false") {
    closeLighbox();
  }
});
