# Redux Authentication System

This application now includes a complete authentication system built with Redux Toolkit.

## Features

✅ **User Registration** - Create new accounts with email and password  
✅ **User Login** - Authenticate with email and password  
✅ **Logout** - Securely sign out users  
✅ **Persistent Sessions** - Authentication state persists across page refreshes  
✅ **Protected Routes** - Restrict access to authenticated users only  
✅ **Role-Based Access** - Support for customer and admin roles  
✅ **Loading States** - User-friendly loading indicators  
✅ **Error Handling** - Clear error messages for failed operations  

## Architecture

### Redux Store Structure

```
src/
├── store/
│   ├── store.ts          # Redux store configuration
│   ├── authSlice.ts      # Authentication state and actions
│   └── hooks.ts          # Typed Redux hooks
├── services/
│   ├── authAPI.ts        # Authentication API service
│   └── mockAuthAPI.ts    # Mock API for development
├── types/
│   ├── auth.ts           # Authentication type definitions
│   └── index.ts          # Main type exports
└── components/
    └── ProtectedRoute.tsx # Route protection component
```

### State Management

The authentication state is managed by Redux Toolkit and includes:

```typescript
interface AuthState {
  user: User | null;           // Current user data
  token: string | null;        // JWT authentication token
  isAuthenticated: boolean;    // Authentication status
  isLoading: boolean;          // Loading state for async operations
  error: string | null;        // Error messages
}
```

## Usage

### 1. Login

Users can login via the login modal in the navbar:

```typescript
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/authSlice';

const dispatch = useAppDispatch();

await dispatch(login({ email, password })).unwrap();
```

### 2. Register

New users can register on the `/register` page:

```typescript
import { useAppDispatch } from '../store/hooks';
import { register } from '../store/authSlice';

const dispatch = useAppDispatch();

await dispatch(register({ fullName, email, password })).unwrap();
```

### 3. Logout

```typescript
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';

const dispatch = useAppDispatch();

await dispatch(logout());
```

### 4. Access User Data

```typescript
import { useAppSelector } from '../store/hooks';

const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
```

### 5. Protected Routes

Wrap routes that require authentication:

```tsx
import ProtectedRoute from '../components/ProtectedRoute';

<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>
```

For admin-only routes:

```tsx
<Route 
  path="/admin/*" 
  element={
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

## Mock API for Development

The system includes a mock API (`mockAuthAPI.ts`) that simulates backend responses. This allows you to test the authentication flow without a real backend.

### Test Credentials

**Customer Account:**
- Email: `test@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

### Switching to Real Backend

To connect to a real backend API:

1. Open `src/services/authAPI.ts`
2. Set `USE_MOCK_API = false`
3. Update `API_BASE_URL` to your backend URL
4. Ensure your backend returns data matching the `AuthResponse` interface:

```typescript
{
  user: {
    id: string;
    email: string;
    fullName: string;
    role: 'customer' | 'admin';
  },
  token: string;  // JWT token
}
```

## Backend API Requirements

Your backend should implement these endpoints:

### POST `/api/auth/register`
**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "id": "123",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "customer"
  },
  "token": "jwt_token_here"
}
```

### POST `/api/auth/login`
**Request:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "id": "123",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "customer"
  },
  "token": "jwt_token_here"
}
```

### POST `/api/auth/logout`
**Headers:**
```
Authorization: Bearer {token}
```

**Response:** 
```json
{ "message": "Logged out successfully" }
```

### GET `/api/auth/verify`
**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{ "valid": true }
```

## Persistence

Authentication data is automatically saved to `localStorage`:
- `authToken` - JWT authentication token
- `authUser` - User information (JSON stringified)

The state is automatically restored when the app loads.

## Security Notes

⚠️ **Important for Production:**

1. **HTTPS Only** - Always use HTTPS in production
2. **Secure Tokens** - Use secure, HTTP-only cookies for tokens when possible
3. **Token Expiration** - Implement token refresh mechanisms
4. **Password Requirements** - Enforce strong password policies
5. **Rate Limiting** - Implement rate limiting on auth endpoints
6. **CORS Configuration** - Properly configure CORS on your backend

## UI Components Updated

The following components have been integrated with Redux authentication:

- ✅ `LoginModal.tsx` - Handles user login
- ✅ `RegisterPage.tsx` - Handles user registration
- ✅ `Navbar.tsx` - Shows user menu with logout option
- ✅ `ProtectedRoute.tsx` - Protects authenticated routes

## Troubleshooting

**Login/Register not working:**
- Check browser console for errors
- Verify `USE_MOCK_API` is set to `true` in `authAPI.ts`
- Clear localStorage and try again

**State not persisting:**
- Check if localStorage is enabled
- Check browser console for errors
- Verify data is being saved to localStorage

**Protected routes not working:**
- Ensure routes are wrapped with `<ProtectedRoute>`
- Check if user is authenticated in Redux DevTools

## Redux DevTools

Install Redux DevTools browser extension to debug state changes:
- [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

## Next Steps

Consider adding these features:

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Social login (Google, Facebook, etc.)
- [ ] Token refresh mechanism
- [ ] User profile editing
- [ ] Remember me functionality
- [ ] Session timeout warnings
