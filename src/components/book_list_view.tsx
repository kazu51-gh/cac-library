import { Book } from "@/types/book";
import { useState } from "react";
import BookListItem from "@/components/book_list_item";
import BookDetail from "@/components/book_detail";
import BookCard from "@/components/book_card";

export default function BookListView({books}: {books: Book[]}) {
  const [viewType, setViewType] = useState("grid"); 
  const [selectedBookIndex, setSelectedBookIndex] = useState(-1);

  const listViewIcon = <span className="material-symbols-outlined" onClick={() => setViewType("list")}>list</span>
  const gridViewIcon = <span className="material-symbols-outlined" onClick={() => setViewType("grid")}>grid_view</span>

  return (
    <>
      <div className="mb-3 w-full flex flex-row-reverse  gap-x-4 cursor-pointer">
          {listViewIcon}
          {gridViewIcon}
        </div>
        {viewType === "grid" ? 
          <div className="grid gap-x-4 gap-y-4 items-stretch
            xl:grid-cols-6
            lg:grid-cols-4
            grid-cols-3
            ">
            {books.map((book, index) => (
              <div onClick={() => setSelectedBookIndex(index)} key={index} className="flex items-stretch cursor-pointer">
                <BookCard book={book}></BookCard>
              </div>
            ))}
          </div>
        :
          <div className="flex flex-col gap-y-4">
            {books.map((book, index) => (
              <div onClick={() => setSelectedBookIndex(index)} key={index} className="cursor-pointer">
                <BookListItem book={book}></BookListItem>
              </div>
            ))}
          </div>
        }
        { selectedBookIndex >= 0 && selectedBookIndex < books.length &&
          <div className="w-screen h-screen fixed top-0 left-0">
              <div className="w-full h-full opacity-50 bg-black"></div>
              <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
                <div className="flex gap-2">
                  <BookDetail book={books[selectedBookIndex]}></BookDetail>
                  <span onClick={() => setSelectedBookIndex(-1)} className="cursor-pointer text-white material-symbols-outlined">
                    close
                  </span>
                </div>
              </div>
          </div>
        }
    </>
  );
}