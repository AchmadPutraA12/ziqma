import sanitizeHtml from "sanitize-html";

export function sanitizeAndValidateHTML(html: string) {
    const options: sanitizeHtml.IOptions = {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "ul",
            "ol",
            "li",
            "a",
            "p",
            "b",
            "i",
            "strong",
            "em",
            "br",
            "img",
            "span",
        ]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,

            style: [
                "color",
                "background-color",
                "font-weight",
                "font-style",
                "font-size",
                "text-decoration",
                "text-align",
                "font-family",
            ],
        },
    };

    // Sanitize the HTML using sanitize-html with the specified options
    const sanitizedHTML = sanitizeHtml(html, options);

    // Apply additional styles to specific HTML elements
    const styledHTML = sanitizedHTML
        .replace(/<h1>/g, '<h1 style="font-size: 2rem;">')
        .replace(/<h2>/g, '<h2 style="font-size: 1.5rem;">')
        .replace(/<h3>/g, '<h3 style="font-size: 1.25rem;">')
        .replace(/<h4>/g, '<h4 style="font-size: 1.125rem;">')
        .replace(/<h5>/g, '<h5 style="font-size: 1rem;">')
        .replace(/<h6>/g, '<h6 style="font-size: 0.875rem;">')
        .replace(/<ul>/g, '<ul style="list-style-type: disc;">')
        .replace(/<ol>/g, '<ol style="list-style-type: decimal;">');

    return styledHTML;
}

export default sanitizeAndValidateHTML;
