// Your code here

window.addEventListener('DOMContentLoaded', () => {
  const shoppingList = document.getElementById('shopping-list');

  const name = document.getElementById('name');
  const type = document.getElementById('type');

  const addBtn = document.getElementById('add');

  addBtn.addEventListener('click', e => {
    e.preventDefault();

    const li = document.createElement('li');

    li.innerText = name.value;
    li.dataset.type = type.value;
    li.setAttribute('data-type', type.value);

    shoppingList.appendChild(li);
  })

})
