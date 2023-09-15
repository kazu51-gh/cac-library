'use client'
import Image from 'next/image'
import { books } from '../../books'
import { basePath } from '../../../next.config'
import Link from 'next/link';
import { useState } from 'react';

type book = {
  name: string;
  image: string;
  isbn: string;
  publication: string;
  author: string;
}

type BookList = Array<book>;

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
      <header>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-bold m-3'>C.A.C.図書管理システム</h1>
          <div>
            <Link
              href='/'
              className='bg-white border border-black rounded px-3 py-1.5 block text-center m-3'
            >
              HOME
            </Link>
          </div>
        </div>
        <hr className='border-black' />
      </header>
      <main>
        <h2 className='m-3 text-3xl font-bold'>検索</h2>
        <div className='flex'>
          <input
            type='text'
            className='m-3 p-1'
            onChange={handleChange}
          />
          <input
            className='bg-white border border-black rounded px-3 py-1.5 block text-center m-3 cursor-pointer'
            type='submit'
            value={'送信'}
            onClick={handleClick}
          />
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
              <div key={index} className='bg-white flex flex-col rounded-xl shadow-md'>
                <h3 className='grow h-min m-3 text-xl'>{book.name}</h3>
                <Image
                  className='mx-auto w-4/5'
                  src={`${BASE_PATH}${book.image}`}
                  alt='noImage'
                  width={600}
                  height={800}
                />
                <div className='flex flex-col m-3'>
                  <p>ISBN : {book.isbn}</p>
                  <p>出版 : {book.publication}</p>
                  <p>著者 : {book.author}</p>
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}
