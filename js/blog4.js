const firebaseConfig = {
  apiKey: "AIzaSyC2k2T_I7Ibi2AmHu9bnrAhskwwrdaiERM",
  authDomain: "iwwl-4d48e.firebaseapp.com",
  projectId: "iwwl-4d48e",
  storageBucket: "iwwl-4d48e.appspot.com",
  messagingSenderId: "501001819811",
  appId: "1:501001819811:web:7c150fc289de297bf11116",
};

let count = 0;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore(); 

let blogDiv = document.getElementById("blogDiv");
let postLoading = document.getElementById("postLoading");

function renderPost(doc){

    count++;

    let blogDate = String(new Date(Number(doc.data().timeStamp))).slice(0, -36);

    let blogBlock = `<div class="col-lg-4 col-md-4 col-sm-6" onclick="postClick('${doc.data().image}', '${doc.data().title}', '${blogDate}', '${doc.data().para1}', '${doc.data().para2}', '${doc.data().para3}', '${doc.data().para4}', '${doc.data().para5}' , '${doc.data().description}')" style="cursor: pointer;">
						<div class="fh5co-blog animate-bx">
							<img class="img-responsive" src="${doc.data().image}" alt="" style="border-radius: 10px">
							<div class="blog-text">
								<div class="prod-title">
									<h3>${doc.data().title}</h3>
									<span class="posted_by">${blogDate}</span>
									
									<p>${doc.data().description}</p>
									<p style="color: #bf0000; cursor: pointer;">Learn More...</p>
								</div>
							</div> 
						</div>
					</div>`;
    
     blogDiv.insertAdjacentHTML("beforeend", blogBlock);                

}

function postClick(image, title, date, para1, para2, para3, para4, para5, description) {
  sessionStorage.setItem("image", image);
  sessionStorage.setItem("title", title);
  sessionStorage.setItem("date", date);
  sessionStorage.setItem("para1", para1);
  sessionStorage.setItem("para2", para2);
  sessionStorage.setItem("para3", para3);
  sessionStorage.setItem("para4", para4);
  sessionStorage.setItem("para5", para5);
  sessionStorage.setItem("description", description);
  window.location.href = "./blogDetails";
}

db.collection('BlogPosts').get().then((snapshot) =>{
    snapshot.docs.forEach( doc => {
       
        if(count <= 3 ){
            renderPost(doc);
        }
    })

    postLoading.style.display = "none";
    

})