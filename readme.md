# Bertie’s Books — Week 6 (ID: 33750790)

Dynamic Web Apps — Lab 6 (A–F).  
My VM: **#147** • Repo: **06_berties_33750790**

## Live links
- **Home (marking link):** http://www.doc.gold.ac.uk/usr/147/
- **VM/local test (on the VM itself):** http://localhost:8000/books/list

> The marking link uses the uni gateway; the `localhost:8000` link is for testing directly on the VM.

---

## What’s implemented (per worksheet)
- **6A–C:** MySQL schema + seed, Node/Express app, `mysql2.createPool`, list route.
- **6D:** EJS rendering; Add Book form + POST (parameterised `INSERT (?, ?)`).
- **6E/F:** Bargain + Search routes; app running on VM with `forever`.

### Routes
- `GET /books/list` → EJS table of all books  
- `GET /books/addbook` → form  
- `POST /books/bookadded` → insert with placeholders `VALUES (?, ?)`  
- `GET /books/bargainbooks` → `price < 20`  
- `GET /books/search?keyword=Brighton%20Rock` → exact match  
- `GET /books/search-adv?keyword=world` → partial, case-insensitive  
- Extra pages to match the brief’s menu: `GET /` (home), `/about`, `/search`, `/register`

### Tech
- `mysql2.createPool(...)` (non-root user `berties_books_app`)
- EJS views in `/views`
- Router in `/routes/books.js`
- `app.listen(port, '0.0.0.0', ...)` for external access

---

## Database scripts
**create_db.sql**
- Creates DB `berties_books`
- Creates table `books(id, name VARCHAR(50), price DECIMAL(5,2) UNSIGNED)`
- Creates user `berties_books_app` with privileges on the DB

**insert_test_data.sql**
- Inserts 5 sample books

---

## How to run (VM #147)
```bash
cd ~/06_berties_33750790
sudo apt-get update
sudo apt-get install -y mysql-server nodejs npm
sudo ln -sf /usr/bin/nodejs /usr/bin/node || true

# DB + seed (idempotent)
sudo mysql < create_db.sql
sudo mysql < insert_test_data.sql
sudo mysql -e "SELECT COUNT(*) rows FROM berties_books.books;"

# Install & run
npm install
sudo npm i -g forever
forever stopall || true
forever start -a -l forever.log -o out.log -e err.log index.js
forever list
