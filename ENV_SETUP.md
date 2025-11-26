# Environment Variables Setup Guide

This guide will help you set up the environment variables needed to run the NCC Connect application.

## Server Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/ncc-app

# For MongoDB Atlas (Cloud):
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ncc-app?retryWrites=true&w=majority

# JWT Secret
# IMPORTANT: Generate a secure random string for production
# You can generate one using: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Client URL (for CORS)
CLIENT_ORIGIN=http://localhost:5173

# Email Configuration (Optional - for sending notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

## Client Environment Variables

Create a `.env` file in the `client/` directory (optional - defaults are configured):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Quick Setup Steps

### 1. Generate JWT Secret

Run this command in your terminal to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` value.

### 2. MongoDB Setup

#### Option A: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use: `MONGO_URI=mongodb://localhost:27017/ncc-app`

#### Option B: MongoDB Atlas (Recommended for Production)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and use it as `MONGO_URI`

### 3. Email Setup (Optional)

To enable email notifications:

1. For Gmail:
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the app password as `EMAIL_PASS`

2. For other email providers, update the host and port accordingly.

## Security Notes

⚠️ **IMPORTANT for Production:**

1. **Never commit `.env` files** to version control
2. Use strong, randomly generated `JWT_SECRET`
3. Use environment-specific values for production
4. Keep your MongoDB credentials secure
5. Use HTTPS in production
6. Set `NODE_ENV=production` for production deployments

## Verification

After setting up environment variables:

1. **Backend**: Start the server and check console for "MongoDB connected"
2. **Frontend**: Ensure API calls work (check browser console for errors)
3. **Database**: Verify MongoDB connection and that collections are created

## Troubleshooting

- **MongoDB Connection Failed**: Check your `MONGO_URI` and ensure MongoDB is running
- **CORS Errors**: Verify `CLIENT_ORIGIN` matches your frontend URL exactly
- **JWT Errors**: Ensure `JWT_SECRET` is set and consistent
- **Email Not Sending**: Verify email credentials and app passwords

