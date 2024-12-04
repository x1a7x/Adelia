
# current version -002

![demo](https://github.com/user-attachments/assets/0c217ccc-eb66-44ab-bac5-241a6da54dc0)




![demo1](https://github.com/user-attachments/assets/e7daba5c-2da3-4d54-8ee9-743c5b7ccdb1)







made for php 8.4.1 +

minimal deps- GD and sqlite3 

So simple a whale could install it. it makes the db and necessary directories when you visit index.php the first time from a browser. 

# Implemented- 
Pagination, reply function, images expand on click, sqlite3 db. 

# security measures implemented 
1. Cross-Site Request Forgery (CSRF) Protection
CSRF Tokens:
All forms now include a hidden input field with a CSRF token.
The CSRF token is generated using random_bytes() for cryptographic strength and stored in the user's session.
Upon form submission, the token is validated with hash_equals(), preventing CSRF attacks where an attacker attempts to submit forms on behalf of an authenticated user.
2. Session Security
Session Cookie Settings:
HttpOnly: Prevents JavaScript access to session cookies, reducing the risk of XSS (Cross-Site Scripting) attacks targeting session cookies.
Secure: Session cookies are transmitted only over HTTPS, preventing exposure over unencrypted connections.
SameSite=Strict: Helps mitigate CSRF by limiting cookies to only be sent with requests originating from the same site.
Session Regeneration:
Sessions are regenerated upon initialization (session_regenerate_id(true)) to prevent session fixation attacks.
3. XSS (Cross-Site Scripting) Protection
HTML Escaping:
User inputs are sanitized using htmlspecialchars() to escape HTML entities, effectively preventing malicious scripts from being executed on the site.
This is done for both input data (sanitize()) and data output (escapeOutput()). It prevents attackers from injecting harmful JavaScript into posts and ensures any HTML tags are displayed as plain text.
4. SQL Injection Protection
Prepared Statements:
All database queries use prepared statements with bound parameters, which prevents SQL injection attacks.
Using SQLite's prepare() method ensures that user-supplied data cannot be directly injected into SQL queries, as parameters are safely escaped.
5. Clickjacking Protection
X-Frame-Options Header:
The header('X-Frame-Options: DENY') directive prevents the site from being embedded in iframes.
This ensures that attackers cannot create malicious sites that use iframes to "clickjack" users into unintentionally interacting with your board.
6. File Upload Security
MIME Type Validation:
Files are checked using finfo_file() to ensure that their MIME type matches the allowed types (image/jpeg, image/png, image/gif, video/webm, video/mp4).
This helps prevent users from uploading files masquerading as images or videos, reducing the risk of executing malicious code.
Filename Randomization:
Filenames are randomized using random_bytes(), which avoids predictable file paths and helps prevent directory traversal or overwriting of existing files.
Size Limitations:
File uploads are limited to 2 MB to prevent resource exhaustion attacks.
Permissions Restriction:
Uploaded files have their permissions set to 0644, ensuring that files are readable but cannot be modified or executed by unauthorized users.
Image Thumbnails:
Thumbnails are generated using imagecopyresampled(). This ensures that images are not only resized for better performance but also cleanses any hidden malicious data embedded within them.
7. Error Handling and Logging
Error Reporting:
Error reporting is enabled for all errors (error_reporting(E_ALL)), but errors are not displayed to users (ini_set('display_errors', '0')).
Errors are instead logged to an error.log file (ini_set('log_errors', '1')). This prevents information leakage that attackers could use to exploit vulnerabilities.
Graceful Error Handling:
In cases where fatal issues occur (e.g., database connection problems or file directory issues), user-friendly messages are displayed while detailed error logs are written to the log file.
8. HTTP Headers Security
Strict Content-Type:
The Content-Type header is properly set to UTF-8 (meta charset="UTF-8"), ensuring proper handling of characters, reducing the risk of character-encoding-based vulnerabilities.
9. Secure Path Handling for File Operations
Upload Directory Setup:
The script ensures that the upload and thumbnail directories exist and can be written to, and they are created with restrictive permissions (0755).
This minimizes exposure in case of an attack, by restricting the permissions of these directories.
10. Limited Attack Surface for Replies
No File Uploads for Replies:
File uploads are only allowed for new threads, not replies. This reduces the attack surface by minimizing the number of places where potentially malicious files could be introduced.
11. Pagination
Input Validation for Pagination:
Page numbers are validated to ensure they are positive integers (max(1, (int)$_GET['page'])). This prevents potential exploits involving out-of-bounds or negative page numbers.
12. Input Size Limitations
Character Limits:
Inputs like the subject and message have character limits (maxlength="20" for subject, and maxlength="8000" for message). This helps prevent buffer overflow vulnerabilities and reduces the potential for excessively large inputs that could crash the server.
13. Regular Session Regeneration
Session ID Regeneration:
Upon session initiation, the session ID is regenerated to help prevent session fixation attacks. This is particularly effective in reducing risks where an attacker might try to steal or predict the session ID.
Summary
These security measures combined make the Adelia Imageboard secure against various common vulnerabilities, including:

SQL Injection
Cross-Site Scripting (XSS)
Cross-Site Request Forgery (CSRF)
Clickjacking
File Upload Vulnerabilities
Session Fixation
Information Leakage via Errors
Each aspect has been implemented with modern best practices, including features of PHP 8.4.1, such as random_bytes() for secure token generation and hash_equals() for CSRF validation. The combination of these security features helps ensure the imageboard remains safe for users, reliable in handling input, and resilient against many common web threats.



 # to do:: 



 
make a seperate file for moderation (so there is an option to not even have a front facing mod area, makes it more secure) but keep in mind any sqlite3 db can be edited with any sqlite editor so moderation functions are not even needed. 


