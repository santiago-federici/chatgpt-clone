## 🚀 Getting Started

1. [Clone](https://github.com/santiago-federici/chatgpt-clone.git) this repository.

```bash
git clone "https://github.com/santiago-federici/chatgpt-clone.git"
```

2. Get the backend ready.
- Move to the server folder.
```bash
cd server
```

- Create a virtual enviroment.
```bash
python -m venv my_venv
```

- Activate the virtual enviroment.
```bash
my_venv/Scripts/activate
```

- Install all necessary dependencies.
```bash
pip install -r .\requirements.txt
```

- Get the server running.
```bash
flask --app .\src\app.py run --port 8080
```

3. Get the frontend ready.

- Move to the client folder.
```bash
cd client
```

- Install the necessary dependencies. I use [npm](https://www.npmjs.com/) to install and manage the dependencies, but you can choose a different package manager.

```bash
npm install
```

- Get the frontend running.
```bash
npm run dev
```
