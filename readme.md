# 📁 Chat-my-Files

## ℹ️ About
Chat-my-Files is a web application designed to enable users to manage files and participate in online chat discussions. It focuses on web security, offering features such as user authentication, role management, and protection against common web attacks.

## 👥 Members
- Crotti Pablo
- Hächler Tara
- Meuwly Nicolas

## 🧩 Team organization:
One team member handled the creation of the chat feature, another person developed the authentication system and the admin page, and a third member worked on the shared file system.

Primarily, we worked individually on our respective features, collaborating when faced with challenges and assisting each other in implementing various security measures.

## 📚 Libraries used
The "Chat-my-Files" project utilizes several key libraries, listed below with their respective versions (as specified in the `package.json` file) :
- **Express (v4.18.2)** : A minimalist and flexible web framework for Node.js, facilitating the creation of web applications and APIs.
- **Mongoose (v8.0.1)** : A MongoDB object modeling library for Node.js.
- **EJS (v3.1.9)** : A simple template engine for creating HTML pages with JavaScript.
- **Bcryptjs (v2.4.3)** : Used for securely hashing passwords.
- **Dotenv (v16.3.1)** : Allows loading environment variables from a .env file.
- **Helmet (v7.1.0)** : Helps secure Express applications by setting various HTTP headers.
- **Multer (v1.4.5-lt** s.1): Middleware for handling file uploads.
- **Passport (v0.7.0** ) and Passport-Local (v1.0.0): Used for user authentication.
- **Csurf (v1.11.0)** : Middleware for protection against CSRF (Cross-Site Request Forgery) attacks.
- **Cookie-Parser (v1.4.** 6): Cookie parser for Express.
- **Body-Parser (v1.20.** 2): Middleware for parsing incoming request bodies in an Express application.
- **Validator (v13.11.0)** : String validation library.

## 💥 Challenges faced during project development

### 🖥️ Compatibility between Mac OS and Windows for files Upload, deletion, and download

One of the primary challenges we encountered was ensuring code compatibility between the Mac OS and Windows operating systems. Specifically, we had to adapt our code to ensure that file upload, deletion, and download functionalities worked consistently on both platforms. Differences in file paths, directory separator characters, and naming conventions required adjustments to ensure a uniform user experience.

### 🔒 Integrating CSRF protection on files upload forms (enctype="multipart/form-data")

Integrating protection against Cross-Site Request Forgery (CSRF) attacks proved to be a challenge, especially on forms using the enctype="multipart/form-data" attribute for file uploads. Traditional CSRF protection solutions did not seamlessly work with this type of form. We had to research and implement specific approaches to ensure effective CSRF protection without disrupting file upload functionality.

### 📦 General code structure

The overall code structure was a significant point of concern. As beginners, we sometimes lacked clear and modular organization, making code maintenance and comprehension more challenging over time. We had to rethink and reorganize our code to improve readability, maintainability, and scalability. This included grouping related functionalities, removing redundancies, and adopting consistent naming conventions.

### 🚧 Establishing effective error handling

Error handling in our application presented another major challenge. We realized that our initial code did not adequately handle errors, which could lead to unexpected behaviors and potential security vulnerabilities. We had to revise our code to implement effective error handling, including exception handling mechanisms, clear error messages for users, and proper error logging for debugging.

### 🐳 Initial steps with Docker implementation and uncertainty

Finally, our experience with Docker for managing our development environment was a new endeavor for us. Concepts like containerization, Docker image creation, and container management required time to fully grasp. We encountered issues related to container configuration, volume synchronization, and dependency management. Moreover, we are not entirely certain that Docker has been correctly implemented in our project. This uncertainty about the accuracy of our Docker configuration necessitated additional adjustments and thorough verification to ensure the stability and consistency of our development environment.

In summary, these challenges encountered during our project have been essential learning opportunities. They have allowed us to develop technical skills, understand real-world software development challenges, and implement tailored solutions to overcome these obstacles.

