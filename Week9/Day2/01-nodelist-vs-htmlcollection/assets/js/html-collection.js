export default () => {
  const bodyChildElements = document.body.children; // HTMLCollection [div]
  console.log("body child elements ", bodyChildElements);

  const div = bodyChildElements[0];
  console.log("div ", div);
  const divChildElements = Array.from(div.children); // HTMLCollection [span]
  console.log("div child elements ", divChildElements);

  for (let i = 0; i < divChildElements.length; i++) {
    const span = document.createElement("span");

    span.innerText = "Frontend is fun!";
    div.appendChild(span);
    if (i === 100) break;
  }

  const helloWorld = div.innerText; // Hello World! Yes!    <-- NOT Hello World!
  const span = divChildElements[0]; // <span>Yes!</span>
  // debugger;
};
