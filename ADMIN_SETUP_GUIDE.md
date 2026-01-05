# Admin Panel Setup & Usage Guide

## Quick Start

### 1. Installation

```bash
cd admin
npm install
npm start
```

The admin panel will start at `http://localhost:3000`

### 2. Login

Use these credentials:
- **Email**: admin@poshvue.com
- **Password**: admin123

## Navigation

The admin panel includes the following sections accessible from the sidebar:

### 1. **Dashboard** (`/`)
- View key business metrics
- See recent orders
- Monitor top products
- Track revenue

### 2. **Categories** (`/categories`)
- ✅ Create new categories
- ✅ View all categories
- ✅ Edit categories
- ✅ Delete categories
- Manage category status

### 3. **Products** (`/products`)
- ✅ Add new products
- ✅ View product list
- ✅ Edit product details
- ✅ Delete products
- Manage inventory
- Set pricing

### 4. **Orders** (`/orders`)
- ✅ View all orders
- ✅ Filter by status
- ✅ Search orders
- View customer details
- Track individual orders

### 5. **Order Tracking** (`/orders/:orderId/track`)
- ✅ Track order status
- View timeline
- See shipping details
- View items ordered

### 6. **Coupons** (`/coupons`)
- ✅ Create discount coupons
- ✅ Edit coupon details
- ✅ Delete coupons
- Track usage
- Manage expiry dates

### 7. **Users** (`/users`)
- ✅ View all users
- ✅ Search users
- Filter by status
- See user metrics
- View purchase history

### 8. **Reports** (`/reports`)
- ✅ Daily sales reports
- ✅ Category-wise analysis
- ✅ Download reports (PDF, CSV, Excel)
- Performance metrics

## Features

### Responsive Design ✅
- **Mobile First Approach** (320px+)
- Works on all devices
- Collapsible sidebar on mobile
- Optimized tables and forms
- Touch-friendly buttons

### Authentication ✅
- Login system with demo credentials
- Session management
- Protected routes
- Auto-redirect to login

### CRUD Operations ✅
- Categories: Create, Read, Update, Delete
- Products: Create, Read, Update, Delete
- Coupons: Create, Read, Update, Delete
- Form validations

### User Interface ✅
- Clean, modern design
- Consistent color scheme
- Icon-based navigation
- Responsive cards and tables
- Modal dialogs for forms

### Data Display ✅
- Statistics cards with metrics
- Data tables with actions
- Status badges
- Search and filter
- Pagination ready

## Styling Convention

All styles use the **x_** prefix pattern:

```css
/* Buttons */
.x_btn-primary, .x_btn-success, .x_btn-danger, .x_btn-warning

/* Cards */
.x_card, .x_card-header, .x_card-body

/* Forms */
.x_form-group, .x_form-label, .x_form-control

/* Tables */
.x_table, .x_table-wrapper, .x_table-action

/* Grid */
.x_grid, .x_grid-2, .x_grid-3, .x_grid-4

/* Statistics */
.x_stat-card, .x_stat-label, .x_stat-value
```

## Mobile Breakpoints

| Breakpoint | Screen Size | Use Case |
|-----------|-----------|----------|
| XL | 769px+ | Desktop |
| LG | 577-768px | Tablet |
| MD | 376-576px | Mobile |
| SM | 320-375px | Small Phone |

## API Integration (Next Steps)

Replace mock data with API calls:

```javascript
// Example: Get categories
axios.get('https://api.poshvue.com/categories')
  .then(res => setCategories(res.data))
  .catch(err => console.error(err));

// Example: Create product
axios.post('https://api.poshvue.com/products', {
  name: 'Product Name',
  category: 'Electronics',
  price: '$99.99'
}).then(res => {
  // Update state with new product
}).catch(err => {
  // Show error message
});
```

## Common Tasks

### Add New Category
1. Click "Add Category" button
2. Fill in category name
3. Add description (optional)
4. Set status to Active
5. Click "Create"

### Create Product
1. Go to Products
2. Click "Add Product"
3. Enter product details
4. Set price and stock
5. Assign category
6. Click "Create"

### Create Discount Coupon
1. Go to Coupons
2. Click "Create Coupon"
3. Enter coupon code
4. Choose discount type (% or $)
5. Set expiry date
6. Click "Create"

### View Order Details
1. Go to Orders
2. Click "View" icon on any order
3. See order details and items

### Track Order
1. Go to Orders
2. Click "Track" icon
3. View complete order timeline
4. See shipping address

## Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm start
```

### Dependencies not installed
```bash
rm -rf node_modules
npm install
```

### Styles not loading
- Ensure `x_admin.css` is in `src/styles/`
- Verify CSS import in App.js: `import "./styles/x_admin.css"`

## File Structure

```
admin/src/
├── App.js                    # Main app component with routing
├── index.js                  # Entry point
├── components/
│   ├── Layout.js            # Main layout wrapper
│   └── ProtectedRoute.js    # Route guard
├── pages/
│   ├── Auth/
│   │   └── Login.js         # Login form
│   ├── Dashboard.js         # Dashboard/Home
│   ├── Categories/
│   ├── Products/
│   ├── Orders/
│   │   ├── Orders.js
│   │   └── TrackOrder.js
│   ├── Coupons/
│   ├── Users/
│   └── Reports/
└── styles/
    └── x_admin.css          # All responsive styles
```

## Key Components

### Layout.js
- Main layout with sidebar
- Header with user info
- Navigation menu
- Responsive design

### Login.js
- Authentication form
- Session management
- Demo credentials

### Dashboard.js
- Statistics overview
- Recent orders table
- Top products
- Real-time metrics

## Next Steps

1. **Connect to Backend API**
   - Replace mock data with API calls
   - Implement proper authentication tokens
   - Handle errors and loading states

2. **Add Features**
   - Real-time notifications
   - Advanced search and filtering
   - Bulk operations
   - Charts and graphs

3. **Improve UX**
   - Add loading spinners
   - Show success/error messages
   - Confirmation dialogs
   - Toast notifications

4. **Testing**
   - Unit tests for components
   - Integration tests
   - End-to-end tests

## Support

For issues or questions about the admin panel, refer to the ADMIN_README.md file or contact your development team.

---

**Admin Panel Version**: 1.0.0  
**Last Updated**: January 2024
