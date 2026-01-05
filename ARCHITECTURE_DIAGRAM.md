# Admin Panel Architecture & Structure

## 📊 Application Flow Diagram

```
                          User
                            |
                            v
                    ┌─────────────────┐
                    │   Login Page    │
                    │  (/login)       │
                    └────────┬────────┘
                             |
                      Authenticate
                             |
                    [Save Token in Storage]
                             |
                             v
                    ┌─────────────────────┐
                    │   Protected Route   │
                    │   ProtectedRoute.js │
                    └────────┬────────────┘
                             |
                             v
                    ┌──────────────────────┐
                    │      Layout          │
                    │ (Header + Sidebar)   │
                    └────────┬─────────────┘
                             |
         ┌───────────────────┼───────────────────┐
         |                   |                   |
         v                   v                   v
    Dashboard          Navigation             Header
   (Metrics,       (Menu Items with        (User Info,
    Orders,        Active Status)          Logout)
    Products)
```

---

## 🏗️ Component Hierarchy

```
App.js
├── Routes
│   ├── /login → Login.js
│   └── Protected Routes
│       └── Layout.js (Wrapper)
│           ├── Header.js (in Layout)
│           ├── Sidebar.js (in Layout)
│           └── Main Content (Outlet)
│               ├── Dashboard.js
│               ├── Categories.js
│               ├── Products.js
│               ├── Orders.js
│               ├── TrackOrder.js
│               ├── Coupons.js
│               ├── Users.js
│               └── Reports.js
```

---

## 📁 File Organization

```
admin/src/
│
├── App.js
│   └── Main app with all routes
│
├── components/
│   ├── Layout.js (Main wrapper, header, sidebar)
│   └── ProtectedRoute.js (Route guard)
│
├── pages/
│   ├── Auth/
│   │   └── Login.js
│   ├── Dashboard.js
│   ├── Categories/
│   │   └── Categories.js
│   ├── Products/
│   │   └── Products.js
│   ├── Orders/
│   │   ├── Orders.js
│   │   └── TrackOrder.js
│   ├── Coupons/
│   │   └── Coupons.js
│   ├── Users/
│   │   └── Users.js
│   └── Reports/
│       └── Reports.js
│
└── styles/
    └── x_admin.css
```

---

## 🔄 Data Flow - Create Operation

```
┌─────────────────────────────────────────────────────────┐
│ User clicks "Add Category" Button                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     v
        ┌────────────────────────┐
        │  Modal Opens           │
        │  showModal = true      │
        └────────────┬───────────┘
                     │
                     v
        ┌────────────────────────────────┐
        │ User Fills Form:               │
        │ - Category Name                │
        │ - Description                  │
        │ - Status                       │
        └────────────┬───────────────────┘
                     │
                     v
        ┌────────────────────────────────┐
        │ User Clicks "Create" Button    │
        │ handleSubmit() triggered       │
        └────────────┬───────────────────┘
                     │
                     v
        ┌────────────────────────────────┐
        │ New Category Object Created:   │
        │ { id: Date.now(),              │
        │   name, description, status }  │
        └────────────┬───────────────────┘
                     │
                     v
        ┌────────────────────────────────┐
        │ Update State:                  │
        │ setCategories([...prev, new])  │
        └────────────┬───────────────────┘
                     │
                     v
        ┌────────────────────────────────┐
        │ Component Re-renders           │
        │ Table shows new category       │
        └────────────┬───────────────────┘
                     │
                     v
        ┌────────────────────────────────┐
        │ Modal Closes                   │
        │ Form Resets                    │
        │ showModal = false              │
        └────────────────────────────────┘
```

---

## 🎯 Navigation Flow

```
                    [Dashboard]
                    (Default Route)
                         |
            ┌────────────┼────────────┐
            |            |            |
        [Categories] [Products]   [Orders]
            |            |            |
            |            |      ┌─────┴─────┐
            |            |      |           |
            |            |   [Orders]  [TrackOrder]
            |            |   (List)     (Details)
            |            |
        ┌───┴──────┬─────┴─────┬──────────┐
        |          |           |          |
    [Coupons]  [Users]    [Reports]   [Logout]
                                         |
                                    [Login]
```

---

## 📱 Responsive Layout Structure

### Desktop (769px+)
```
┌──────────────────────────────────────────┐
│         HEADER (Fixed, 60px)             │
├──────────┬──────────────────────────────┤
│  SIDEBAR │      MAIN CONTENT            │
│ (280px)  │   (Flexbox, Multi-column)   │
│          │   - 2-4 column grids        │
│          │   - Full tables             │
│   Fixed  │   - Side-by-side cards      │
│  (100vh) │                            │
│          │                            │
└──────────┴──────────────────────────────┘
```

### Tablet (577-768px)
```
┌──────────────────────────────┐
│      HEADER (Fixed)          │
├────────┬────────────────────┤
│SIDEBAR │   MAIN CONTENT    │
│(240px) │ (2-col grid →    │
│        │  1-col on small) │
│        │                  │
└────────┴────────────────────┘
```

### Mobile (376-576px)
```
┌──────────────────────────────┐
│  HEADER + MENU TOGGLE       │
├──────────────────────────────┤
│                              │
│      MAIN CONTENT            │
│    (Single Column)           │
│  (Sidebar slides in)         │
│                              │
│  Stacked:                    │
│  - Forms                     │
│  - Buttons (full-width)      │
│  - Tables (scrollable)       │
│                              │
└──────────────────────────────┘
```

### Small Mobile (320-375px)
```
┌──────────────────────┐
│  HEADER (Minimal)    │
├──────────────────────┤
│  MAIN CONTENT        │
│  Highly Optimized:   │
│  - Minimal padding   │
│  - Tiny fonts        │
│  - Single actions    │
│  - Slim sidebar      │
│                      │
└──────────────────────┘
```

