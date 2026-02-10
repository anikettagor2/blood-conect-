
# BloodConnect

BloodConnect is a web application for blood donation and campaign registration, built with Next.js 14, Tailwind CSS, shadcn/ui, and Firebase.

## Features

- **Donor Registration:** Users can register as blood donors.
- **Blood Bank Dashboard:** Real-time view of blood stock availability.
- **Campaign Registration:** Organizers can register and list blood donation drives.
- **Emergency Requests:** Urgent blood requests broadcast to donors (simulated).
- **Admin Panel:** Manage blood banks, stock, and donors.
- **Real-time Updates:** Powered by Cloud Firestore.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Firebase Setup

- The project uses the Firebase configuration provided.
- **Security Rules:** Deploy `firestore.rules` to your Firebase project to secure the database.
    ```bash
    firebase deploy --only firestore:rules
    ```

## Admin Access

- New users are registered with the `donor` role by default.
- To access the **Admin Panel** (`/admin`), you can use the "Switch Role to Admin (Demo Only)" button on the Admin page if you are logged in but not an admin.
- In a production environment, you would manually update the user document in the `users` collection to have `role: 'admin'`.

## Project Structure

- `src/app`: Application pages and layout (Next.js App Router).
- `src/components`: Reusable UI components and feature-specific forms.
- `src/lib`: Utilities, Firebase config, and Zod schemas.
- `src/context`: Authentication context provider.
