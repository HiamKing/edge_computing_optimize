This is a software that simulates some RF algorithms in Edge computing. I have added 5 algorithms to the software and they are: PPO, DQN, A2C, SAC and TRPO. Please feel free to contribute to this project.

Here are the guide to start the software:
1. Install Nodejs:
- ...
2. Create a Python virtual environment
- You can you conda or what ever you have to create a Python virtual environment...
3. Install server dependencies. You can follow these steps:
- cd server/
- pip install -r requirements.txt
4. Start server (your server will running in http://127.0.0.1:5000 by default) by using the command:
- cd src/
- flask --app app run
5. Install UI packages
- cd ui/
- npm install
6. Start UI by using the command:
- REACT_APP_API_URL=http://127.0.0.1:5000 npm start
