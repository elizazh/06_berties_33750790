# 06_berties_33750790

**Bertie’s Books — Week 6 (ID: 33750790)**  
Dynamic Web Apps — **Lab 6 (A–F)**

**Student:** Eliza Hussain (ehuss003)  
**Live site:** http://www.doc.gold.ac.uk/usr/417/

---

## What this is

Small Express + EJS app backed by a relational database (MySQL/MariaDB or compatible).  
Implements core Lab 6 features:

- **6a/b/c:** Create schema + seed data, list & bargain views, exact/advanced search
- **6d:** Small UI/UX improvements (styles, table/form polishing)
- **6e/f (extension):** Clean routes, partials, and README + deploy to VM

---

## Tech stack

- **Node.js / Express**
- **EJS** templates + partials (`views/partials`)
- **Relational DB** (MySQL/MariaDB compatible)
- **CSS:** `/public/style.css`

---

## Project structure
06_berties_33750790/
├── index.js                # App entry
├── package.json
├── routes/
│   └── books.js            # All routes
├── views/
│   ├── index.ejs           # Home
│   ├── about.ejs
│   ├── list.ejs            # /books
│   ├── addbook.ejs         # /addbook (GET/POST)
│   ├── search.ejs          # /search + links to exact/advanced
│   ├── register.ejs        # /register (GET/POST)
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── public/
│   └── style.css           # Minimal professional theme
├── create_db.sql           # Schema
├── insert_test_data.sql    # Seed data
├── links.txt               # URLs for marking (see format below)
└── README.md
06_berties_33750790/
├── index.js                # App entry
├── package.json
├── routes/
│   └── books.js            # All routes
├── views/
│   ├── index.ejs           # Home
│   ├── about.ejs
│   ├── list.ejs            # /books
│   ├── addbook.ejs         # /addbook (GET/POST)
│   ├── search.ejs          # /search + links to exact/advanced
│   ├── register.ejs        # /register (GET/POST)
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── public/
│   └── style.css           # Minimal professional theme
├── create_db.sql           # Schema
├── insert_test_data.sql    # Seed data
├── links.txt               # URLs for marking (see format below)
└── README.md
