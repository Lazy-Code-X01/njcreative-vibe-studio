# NJ Creative Firm Backend

Backend API for NJ Creative Firm - Contact, Blog, Portfolio, Admin Auth, Image Uploads

## Features
- Contact form submission with email notifications
- Blog post management with categories
- Portfolio project management
- Admin authentication with JWT
- Image upload to Cloudinary
- MongoDB database

## Local Development

```bash
npm install
npm run dev
```

Server runs on http://localhost:8787

## Environment Variables

Required variables (add to Vercel project settings):

```
PORT=8787
MONGODB_URI=your_mongodb_connection_string
ALLOWED_ORIGIN=http://localhost:8080,https://yourdomain.com
ADMIN_API_KEY=your_admin_api_key
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=465
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM="Your Name <email@domain.com>"
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_LOGO_URL=your_email_logo_url
```

## Deployment to Vercel

### Prerequisites
1. Build the project: `npm run build`
2. Install Vercel CLI: `npm i -g vercel` (optional)

### Steps

**Option 1: Deploy via Vercel Dashboard (Recommended)**
1. Go to https://vercel.com and import your repository
2. Set the root directory to `nj-creative-firm-backend`
3. Add all environment variables in project settings
4. Deploy

**Option 2: Deploy via CLI**
1. Navigate to backend directory: `cd nj-creative-firm-backend`
2. Login to Vercel: `vercel login`
3. Deploy: `vercel --prod`

### Post-Deployment Configuration

1. **Add Frontend Domain to CORS**
   - In Vercel project settings, update `ALLOWED_ORIGIN` environment variable
   - Add your frontend URL (e.g., `https://your-site.lovableproject.com`)

2. **Update Frontend API URL**
   - Update `VITE_API_BASE_URL` in frontend to point to Vercel backend URL
   - Format: `https://your-backend.vercel.app`

3. **Test Endpoints**
   - Health check: `https://your-backend.vercel.app/api/health`
   - Should return `{"status": "ok"}`

### Important Notes for Vercel

⚠️ **Serverless Limitations**
- 4.5MB request body limit (images handled by Cloudinary, so this is OK)
- Cold starts on first request after inactivity
- No persistent file system (all uploads go to Cloudinary)

✅ **Optimizations Applied**
- MongoDB connection pooling for serverless
- Cloudinary for image storage
- Rate limiting configured
- CORS properly configured

## API Endpoints

### Public
- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/blog/posts` - Get all blog posts
- `GET /api/blog/post/:slug` - Get single post
- `GET /api/blog/categories` - Get categories
- `GET /api/portfolio` - Get portfolio projects
- `GET /api/portfolio/:slug` - Get single project

### Admin (requires JWT token)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/analytics` - Get analytics
- `POST /api/upload/image` - Upload image to Cloudinary
- Blog/Portfolio CRUD operations

