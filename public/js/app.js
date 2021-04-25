console.log("Client Side JS file is loaded");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

// messageOne.textContent = "From JS";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageTwo.style.color = "orange";
  messageTwo.textContent = "Loading Weather Data ...";
  messageOne.textContent = "";
  setTimeout(() => {
    fetch(`/weather?address=${location}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageTwo.style.color = "red";
          messageTwo.textContent = data.error;
        } else {
          // console.log(`location: ${data.location}`);
          // console.log(`forecast: ${data.forecast}`);
          messageOne.style.color = messageTwo.style.color = "green";
          messageOne.textContent = `Location : ${data.location}`;
          messageTwo.textContent = `Forecast : ${data.forecast}`;
        }
      });
    });
  }, 1000);
});
