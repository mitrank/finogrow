# FinoGrow

Welcome to **FinoGrow**, the smarter way to manage your finances! This Finance-based SaaS app makes it a breeze to keep track of your accounts, categorize transactions, and even link your bank accounts. Built with love and cutting-edge tech, FinoGrow is here to make personal and professional finance management effortless.

---

## 🌟 Key Features

- **Account Management**: Create, edit, and delete accounts at your convenience.
- **Categories**: Organize transactions with custom categories.
- **Transaction Tracking**: Add, modify, and delete transactions easily.
- **Bank Integration**: Link your bank accounts securely with **Plaid** for automated updates.
- **Authentication**: Powered by **Clerk**, ensuring secure and seamless sign-in and sign-up.
- **Modern Design**: Beautiful, responsive UI styled with **shadcn** and **Tailwind CSS**.
- **Robust Backend**: Reliable data handling with **NeonDB** and **Drizzle ORM**.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **UI Styling**: [shadcn](https://shadcn.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Hono.js](https://hono.dev/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Database**: [NeonDB](https://neon.tech/), [Drizzle ORM](https://orm.drizzle.team/)
- **Bank Integration**: [Plaid](https://plaid.com/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **NPM** or **Yarn**

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mitrank/finogrow.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd finogrow
   ```

3. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables**:
   Create a `.env.local` file in the root directory and include the following:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
   CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   DATABASE_URL=<your_database_url>

   NEXT_PUBLIC_APP_URL=http://localhost:3000

   PLAID_CLIENT_ID=<your_plaid_client_id>
   PLAID_SECRET=<your_plaid_secret>
   PLAID_ENV=<your_plaid_environment>
   PLAID_PRODUCTS=<your_plaid_products>
   PLAID_COUNTRY_CODES=<your_plaid_country_codes>
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open the app**:
   Navigate to:
   ```
   http://localhost:3000
   ```

---

## 🤝 Contributions

We welcome your contributions! Follow these steps to contribute:

1. **Fork the repository**.
2. **Create a feature branch**:
   ```bash
   git checkout -b feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add a new feature"
   ```
4. **Push the branch**:
   ```bash
   git push origin feature-name
   ```
5. **Submit a pull request**.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

A big thank you to:

- [Plaid](https://plaid.com/) for making bank integration seamless.
- The amazing teams behind [Next.js](https://nextjs.org/), [Hono.js](https://hono.dev/), [Clerk](https://clerk.dev/), [Tailwind CSS](https://tailwindcss.com/), [NeonDB](https://neon.tech/), and [Drizzle ORM](https://orm.drizzle.team/) for their incredible tools.

---

## ✉️ Contact

For questions, feedback, or just to say hi:

- **GitHub**: [mitrank](https://github.com/mitrank)
- **Email**: [mitrankshah2@gmail.com](mailto:mitrankshah2@gmail.com)

---

### 🌐 Demo

Experience it live: [Finogrow](https://finogrow.vercel.app/) _(Add your live deployment link here)_
