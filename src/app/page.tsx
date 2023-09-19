"use client"

import { useEffect, useState } from 'react';
import BookCard from "@/components/book_card";
import { basePath } from "../../next.config";

const BASE_PATH = basePath ? basePath : "";

export default function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(`${BASE_PATH}/api/books`);
      const data = await res.json();
      setBooks(data);
    }
    fetchBooks();
  }, []);

  return (
    <div>
      <main>
        <h2 className='m-3 text-3xl font-bold'>書籍一覧</h2>
        <div className="auto-rows-fr gap-x-4 gap-y-6 grid grid-cols-4 m-3">
          {books.map((book, index) => (
            <div key={index} className='flex flex-col'>
              <BookCard book={book}></BookCard>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
