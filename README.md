# 🦷 Dentist Reservation App

A modern reservation management system for dental clinics. Built with **React**, **Tailwind CSS**, **Zustand**, **React Router** and **dnd kit**, it helps staff efficiently manage patient appointments through an intuitive Kanban board and powerful filtering tools.

---

## 🔥 Live
[https://elkood-task.onrender.com](https://elkood-task.onrender.com)


## ✨ Features

### 🗂️ Kanban Board (Home Screen)
- Three columns: **Upcoming**, **Waiting**, **In Treatment**
- **Drag & drop** reservations between columns to update status in real time
- **Date‑scoped view** – shows only reservations for a selected date (default: today) to avoid clutter
- **Per‑column search, filter, and sort**  
  - Search by patient name or phone  
  - Filter by blood type, reservation type, etc.  
  - Sort by name, date, etc.

### 📋 Reservation Management Page
- Complete list of **all** reservations across all dates
- **Global search** (name / phone)  
- **Multi‑criteria filtering** (status, type, blood type, date range)  
- **Sorting** by any field  
- **CRUD operations**:  
  - Add new reservation (with form validation)  
  - View / edit existing reservation  
  - **Delete** – only allowed if status is `upcoming` (others are protected)  
- **Status flow buttons** – quickly move a reservation through its lifecycle (e.g., from waiting to in‑treatment)

### ✅ Validation & Error Handling
- Real‑time validation on all input fields (name, phone, date, etc.)
- Custom validation rules (e.g., `phoneNumber`)
- Error messages appear inline below each field
- Actions (save, status change) are blocked until the form is valid

### 🎨 Modern UI
- **Tailwind CSS** for responsive, utility‑first styling  
- **Smooth animations** (hover effects, dropdowns, error messages)  
- **Accessible** form controls and interactive elements  

---

## 🧰 Tech Stack

| **Layer**          | **Technology**                                    |
|---------------------|---------------------------------------------------|
| UI Library          | [React](https://reactjs.org/) (v18)              |
| Drag & Drop         | [Dnd Kit](https://dndkit.com/)                   |
| Styling             | [Tailwind CSS](https://tailwindcss.com/)         |
| State Management    | [Zustand](https://github.com/pmndrs/zustand)     |
| Routing             | [React Router](https://reactrouter.com/) (v6)    |
| Icons               | [React Icons](https://react-icons.github.io/react-icons/) |
| Build Tool          | [Vite](https://vitejs.dev/)                       |

---

## 📁 Project Structure

```
ELKOOD_TASK/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── button/
│   │   ├── input/
│   │   ├── Kanban/
│   │   ├── KanbanReservation.tsx
│   │   ├── Header.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── TimeAgo.tsx
│   ├── pages/
│   │   ├── AddReservation/
│   │   ├── Dashboard/
│   │   ├── Reservation/
│   │   └── Reservations/
│   ├── store/
│   │   ├── constants.ts
│   │   └── store.ts
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- React.js (v16 or newer)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Oudisho-Qattyne/ELKOOD-TASK.git
   cd ELKOOD-TASK
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

---

## 🧪 Dummy Data
The app comes pre‑loaded with sample reservations covering various statuses, types, and dates (from Feb 16, 2026, to Mar 30, 2026). This lets you test all features immediately.

---

## 🎯 Usage

- **Home page**: Select a date at the top, then drag cards between columns. Use column‑specific search/filter to narrow down.
- **Reservations page**: Use the global search bar, filter panel, and sort dropdown to explore all records. Click any row to view/edit details.
- **Add Reservation**: Click the “+ Add” button (on Reservations page) and fill the form – validation guides you.
- **Edit / Delete**: On the reservation detail page, click **Edit** to enable fields. Save only when valid. **Delete** is available only for `upcoming` reservations.

---

## 🛠️ Customization

- **Validation rules**: Extend validation logic in `src/components/input/validation.ts`
- **Appearance**: Modify `tailwind.config.js` (if present) to change colors, fonts, or add new utilities.
- **Columns / Statuses**: Update `ReservationStatuses` in `src/store/constants.ts` and adjust `Kanban` components accordingly.
