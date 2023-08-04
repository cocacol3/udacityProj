import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookShelf from "../../Components/BookShelf";
import { getAll } from "../../BooksAPI";
import { AppContext } from "../../ContextApi/AppContext";
import { useContext } from "react";
import "./index.css";

function Home() {
  const { setBookStateAppContext } = useContext(AppContext);

  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);

  // console.log('bookList',bookList)

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getAll();
      setBookList(response);
      setBookStateAppContext(response);
    };
    fetchBooks();
  }, []);

  const currentlyReadingList = bookList.filter(
    (books) => books.shelf === "currentlyReading"
  );
  const wantToReadList = bookList.filter(
    (books) => books.shelf === "wantToRead"
  );
  const readList = bookList.filter((books) => books.shelf === "read");

  const changeShelfFn = (e, id) => {
    let copyOfBookList = [...bookList];

    const bookIndex = copyOfBookList.findIndex((book) => book?.id === id);

    if (bookIndex !== -1) {
      copyOfBookList[bookIndex].shelf = e?.target?.value;
      setBookList(copyOfBookList);
    }
  }

  return (
    <>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            <BookShelf shelfName='Currently Reading' bookList={currentlyReadingList} changeShelfFn={changeShelfFn} />
            <BookShelf shelfName='Want to Read' bookList={wantToReadList} changeShelfFn={changeShelfFn} />
            <BookShelf shelfName='Read' bookList={readList} changeShelfFn={changeShelfFn} />
          </div>
        </div>

        <div className="open-search">
          <a onClick={() => navigate("/search")}>Add a book</a>
        </div>
      </div>
    </>
  );
}

export default Home;
