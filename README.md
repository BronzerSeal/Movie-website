# 🎬 CineView

CineView is a modern web application for discovering, viewing, and rating movies.  
Built with **Next.js**, **Prisma**, and **TMDB API**, it delivers a fast and elegant movie browsing experience with user authentication powered by **Auth.js**.

---

## ✨ Features

- 🔍 **Browse movies** — view trending, popular, and similar films
- 🎥 **Detailed movie pages** — cast, ratings, trailers, and reviews
- 💬 **User comments** — create and view discussions for each movie
- ⭐ **Dynamic ratings** — interactive rating statistics
- 🔐 **Authentication** — secure login and registration via Auth.js
- 📱 **Responsive design** — optimized for all screen sizes

---

## 🧠 Tech Stack

| Category         | Technologies                                             |
| ---------------- | -------------------------------------------------------- |
| Framework        | [Next.js 14](https://nextjs.org/)                        |
| Database ORM     | [Prisma](https://www.prisma.io/)                         |
| Authentication   | [Auth.js](https://authjs.dev/)                           |
| API              | [TMDB API](https://www.themoviedb.org/documentation/api) |
| UI Components    | Tailwind CSS, HeroUI, Lucide Icons                       |
| State Management | Zustand                                                  |
| Deployment       | (Local / future Vercel setup)                            |

---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/cineview.git
cd cineview

npm install

Create an .env file in the root directory with the following variables:
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET="your_auth_secret"

# Google Provider (optional)
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# TMDB API
NEXT_PUBLIC_TMDB_BEARER_TOKEN=your_tmdb_bearer_token

# Database (example for PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/cineview?schema=public"

Run Prisma migrations and start the app:
npx prisma migrate dev
npm run dev

Project Structure
graphql

cineview/
 ├── components/        # Reusable UI and logic components
 ├── pages/             # Next.js routes
 ├── prisma/            # Prisma schema and migrations
 ├── services/          # TMDB and Comment services
 ├── store/             # Zustand stores
 ├── utils/             # Helpers and formatters
 ├── public/            # Static assets
 └── README.md

Future Plans
User profiles and watchlists
Personalized movie recommendations
Dark/light mode toggle
Hosting on Vercel

Credits
TMDB API for movie data
Auth.js for authentication
Designed and built by Arthur Beglaryan
```
