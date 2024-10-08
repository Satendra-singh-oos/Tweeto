# 🐦 Welcome To Tweeto

Introducing Tweeto, a dynamic web-based platform where users can share their ideas and creativity through a variety of media formats, including images and videos, Tweeto makes it simple to express yourself and engage with others. Tweeto ensures a smooth user experience across devices.

# 🛠️ Technologies

- **Node.js**: Powers our backend code and runs the GraphQL server in a Node.js environment.
- **GraphQL**: Provides a flexible and efficient way to define and query our data model.
- **Prisma ORM**: Offers a type-safe and user-friendly interface for interacting with our PostgreSQL database.
- **PostgreSQL**: A powerful and reliable relational database system.
- **Supabase**: Hosts and manages our cloud PostgreSQL database.
- **Redis**: Enhances query speeds through server-side caching.
- **Google OAuth**: Enables users to sign in with their Google accounts.
- **JSON Web Tokens**: Used for secure authentication.
- **Next.js**: Framework for our frontend development.
- **Tailwind CSS**: Utilized for styling and reusable components.
- **Codegen**: Ensures type-safe GraphQL queries and mutations.
- **GraphQL Request**: Serves as the API client for client-server communication.
- **React Query**: Manages client-side data and query caching.
- **TypeScript**: Maintains code quality and ensures type safety.
- **Amazon Web Services**: Used for storage and deployments.

# ✨Features

- **Create Posts**: Users can effortlessly create and share posts, expressing their thoughts and creativity with the community.

- **Like Posts**: Engage with content by liking posts, showing appreciation for what others share.

- **User Registration**: Simple sign-up process using Google Oauth allows users to join the platform and start interacting in no time.

- **View Profiles**: Users can view each other's profiles, gaining insights into their interests and shared content.

- **Follow Other Users**: Build connections by following other users to stay updated on their posts and activities.

- **Media Sharing**: Share images and videos alongside text posts, making interactions more dynamic and engaging.

- **Real-Time Updates**: Get real-time updates on posts and activities from users you follow, ensuring you never miss a moment.



# 🏷️ What I Learned

Throughout this project, I gained  hands-on experience with GraphQL API structure, deepening my understanding of its capabilities and benefits. Additionally,I successfully deployed the backend on AWS EC2. This involved creating a security group, configuring a load balancer, and setting up SSL certification using CloudFront.


# 📦 Project Structure

 ### tweeto-server(backend)
