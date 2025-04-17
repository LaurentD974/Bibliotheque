// Récupérer les films sur l'api
const url = "https://openlibrary.org/search.json?title=the+lord+of+the+rings&limit=100";
const urlimg = "https://covers.openlibrary.org/a/olid/OL23919A-M.jpg"
const main = document.querySelector("main");
const btnAz = document.querySelector("#btnSortAz");
const btnZa = document.querySelector("#btnSortZa");
const inputYearBook = document.querySelector("#inputYearBook");
const inputBookRange = document.querySelector("#inputBookRange");
const displayBookRange = document.querySelector("#displayBookRange");
const inputBookName = document.querySelector("#inputBookName");
var books = [];
var sortMethod = "";
var numberOfBooks = 4;

var filter = "";

const fetchBooks = async () => {
  const request = await fetch(url);
  const data = await request.json();
  books=data.docs;
  console.log(books);
  
  updateMain();
};

const updateMain = () => {
  main.innerHTML="";
  var copy=[...books]
  copy=copy.sort((a, b) => {
    if (sortMethod == "az") return a.title.localeCompare(b.title);
    else if (sortMethod == "za") return b.title.localeCompare(a.title);
  })
  copy= copy.slice(0,numberOfBooks);
 copy.forEach((b)=> 
    main.innerHTML += ` <div>
    <img
    src="https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg"
    alt=""
    />
    <h3>${b.title}</h3>
    <h3>${b.author_name}</h3>
    <h4>${b.first_publish_year
    }</h4>
    </div>`);
  };
  

fetchBooks();

btnAz.addEventListener("click", () => {
sortMethod = "az";
updateMain();
});

btnZa.addEventListener("click", () => {
sortMethod = "za";
updateMain();
});

inputBookRange.addEventListener("input", (e) => {
  displayBookRange.innerHTML = e.target.value;
  numberOfBooks = e.target.value;  
  updateMain();
});

inputBookName.addEventListener("input", (e) => {
  filter = e.target.value;
  updateMain();
});