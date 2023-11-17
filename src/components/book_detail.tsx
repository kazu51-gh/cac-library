import Image from 'next/image'
import { basePath } from '../../next.config'
import { Book } from "@/types/book";
import path from "path";
import Tooltip from "./tooltip";

const BASE_PATH = basePath ? basePath : '';

export default function BookDetail({book}: {book: Book}) {
  return (
    <div className="bg-white rounded-lg border flex flex-row">
      <Image
        className='rounded-l-lg h-full'
        src={path.join(BASE_PATH, book.image)}
        alt='noImage'
        width={300}
        height={300}
      />
      <div className='flex flex-col py-2 pl-4 pr-8 w-80'>
        <Tooltip text={book.name}>
          <h3 className='font-semibold text-ellipsis two-lines mb-2'>{book.name}</h3>
        </Tooltip>
        <p>ISBN : {book.isbn}</p>
        <p>出版 : {book.publication}</p>
        <p>著者 : {book.author}</p>
      </div>
    </div>
  );
}