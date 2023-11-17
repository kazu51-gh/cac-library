import Image from 'next/image'
import { basePath } from '../../next.config'
import { Book } from "@/types/book";
import path from "path";

const BASE_PATH = basePath ? basePath : '';

export default function BookListItem({book}: {book: Book}) {
  return (
    <div className='rounded-lg border border-neutral-300 flex flex-row justify-start gap-2'>
      <Image
        className='rounded-l-lg'
        src={path.join(BASE_PATH, book.image)}
        alt='noImage'
        width={100}
        height={150}
      />
      <div className='flex flex-col py-2'>
        <h3 className='font-semibold mb-2'>{book.name}</h3>
        <p>ISBN : {book.isbn}</p>
        <p>出版 : {book.publication}</p>
        <p>著者 : {book.author}</p>
      </div>
    </div>
  );
}