'use client'
import { books } from '../../books'
import { useState } from 'react';
import searchBooks, { BookList } from "./search";
import BookListView from "@/components/book_list_view";

export default function Home() {
  const [bookTitle, setBookTitle] = useState('');
  const [matchbooks, setMatchBooks] = useState<BookList>(books);
  const [firstShowPage, setFirstShowPage] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value);
  }

  const handleClick = () => {
    const filteredList = searchBooks(bookTitle, true); // 常にあいまい検索がONになっているが、今後切り替えるようにしてもいい
    setMatchBooks(filteredList);
    setFirstShowPage(false);
  }

  return (
    <div>
      <main>
        <h2 className='mb-3 text-3xl font-bold'>さがす</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input onChange={handleChange} type="search" className="block w-full p-4 pl-10 text-sm border rounded-lg outline-none bg-primary" placeholder="Unity ゲーム開発" />
              <button onClick={handleClick} type="submit" className="transition duration-150 ease-linear text-white absolute right-2.5 bottom-2.5 bg-accent hover:bg-accent-bright outline-none font-medium rounded-lg text-sm px-4 py-2">検索</button>
          </div>
        </form>
        {matchbooks.length === 0 &&
          <div className='my-3'>
            書籍が見つかりませんでした。
          </div>
        }
        {!firstShowPage && matchbooks.length !== 0 &&
          <div className='my-3'>
            {matchbooks.length}点の書籍が見つかりました。
          </div>
        }
        <div>
          {!firstShowPage &&
            <BookListView books={matchbooks}></BookListView>
          }
        </div>
      </main>
    </div>
  );
}
