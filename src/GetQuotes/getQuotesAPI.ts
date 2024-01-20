import { quoteArray, quoteObject } from './types';
import { backupQuotes } from './backupQuotes';

let allQuotes: quoteArray = [];
const quoteURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

export const getQuotesCall = async (): Promise<void> => {
    if (!allQuotes.length) {
        fetch(quoteURL)
            .then((response) => {
                if (!response.ok) {
                    // console.error('API Call Failed', response.statusText);
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => (allQuotes = data));
    }
};

const genQuoteIndex = (arrLength: number): number => {
    return Math.floor(Math.random() * arrLength);
};

export const getDisplayQuote = (): quoteObject => {
    let quotes = allQuotes;
    if (!allQuotes.length) {
        quotes = backupQuotes;
        getQuotesCall();
    }

    return quotes[genQuoteIndex(quotes.length)];
};
