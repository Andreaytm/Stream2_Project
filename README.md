# Stream 2 Project - Campaign for DonorsChoose

## Overview

### About the DonorsChoose
*Please note this is a fictional scenario of producing a website to increase donations for DonorsChoose.
Dashboard information was randomly selected to produce a snapshot of the effects of donors donations on student lives.*
The website is a responsive with an interactive graphical dashboard on the education statistics of several
US States to highlight the impact and improvements made from donations on the education system. Additional pages have 
been created to highlight aims and impact *(also created)* of the donations and a page that links to DonorsChoose to 
connect the user with the charity. 

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

## Development 

- Planning
	- I conceptualised the initial visual look of the website through [Pencil](http://pencil.evolus.vn) wireframes.
	Initially the concept was to created a dashboard for an election-campaign however the concept evolved over time as 
	I felt it personally it was unethical to use charity data for elections and did not feel comfortable to produce a 
	website with this idea in mind, *even in a fictional scenario*. The idea therefore evolved to displaying a dashboard
	of information from a select number of US States to show the impact that donations with the idea of increasing 
	awareness and visibility of the charity DonorsChoose and the good work they do for classrooms, students and teachers. 

- Testing
    - Validation of syntax through [CSS](http://jigsaw.w3.org/css-validator) and [HTML](https://validator.w3.org) 
	Validators, JavaScript code on [JSHint](jshint.com) and syntax on Python through [pep8](http://pep8online.com) tool,
	reading exception messages and using the inbuilt debugger in PyCharm.
	- Checked console for errors in JavaScript and used ```console.log``` to print out content for resolution of issues.
	- Used in built auto-indent lines function in PyCharm to ensure code has no logic bugs.
	- Used issue tracker on Github and branches for version control.
	- Installed various browsers: Opera, IE, Edge, Firefox, Chrome for testing for cross-compatibility in various 
	platforms.
	- Tested css options and various device sizes: Android, Apple iPad and iPhone, online using Developer Tools.

- Implementation
	- For mobile responsiveness I used Bootstrap grid system to easily manipulate the display of graphs per device used.
	- Minor stylistic aspects have been included in the design
	    - [Font Awesome](https://fontawesome.bootstrapcheatsheets.com) glyphicons
	    - Images were taken from free stockphoto website [Pexels](https://pexels.com)
    
- Challenges
    - Minor issue with reading line graph initially due to issue with format of date. This was resolved by a simple
    ```console.log``` call which displayed the format of the date: %d/%m/%Y %H:%M instead of the initial call within the 
    school_donations project which uses the same dataset but has a date format of 
    
- Finalisation
    - The project is deployed on Heroku and accessible through [insert link here](and url hyperlink here). TBC

- Reflections 
    - In future I need to keep in mind that *less is more*. My initial concept was too complex and *seemed to grow arms 
    and legs*, from having images, videos, contact forms, donations forms etc. when essentially all that was required is 
    a data dashboard and a few additional pages. 

## Technologies Used
- Dashboard Specific
    - [Bootstrap](https://getbootstrap.com) for responsive simplistic layouts. 
    - [Crossfilter.js](http://square.github.io/crossfilter): A JavaScript based data manipulation library that enables 
    two way data binding.
    - [DC.js](http://dc-js.github.io/dc.js): A JavaScript based wrapper library for D3.js, which makes plotting the 
    charts a lot easier and dc.css for styling directives for dc charts.
    - [D3.js](https://d3js.org): A JavaScript based visualization engine, which will render interactive charts and 
    graphs based on the data.
    - [Flask](http://flask.pocoo.org): A Python based  micro–framework  used to serve our data from the server 
    to our web based interface.
    - [Gunicorn](http://gunicorn.org): A Python package, used for running HTTP servers on UNIX based operating systems.
    - [Heroku](https://www.heroku.com) and [mLab](https://mlab.com) for deployment.
    - [Intro.js](https://introjs.com) and Introjs.css providing pop-up tooltip tour of the dashboard.
    - [Keen.js](https://github.com/keen/keen-js): A dashboard template library. Used in conjunction with bootstrap to 
    layout dashboard elements.
    - [Mongo DB](https://www.mongodb.com): NoSQL Database used to convert and present our data in JSON format.
    - [Queue.js](https://github.com/d3/d3-queue): An asynchronous helper library. It waits till data is available from 
    each API before passing on the combined data for processing.

## Additional Technologies Used
- [Favicon Generator](https://www.favicon-generator.org) to create my own favicon for the website.
- [Github](https://www.github.com) for version control.
- [jQuery](https://www.jQuery.com) to manage events and effects for enhanced user experience.
- [Pencil](https://www.pencil.evolus.vn) for creation of wireframes.
- [PyCharm](https://www.jetbrains.com/pycharm) for full-stack web development.


## Acknowledgements/ Copyright
- [Introduction to Flask](http://flask.pocoo.org) for flask support and [Jinja2](http://jinja.pocoo.org)
for support for templating.
- [Data-table.js](https://dc-js.github.io/dc.js/docs/html/data-table.js.html) for data-table usage and pagination. 
- [DonorsChoose](https://www.donorschoose.org) and CodeInstitute for the data.
- Glyphicons from [Font Awesome](https://fontawesome.bootstrapcheatsheets.com)
- [Pexels](https://www.pexels.com) for free photos. Special mention to Pixabay and Nappy.
- Scrollbutton adapted from [w3schools.com](www.w3schools.com).

## Special Thanks and Mentions to...
- My tutor Mohamed Melouk @mmelouk.

## Getting the Code up and Running
 -TBC