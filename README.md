# To Do List
To Do List interface

Can be accessed on [netlify](https://tiny-taiyaki-311f5c.netlify.app/) but you need to be running the database locally for it to work.

## Purpose
This To Do List is a solution that helps the user keep track of daily tasks.
- Allows the user to add new tasks, with title, category and priority;
- Lists all available tasks, they can be filtered by completion (completed tasks are hidden by default) and category;
- Priority tasks always show at the top;
- Tasks can be set as completed;
- The user can delete tasks.

## Requirements
- Node + npm
- React
- Material UI

## Installation
- Clone the repo: `git clone https://github.com/Sofia-Machado/todolist`
- Run `npm install` in your terminal
- Run `npx json-server --watch data/db.json --port 8000` to fake a Rest API
  - Open [http://localhost:8000/tasks](http://localhost:8000/tasks) to view the database. This will allow you to interact with the database
- Run `npm start` to run the app in developement mode
   - Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- Now you can manage your tasks!

## Usage
To use the app, there are two fake logins, that can be found in teh database file (data/db.json);
You can enter either with user "123.test@com" with the password "123!" or "abc@test.com" with the password "abc!"
