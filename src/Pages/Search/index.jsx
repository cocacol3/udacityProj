import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../ContextApi/AppContext";
import "./index.css";
import Book from "../../Components/Book";
import { search } from "../../BooksAPI";

function Search() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { bookStateAppContext } = useContext(AppContext);

  useEffect(() => {
    const fetchSearchData = async (query, maxResults) => {
      const response = await search(query, maxResults);
      if (response?.length > 0) {
        const updatedBookList = updateBookStateWhenLoadingPage(response);
        setBookList(updatedBookList);
      }
    };
    fetchSearchData(searchQuery, "10");
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const updateBookStateWhenLoadingPage = (response) => {
    let updatedBookList = [...response];

    for (let bookFromResponse of response) {
      for (let bookFromAppContext of bookStateAppContext) {
        if (bookFromResponse.id === bookFromAppContext.id) {
          const bookIndex = response.findIndex((book) => book?.id === bookFromResponse.id);
          updatedBookList[bookIndex].shelf = bookFromAppContext.shelf;
        }
      }
    }

    return updatedBookList;
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={() => navigate("/home")}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          <Book bookList={bookList} />
        </ol>
      </div>
    </div>
  );
}

export default Search;
