# nextgrowthlabs submission

## Problem Set I - Regex

Write a regex to extract all the numbers with orange color background from the below text in italics (Output should be a list).

{"orders":[{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8},{"id":9},{"id":10},{"id":11},{"id":648},{"id":649},{"id":650},{"id":651},{"id":652},{"id":653}],"errors":[{"code":3,"message":"[PHP Warning #2] count(): Parameter must be an array or an object that implements Countable (153)"}]}

```python
import re

text = '{"orders":[{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8},{"id":9},{"id":10},{"id":11},{"id":648},{"id":649},{"id":650},{"id":651},{"id":652},{"id":653}],"errors":[{"code":3,"message":"[PHP Warning #2] count(): Parameter must be an array or an object that implements Countable (153)"}]}'

# Regular expression to find numbers with "id" key
regex = r'(?<="id":)\d+'

matches = re.findall(regex, text)

numbers = [int(match) for match in matches]

print(numbers)

```

## problem set 2

### Table of Contents

- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)

## Technology Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Django, Django REST framework
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Storage**: Cloudinary for media storage
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Python
- Django
- PostgreSQL

### Frontend Setup

```bash
git clone https://github.com/yourusername/nextgrowthlabs.git
cd nextgrowthlabs
cd frontend
npm install
npm start
```

### Backend setup

```bash
cd myapp
python -m venv venv
venv/scripts/activate
pip install -r requirements.txt


#run django

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## API Endpoints

### Authentication

used jwt token and cookie to setup AUTH

- `POST /api/accounts/register/`: Register a new user.
- `POST /api/accounts/login/`: User login.

### Tasks

- `GET /api/main/tasks/`: Retrieve all tasks.
- `POST /api/main/tasks/create/`: Create a new task.
- `PUT /api/main/tasks/update/{id}/`: Update an existing task.
- `GET /api/main/tasks/pending/`: lists all pending tasks.
- `GET /api/main/tasks/completed/`: lists all completed tasks tasks

- `DELETE /api/main/tasks/delete/{id}/`: Delete a task.

### Points

- `GET /api/main/user-points/`: Retrieve user's total points.

### Apps

- `GET /api/main/apps/`: Retrieve all apps.
- `POST /api/main/apps/create/`: Create a new app.

## Deployment

### Render and Vercel Setup for deployment

1. **Create a Render and vercel Account**: Sign up for a Render and vercel accounts and connect github.
2. **Create a New Web Service**: Follow the instructions to create a new web service for both the backend and frontend.
3. **Add Environment Variables**: Configure the necessary environment variables in the Render dashboard for both the backend and frontend like **_cloudinary_** storage and postgres sql.

Frontend link [https://nextlabs-alpha.vercel.app](https://nextlabs-alpha.vercel.app/login)

Backend link [https://nextlabs-w9ig.onrender.com](https://nextlabs-w9ig.onrender.com) (DEBUG is OFF)

# credentials

for Admin
( username : admin, password : admin$6634)

for user( username :dinesh ,password :dinesh)

- demo link [click here ](https://www.loom.com/share/dc0809650d1d43d89078e18e658800f5?sid=eaa64708-3056-4964-8fb3-3af3703da17b)

## Automate Delivery

for this project i have used render and vercel platforms which directly deploys the latest commit in the repository .

If we were to use any cloud solutions or other resources to host the site we can use jenkins or github actions to automate the process.

# Problem Set 3

A. Write and share a small note about your choice of system to schedule periodic tasks (such as downloading a list of ISINs every 24 hours). Why did you choose it? Is it reliable enough; Or will it scale? If not, what are the problems with it? And, what else would you recommend to fix this problem at scale in production?

**I will go with Celery and Redis for scheduling periodic tasks due to its ease of implementation, strong integration with our Python-based infrastructure, and efficient task processing. This combination will offer reliable task execution with features like persistence and automatic retries, which will be crucial for our daily ISIN list retrieval.**

**However, I am mindful of potential challenges as we scale. Redis, while fast, can become a single point of failure, and task monitoring complexity will increase with volume. To mitigate these risks in production, we will need to implement strategies like Redis clustering . we may need to evaluate more comprehensive solutions like Apache Airflow to manage interdependent processes if workflow is more clustered.**

B. In what circumstances would you use Flask instead of Django and vice versa?

**Flask:** Use Flask for small to medium-sized applications that require flexibility and minimalistic, customizable features, especially when RESTful APIs or lightweight web services are needed.

**Django:** Choose Django for larger applications or when rapid development, built-in features like ORM, admin interface, and more apps are preferred in project
