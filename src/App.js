import { useEffect, useState } from "react";
import "./App.css";

/* -----STATES----- 
I used localStorage for user can see the state of the selected books when user reloading the page */

function App() {
  let [books, setBooks] = useState([]);
  let [features, setFeatures] = useState(
    JSON.parse(localStorage.getItem("features")) || []
  );
  useEffect(() => {
    localStorage.setItem("features", JSON.stringify(features));
  }, [features]);
  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=HTML5")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooks(data.items);
      });
  }, []);

  /* -----FUNCTIONS-----
  I made this function to display last two books that user chose from the JSON array in the 'Featured' books column. 
  I made a selection user has made and when user click the book, it is added in a class of is-selected.
   */
  const clickbook = (book) => () => {
    const isSelected = features.find((a) => {
      return a.id === book.id;
    });
    if (isSelected) {
      setFeatures((s) => s.filter((a) => a.id !== book.id));
      return;
    }
    if (features.length < 2) {
      setFeatures((s) => [book, ...s]);
    } else {
      setFeatures((s) => [book, s[0]]);
    }
  };

  // -----RENDER-----

  return (
    <>
      <div className="App">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Kyobo_Logo.svg"
          alt="logo"
        />

        <h1 className="title">
          The Book Store
          <p className="intro">Welcome to our book store</p>
        </h1>

        <MobileHamburger />
        <nav className="hamnav" id="hamnav">
          <label for="hamburger">&#9776;</label>
          <input type="checkbox" id="hamburger" />
          <div id="hamitems">
            <a href="a.html">Home</a>
            <a href="b.html">Books</a>
            <a href="c.html">Magazines</a>
            <a href="d.html">E-books</a>
            <a href="d.html">Accounts</a>
          </div>
        </nav>
        <FeturedCard books={features} features={[]} />
        <Card books={books} clickbook={clickbook} features={features} />
      </div>
      <Socialmedia />
    </>
  );
}
// -----components----- //

function Socialmedia() {
  return (
    <p>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <p class="icon-bar">
        <a href="#" class="facebook">
          <i class="fa fa-facebook-square"></i>
        </a>
        <a href="#" class="twitter">
          <i class="fa fa-twitter"></i>
        </a>
        <a href="#" class="instagram">
          <i class="fa fa-instagram"></i>
        </a>
      </p>
    </p>
  );
}
function MobileHamburger() {
  return (
    <>
      <input type="checkbox" id="hamburger-input" class="burger-shower" />
      <label id="hamburger-menu" for="hamburger-input">
        <nav id="sidebar-menu">
          <h3>Menu</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Books</a>
            </li>
            <li>
              <a href="#">Magazines</a>
            </li>
            <li>
              <a href="#">E-books</a>
            </li>
            <li>
              <a href="#">Accounts</a>
            </li>
          </ul>
        </nav>
      </label>

      <div class="overlay"></div>
    </>
  );
}

// I made this function to display last two books that user chose from the JSON array in the 'Featured' books column. //
function FeturedCard({ books, clickbook, features }) {
  return (
    <div className="feturedcard">
      <h1 className="title2">Featured</h1>
      {books.map((book) => {
        const isSelected = features.find((a) => {
          return a.id === book.id;
        });
        const { id, volumeInfo } = book;
        return (
          <div
            key={id}
            className={`card ${isSelected ? "is-selected" : null}`}
            onClick={clickbook?.(book)}
          >
            <img
              src={volumeInfo.imageLinks.smallThumbnail}
              alt={`${volumeInfo.title}`}
            ></img>
            <h2>{volumeInfo.title}</h2>
            {volumeInfo.subtitle ? (
              <p>subtitle : `{volumeInfo.subtitle}` </p>
            ) : null}
            <p>authors : {volumeInfo.authors}</p>
            <p>pages : {volumeInfo.pageCount}</p>
            <p className="cardPages">
              description : {`${volumeInfo.description.substring(0, 140)}...`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
// if user select book a second time, then the book will be removed the class //
function Card({ books, clickbook, features }) {
  return (
    <div className="all">
      <div className="two">
        {books.map((book) => {
          const isSelected = features.find((a) => {
            return a.id === book.id;
          });
          const { id, volumeInfo } = book;
          return (
            <div
              key={id}
              className={`card ${isSelected ? "is-selected" : null}`}
              onClick={clickbook?.(book)}
            >
              <img
                className="img"
                src={volumeInfo.imageLinks.smallThumbnail}
                alt={`${volumeInfo.title}`}
              ></img>
              <h3>{volumeInfo.title}</h3>
              {volumeInfo.subtitle ? (
                <p>subtitle : `{volumeInfo.subtitle}` </p>
              ) : null}
              <p>authors : {volumeInfo.authors}</p>
              <p>pages : {volumeInfo.pageCount}</p>
              <p className="cardPages">
                description : {`${volumeInfo.description.substring(0, 140)}...`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
