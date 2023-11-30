// Your code here

window.addEventListener('DOMContentLoaded', () => {
  // alert('DOM CONTENT LOADED');

  const redInput = document.getElementById('red-input');
  const changeRed = e => {
    if (redInput.value === 'red') {
      redInput.style.backgroundColor = 'red'
    } else {
      redInput.style.backgroundColor = 'transparent'
    }
  }
  redInput.addEventListener('input', changeRed);

  const list = document.getElementById('list-add');
  const listButton = document.getElementById('add-item');
  const addItem = e => {
    const li = document.createElement('li');
    li.innerText = list.value;
    const ul = document.querySelector('ul');
    ul.appendChild(li);
  }
  listButton.addEventListener('click', addItem)

  const colorSelect = document.getElementById('color-select');
  const colorChange = e => {
    const section = document.getElementById('section-3');
    section.style.backgroundColor = colorSelect.value;
  }

  colorSelect.addEventListener('change', colorChange);


  const removeButton = document.getElementById('remove-listeners');
  removeButton.addEventListener('click', e => {
    colorSelect.removeEventListener('change', colorChange)
    redInput.removeEventListener('input', changeRed);
    listButton.removeEventListener('click', addItem);
  })

  const button = document.createElement('button');
  button.innerText = 'ADD LISTENERS BACK';
  document.body.append(button)

})
