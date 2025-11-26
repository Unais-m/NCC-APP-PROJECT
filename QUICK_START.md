# Quick Start Guide

Get the NCC Connect application up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v18+) installed
- ✅ MongoDB running locally OR MongoDB Atlas account
- ✅ Terminal/Command Prompt access

## Step-by-Step Setup

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 2. Configure Environment

**Backend (.env in server/):**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ncc-app
JWT_SECRET=change-this-to-a-random-string
CLIENT_ORIGIN=http://localhost:5173
```

**Frontend (.env in client/ - Optional):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
# Windows
net start MongoDB

# Mac/Linux
mongod
```

**Or use MongoDB Atlas** (cloud - no local installation needed)

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Wait for: `Server running on http://localhost:5000` and `MongoDB connected`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Wait for: `Local: http://localhost:5173`

### 5. Access the Application

1. Open browser: `http://localhost:5173`
2. You'll see the splash screen
3. Click "Sign Up" to create your first account
4. Choose role: Cadet, ANO/Officer, or Admin
5. Login and explore!

## Creating Your First Admin Account

1. Sign up with role "Admin"
2. Or sign up as any role, then login as another admin to change your role

## Test the Application

### As a Cadet:
1. ✅ View dashboard
2. ✅ Log an activity (Activities page)
3. ✅ Apply to a camp (Camps page)
4. ✅ Update profile

### As an ANO/Admin:
1. ✅ View admin dashboard
2. ✅ Create a camp
3. ✅ Approve/reject activities
4. ✅ Manage cadets

## Common Issues & Solutions

**Issue: MongoDB connection failed**
- Solution: Check if MongoDB is running or verify MongoDB Atlas connection string

**Issue: Port already in use**
- Solution: Change PORT in server/.env or kill the process using the port

**Issue: CORS errors**
- Solution: Verify CLIENT_ORIGIN in server/.env matches frontend URL exactly

**Issue: Can't login**
- Solution: Check JWT_SECRET is set, clear browser cookies

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [ENV_SETUP.md](ENV_SETUP.md) for environment variable details
- Explore the codebase to understand the architecture

## Need Help?

- Check the main README.md for detailed troubleshooting
- Review error messages in browser console and server logs
- Ensure all dependencies are installed correctly

---

🎉 **You're all set!** Start managing NCC cadets, activities, and camps!

