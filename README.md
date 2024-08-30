<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-NextJs-black?style=for-the-badge&logoColor=white&logo=next.js&color=black" alt="next.js" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=5163BA" alt="prisma" />
  </div>

  <h3 align="center">Modern E-Commerce Finance website</h3>

</div>

## <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)
5. [Snippets](#snippets)

## <a name="introduction">Introduction</a>

Nana Motors - Modern E-Commerce Finance website, developed using React.js, Next.js , Prisma and Tailwind CSS, exemplifies modern UI/UX principles with modern full stack features. Its sleek design, seamless animations, and overall user experience set a high standard, serving as a reference or inspiration for future modern applications or websites in general.

## <a name="tech-stack">Tech Stack</a>

- React.js
- Next.js
- Prisma
- Tailwind CSS

## <a name="features">Features</a>

**Authentication**: Includes session-based authentication with cookies.

**Functionalities**: Includes purchase a vehicle from client, or company; sell a vehicle to customer with EMI or Full Payment option. Fully functional EMI payment system is also included. Generate vehicle sell invoice and EMI statement invoice for customer.

and many more, including code architecture and reusability

## <a name="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/jahidulsec/nana-motors.git
cd nana-motors
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
```

For authentication purpose, generate secrete key and save it to `.env` as `SECRETE_KEY`.

```bash
openssl rand -base64 32
```

For database setup (Sqlite), add `DATABASE_URL` in `.env` file.

```
DATABASE_URL="file:./dev.db"
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="live-preview">Live Preview</a>

For live preview, go to [nana-motors.vercel.app](https://nana-motors.vercel.app)
For Authentication:

```
username: admin
password: 123456
```
