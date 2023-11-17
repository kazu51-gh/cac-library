import Image from 'next/image'
import { basePath } from '../../next.config'
import { Book } from "@/types/book";
import path from "path";
import Tooltip from "./tooltip";

const BASE_PATH = basePath ? basePath : '';

export default function BookCard({book}: {book: Book}) {
  return (
    <div className='rounded-lg border border-neutral-300 flex flex-col'>
      <Image
        className='rounded-t-lg w-full'
        src={path.join(BASE_PATH, book.image)}
        alt='noImage'
        width={250}
        height={250}
      />
      <div className='flex flex-col p-2'>
        <Tooltip text={book.name}>
          <h3 className='font-semibold break-all text-ellipsis two-lines mb-2'>{book.name}</h3>
        </Tooltip>
      </div>
    </div>
  );
}