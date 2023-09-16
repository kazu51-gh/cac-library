'use client'
import Image from 'next/image'
import { books } from '../../books'
import { basePath } from '../../../next.config'
import Link from 'next/link';
import { useState } from 'react';
import { Book } from "@/types/book";
import BookCard from "@/components/book_card";

type BookList = Array<Book>;

const BASE_PATH = basePath ? basePath : '';

export default function Home() {
  const [bookTitle, setBookTitle] = useState('');
  const [matchbooks, setMatchBooks] = useState<BookList>(books);
  const [firstShowPage, setFirstShowPage] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value);
  }

  const handleClick = () => {
    const title = bookTitle;
    const filter = title.toUpperCase();
    const filteredList = books.filter(book => {
      return book.name.toUpperCase().indexOf(filter) !== -1;
    });
    setMatchBooks(filteredList);
    setFirstShowPage(false);
  }

  return (
    <div>
      <main>
        <h2 className='m-3 text-3xl font-bold'>さがす</h2>
        <div className="m-3">

          <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input onChange={handleChange} type="search" className="block w-full p-4 pl-10 text-sm border rounded-lg outline-none bg-primary" placeholder="Unity ゲーム開発" />
              <button onClick={handleClick} type="submit" className="transition duration-150 ease-linear text-white absolute right-2.5 bottom-2.5 bg-accent hover:bg-accent-bright outline-none font-medium rounded-lg text-sm px-4 py-2">検索</button>
          </div>

        </div>
        {matchbooks.length === 0 &&
          <div className='m-3'>
            書籍が見つかりませんでした。
          </div>
        }
        {!firstShowPage && matchbooks.length !== 0 &&
          <div className='m-3'>
            {matchbooks.length}点の書籍が見つかりました。
          </div>
        }
        <div className="auto-rows-fr gap-2.5 grid grid-cols-4 m-3">
          {!firstShowPage &&
            matchbooks.map((book, index) => (
              <div key={index} className='flex flex-col'>
                <BookCard book={book}></BookCard>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}
