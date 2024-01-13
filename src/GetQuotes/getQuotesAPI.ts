import { quoteArray, quoteObject } from './types';
import { backupQuotes } from './backupQuotes';

let allQuotes: quoteArray = [];
const quoteURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
let callStatus = 'loading';

export const getQuotesCall = async () : Promise<void> => {
    if (!allQuotes.length) {
        fetch(quoteURL)
            .then(response => {
                if (!response.ok) {
                    callStatus = 'error';
                }
                callStatus = 'success';
                return response.json();
            }). then(data => allQuotes = data)
    }
}

const genQuoteIndex = (arrLength: number) : number => {
    return (arrLength - Math.floor(Math.random() * arrLength));
}

export const getDisplayQuote = () : quoteObject => {
    let quotes = allQuotes;
    if (!allQuotes.length) {
        quotes = backupQuotes;
        getQuotesCall();
    }

    return quotes[genQuoteIndex(quotes.length)];
}
