let count = 0;
let btn = document.getElementById("btn");

function sendMail(){

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let message = document.getElementById("message");

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let messageError = document.getElementById("messageError");
    let btnError = document.getElementById("btnError");

    btn.disabled = true;
    nameError.style.display = "none";
    emailError.style.display = "none";
    messageError.style.display = "none";

    if (count > 3) {
        btnError.style.display = "block";
        btnError.textContent = " You have sent too many messages. Try again later";
        alert(" You have sent too many messages. Try again later");
        btn.disabled = true;
        return;
    }

    if(name.value == ""){
        nameError.style.display = "block";

        nameError.textContent = " Name is empty";
        alert(" Name is empty");
        btn.disabled = false;
        return;
    }

    if (email.value == "") {
      emailError.style.display = "block";
      emailError.textContent = " Email is empty";
      alert(" Email is empty");
      btn.disabled = false;
      return;
    }

    if (!email.value.includes("@") && !email.value.includes(".")) {
        emailError.style.display = "block";
        emailError.textContent = " Email is not valid";
        alert(" Email is not valid");
        btn.disabled = false;
        return;
    }

    if (message.value == "") {
      messageError.style.display = "block";
      messageError.textContent = " Message is empty";
      alert(" Message is empty");
      btn.disabled = false;
      return;
    }

    count++;
    btn.textContent = "Sending Message...";

    Email.send({
      SecureToken: "ccaa71a8-ece7-46b4-8974-d335e4c96e7e",
      To: "hello@iwwl.org",
      From: "hello@iwwl.org",
      Subject: "New Message from " + name.value +" [ "+email.value+" ] ",
      Body: message.value,
    })
    .then((message) => {
      console.log(message);
      btn.textContent = "Message sent successfully";
      alert("Message sent succesfully !!!");
      window.location.replace("https://iwwl.org/");
    });

}

btn.addEventListener("click", sendMail);
