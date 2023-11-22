export function getAllDogs() {
  // Your code here

  const url = "/dogs";

  // Use the URLSearchParams API to format your body as shown below

  return fetch(url);
}

export function getDogNumberTwo() {
  // Your code here
  //   const url = '/dogs/2'
  return fetch("/dogs/2");
}

export function postNewDog() {
  // Your code here

  // action='/dogs'
  // method=POST

  const url = "/dogs";
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  // Use the URLSearchParams API to format your body as shown below
  const body = new URLSearchParams({
    name: "Kaido",
    age: 1,
  });

  const options = {
    method: "POST",
    headers: headers,
    body: body,
  };

  return fetch(url, options);
}

export function postNewDogV2(name, age) {
  // Your code here
  const url = "/dogs";
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  // Use the URLSearchParams API to format your body as shown below
  const body = new URLSearchParams({
    name,
    age,
  });

  const options = {
    method: "POST",
    headers: headers,
    body: body,
  };

  return fetch(url, options);
}

export function deleteDog(id) {
  // Your code here
  return fetch(`/dogs/${id}/delete`, {
    method: 'POST',
    headers: { 'AUTH': 'ckyut5wau0000jyv5bsrud90y' }
  })
}
