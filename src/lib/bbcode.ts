import bbobHTML from "@bbob/html";
import presetHTML5 from "@bbob/preset-html5";
import DOMPurify from "isomorphic-dompurify";

//Convert BBCode to sanitized HTML, ready to be inserted using set:html
export function renderBBCode(input: string): string {
  if (!input) return "";

  // 1. BBCode → HTML (bbob)
  const rawHTML = bbobHTML(input, presetHTML5(), {
    enableEscapeTags: true, //Escape HTML tags that are not BBCode
  });

  //Convert line breaks to <br> so that pressing Enter creates a visible line break
  const withBreaks = rawHTML
    .replace(/\n/g, "<br>")           //ENTER --> <br>
    .replace(/<br>\s*<br>/g, "<br>"); //dlt <br> duplicates

  // 2. Sanitize with DOMPurify
  const clean = DOMPurify.sanitize(withBreaks, {
    ALLOWED_TAGS: [
      "b", "strong", "i", "em", "u", "s", "strike",
      "a", "p", "br", "ul", "ol", "li",
      "blockquote", "code", "pre", "img",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "span", "div", "table", "thead", "tbody", "tr", "th", "td",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "class", "target", "rel"],
    FORCE_BODY: true,
    ALLOW_DATA_ATTR: false,
  });

  /*
  // add rel="noopener noreferrer" to all external links 
  const withSecurity = clean.replace(
    /<a\s+(?!<a)[^>]*href="([^"]+)"([^>]*)>/gi,
    (match, url, attrs) => {
      const isExternal = url.startsWith('http') && !url.includes(window.location.hostname);
      const relAttr = isExternal ? ' rel="noopener noreferrer"' : '';
      const targetAttr = isExternal ? ' target="_blank"' : '';
      return `<a href="${url}"${attrs}${relAttr}${targetAttr}>`;
    }
  );
  */

  return clean;
}