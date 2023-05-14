export function formatDate(string: string) {
  const locale = useNuxtApp().$i18n.locale;
  const date = new Date(string).toLocaleDateString(unref(locale));
  return date;
}

export function msToTime(milliseconds: number) {
  // const milliseconds = Math.floor((duration % 1000) / 100)
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  // hours = hours < 10 ? "0" + hours : hours;
  // minutes = minutes < 10 ? "0" + minutes : minutes;
  // seconds = seconds < 10 ? "0" + seconds : seconds;

  return { hours, minutes, seconds, milliseconds };
}

/**
 * Format minutes into hours and mins
 */
export function formatTime(minutes: number) {
  // seconds
  const seconds = minutes * 60;
  let secondsLeft = seconds;

  // hours
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  // mins
  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  return `${hours ? `${hours}h` : ""} ${mins}min`;
}

export function numberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export async function getBookRatingByTitle(
  bookName: string
): Promise<{ rating?: number; reviews?: any[] } | undefined> {
  try {
    const res = (await $fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(
        bookName
      )}`
    )) as any;
    const firstBook = res.docs[0];
    const bookRating = firstBook?.ratings_average;

    const bookISBN = firstBook.isbn[0];
    const data = (await $fetch(
      `https://openlibrary.org/isbn/${bookISBN}.json`
    )) as any;
    const bookReviews = data.details?.reviews;

    return { rating: bookRating, reviews: bookReviews };
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
