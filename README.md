
# current version -003


![demo](https://github.com/user-attachments/assets/fbb1ef49-a18a-41ef-8f95-eab2f348b43c)




![demo1](https://github.com/user-attachments/assets/e7daba5c-2da3-4d54-8ee9-743c5b7ccdb1)







made for php 8.4.1 + (NOTE- it does not fully take advantage of php 8.4.1 yet tho but it runs fine on that version with no warnings or errors. 

minimal deps- GD and sqlite3 

So simple a whale could install it. it makes the db and necessary directories when you visit index.php the first time from a browser. 

# Implemented- 

# Adelia Imageboard - README

## Overview
Adelia Imageboard is a somewhat secure, reliable, and feature-rich imageboard that supports the creation of threads and replies, along with image and video uploads. It is designed with both user experience and security as top priorities. This document outlines the key security, functional, and performance features that make Adelia Imageboard robust and dependable.

## Key Features

### Security Features

1. **Cross-Site Request Forgery (CSRF) Protection**
   - **CSRF Tokens**: All forms include a hidden input field with a CSRF token. The token is generated using `random_bytes()` for cryptographic strength and stored in the user's session. Upon form submission, the token is validated using `hash_equals()`, preventing CSRF attacks.

2. **Session Security**
   - **HttpOnly**: Prevents JavaScript access to session cookies, reducing the risk of XSS attacks.
   - **Secure**: Ensures session cookies are transmitted only over HTTPS.
   - **SameSite=Strict**: Helps mitigate CSRF by limiting cookies to same-site requests.
   - **Session Regeneration**: Sessions are regenerated upon initialization using `session_regenerate_id(true)`, preventing session fixation attacks.

3. **XSS (Cross-Site Scripting) Protection**
   - **HTML Escaping**: User inputs are sanitized using `htmlspecialchars()` to escape HTML entities. This prevents XSS attacks by rendering potential scripts as plain text.
   - **Output Sanitization**: Output data is sanitized using `escapeOutput()`, ensuring HTML tags are displayed as text rather than being executed.

4. **SQL Injection Protection**
   - **Prepared Statements**: All database queries use prepared statements with bound parameters to prevent SQL injection attacks.

5. **Clickjacking Protection**
   - **X-Frame-Options Header**: The `X-Frame-Options: DENY` header is set to prevent the site from being embedded in iframes, mitigating clickjacking attacks.

6. **File Upload Security**
   - **MIME Type Validation**: Files are validated using `finfo_file()` to ensure they match allowed types (e.g., JPEG, PNG, GIF, WEBM, MP4).
   - **Filename Randomization**: Filenames are randomized using `random_bytes()` to avoid directory traversal attacks and file overwrites.
   - **Size Limitations**: File uploads are limited to **2 MB**.
   - **Permissions Restriction**: Uploaded files have permissions set to `0644` to prevent unauthorized modification.
   - **Thumbnails**: Generated using `imagecopyresampled()` to cleanse any potentially harmful data.

7. **Error Handling and Logging**
   - **Error Reporting**: All errors are reported and logged to a secure `error.log` file, preventing information leakage.
   - **Graceful Error Handling**: User-friendly messages are displayed for fatal issues, with details logged.

8. **HTTP Headers Security**
   - **Content-Type UTF-8**: Proper UTF-8 character encoding is set to prevent character-based vulnerabilities.

9. **Secure Path Handling**
   - **Upload Directory Setup**: Upload and thumbnail directories are created with secure permissions (`0755`).

10. **Limited Attack Surface for Replies**
    - **No File Uploads for Replies**: Replies are limited to text only, reducing the risk of malicious files.

11. **Pagination Input Validation**
    - **Pagination**: Page numbers are validated to ensure they are positive integers, preventing out-of-bounds or negative page vulnerabilities.

12. **Input Size Limitations**
    - **Character Limits**: The subject and message fields have character limits (`maxlength="20"` for subject, `maxlength="8000"` for message) to prevent buffer overflow attacks.

13. **Session Regeneration**
    - **Session ID Regeneration**: Session ID is regenerated on initialization to prevent session fixation attacks.

### Functional and Performance Features

1. **Thread and Reply Structure**
   - Users can create **new threads** and post **replies** to existing threads.
   - Replies are nested under threads for organized discussions.

2. **Image and Video Uploads**
   - **Images (JPEG, PNG, GIF)** and **videos (WEBM, MP4)** can be uploaded for new threads, making discussions more engaging.

3. **Image Thumbnail Creation**
   - **Thumbnails** are created for uploaded images, optimizing load times and enhancing performance.

4. **Pagination**
   - Threads are displayed with **pagination** to prevent the page from becoming too large and unmanageable.

5. **Rate Limiting for Posting**
   - **Rate limiting** (one post every 10 seconds) prevents spam, improving user experience and reducing server load.

6. **Session Handling**
   - Secure session handling is implemented with cookie attributes (`HttpOnly`, `Secure`, `SameSite=Strict`) to enhance security.

7. **Database Optimization**
   - **Indexes** are used on key columns to improve database query performance, ensuring responsiveness even with a large number of posts.

8. **Server-Side Validation**
   - **Server-side validation** complements front-end validation, ensuring data integrity and minimizing risks.

9. **Dynamic Content Loading**
   - Images are loaded with `loading="lazy"` to **improve page load times** for users with slower connections.

10. **User-Friendly Features**
    - A **back link** is provided to quickly return to the main board.
    - **CSRF token** validation helps ensure only authorized submissions are processed.

11. **Graceful Degradation**
    - The application gracefully degrades if issues occur (e.g., database problems), displaying user-friendly error messages.

12. **JavaScript-Based Image Expansion**
    - Users can **click on images to expand** them for a better viewing experience.
    - JavaScript code is stored in an external file (`adelia.js`), promoting modularity and maintainability.

13. **Content Security Policy (CSP)**
    - A **CSP header** is added to prevent unauthorized content, enhancing protection against **XSS attacks**.

14. **Post Area Styling**
    - Consistent styling for post and reply forms with placeholders and color coding makes the board **user-friendly** and easy to use.

15. **Separation of Concerns**
    - JavaScript and CSS are handled in external files (`adelia.js`, `adelia.css`), improving **code maintainability**.

16. **Error Logging and Audit Trail**
    - Errors are logged to provide an **audit trail** for troubleshooting and security monitoring.

17. **Admin Bar for Future Enhancements**
    - A reserved space for an **admin toolbar** allows for future features like **moderation tools** and thread management.

18. **Reliable Directory Creation**
    - **Directory checks and creation** during startup ensure required directories exist, providing reliable functionality even in new environments.

19. **Optimized SQL Queries**
    - Queries for fetching threads and replies are optimized with **limits** and **prepared statements** to keep the application responsive.

20. **HTTP Compression (Server-Side Recommendation)**
    - Enabling **HTTP compression** (e.g., Gzip) on the server can improve load times for static files like CSS, JavaScript, and HTML.

### Summary
Adelia Imageboard is built with the following priorities:
- **Security**: Modern standards such as CSRF protection, XSS prevention, SQL Injection mitigation, and session security.
- **Performance**: Pagination, rate limiting, optimized SQL queries, and lazy image loading to ensure a responsive experience.
- **User-Friendliness**: Thoughtful UI/UX features like consistent styling, modular JavaScript, and error messages to enhance usability.
- **Reliability**: Graceful error handling, session management, and directory verification to ensure stable and reliable functionality.

This combination of features ensures that **Adelia Imageboard** is SOMEWHAT secure (for PHP, if you want security code a board in RUST!) , user-friendly, and capable of supporting a growing user base effectively. If you have any questions or want to further extend these capabilities, feel free to ask!


