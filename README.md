# Edge Real-Time Analytics Dashboard

## Description :memo:
Project shows a dashboard that contains charts, tables and numbers that updates dynamically when a new event is created.
These are the features:
 - It showcases a chart to plot all events and filtred according to the last hour, last day and last month.
 - A card list view to show top event types. (The event types are assumed values)
 - Shows a table to log all the events and sorted according to date created at. (The timestamp field is the one I used to plot card, assuming the user enters a date)
 - A pie chart that displays the percentage for each event type.
 - A create new event form to add entries to the database with validation.
 - Has a real time update feature. When a new event is posted, the table will automatically gets updated.

 ## Link and Access :link:
 Project is now live and deployed by a hosting organizating called Render under free subscription. 

 > [Note] 
 On subscribing this free tier, the site might experience lags and will typically spin down if there is no activity. 

 Follow this link to view the live site: https://edgeanalytics-client.onrender.com/

 For server support these are the APIs that are being used:
 - Hostname: https://edgeanalytics-server.onrender.com
    - GET /api/analytics (_Get all entries from server_)
    - GET /api/analytics/topanalytic (_Get top 5 events and counts_)
    - GET /api/analytics/analyticchart (_Get modified event object used for chart_) 
    - POST /api/analytics (_Post new event entry_)
        - Body { "eventType" : string, "userId": "string", "timestamp": "Date"  }

For the source file, visit the Github repository page at: https://github.com/ESubrado/EdgeAnalyticsDashboard 

 ## Structure :building_construction:
Here's the file structure of both client and server code bases. 

 ### For Server Side
  - Root (src)
    - controllers
        - **<ins>analytics.controller.ts</ins>** (_Contains logic and CRUD access to database_)
    - models
        - **<ins>analytics.ts</ins>** (_Contains schema used for mongodb_)
    - routes
        - **<ins>analytics.route.ts</ins>** (_Contains url routes used for get and post_)
    - **<ins>app.ts</ins>** (_Contains db and websocket connection_)
    - **<ins>interface.ts</ins>** (_Contains export type definitions_)
    - **<ins>server.ts</ins>** (_Main server executionable file_)

### For Client Side
- Root (app)
    - components
        - **<ins>Card.tsx</ins>** (_Used for card displays for list view_)
        - **<ins>EventFormModal.tsx</ins>** (_For create event form_)
    - data
        - **<ins>DataSamples.tsx</ins>**
    - hooks
        - **<ins>parse-string.tsx</ins>** (_Used to parse event names. Example: "page_view" to "View"_)
    - models
        - **<ins>analytics-model.tsx</ins>** (_contains type definitions_)
    - routes
        - **<ins>AnalyticEventTable.tsx</ins>** (_Table component_)
        - **<ins>AnalyticGraph.tsx</ins>** (_Line graph component_)
        - **<ins>AnalyticPieChart.tsx</ins>** (_Pie chart component_)
        - **<ins>AnalyticTop5Table.tsx</ins>** (_Top events list view component_)
        - **<ins>Index.tsx</ins>** (_Main_)
        - **<ins>TopBar.tsx</ins>** (_Header component_)
    - **<ins>app.css</ins>** (_Global styling_)
    - **<ins>base-client.tsx</ins>** (_Stores the link for server support_)
    - **<ins>root.tsx</ins>** (_main pre conviguration file created by React Router_)
    - **<ins>routes.ts</ins>** (_Used for routing when navigation tab is available._)

## Technology Stack and Libraries :robot:
This project uses the MERN framework stack. React for frontend, and Express.js, Node.js and MongoDB on server side. This application also uses a variety of libraries.\ These are the notable ones:

### Server Side
- **Node.js ts-node** - _Typescript execution and REPL (Read-Eval-Print Loop) for Node.js. Handles the run dev command._
- **express.js** - _Web app framework than handles the routing to access logic process._
- **mongoose** - _An object modeling library for node.js to simplify interactions with mongoDB._
- **moment.js** - _Simplyfy working with dates especially on parsing and formatting._
- **socket.io** - _Event-driven library for real-time web applications._ 
- **mongodb.js** - _Driver for node.js to access data in mongodb database, used exclusively with socket.io to track down newly posted entries._

### Client Side
- **react-router** -_Routing library for React. This is the main framework used on creating new pages._
- **material ui** - _UI support for tables, cards, inputs, buttons and more. Main UI component library._
- **tailwind** - _CSS framework utility to build custom styling directly added as a class in HTML. Mainly used for layouts and component arrangement._
- **vite** - _Front end build tool._
- **moment** - _For date parsing and formatting_
- **recharts** - _Charting library build for React applications._
- **socket.io-client** - _For real time communication with socket.io server._

### Database
- **MongoDB** 
    - One of the most popular NoSQL database platform that is good for scalability and flexibility. It's primarily being used by developers due its ease in prototyping and compatible with Agile development methodology. Has a desktop GUI called MongoDB Compass to manage data and for traffic monitoring. With this, the application should be able handle multiple request coming from different users.

## Installation :floppy_disk:

### Pre installation
- Access the project through my GitHub repository at: https://github.com/ESubrado/EdgeAnalyticsDashboard.
- Can either clone the repository using any GIT GUI (Source Tree) or download the zip file.
- Make sure that a code editor is already installed in the workstation. For VS Code editor, please click this [link](https://code.visualstudio.com/) to get the latest version. 
- After cloning or extracting the zip file. Use VS Code editor to open the main folder. There should be two folders available. 
- Make sure also that the latest node.js is installed in the workstation. Here's the [link](https://nodejs.org/en)

### Installing and Running Server
- The server folder contains dependency references for mongoose, cors, express and more as indicated in package.json.
- Open a terminal and make sure to point it to the server. Install the dependencies by typing:
    >npm install
- After installation, run the server by typing in: 
    >npm run dev
- The server should now be available under pre existing local host at port 3001.

### Client Side
- Open another terminal and make sure to point it to the client.
- Install dependencies by typing in the following command:
    >npm install
- Once completed, run the following command to render the client pages to the browser. 
    >npm run build
- A specified port will be assigned when the dev site is live.

    >[Note]
    In addition, check the file base-client.tsx if the server URL is being used. Change to local host URL if server is run locally.


## Testing :test_tube:

There are two ways to test the create new entry feature in the site. 

### By create event form
- On the top right corner of the page, an Add New Event button is available. Click to open it.
- Fill in all required data. 
- Click submit to enter the new data. The dashboard should automatically updated accomodating the new data.

>[!Note] The user ID field input is only limited to 10 characters and does not accept special characters.

### By using an API Platform.
- Download an API Platform. Examples are Fiddler or Postman.
- In the main, page select a POST Method and type in the POST API call
> https://edgeanalytics-server.onrender.com/api/analytics
- The the body portion
> Body { "eventType" : string, "userId": "string", "timestamp": "Date"  }
- In the case of dates, look for script section and select Pre-request option. Create a variable to set dates in the body.
- For postman, enter this in script text box.
> let currentDate = new Date("07-31-2025 23:45"); \
> pm.variables.set("timestampDate", currentDate.toISOString());
- Once all is set, press send. The new entry should also be available in the dashboard.

---


Thank you very much for this learning experience and see you soon. :smiley:\
Eugene Subrado Jr.



