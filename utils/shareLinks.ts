const whatsAppShareLink = (text: string) => `https://wa.me/?text=${encodeURI(text)}`;
const facebookShareLink = (text: string) => `https://www.facebook.com/sharer.php?u=${encodeURI(text)}`;
const twitterShareLink = (text: string) => `https://twitter.com/intent/tweet?text=${encodeURI(text)}`;
const emailShareLink = (subject: string, body: string) => `mailto:?subject=${subject};body=${body}`;

export default {whatsAppShareLink,facebookShareLink,twitterShareLink, emailShareLink}