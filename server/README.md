## Installation

### Pre installation
- Access the project through my github repository at: https://github.com/ESubrado/EdgeAnalyticsDashboard.
- Can either clone the repository from any GIT GUI (Source Tree) or download the zip file.
- Make sure that a code editor is already installed in the workstation. For VS Code editor, please click this [link](https://code.visualstudio.com/) to get the latest version. 
- After cloning or extracting the zip file. Use VS Code editor to open the server folder. 
- Make sure also that the latest node.js is installed in the workstation. Here's the [link](https://nodejs.org/en).

### Installing and Running Server
- The server folder contains dependency references for mongoose, cors, express and more as indicated in package.json.
- Open a terminal and make sure to point it to the server. Install the dependencies by typing:
    >npm install
- After installation, run the server by typing in: 
    >npm run dev
- The server should now be available under pre existing local host at port 3001.

### Installing and Running Server with Docker
- Make sure Docker Desktop is installed and running. On Windows, Docker Desktop must be started before running Docker commands.
- Make sure the server environment file exists:
    >server/.env
- Open a terminal and point it to the server folder:
    >cd server
- Build and run the development server:
    >docker compose up --build
- The server should now be available at:
    >http://localhost:3001
- To stop the server, press `Ctrl + C` in the terminal. To remove the stopped container, run:
    >docker compose down

### Running the Production Docker Build
- Open a terminal and point it to the server folder:
    >cd server
- Build and run the production server:
    >docker compose -f docker-compose.prod.yml up --build
- To stop and remove the production container, run:
    >docker compose -f docker-compose.prod.yml down

>[!Note]
>If Docker shows an error similar to `failed to connect to the docker API`, open Docker Desktop first and wait until it says the Docker engine is running. Then run the Docker command again.
