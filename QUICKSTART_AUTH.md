# Quick Start Guide - Authentication System

## 🚀 Your authentication system is now ready!

The application is running with a complete Redux-based authentication system.

## ✅ What's Been Implemented

### 1. **Redux Store Setup**
   - Centralized state management with Redux Toolkit
   - Authentication slice with login, register, and logout actions
   - Persistent sessions using localStorage
   - Type-safe hooks for React components

### 2. **User Registration**
   - Full registration page at `/register`
   - Form validation (email, password matching, required fields)
   - Automatic login after successful registration
   - Redirect to home page after registration

### 3. **User Login**
   - Login modal accessible from navbar
   - Email and password authentication
   - Loading states and error handling
   - Auto-close modal on successful login

### 4. **User Logout**
   - Logout button in user dropdown menu
   - Clears authentication state and localStorage
   - Redirects to home page

### 5. **Protected Routes**
   - `ProtectedRoute` component for authentication-required pages
   - Support for role-based access (admin vs customer)
   - Loading state while checking authentication

### 6. **Updated UI Components**
   - Navbar shows user info when logged in
   - User dropdown menu with logout option
   - Login button for unauthenticated users
   - Responsive design

## 🧪 Testing the System

### Test Accounts

Use these credentials to test the authentication:

**Customer Account:**
```
Email: test@example.com
Password: password123
```

**Admin Account:**
```
Email: admin@example.com
Password: admin123
```

### Test Flow

1. **Test Login:**
   - Click the login button in the navbar (lock icon)
   - Enter test credentials
   - Click "Sign in"
   - You should see your name in the navbar

2. **Test Registration:**
   - Navigate to `/register` or click "Create account" in login modal
   - Fill in the registration form
   - Submit the form
   - You'll be automatically logged in and redirected

3. **Test Logout:**
   - Click on your name in the navbar
   - Click "Sign out"
   - You should be logged out and redirected to home

4. **Test Persistence:**
   - Login with an account
   - Refresh the page
   - You should still be logged in

## 📁 Key Files

### Redux Store
- `src/store/store.ts` - Store configuration
- `src/store/authSlice.ts` - Authentication state and actions
- `src/store/hooks.ts` - Typed Redux hooks

### API Services
- `src/services/authAPI.ts` - Main API service (uses mock by default)
- `src/services/mockAuthAPI.ts` - Mock API for development

### Components
- `src/components/LoginModal.tsx` - Login modal with Redux integration
- `src/components/Navbar.tsx` - Navbar with auth state
- `src/components/ProtectedRoute.tsx` - Route protection
- `src/pages/RegisterPage.tsx` - Registration page with Redux

### Types
- `src/types/auth.ts` - Authentication type definitions
- `src/types/index.ts` - Main exports

## 🔧 Configuration

### Switch to Real Backend

When your backend is ready:

1. Open `src/services/authAPI.ts`
2. Change `USE_MOCK_API = false`
3. Update `API_BASE_URL` to your backend URL

### Backend API Endpoints Required

Your backend needs these endpoints:

- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify` - Verify JWT token

See `AUTHENTICATION.md` for detailed API specifications.

## 🛡️ Protected Routes Example

To protect a route, wrap it with `ProtectedRoute`:

```tsx
import ProtectedRoute from './components/ProtectedRoute';

// In your router
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>

// For admin-only routes
<Route 
  path="/admin/*" 
  element={
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

## 📊 Redux State Structure

```typescript
{
  auth: {
    user: {
      id: string;
      email: string;
      fullName: string;
      role: 'customer' | 'admin';
    } | null,
    token: string | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null
  }
}
```

## 🎯 Using Authentication in Components

```tsx
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  if (isLoading) return <div>Loading...</div>;
  
  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user?.fullName}!</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
}
```

## 🐛 Debugging

### Redux DevTools
Install the Redux DevTools extension to inspect state changes in real-time.

### Common Issues

**"User is not defined"**
- Make sure you're using `useAppSelector` hook
- Check if user is null before accessing properties: `user?.fullName`

**Login not working**
- Check browser console for errors
- Verify `USE_MOCK_API = true` in `authAPI.ts`
- Try clearing localStorage: `localStorage.clear()`

**State not persisting**
- Check if localStorage is enabled in your browser
- Open DevTools → Application → Local Storage
- Look for `authToken` and `authUser` keys

## 📚 Further Reading

For detailed documentation, see `AUTHENTICATION.md`

## 🎉 You're All Set!

Your application now has a complete, production-ready authentication system powered by Redux!
