# 🚀 PMS App - Full Setup Guide (Windows with WSL)

This guide will help you set up **Frappe + ERPNext + PMS App** on your Windows system from scratch.

---

## ✅ Prerequisites

- Windows 10 or Windows 11
- At least **8 GB RAM** and **20 GB free disk space**
- Internet connection

---

## STEP 1 — Install WSL (Ubuntu on Windows)

Open **PowerShell as Administrator** and run:

```powershell
wsl --install
```

This will install **WSL2 + Ubuntu** automatically. Restart your PC when asked.

After restart, open **Ubuntu** from Start Menu and set your **username and password**.

---

## STEP 2 — Update Ubuntu Packages

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

---

## STEP 3 — Install Required Dependencies

```bash
sudo apt-get install -y git python3-dev python3-setuptools python3-pip python3-venv \
  software-properties-common mariadb-server mariadb-client libmysqlclient-dev \
  xvfb libfontconfig wkhtmltopdf
```

---

## STEP 4 — Configure MariaDB

```bash
sudo mysql_secure_installation
```

When prompted:
- Enter current password: just press **Enter** (no password yet)
- Set root password: **Yes** → set a password (remember it!)
- Remove anonymous users: **Yes**
- Disallow root login remotely: **Yes**
- Remove test database: **Yes**
- Reload privilege tables: **Yes**

---

## STEP 5 — Edit MariaDB Config File

```bash
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```

Add the following at the end of the file:

```ini
[server]
user = mysql
pid-file = /run/mysqld/mysqld.pid
socket = /run/mysqld/mysqld.sock
basedir = /usr
datadir = /var/lib/mysql
tmpdir = /tmp
lc-messages-dir = /usr/share/mysql
bind-address = 127.0.0.1
query_cache_size = 16M
log_error = /var/log/mysql/error.log

[mysqld]
innodb-file-format=barracuda
innodb-file-per-table=1
innodb-large-prefix=1
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[mysql]
default-character-set = utf8mb4
```

Press **Ctrl+X**, then **Y**, then **Enter** to save.

Restart MariaDB:

```bash
sudo service mysql restart
```

---

## STEP 6 — Install Redis

```bash
sudo apt-get install redis-server -y
```

---

## STEP 7 — Install Node.js 18

```bash
sudo apt install curl -y
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile
nvm install 18
```

---

## STEP 8 — Install Yarn

```bash
sudo apt-get install npm -y
sudo npm install -g yarn
```

---

## STEP 9 — Install Frappe Bench

```bash
sudo -H pip3 install frappe-bench --break-system-packages
bench --version
```

---

## STEP 10 — Initialize Frappe Bench

```bash
bench init frappe-bench --frappe-branch version-15
cd frappe-bench/
```

---

## STEP 11 — Create a New Site

```bash
bench new-site mysite.com
bench --site mysite.com add-to-hosts
```

---

## STEP 12 — Install ERPNext

```bash
bench get-app erpnext --branch version-15
bench --site mysite.com install-app erpnext
```

---

## STEP 13 — Install PMS App (from GitHub)

```bash
bench get-app https://github.com/kolipratibha/PMS-System --branch main
bench --site mysite.com install-app pms
```

> ⚠️ Replace `YOUR_GITHUB_USERNAME` with the actual GitHub username who shared the repo.

---

## STEP 14 — Start the Server

```bash
bench start
```

Open your browser and go to:

```
http://localhost:8000
```

Login with:
- **Username:** `Administrator`
- **Password:** *(the one you set during site creation)*

---

## 🛠️ Troubleshooting

| Issue | Fix |
|-------|-----|
| `bench` command not found | Run `source ~/.profile` again |
| MariaDB not starting | Run `sudo service mysql start` |
| Redis not starting | Run `sudo service redis-server start` |
| Port 8000 not opening | Make sure `bench start` is running in terminal |

---

## 📞 Support

If you face any issues, contact the person who shared this app.
