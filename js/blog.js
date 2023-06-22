const firebaseConfig = {
  apiKey: "AIzaSyC2k2T_I7Ibi2AmHu9bnrAhskwwrdaiERM",
  authDomain: "iwwl-4d48e.firebaseapp.com",
  projectId: "iwwl-4d48e",
  storageBucket: "iwwl-4d48e.appspot.com",
  messagingSenderId: "501001819811",
  appId: "1:501001819811:web:7c150fc289de297bf11116",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const storage = firebase.storage();



let imageError = document.getElementById("imageError");
let titleError = document.getElementById("titleError");
let passwordError = document.getElementById("passwordError");
let descriptionError = document.getElementById("descriptionError");
let para1Error = document.getElementById("para1Error");

let postButton = document.getElementById("postButton");

function uploadPost() {

  //get Ids
  let image = document.getElementById("image");
  let title = document.getElementById("title").value;
  let password = document.getElementById("password").value;
  let description = document.getElementById("description").value;
  let para1 = document.getElementById("para1").value;
  let para2 = document.getElementById("para2").value;
  let para3 = document.getElementById("para3").value;
  let para4 = document.getElementById("para4").value;
  let para5 = document.getElementById("para5").value;

  postButton.textContent = "Sending message";
  postButton.disabled = true;

  imageError.style.display = "none";
  titleError.style.display = "none";
  descriptionError.style.display = "none";
  passwordError.style.display = "none";
  para1Error.style.display = "none";

  if (title == "") {
    titleError.style.display = "block";
    titleError.textContent = "Blog title is empty";
    postButton.textContent = "Submit post";
    postButton.disabled = false;
    alert("Blog title is empty");
    return;
  }

  if (description == "") {
    descriptionError.style.display = "block";
    descriptionError.textContent = "Blog description is empty";
    alert("Blog description is empty");
    postButton.textContent = "Submit post";
    postButton.disabled = false;
    return;
  }

  if (para1 == "") {
    para1Error.style.display = "block";
    para1Error.textContent = "First paragraph can not be empty";
    alert("First paragraph can not be empty");
    postButton.textContent = "Submit post";
    postButton.disabled = false;
    return;
  }

  //pass check
  let mPass = mex(password);

  if (
    mPass !=
    "u0069u0077u0077u006cu002du0061u0064u006du0069u006eu002du0032u0032u0035"
  ) {
    passwordError.style.display = "block";
    passwordError.textContent = "Password is invalid";
    alert("Password is invalid");
    postButton.disabled = false;
    postButton.textContent = "Submit post";
    return;
  }

  //upload image and get url
  if (image.files.length < 1) {
    imageError.style.display = "block";
    imageError.textContent = "Upload an image for the blog post";
    alert("Upload an image for the blog post");
    postButton.disabled = false;
    postButton.textContent = "Submit post";
    return;
  }

  // Create the file metadata
  var metadata = {
    contentType: "image/*",
  };

  var storageRef = firebase.storage().ref();

  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef
    .child("BlogImages/" + image.files[0].name)
    .put(image.files[0], metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);

        //upload doc
        db.collection("BlogPosts")
          .add({
            title: title,
            description: description,
            image: downloadURL,
            para1: para1,
            para2: para2,
            para3: para3,
            para4: para4,
            para5: para5,
            timeStamp: Date.now(),
          })
          .then((docRef) => {
            postButton.textContent = "Blog post uploaded successfully";
            alert("BLOG POST WAS UPLOADED SUCCESSFULLY !!!");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      });
    }
  );
}

function mex(str) {
  var arr = [];
  for (var i = 0; i < str.length; i++) {
    arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "u" + arr.join("u");
}

postButton.addEventListener("click", uploadPost);
