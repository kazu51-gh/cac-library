'use client'
import Image from 'next/image'
import { books } from '../../books'
import { basePath } from '../../../next.config'
import Link from 'next/link';
import { useState } from 'react';
import { __String } from 'typescript';

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
        <div className="grid grid-cols-3 m-3">
          {matchbooks.length === 0 &&
            <div>
              書籍が見つかりませんでした。
            </div>
          }
          {matchbooks.map((book, index) => (
            <div key={index} className='flex flex-col w-4/5 mx-auto'>
              <h3 className='py-1.5 my-auto text-2xl'>{book.name}</h3>
              <Image
                className='w-4/5'
                src={`${BASE_PATH}${book.image}`}
                alt='noImage'
                width={600}
                height={800}
              />
              <div className='flex flex-col mt-2 mb-4'>
                <p>ISBN : {book.isbn}</p>
                <p>出版 : {book.publication}</p>
                <p>著者 : {book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
