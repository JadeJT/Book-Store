import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {

    async findAll(): Promise<Book[]> {
        const books: Book[] = await axios.get('https://scb-test-book-publisher.herokuapp.com/books').then((res) => res.data)
        return books
    }

    async findRecommendBooks(): Promise<Book[]> {
        const recommendBooks: Book[] = await axios.get('https://scb-test-book-publisher.herokuapp.com/books/recommendation').then((res) => res.data)
        return recommendBooks
    }

    async findBooksList(): Promise<Book[]> {
        const books: Book[] = await axios.get('https://scb-test-book-publisher.herokuapp.com/books').then((res) => res.data)
        const recommendBooks: Book[] = await axios.get('https://scb-test-book-publisher.herokuapp.com/books/recommendation').then((res) => res.data)
        let list = books.reduce((preVal: Book[], currentVal: Book) => {
            const is_recommended = recommendBooks.find((rec: Book) => rec.id === currentVal.id)
            if (!is_recommended) {
                preVal.push({ ...currentVal, is_recommended: false })
            } else {
                preVal.push({ ...currentVal, is_recommended: true })
            }
            return preVal
        }, [])
        list = list.sort((a, b) => (a.is_recommended < b.is_recommended) ? 1 : ((a.is_recommended > b.is_recommended) ? -1 : 0))
        return list
    }

    async checkAvaliable(ordersId: number[]): Promise<Book[]> {
        const books = await this.findAll()
        const available = books.filter((book) => ordersId.includes(book.id))
        return available
    }

}
