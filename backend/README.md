# Backend (Django)

This directory contains a minimal Django + Django REST Framework backend scaffold for the Chama AI signup API.

Quick start (from the `backend/` folder):

```bash
# create and activate a virtualenv (optional, project already has venv at `backend/venv`)
python -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt

# run migrations
python manage.py migrate

# create superuser (optional)
python manage.py createsuperuser

# run dev server
python manage.py runserver
```

API:
- `POST /api/auth/signup/` accepts JSON: `first_name`, `last_name`, `phone`, `email`, `password`, `create_chama`, `chama_name`, `chama_type`.

Note: This is an initial scaffold. For production you should:
- Configure SECRET_KEY and DEBUG via environment variables
- Use PostgreSQL or another production database
- Add proper authentication (JWT or token), email verification, rate-limiting, and validation
