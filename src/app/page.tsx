"use client"

import { books } from '../books'
import BookListView from "@/components/book_list_view";

export default function Home() {
  return (
    <div>
      <main>
        <h2 className='mb-3 text-3xl font-bold'>書籍一覧</h2>
        <BookListView books={books}></BookListView>
      </main>
    </div>
  );
}
