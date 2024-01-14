# 📁 Chat-my-Files

## ℹ️ About
Chat-my-Files is a web application designed to enable users to manage files and participate in online chat discussions. It focuses on web security, offering features such as user authentication, role management, and protection against common web attacks.

## 👥 Members
- Crotti Pablo
- Hächler Tara
- Meuwly Nicolas

## 🧩 Team Organization:
One team member handled the creation of the chat feature, another person developed the authentication system and the admin page, and a third member worked on the shared file system.

Primarily, we worked individually on our respective features, collaborating when faced with challenges and assisting each other in implementing various security measures.

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