[Click to see the Docker image](https://hub.docker.com/repository/docker/winniethebloue/chat-my-files/general)

## 🛡️ Security measures implemented
- **Helmet** : Secures applications by setting various HTTP headers, protecting against many common web vulnerabilities.
- **Bcryptjs** : Used for hashing passwords before storing them in the database, thus protecting against password theft.
- **Dotenv** : Manages sensitive information such as secret keys and database connection strings, keeping them out of the source code.
- **Csurf** : Provides protection against CSRF attacks, ensuring that each client-side request is legitimate and authorized.
- **Passport and Passport-Local** : Provide robust authentication, ensuring that only authenticated users can access certain routes and functionalities.
- **Multer** : Manages file uploads, allowing control over the types of files uploaded and limiting the risks of executing malicious files.
- **Validator** : Used for validating and sanitizing user inputs, thus preventing SQL injections and XSS attacks.

## 📈 Proposals to enhance the security of the "Chat-my-Files" project
To further strengthen the security of the "Chat-my-Files" project, several additional measures can be considered:
- **Implementation of Two-Factor Authentication (2FA)** : Although the project already uses Passport for authentication, adding two-factor authentication would provide an extra layer of security. This could be achieved using solutions like Authy or Google Authenticator.
- **Encryption of sensitive data** : In addition to hashing passwords, encrypting other sensitive data stored in the database (such as email addresses) would enhance the protection of user data against unauthorized access.
- **Security audits and penetration testing** : Hiring security experts to conduct regular audits and penetration tests would help identify and rectify potential vulnerabilities that might be missed during development.
- **Implementation of a Web Application Firewall (WAF)** : Using a WAF would help protect the application against common web attacks, such as SQL injections, cross-site scripting (XSS), and denial-of-service (DDoS) attacks.
- **Use of HTTPS with HSTS (HTTP Strict Transport Security)** : If not already in place, using HTTPS with HSTS would ensure that all communications between the client and the server are encrypted and secure.
- **Limiting login attempts and account lockout** : To prevent brute force attacks, implementing a system to limit login attempts and temporarily lock accounts after a certain number of failed attempts would be beneficial.
- **Antivirus file scanning** : Integration of the ClamScan package or utilization of the VirusTotal API to detect files containing viruses and reject their upload.

## 🔍 Identifying software weaknesses
At the end of our project, as students, we recognize the importance of implementing a strategy to identify potential software weaknesses, a crucial step for ensuring the security and functionality of our application. While we have not yet implemented testing procedures, we understand that integrating them is essential. Our approach will include initiating a peer review process, where we collaboratively examine the code to learn about common vulnerabilities and best coding practices.

We plan to incorporate automated testing tools suitable for beginners, which will assist us in scanning for security flaws and performance issues. This will be complemented by basic stress and load testing to evaluate how our software performs under different conditions. Additionally, we aim to seek guidance and feedback from more experienced developers or educators, providing us with an external perspective and expert insights.

By adopting this comprehensive approach, we not only aim to identify and rectify current software issues but also to equip ourselves with the necessary skills and knowledge to prevent similar challenges in future projects. Implementing testing procedures will be a significant learning opportunity for us, enhancing our development process and the quality of our software.

## 🚀 Features
- **User management**: Registration and login.
- **Chat**: Allows users to engage in a forum.
- **File management**: Uploading, viewing, and deleting files.
- **Administration**: User management by administrators, including role updates.

## 🛠️ Technology
- **Backend**: Node.js with Express.
- **Database**: MongoDB.
- **Frontend**: EJS for views, with CSS and JS files for styling and interactive functionalities.

## 📝 How to Use
1. **Installation**:
   - Clone the repository: `git clone https://github.com/WinnieTheBloue/Chat-my-Files.git`
   - Install dependencies: `npm install`

2. **Configuration**:
   - Configure your MongoDB database and other environment variables.

3. **Launching the Application**:
   - Start the application with `npm start`.

## ⚙️ Environment Setup
To run this project, you need to set up the environment variables. Follow these steps to configure them:

1. **Copy the example file**: Start by creating a copy of the `.env.example` file. You can do this by running:
   `cp .env.example .env`
   This command creates a new file named `.env` with the same contents as `.env.example`.

2. **Edit the `.env` file**: Open the `.env` file in your preferred text editor. You'll see various placeholders for configuration values. Replace these placeholders with your actual configuration values. For example:
   - **your_username**: Your MongoDB username.
   - **your_password**: Your MongoDB password.
   - **your_cluster_url**: Your MongoDB cluster URL.
   - **your_jwt_secret**: A secret key for JWT.
3. **Save the `.env` file**: After replacing all the placeholders with your actual values, save the file.
4. **Restart the server**: If your server was running, restart it to apply the new environment variables.

## 🤝 Contributing
Contributions to the project are welcome. To contribute, please fork the repository, create a branch for your changes, and submit a pull request.

## 📄 License
This project is licensed under the MIT License.
