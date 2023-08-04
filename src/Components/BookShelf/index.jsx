import Book from "../Book";

function BookShelf({ shelfName, bookList, changeShelfFn }) {

    return (
        <>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        <Book bookList={bookList} changeShelfFn={changeShelfFn}/>
                    </ol>
                </div>
            </div>
        </>
    );
}

export default BookShelf;