---

## 🎨 CSS Architecture

```
x_admin.css (1000+ lines)
│
├── Root Variables
│   ├── Colors (primary, secondary, etc.)
│   └── Spacing scales
│
├── Layout Styles
│   ├── Container (.x_admin-container)
│   ├── Sidebar (.x_sidebar)
│   ├── Header (.x_header)
│   └── Main Content (.x_main-content)
│
├── Component Styles
│   ├── Buttons (.x_btn*)
│   ├── Cards (.x_card*)
│   ├── Forms (.x_form-*)
│   ├── Tables (.x_table*)
│   ├── Modals (.x_modal-*)
│   ├── Navigation (.x_nav-*)
│   ├── Statistics (.x_stat-*)
│   └── Alerts (.x_alert-*)
│
├── Grid System
│   ├── .x_grid (flex grid)
│   ├── .x_grid-2 (2 columns)
│   ├── .x_grid-3 (3 columns)
│   └── .x_grid-4 (4 columns)
│
├── Utilities
│   ├── Spacing (.x_mt-, .x_mb-, .x_p-)
│   ├── Text (.x_text-*)
│   ├── Flexbox (.x_flex*)
│   └── Display (.x_hidden, .x_w-100)
│
└── Media Queries
    ├── Desktop (769px+)
    ├── Tablet (768px down)
    ├── Mobile (576px down)
    ├── Small (375px down)
    └── Extra Small (320px)
```

---

## 🔐 Authentication Flow

```
User Lands on App
    ↓
Check localStorage for token
    ↓
Token exists?
├─ YES → Render Protected Routes
│        └─ Dashboard, Categories, etc.
│           └─ User can navigate freely
│           └─ Click Logout clears token
│
└─ NO → Redirect to /login
        └─ Show Login Form
        └─ User enters credentials
        └─ Validate (demo: admin@poshvue.com)
        └─ Create token = "admin_token_" + Date.now()
        └─ Save to localStorage
        └─ Redirect to Dashboard
```

---

## 📊 State Management Pattern

```
App.js
│
├── isAuthenticated (boolean)
│   └── Passed to ProtectedRoute
│
└── Per Component State
    │
    ├── Dashboard
    │   └── stats, recentOrders, topProducts
    │
    ├── Categories
    │   ├── categories (array)
    │   ├── showModal (boolean)
    │   ├── formData (object)
    │   └── editingId (number/null)
    │
    ├── Products
    │   ├── products (array)
    │   ├── showModal (boolean)
    │   ├── formData (object)
    │   └── editingId (number/null)
    │
    ├── Orders
    │   ├── orders (array)
    │   ├── selectedFilter (string)
    │   └── dateRange (object)
    │
    ├── Coupons
    │   ├── coupons (array)
    │   ├── showModal (boolean)
    │   ├── formData (object)
    │   └── editingId (number/null)
    │
    ├── Users
    │   ├── users (array)
    │   ├── searchTerm (string)
    │   └── filterStatus (string)
    │
    └── Reports
        ├── reportData (object)
        └── selectedReport (string)
```

---

## 🔄 CRUD State Update Pattern

```
Read (Initial)
└─ useState(initialData)
    └─ Display in table/grid

Create
└─ Modal opens (showModal = true)
    └─ Form data entered
    └─ Submit: setItems([...prev, newItem])
    └─ Modal closes (showModal = false)
    └─ Table updates automatically

Update
└─ Click Edit button
    └─ Modal opens with existing data
    └─ Form prefilled
    └─ Submit: setItems(prev => prev.map(...))
    └─ Modal closes
    └─ Table updates

Delete
└─ Click Delete button
    └─ Confirmation dialog
    └─ Confirm: setItems(prev => prev.filter(...))
    └─ Item removed immediately
```

---

## 🎯 Component Props & Data Flow

```
App.js
├─ onLogin (function) → Login.js
├─ onLogout (function) → Layout.js
└─ isAuthenticated (boolean) → ProtectedRoute.js

Layout.js
├─ onLogout (function) → Header button
└─ Outlet (React Router) → Page components

Login.js
└─ onLogin callback → Sets authentication

Protected Pages (Categories, Products, etc.)
├─ Local state for data
├─ No props needed (independent)
└─ Uses Router hooks (useNavigate, useParams)
```

---

## 📱 Mobile Interaction Flow

```
User on Mobile Device (< 576px)
    ↓
Sidebar Hidden by default (off-screen)
    ↓
Click Hamburger Menu (☰)
    ↓
Sidebar Slides In (.x_sidebar.x_active)
    ↓
User Clicks Menu Item
    ↓
Navigation occurs
    ↓
Sidebar Auto-closes (setSidebarOpen(false))
    ↓
Content displays full-width
    ↓
User can scroll or interact
```

---

## 🎨 Modal Dialog Pattern

```
User clicks Create/Edit button
    ↓
setShowModal(true)
    ↓
Modal displays (.x_modal-overlay.x_active)
    ↓
Form appears
    ↓
User fills form
    ↓
Click "Create"/"Update"
    ↓
handleSubmit() → Update state
    ↓
setShowModal(false)
    ↓
resetForm()
    ↓
Modal closes
    ↓
Changes visible in table
```

---

## 🔗 Router Configuration (App.js)

```
App Routes:
├─ /login (Login component)
└─ Protected:
   ├─ / (Dashboard)
   ├─ /categories (Categories)
   ├─ /products (Products)
   ├─ /orders (Orders list)
   ├─ /orders/:orderId/track (TrackOrder)
   ├─ /coupons (Coupons)
   ├─ /users (Users)
   └─ /reports (Reports)
```

---

**Architecture Design** | Admin Panel v1.0.0 | January 2024
