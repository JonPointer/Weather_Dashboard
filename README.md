# Weather_Dashboard

DU Full Stack HW 06 Server-Side APIs: Weather Dashboard

## Introduction

For this assignment, the basic HTML and CSS were already provided to create a simple 9:00 to 5:00 calendar scheduler. Our task was to correctly create the time rows, time display, buttons, etc. as shown in the completed application image in the instructions.

Additionally, color coding was to be determined based on the curren time, with past hours being gray, present hour being red, and future times being green.

Finally, the user should be able to enter text in a time field, click that row's save button, and store their entry to local storage. The text should then be properly re-displayed when the page is refreshed.

## Approach

I chose to completely build the display and buttons with JavaScript and jQuery in a for loop, instead of creating them one by one. Additionally, on click events for each button were created in the loop utilizing this.id to pass the ID of the button to the on click function.

Also, since the display was always to be 9-5, the schedule data was stored and written to local storage as a simple array of the 9 time slots.

## Results

The application looks and works as instructed, successfully showing the calendar, current time dependant coloring, and saving/restoring text entries.

### Path to GitHub Repository

<https://github.com/JonPointer/DUFS_Homework_05_Work_Day_Scheduler>

### Path to GitHub Hosted Application

<https://jonpointer.github.io/DUFS_Homework_05_Work_Day_Scheduler/>

### Screenshot of the completed application

![Scheduler Screenshot](./Assets/images/Screen-Capture-Work-Day-Scheduler.png)
