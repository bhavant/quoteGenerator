import { getDisplayQuote, getQuotesCall } from './GetQuotes/getQuotesAPI';
import './styles.css';

// Call the quotes API on load
try {
    getQuotesCall();
} catch (error) {
    // Ignore if it errors out. Backup Quotes are in place. Also the get Quote will do that again.
    console.error('API Failed');
}

const quote = document.querySelector('#quote');
const quoteauthor = document.querySelector('#quote-author');
const newQuoteBtn = document.querySelector('#new-quote');

const newQuote = () => {
    const displayQuote = getDisplayQuote();
    // Use the the non-null assertion operator (!) like so
    quote!.textContent = displayQuote?.text;
    // This will tell TypeScript that the property is definitely defined. However, this should be used
    // with caution, as it can lead to errors if the property is actually undefined.
    if (displayQuote?.text.length > 50) {
        quote?.classList.remove('.quote');
        quote?.classList.add('.longQuote');
    }

    //OR
    // if (quote?.textContent) {
    //     quote.textContent = displayQuote?.text;
    // }

    quoteauthor!.textContent = !displayQuote?.author
        ? 'Unknown'
        : displayQuote?.author;
};

newQuoteBtn?.addEventListener('click', newQuote);
newQuote();
