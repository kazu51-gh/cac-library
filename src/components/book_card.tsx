import Image from 'next/image'
import { basePath } from '../../next.config'
import { Book } from "@/types/book";
import Tooltip from "@/components/tooltip";

const BASE_PATH = basePath ? basePath : '';

export default function BookCard({book}: {book: Book}) {
  return (
    <div className='rounded-xl border py-3 px-6'>
      <Tooltip text={book.name}>
        <h3 className='text-xl font-semibold whitespace-nowrap truncate mb-2'>{book.name}</h3>
      </Tooltip>
      <Image
        className='mx-auto rounded-lg'
        src={`${BASE_PATH}${book.image}`}
        alt='noImage'
        width={300}
        height={400}
      />
      <div className='flex flex-col mt-2'>
        <p>ISBN : {book.isbn}</p>
        <p>出版 : {book.publication}</p>
        <p>著者 : {book.author}</p>
      </div>
    </div>
  );
}