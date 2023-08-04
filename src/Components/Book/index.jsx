import { useContext, useState } from "react";
import { update } from "../../BooksAPI";
import { AppContext } from "../../ContextApi/AppContext";

function Book({ bookList, changeShelfFn }) {
  const { bookStateAppContext, setBookStateAppContext } = useContext(AppContext);

  const onSelectOption = async (e, id) => {
    // Update book on shelf
    const response = await update({ id: id }, e?.target?.value);

    // console.log('response',response)

    if (changeShelfFn !== undefined) {
      changeShelfFn(e, id);
    }

    // Send state of book on shelf to AppContext
    handleSetBookStateAppContext(e, id);
  };

  const handleSetBookStateAppContext = (e, id) => {
    const copyOfbookStateAppContext = [...bookStateAppContext];

    const bookIndex = copyOfbookStateAppContext.findIndex((book) => book?.id === id);

    if (bookIndex !== -1) {
      copyOfbookStateAppContext[bookIndex].shelf = e?.target?.value;
      setBookStateAppContext(copyOfbookStateAppContext);
    }
  }

  console.log('bookStateAppContext', bookStateAppContext)

  return (
    <>
      {bookList?.length > 0 ? (
        bookList?.map((ele, index) => {
          return (
            <div key={index}>
              <li>
                <div className="book" key={index}>
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${ele?.imageLinks?.smallThumbnail})`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select value={ele?.shelf || "none"} onChange={(e) => onSelectOption(e, ele.id)}>
                        {console.log('ele?.shelf', ele?.shelf)}
                        <option value="moveTo" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{ele?.title}</div>
                  <div className="book-authors">{ele?.authors}</div>
                </div>
              </li>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Book;
