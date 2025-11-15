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
# 1) Create DB + sample data
mysql -u root -p < create_db.sql
mysql -u root -p berties < insert_test_data.sql

# 2) Start the app
npm install
node index.js
# 1) Create DB + sample data
mysql -u root -p < create_db.sql
mysql -u root -p berties < insert_test_data.sql

http://localhost:8000/books/list
