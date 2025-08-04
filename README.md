# Alfred-command-center
🛠️ Getting Started

1)Clone this project using the GitHub link:

-> git clone <clone_url>

2)Install all dependencies:

-> cd <project_folder>

-> npm install

3)create a .env file in the root directory and add required environment variables, for example:

-> REACT_APP_API_BASE_URL=<url>

-> PORT=<port_number>

4)Run the project:
-> npm run start

## 📌 Project Description
1)On launch, the dashboard displays existing projects on a map.
You can click on any site to update the communications and actions dynamically.

2)To see a project brief, click the "View Site Briefing" button that appears in the popup after selecting a site on the map.
A dialog will open showing the project briefing.

3)You can interact with communications using buttons like:
(*)Flag Risk
(*)Clarify
(*)Update
These allow you to mark or respond to communications appropriately.

4)The app also simulates real-time updates by polling data every 2 minutes, and it shows the last updated time accordingly.