```
📦tweeto-server
 ┣ 📂prisma                # Database ORM configuration and migrations
 ┃ ┣ 📂migrations          # Directory for database migrations
 ┃ ┃ ┣ 📂20241002171452_init  # Specific migration files (timestamped)
 ┃ ┃ 
 ┃ ┗ 📜schema.prisma       # Prisma schema file defining the database structure
 ┣ 📂src                   # Source code for the application
 ┃ ┣ 📂app                 # Application logic
 ┃ ┃ ┣ 📂tweet             # Module handling tweet-related functionalities
 ┃ ┃ ┃ ┣ 📜index.ts        # Entry point for the tweet module
 ┃ ┃ ┃ ┣ 📜mutation.ts     # GraphQL mutations for creating/updating tweets
 ┃ ┃ ┃ ┣ 📜queries.ts      # GraphQL queries for fetching tweets
 ┃ ┃ ┃ ┣ 📜resolvers.ts    # Resolvers for tweet-related GraphQL operations
 ┃ ┃ ┃ ┗ 📜types.ts        # Type definitions for tweets
 ┃ ┃ ┣ 📂user              # Module handling user-related functionalities
 ┃ ┃ ┃ ┣ 📜index.ts        # Entry point for the user module
 ┃ ┃ ┃ ┣ 📜mutation.ts     # GraphQL mutations for creating/updating users
 ┃ ┃ ┃ ┣ 📜queries.ts      # GraphQL queries for fetching user data
 ┃ ┃ ┃ ┣ 📜resolvers.ts    # Resolvers for user-related GraphQL operations
 ┃ ┃ ┃ ┗ 📜types.ts        # Type definitions for users
 ┃ ┃ ┗ 📜index.ts          # Main route file where the app is defined
 ┃ ┣ 📂clients             # Client connections (e.g., database, Redis)
 ┃ ┃ ┣ 📂db                # Database connection handling
 ┃ ┃ ┃ ┗ 📜index.ts        # Database connection logic
 ┃ ┃ ┗ 📂redis             # Redis connection handling
 ┃ ┃ ┃ ┗ 📜index.ts        # Redis connection logic
 ┃ ┣ 📂services            # Business logic services
 ┃ ┃ ┣ 📜jwt.ts            # Service for JWT generation for user login
 ┃ ┃ ┣ 📜tweet.service.ts   # Tweet service with methods like getTweet and getTweetById
 ┃ ┃ ┗ 📜user.service.ts    # User service with methods like verifyGoogleAuthToken, getUserById, and getRecommendedUsers
 ┃ ┣ 📜index.ts            # Main entry point for the backend application
 ┃ ┗ 📜interface.ts        # TypeScript interfaces for type definitions
 ┣ 📜.env                   # Environment variables for configuration
 ┣ 📜.env.sample            # Sample environment variables for reference
 ┣ 📜.gitignore             # Git ignore file to exclude specific files from version control
 ┣ 📜package-lock.json      # Automatically generated file for managing dependencies
 ┣ 📜package.json           # Project metadata and dependencies
 ┗ 📜tsconfig.json          # TypeScript configuration file

 ```

 ### tweeto-client(frontend)

 ```
📦tweeto-client
 ┣ 📂src                   # Source code for the frontend application
 ┃ ┣ 📂app                 # Main application directory
 ┃ ┃ ┣ 📂profile           # Profile-related components
 ┃ ┃ ┃ ┗ 📂[id]           # Dynamic profile route based on user ID
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx      # Profile page component
 ┃ ┃ ┣ 📜globals.css       # Global CSS styles
 ┃ ┃ ┣ 📜HomePage.tsx      # Homepage component
 ┃ ┃ ┣ 📜layout.tsx        # Layout component for shared UI structure
 ┃ ┃ ┗ 📜page.tsx          # Main page component for routing
 ┃ ┣ 📂component           # Reusable components
 ┃ ┃ ┣ 📜FeedCard.tsx      # Component for displaying individual feed items
 ┃ ┃ ┣ 📜LeftSideBar.tsx   # Component for the left sidebar
 ┃ ┃ ┣ 📜RightSideBar.tsx  # Component for the right sidebar
 ┃ ┃ ┗ 📜TwitterLayout.tsx  # Layout specific to the Twitter-like UI
 ┃ ┗ 📂lib                 # Libraries and helpers
 ┃ ┃ ┣ 📂client            # API client logic
 ┃ ┃ ┃ ┗ 📜api.ts          # API request handling for backend connection
 ┃ ┃ ┣ 📂gql               # Generated GraphQL files via codegen
 ┃ ┃ ┃ ┣ 📜fragment-masking.ts # Fragment masking utilities for GraphQL
 ┃ ┃ ┃ ┣ 📜gql.ts          # GraphQL setup and configurations
 ┃ ┃ ┃ ┣ 📜graphql.ts      # GraphQL client configuration
 ┃ ┃ ┃ ┗ 📜index.ts        # Main entry point for GraphQL logic
 ┃ ┃ ┣ 📂graphql           # GraphQL operations
 ┃ ┃ ┃ ┣ 📂mutation        # GraphQL mutation definitions
 ┃ ┃ ┃ ┃ ┣ 📜tweet.ts      # Mutations related to tweets
 ┃ ┃ ┃ ┃ ┗ 📜user.ts       # Mutations related to users
 ┃ ┃ ┃ ┗ 📂query           # GraphQL query definitions
 ┃ ┃ ┃ ┃ ┣ 📜tweet.ts      # Queries related to tweets
 ┃ ┃ ┃ ┃ ┗ 📜user.ts       # Queries related to users
 ┃ ┃ ┗ 📂hooks             # Custom hooks for React components
 ┃ ┃ ┃ ┣ 📜tweet.ts        # Hook for tweet-related data fetching
 ┃ ┃ ┃ ┗ 📜user.ts         # Hook for user-related data fetching
 ┣ 📜.env                   # Environment variables for configuration
 ┣ 📜.env.sample            # Sample environment variables for reference
 ┣ 📜.eslintrc.json         # ESLint configuration for code quality
 ┣ 📜.gitignore             # Git ignore file to exclude specific files from version control
 ┣ 📜codegen.ts             # Configuration file for code generation
 ┣ 📜graphql.schema.json     # GraphQL schema file for client-side usage
 ┣ 📜next-env.d.ts          # Type definitions for Next.js
 ┣ 📜next.config.mjs        # Next.js configuration file
 ┣ 📜package-lock.json      # Automatically generated file for managing dependencies
 ┣ 📜package.json           # Project metadata and dependencies
 ┣ 📜postcss.config.mjs     # PostCSS configuration for styling
 ┣ 📜README.md              # Project documentation
 ┣ 📜tailwind.config.ts      # Tailwind CSS configuration file
 ┗ 📜tsconfig.json          # TypeScript configuration file



 ```
 

# 🏃Running the Project

1. Clone the repository to your local machine.
2. Run ```npm install``` or ```yarn``` in the project directory to install the required dependencies.
3. Set up environment variables: 
  - Create a .env file in both the tweeeto-client and tweeto-server folders.
  - Add the required environment variables with your credentials, referencing the .env.sample file.
4. Start tweeto-server
  - ``` cd tweeto-server ``` -> ``` npm run build ``` -> ``` npm run dev ```

5. Start the tweeto-client server:
   - ``` cd tweeto-client ``` ->  ``` npm run dev ```
6. Check your backend is running on the port   http://localhost:8000 as you can see in terminal or open that path in the web browser 
7. Open http://localhost:3000 (or the address shown in your console) in your web browser to view the app. and make sure in ```./tweeto-client/codegen ``` make ```const awsDeploy = false;``` for local devlopement and same in also ```./tweeto-client/lib/client/api.ts``  make ```const awsDeploy = false;```

