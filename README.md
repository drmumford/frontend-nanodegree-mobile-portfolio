Website Performance Optimization Project
========================================

This is the 4th project in Udacity's Frontend Web Developer Nanodegree curriculum. The goal of this project is
to take an underperforming website and make its pages render as quickly as possible by applying the techniques
learned in Udacity's [Critical Rendering Path](https://www.udacity.com/course/ud884) course.

This course covers optimizing the set of steps, i.e. the Critical Rendering Path, a browser takes to convert
HTML, CSS, and JavaScript into a living, breathing website. Google's [Dev Tools](https://developers.google.com/web/tools/chrome-devtools/)
are also covered. This set set of web authoring and debugging tools built into Google Chrome help developer's
efficiently track down layout issues, set JavaScript breakpoints, and get insights for code optimization.

Goals
=====

The goals of the final project are to achieve:
* a <a href="https://developers.google.com/speed/pagespeed/insights/?url=drmumford.github.io%2Ffrontend-nanodegree-mobile-portfolio%2F" target="_blank">PageSpeed Insights</a> score of 90 or greater for index.html, and
* a consistent frame rate of 60fps when scrolling in pizza.html.

The project will be evaluated per the <a href="http://drmumford.github.io/frontend-nanodegree-mobile-portfolio/P4_Rubric.pdf" target="_blank">Project 4 Rubric</a>.

Submission
==========

View the optimized project <a href="http://drmumford.github.io/frontend-nanodegree-mobile-portfolio/" target="_blank">here</a>.

View the source code by selecting either 'Clone in Desktop' or 'Download ZIP' options above.

## Optimizations

### Optimize PageSpeed Insights Score for index.html
1. Follow recommendations from Google PageSpeed Insights
1. Image minification
1. HTML, CSS, Javascript minification
1. Moved CSS to be inline

### Optimize Frames per Second in pizza.html
The optimizations are implemented in views/js/main.js:

1. Create an array of references to all the moving pizzas to avoid having to locate these elements on the fly
1. Build an array of the five phases used for the moving pizzas instead of calculating it in the loop
1. Reduce the number of moving pizzas created
1. Consolidate random pizza name creation with capitalization handled in the JSON itself.
1. Consolidate code in pizzaElementGenerator (use a template for each random pizza).
1. Use more performant methods where possible:
 * getElementByClassName() for querySelectorAll()
 * getElementById() for querySelector()
1. Consolidate code for changing pizza size
1. Use requestAnimationFrame, or debounce the onscroll

Notes
=====

## Build
This project uses Grunt to automate several build tasks. A default grunt task includes linting JavaScript
files, creating responsive images, and minifying the HTML, CCS, and JavaScript files.

To leverage this functionality, after cloning or extracting the website, run 'npm install' from the website's
root directory. This will create the necessary dependencies, as defined in the package.json
file, in a 'node_modules' directory.

To build the production website, run 'grunt' on the command line.

### Responsive Images
Images that you want to be responsive must be put in the images_src directory. Each image in that directory will
have multiple images output to the images directory, as defined in the Gruntfile.js file. For our website,
responsive images include all the images in the project-*.html pages.

### Fixed Images
Images that will not be responsive must be put in the images_src/fixed directory. For our website, fixed
images include the Udacity.png logo (our 'favicon'), and the thumbnail images in index.html.
