import Image from 'next/image'
import { books } from '../books'
import { basePath } from '../../next.config'
import Link from 'next/link';

const BASE_PATH = basePath ? basePath : '';

export default function Home() {
  return (
    <div>
      <header>
        <div className='flex justify-between'>
          <h1 className='text-4xl font-bold m-3'>C.A.C.図書管理システム</h1>
          <div>
            <Link
              href='/search'
              className=' bg-white border border-black rounded px-3 py-1.5 block text-center m-3'
            >
              検索
            </Link>
          </div>
        </div>
        <hr className='border-black' />
      </header>
      <main>
        <h2 className='m-3 text-3xl font-bold'>書籍一覧</h2>
        <div className="grid grid-cols-3 m-3">
          {books.map((book, index) => (
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
      <footer>
        <hr className='border-black' />
        <p className='text-1xl m-3'>Copyright &copy; 2023 C.A.C. All rights reserved.</p>
      </footer>
    </div>
  );
}
