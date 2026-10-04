# Patel Hall Placement & Referral Portal (UniDome)

A web portal for Patel Hall of Residence, IIT Kharagpur. Students browse
placement openings posted by alumni, apply with one of four resume profiles,
and get private CV scores and feedback. Alumni review applications and post
openings. Admins oversee tickets, custom referral requests, drives, and admin
access.

This is a front-end prototype. It runs on mock data in the browser, with no
real backend or login. See [Limitations](#limitations).

---

## Quick start

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

| Command           | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Local dev server with hot reload      |
| `npm run build`   | Production build into `dist/`         |
| `npm run preview` | Serve the production build locally    |

---

## Signing in (demo)

The sign-in page has two one-click demo identities:

- **Student:** Sanya Gupta (Enter as Student)
- **Alumni:** Aarav Mehta (Enter as Alumni Reviewer)

You can also enter any webmail address under "or use webmail" and pick a role,
or use **New registration** to create a profile.

Once signed in, the header's **Student / Alumni / Admin** switch changes role
and takes you to that role's home page. Click the logo to return to sign-in.

---

## Navigation and sitemap

Each screen has its own URL, so the back button and direct links work.

```
/                         Sign-in (shown when signed out)

/student                  Hall Life (student home)
/student/dashboard        Stats, latest application, referral shortcut
/student/openings         Browse and filter alumni openings
/student/openings/:id     Opportunity detail and 1-click apply
/student/applications     Your applications, CV scores, alumni feedback
/student/resumes          4-Resume Studio (edit your four CV profiles)
/student/referral         Request a custom referral or external POC

/alumni                   Hall Life (alumni home)
/alumni/dashboard         Pending reviews, accepted count, post-new shortcut
/alumni/queue             CV review queue (search, filter, score)
/alumni/postings          Manage your postings (open/close, delete, add)

/admin                    Admin overview (metrics, backup, access transfer)
/admin/tickets            Master application tickets (change status, chat)
/admin/requests           Custom referral / POC requests
/admin/drives             Manage all drives
/admin/team               Admin privileges

/hall-life                Hall Life page (also reachable from the header)
```

The header is available on every signed-in page:

- **Hall Life icon:** campus events and announcements
- **Chat icon:** the message drawer, with threads per application. Messages are sent as the signed-in user.
- **Bell (Alumni only):** new applications. Click one to open it in the review queue.
- **Sparkle icon (Alumni, Admin):** the feedback network ledger
- **Moon/Sun:** light and dark theme
- **Name chip:** the account dialog for registering a UniDome ID
- **Log-out icon:** sign out. Clicking the logo also returns to sign-in.

---

## Features by role

### Student
- **Hall Life:** rotating event showcase and campus announcements.
- **Browse openings:** search by role, company, or skill, and filter by type.
- **Apply:** open an opening, pick one of your four resumes, write a short
  pitch, and submit. Each opening can be applied to once.
- **Track applications:** status, 1-to-10 CV score, feedback, and tips from the
  alumni. Send a follow-up message from here.
- **Resume studio:** four profiles with a focus statement, work ethic, repo
  links, and attachments.
- **Custom referral:** request a company or role not on the board, optionally
  with an external contact for Admin to verify.

### Alumni
- **Review queue:** filter by status or posting, search candidates, and open
  the review panel.
- **Review panel:** read the applicant's pitch and submitted resume, choose
  *Accept & proceed* or *Feedback only*, score 1–10, and write what stood out.
  Tips are required for feedback-only reviews. Submit is disabled until a score
  and the required notes are in. Press Escape to close without saving.
- **Postings:** post an opportunity, open or close it, or delete it.
- **Chat:** private threads with applicants.

### Admin
- **Overview:** totals for tickets, pending reviews, successful referrals, and
  custom requests.
- **Master tickets:** change any application's status and open its chat.
- **POC requests:** review submitted referral requests and external contacts.
- **Drives:** remove postings.
- **Custom POC requests:** set each request to *Pending Admin Verification*,
  *Verified & Ticket Raised*, or *Declined*.
- **Deleting drives:** asks for confirmation first.
- **Backup:** export all data as JSON, or restore from a JSON file.
- **Access transfer:** hand primary admin rights to another admin.

---

## Project structure

```
src/
├── main.jsx                 App entry: router + global state provider
├── App.jsx                  Route table, per role
├── index.css                Design system (colors, type, component classes)
├── context/AppContext.jsx   All shared state and actions
├── data/mockData.js         Seed data: openings, applications, users, chats
└── components/
    ├── layout/AppShell.jsx  Header + page outlet + chat drawer
    ├── Header.jsx           Global header and role switch
    ├── Auth/                Sign-in page and account dialogs
    ├── HallLife/            Hall Life page
    ├── StudentDashboard/    Student pages and layout
    ├── AlumniPortal/        Alumni pages, review modal, hero slider
    ├── AdminPanel/          Admin pages and access transfer
    ├── Chat/                Chat drawer
    └── FeedbackNetwork/     Feedback ledger drawer (opened from the header for Alumni and Admin)
```

---

## Design system

Colors, fonts, and component classes are defined in `src/index.css`:

- **Palette:** `maroon-*` (Patel Hall deep maroon), `peach-*` (beige/peach),
  and `sand-*` (warm neutrals). Edit the `@theme` block to change them everywhere.
- **Type:** Plus Jakarta Sans for text and headings, JetBrains Mono for small labels.
- **Background:** the campus photo `public/patel_hall_bg.png` sits fixed behind every page
  (`body::before`, 38% opacity in light mode, 22% in dark mode).
- **Glass:** cards, the header, dialogs, inputs, and buttons use translucent,
  blurred surfaces (`surface-*`, `btn-*`). Text colors are set one step darker
  so they stay readable over the photo.
- **Reusable classes:** `surface-card`, `surface-band`, `ruled-row`,
  `btn-primary`, `btn-secondary`, `btn-ghost`, `input-field`, `pill-*`,
  `tab-link`, `text-label`, `text-muted`, `reveal`.
- **Theme:** light by default. Dark mode is switched by a `dark` class on `<html>`.

Use these classes instead of ad-hoc colors so light and dark mode stay in sync.

---

## Data and persistence

- All content comes from `src/data/mockData.js`.
- Sign-in state, the current user, student resumes, openings, and applications
  are saved in `localStorage`, so they survive a refresh.
- Chat threads, notifications, referral requests, and the feedback ledger reset
  to the seed data on refresh. Use **Export** in the Admin overview (or
  **Backup** in the student ledger) to keep a copy.
- Admin **Restore** loads a previously exported JSON file.

---

## Deployment

The app is a static single-page site. `netlify.toml` sets the build command
(`npm run build`), the publish folder (`dist`), and the rewrite that lets deep
links such as `/student/openings` load. `vercel.json` provides the same rewrite
for Vercel.

To deploy on Netlify, connect the GitHub repository and let each push rebuild
the site.

---

## Limitations

- **No real authentication.** Role switching and demo sign-in are for
  demonstration only. Anyone with the link can use any role.
- **No backend or database.** Changes stay in the visitor's browser.
- **No file uploads.** Resumes are described by name and size; no PDF is stored.
- **Shared links show the same seed data.** Each visitor's own changes stay
  local to their browser.

---

## Where to change things

| To change…                         | Edit                                             |
| ---------------------------------- | ------------------------------------------------ |
| Colors, fonts, spacing scale       | `src/index.css` (`@theme` block and component classes) |
| Background photo and its opacity   | `public/patel_hall_bg.png`, `body::before` in `src/index.css` |
| Page routes or the sitemap         | `src/App.jsx`                                    |
| Student / alumni / admin nav items | `navItems` in the matching `*Layout.jsx`         |
| Header contents                    | `src/components/Header.jsx`                      |
| Sample openings, users, announcements | `src/data/mockData.js`                       |
| Actions (apply, review, post)      | `src/context/AppContext.jsx`                     |
| Hall Life hero and announcements   | `src/components/HallLife/HallLife.jsx`           |
| Deployment settings                | `netlify.toml`, `vercel.json`, `public/_redirects` |
