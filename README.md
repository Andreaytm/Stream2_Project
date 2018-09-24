# Stream 2 Project - Donations Dashboard

## Index

[Overview](#overview) 

[About](#about-donations-dashboard) 

[Features](#features) 

[Development](#development) 

- [Planning](#planning) 

- [Testing](#testing)

    - [for errors](#for-errors)
    
    - [compatibility](#compatibility)
    
    - [functionality](#functionality)
    
- [Implementation](#implementation)

- [Challenges](#challenges)

    - [Issues with deployment on Heroku](#issues-with-deployment-on-heroku)
    
    - [Unresolved Browser Error](#unresolved-browser-error)
    
- [Finalisation and Deployment](#finalisation-and-deployment)

- [Reflections](#reflections)

[Technologies Used](#technologies-used) 

[Additional Technologies Used](#additional-technologies-used) 

[Acknowledgements and Copyright](#acknowledgements-and-copyright) 

[Special Thanks and Mentions](#special-thanks-and-mentions)

## Overview

## About Donations Dashboard

The project was created to put my learning into practice of creating meaningful interactive data visualisation with use 
of NoSQL databases -MongoDB to store and query data, Python to build a web server to interact with MongoDB and d3.js, 
dc.js, crossfilter.js and queue.js in building interactive charts.

*"Please note this is a fictional scenario of producing a website to increase donations for DonorsChoose.
Dashboard information was randomly selected to produce a snapshot of the effects of donors donations on student lives."*

The website is a responsive website which displays an interactive graphical dashboard on the education statistics of a 
number of US States which was used to highlight the impact and improvements made from donations on the education system. 

Additional pages have been created to highlight aims and impact *(also created)* of the donations and pages that link 
to DonorsChoose to connect the user with the charity, should they wish to donate or volunteer. 

Users can navigate pages to read about the summarised work of DonorsChoose.org and learn from filtering and interaction 
with the graphs what are the statistics and the impact of the donations to children, classrooms and teachers in US states.

## Features
- General Site Navigation 
    - Dashboard
	- About
	- Our Campaign
	- Donate

- User Based Features 
    - Graphs,Charts and Tables (statistical data) 
	- Gallery (Rotational Carousel)
	- Introduction Tooltips Tour
	- Reset All Graphs Button

## Development

### Planning
	
I conceptualised the initial visual look of the website through [Pencil](http://pencil.evolus.vn) wireframes.
Initially the concept was to create a dashboard for an election-campaign however the concept evolved over time, and 
I did not feel comfortable producing a website with this idea in mind, *even in a fictional scenario*. 
	
The idea therefore evolved to displaying a dashboard of information from a number of US States to show the impact 
that donations were having. The dashboard would increase awareness and visibility of the charity DonorsChoose and 
the good work they do for classrooms, students and teachers. 
[school-donations-wireframe](https://github.com/Andreaytm/Stream2_Project/blob/master/static/assets/misc/donations-dashboard.pdf)

### Testing

#### For Errors
-   Validation of syntax through [CSS](http://jigsaw.w3.org/css-validator) and [HTML](https://validator.w3.org) 
	Validators, JavaScript code on [JSHint](jshint.com) and syntax on Python through [pep8](http://pep8online.com) tool,
	reading exception messages and using the inbuilt debugger in PyCharm.
-   Checked console for errors in JavaScript and used ```console.log``` to print out content for resolution of issues.
-   Used in built auto-indent lines function in PyCharm to ensure code has no logic bugs.
-   Used issue tracker on Github and branches for version control.
-   After issues with Heroku I created a local copy of my project for testing purposes. In reflection I will do this
	also for the next project and at the start to ensure that any teething issues with deployment are tested locally so 
	to be sure that the solution works before committing and pushing code to GitHub.
	
#### Compatibility
-   Installed various browsers: Opera, IE, Edge, Firefox, Chrome for testing for cross-compatibility in various 
	platforms. Testing showed minor stylistic changes mostly in **select_menu chart** in relation to drop down arrows 
	but no functionality issues.
-   Tested various device sizes: Android, Apple iPad and iPhone online using in-built Google Chrome Developer Tools.
-   Tested css options of graphs using Developer Tools to identify specific elements and positioning of legends.
-   A browser related bug exists in Chrome and Opera please see below for more information.
![Browser Error](https://github.com/Andreaytm/Stream2_Project/blob/master/static/assets/misc/browser-error.jpg "Chrome and Opera Browser Error")

	
#### Functionality
-   Tested local connection of MongoDB and printing of results see **test_connection.py** file.
-   Tested remote connection of dataset using [Mongo Management Studio](http://mms.litixsoft.de/index.php?lang=en)
-   Carried out testing of functionality of project throughout including:
	- testing of loading of graphs, and other content such as text, images navbar etc, locally and remotely
	- testing of buttons - links, scrollbutton, graphs, table-pagination, tour, reset all, and carousel buttons.
	- testing of carousel - ensuring buttons worked, caption and links were displaying and images were sized properly 
	and not *jumping*.
	- Please see [behaviour-driven-development](https://github.com/Andreaytm/Stream2_Project/blob/master/static/assets/misc/behaviour-driven-development.pdf) for more details.
	- testing of general navigation across pages, display and overall aesthetics of the page.
	- testing across browsers (IE, Edge, Opera, Firefox, Google Chrome) - Both Chrome and Opera have an 
	Unresolved Browser Error relating to the data table and sorting.
	- testing of devices (via Google Chrome Developer Tools) locally and actual devices remotely when deployed on Heroku.
	    
### Implementation
- For mobile responsiveness I used Bootstrap grid system to easily manipulate the display of graphs per device used.
- I hid three graphs from the xs and sm devices and also the tour button as it was unable to skip the hidden graphs and
upon reflection the tour explanations hid a lot of the graphs whilst on mobile and I felt hindered more then enhanced the
UX of the dashboard.
- I also used media queries to stylise the page and altered the original stylesheet to be mobile first.
- Minor stylistic aspects have been included in the design
	- [Font Awesome](https://fontawesome.bootstrapcheatsheets.com) glyphicons
	- Images were taken from free stockphoto website [Pexels](https://pexels.com)
	- [Favicon Generator](https://www.favicon-generator.org) created from glyphicon and a coloured background.
    
### Challenges
- Minor issue with reading line graph initially due to issue with format of date. This was resolved by a simple
    ```console.log``` call which displayed the format of the date: *%d/%m/%Y %H:%M*. Had incorrectly assumed date format 
    would be same as school_donations project which uses the same dataset but has a date format of *%Y-%m-%d %H:%M:%S*.
    
## Issues with deployment on Heroku
- Typos and errors made on **Procfile** initially with use of project name instead of app name and had not deployed all 
elements of project eg **.idea** files which was removed due to **.gitignore** file I initially used for the project locally.
- Dataset was not as easy to format online therefore changed dataset to include a variety of US States, which on
reflection worked out better as was not attempting to skew data for an election campaign which was the initial 
project idea. This required changing of content on *index.html* and *campaign.html* which had content on the specific 
US States initially used.
- Minor issues with the display of the page initially upon deployment hence various pushes and commits of pages.
        
## Unresolved Browser Error
- Issue with table displaying a last row which was not sorted in ascending order. I had not realised I missed out 
```.sortBy``` function which I later added upon realising after several attempts at other methods. 
Unfortunately the error was not fixed. 
I found [the issue on Stack Overflow](https://stackoverflow.com/questions/33581246/sortby-doesnt-work-in-datatable-dc-js) 
and through speaking with tutors determined that the issue is browser related. **An issue with Google Chrome**. 
I have been informed that I should be document this as an interesting issue. I believe Opera also has the same bug. 
Should you wish to observe the bug it can be seen by plotting said fiddle mentioned in various different browsers, and 
from the screenshot image below.
![Browser Error2](https://github.com/Andreaytm/Stream2_Project/blob/master/static/assets/misc/browser-error2.jpg "Chrome and Opera Browser Error")    

I attempted to use the solve suggested on Stack Overflow, testing on a local copy of my project to ensure I don't 
make further unnecessary panicked commits and pushes - **Sorry!**. But it did not work and the bug remains.
    
In the end I changed the data's order to descending to make the issue less obvious to a user in Google Chrome. 
In ascending order the issue would display nearer the first few pages of the table of data, whereas in descending 
order it is hidden deeper within the data. Unfortunately it does occasionally display upon interacting with the other
charts and graphs. For optimal functionality I would advise you to use IE, Edge or Firefox in browsing the Dashboard.
        
### Finalisation and Deployment
- The project is deployed on Heroku and accessible through 
  [donations-dashboard.herokuapp.com](https://donations-dashboard.herokuapp.com/).
    
- I used Code Institute lessons for the deployment of the project.
    1. I entered ```Heroku create``` on Command prompt to create an app on Heroku, a random address was generated with 
    a git remote, I adapted the name for the app.
    2. I used **File > Settings > Project:<name-of-project>** on PyCharm to install **gunicorn**.
    3. I activated the **virtualenv** for the project in PyCharm command terminal 
    4. I ensured all dependencies were added to a requirements.txt with command
    ```pip freeze --local > requirements.txt```
    5. I added two files **Procfile** which contained **web: gunicorn donations:app** and **Procfile.windows** 
    which contained **web: python donations.py**
    6. I ensured **MongoDB** was running in command prompt and ran ```heroku local -f Procfile.windows``` in PyCharm's 
    terminal, to force **Heroku** to use **Procfile.windows** instead of **Procfile**.
    7. I added runtime.txt file with **python-2.7.14** to inform Heroku to use version 2.7.14 of Python.
    8. I headed over to **localhost:5000** where the app ran.
    9. I used ```git init``` to initialise git to project directory and used 
    ```git remote add heroku <git-url-for-app>```
    10. Finally I pushed code with 
    
    ```
        git add .
        git commit -m "Initial deployment"
        git push heroku master
    ``` 
    
### Reflections
- In future I need to keep in mind that *less is more*. My initial concept was too complex and *seemed to grow arms 
  and legs*, from having images, videos, contact forms, donations forms etc. when essentially all that was required is 
  a data dashboard and a few additional pages.
- Take a breath and stop panicking and start thinking things through than committing and pushing.
- To have an additional local copy to test locally should there be teething issues with deployed version. This is a
    lot easier to test functionality of pages without adding testing types of commits.

## Technologies Used
- Dashboard Specific
    - [Bootstrap](https://getbootstrap.com) for responsive simplistic layouts. 
    - [Crossfilter.js](http://square.github.io/crossfilter) for data manipulation.
    - [DC.js](http://dc-js.github.io/dc.js) for easy plotting of charts and dc.css for styling.
    - [D3.js](https://d3js.org) to render interactive charts and graphs based on the data.
    - [Flask](http://flask.pocoo.org) to serve our data from the server to a web based interface.
    - [Jinja2](http://jinja.pocoo.org) for template inheritance
    - [Gunicorn](http://gunicorn.org): A Python package, used for running HTTP servers on UNIX based operating systems.
    - [Heroku](https://www.heroku.com) and [mLab](https://mlab.com) for deployment.
    - [Intro.js](https://introjs.com) and Introjs.css providing pop-up tooltip tour of the dashboard.
    - [Keen.js](https://github.com/keen/keen-js) was used in conjunction with bootstrap to layout dashboard elements.
    - [MongoDB](https://www.mongodb.com): NoSQL Database used to convert and present our data in JSON format.
    - [Queue.js](https://github.com/d3/d3-queue) controlled running of tasks in this case by deferring loading of data 
    till graphs were made.
    - [Mongo Management Studio](http://mms.litixsoft.de/index.php?lang=en) was used to test the data on Heroku was 
    loaded correctly.

## Additional Technologies Used
- [Favicon Generator](https://www.favicon-generator.org) to create my own favicon for the website.
- [Github](https://www.github.com) for version control.
- [jQuery](https://www.jQuery.com) to manage events and effects for enhanced user experience.
- [Pencil](https://www.pencil.evolus.vn) for creation of wireframes.
- [PyCharm](https://www.jetbrains.com/pycharm) for full-stack web development.
- [FreeFormatter.com](https://www.freeformatter.com) for formatting and indentation.

## Acknowledgements and Copyright
- [Introduction to Flask](http://flask.pocoo.org) for flask support and [Jinja2](http://jinja.pocoo.org)
for templating.
- [Data-table.js](https://dc-js.github.io/dc.js/docs/html/data-table.js.html) for data-table usage
- [table-pagination](https://dc-js.github.io/dc.js/examples/table-pagination.html) for pagination. 
- [DonorsChoose](https://www.donorschoose.org) and [Code Institute](https://www.codeinstitute.net/) for the data.
- Glyphicons from [Font Awesome](https://fontawesome.bootstrapcheatsheets.com)
- [Pexels](https://www.pexels.com) for free photos. Special mention to Pixabay and Nappy.
- Scrollbutton adapted from [w3schools.com](www.w3schools.com).

## Special Thanks and Mentions 
Thank you to...
- My tutor Mohamed Melouk @mmelouk.
- Fintan and @eventyret for their support on Slack
- Tutor Niel McEwan on tutor support
- Tiff Snell for words of encouragement and general check-ups