# NNEGEN

NNEGEN is a responsive AI content-generation application built with Next.js. It provides ready-made templates for writing, marketing, education, coding, social media, and productivity tasks, then stores generated results in a personal history.

## Features

- AI content generation powered by Google Gemini
- Prebuilt prompts for blogs, email, code, ads, notes, workouts, and more
- Clerk authentication and protected dashboard routes
- Searchable generation history
- Free and Pro credit limits
- Razorpay subscription checkout
- Neon PostgreSQL storage through Drizzle ORM
- Responsive dashboard with mobile navigation
- Markdown output editor with copy-to-clipboard support

## Tech stack

- Next.js 15 and React 19
- TypeScript and Tailwind CSS
- Google Gemini
- Clerk
- Neon PostgreSQL and Drizzle ORM
- Razorpay
- Framer Motion
- Toast UI Editor

## Prerequisites

Install the following before running the project:

- Node.js 18.18 or newer
- npm
- A Clerk application
- A Google Gemini API key
- A Neon PostgreSQL database
- A Razorpay account and subscription plan (only required for billing)

## Local setup

1. Clone the repository and enter its directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` in the project root:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_DRIZZLE_DB_URL=your_neon_postgres_connection_string

   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_SECRET_KEY=your_razorpay_secret
   SUBSCRIPTION_PLAN_ID=your_razorpay_plan_id
   ```

4. Apply the database schema:

   ```bash
   npm run db:push
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

> Billing variables are optional when working only with the free plan. Authentication, Gemini, and database variables are required for the complete application flow.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Turbopack development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run db:push` | Push the Drizzle schema to PostgreSQL |
| `npm run db:studio` | Open Drizzle Studio |

## Project structure

```text
app/
├── (auth)/                 # Clerk sign-in and sign-up pages
├── (context)/              # Usage and subscription contexts
├── (data)/Templates.tsx    # Content templates and AI prompts
├── api/                    # Razorpay subscription endpoint
├── dashboard/              # Protected application routes
│   ├── _components/        # Navigation, search, cards, and usage UI
│   ├── content/            # Generator form and output editor
│   ├── billing/            # Plans and checkout
│   ├── history/            # Saved generations
│   └── profile/            # Clerk user profile
└── page.tsx                # Public landing page
components/ui/              # Shared UI primitives
utils/                      # Gemini, database, and schema configuration
middleware.ts               # Clerk route protection
```

## Application flow

1. A visitor signs in through Clerk.
2. The dashboard displays the available content templates.
3. The user completes a template-specific form.
4. Gemini generates the response and the app saves it to PostgreSQL.
5. The result is available in the output editor and history page.
6. Credit usage is calculated from saved responses; users can upgrade through Razorpay.

## Database

The Drizzle schema is defined in `utils/schema.tsx` and contains generated AI output and user subscription records. When changing the schema, run:

```bash
npm run db:push
```

For production, keep all database credentials in environment variables and never commit connection strings or secret keys.

## Deployment

The application can be deployed on Vercel or another Node.js-compatible platform.

1. Add every required environment variable to the deployment platform.
2. Ensure the production database schema has been applied.
3. Add the production domain and redirect URLs in Clerk and Razorpay.
4. Run `npm run build` as the build command.

## Security notes

- Never commit `.env.local` or provider credentials.
- Restrict production API keys to the minimum permissions needed.
- Gemini and database calls currently originate from client-side code, so public-prefixed credentials are visible to the browser. For a production deployment, proxy these operations through authenticated server-side routes.
- Verify Razorpay payment signatures server-side before granting a paid subscription.

## License

No license has been specified for this project.
