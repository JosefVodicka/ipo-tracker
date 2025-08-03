# IPO Tracker

A full-stack application for tracking and managing Initial Public Offerings (IPOs).

## Tech Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS + ShadcN/UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Deployment**: Vercel

## Features

- User authentication (Email/Password and Google OAuth)
- IPO listing and details
- Watchlist functionality
- Company information
- Real-time market data
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Auth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ipo_tracker?schema=public"
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ipo-tracker.git
   cd ipo-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Database Migrations

To create a new migration after modifying the schema:

```bash
npx prisma migrate dev --name your_migration_name
```

### API Routes

- `GET /api/ipos` - List all IPOs
- `GET /api/ipos/[id]` - Get IPO details
- `POST /api/ipos` - Create new IPO
- `PATCH /api/ipos/[id]` - Update IPO
- `DELETE /api/ipos/[id]` - Delete IPO
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist` - Add to watchlist
- `DELETE /api/watchlist/[ipoId]` - Remove from watchlist

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
