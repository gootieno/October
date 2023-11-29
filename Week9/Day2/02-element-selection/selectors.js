const select = () => {
  /* Write queries for each of the following */

  /* Section 1 */
  // 1. Get all seeded fruit elements
  // Your code here
  console.log("seeded fruits ", document.getElementsByClassName("seed"));

  // 2. Get all seedless fruit elements
  // Your code here
  console.log("seedless fruits ", document.getElementsByClassName("seedless"));
  // 3. Get first seedless fruit element
  // Your code here
  console.log("first seedless ", document.querySelector(".seedless"));
  /* Section 2 */
  // 4. Get inner span with text "you"
  // Your code here
  console.log(
    "you span ",
    document.getElementById("wrapper").getElementsByTagName("span")[0]
  );
  // 5. Get all children of element "wrapper"
  // Your code here
  console.log("wrapper children ", document.getElementById("wrapper").children);
  //   console.log(inner)
  // 6. Get all odd number list items in the list
  console.log("all odd items ", document.querySelectorAll(".odd"));
  // Your code here
  // 7. Get all even number list items in the list
  // Your code here
  console.log(
    "all event items ",
    document.querySelectorAll("ol > li:not([class])")
  );
  /* Section 3 */
  // 8. Get all tech companies without a class name
  // Your code here
  console.log("classless tech ", document.querySelectorAll("a:not([class])"));
  // 9. Get "Amazon" list element
  // Your code here
  console.log("Amazon ", document.querySelector("#three > p").children[2]);
  //   console.log("Amazon 2 ", document.querySelector("a.shopping"));
  // 10. Get all unicorn list elements (not the image element)
  // Your code here

  const unicorns = document.getElementsByClassName("unicorn");
  console.log("unicorns ", unicorns);

  const parentElements = [];
  for (const unicorn of unicorns) {
    // console.log("unicorn ", unicorn);
    parentElements.push(unicorn.parentElement);
  }

  console.log("unicorn parents ", parentElements);
};

window.onload = select;
