/****************************** ADD DOG BUTTON ******************************/
const add = document.getElementById("add");
add.addEventListener("click", async () => {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    console.log("data ", data);
    const url = data.message; // URL of new dog image
    console.log("url ", url);
    /*--------------- Get breed (Hint: Parse from URL) ---------------- */
    // Your code here

    /*------------ Create new dog card with the url above ------------- */
    /* (use the HTML structure for the current dog image in the index.html
            file to create a new image with the url) */
    // Your code here

    /* Add the new dog card as a child to the ul in the .gallery element */
    // Your code here
    /*
        <li>
            <figure>
                <img src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg" />
                <figcaption>hound-afghan</figcaption>
            </figure>
        </li>

        get ul to append li to later
        create elements
            li, figure, img, figcaption

        manipulate elements
            set img src
            set figcaption innerText

        append elements in order (stitch them up)
    */
    const urlParts = url.split("/");
    console.log("url parts ", urlParts);
    const dogBreed = urlParts[4];

    const dogsListContainer = document.querySelector("ul");
    const dogLi = document.createElement("li");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    img.setAttribute("src", url);
    figCaption.innerText = dogBreed;

    figure.append(img, figCaption);

    dogLi.style.backgroundColor = "grey";

    dogLi.appendChild(figure);
    dogsListContainer.appendChild(dogLi);
  } catch (e) {
    console.log("Couldn't fetch dog :(");
  }
});

/************************** REMOVE FIRST DOG BUTTON **************************/
const removeFirst = document.getElementById("remove-first");
removeFirst.addEventListener("click", () => {
  /*-------------------- Select the first dog card --------------------- */
  // Your code here
  /*-------------------- Remove the first dog card --------------------- */
  // Your code here
  const firstDog = document.querySelector("li");
  firstDog && firstDog.remove();
});

/************************** REMOVE LAST DOG BUTTON ***************************/
const removeLast = document.getElementById("remove-last");
removeLast.addEventListener("click", () => {
  /*-------------------- Select the last dog card ----------------------- */
  // Your code here
  /*-------------------- Remove the last dog card ----------------------- */
  // Your code here
  const lastDog = document.querySelector(".gallery > ul > li:last-child");
  lastDog && lastDog.remove();
});

const themeButton = document.getElementById("theme");
themeButton.addEventListener("click", () => {
  //   if (document.body.className.includes("dark-mode")) {
  //     console.log("dark mode removed");
  //     document.body.classList.remove("dark-mode");
  //   } else {
  //     console.log("dark mode added");
  //     document.body.classList.add("dark-mode");
  //   }

  document.body.classList.toggle("dark-mode");
});
