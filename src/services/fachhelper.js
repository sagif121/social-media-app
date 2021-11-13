export function registerNewAccount(data, callback) {
  let url = "http://localhost:5000/users/newUser";
  let obj = getConfigurationForPostRequest(data);

  fetch(url, obj)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}
function getConfigurationForPostRequest(data) {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  };
}
