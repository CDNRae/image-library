# Image Library
## About
Now defunct; see [Image Library V2](https://github.com/CDNRae/image-library-v2#) instead. This project was fun, but four years of dust is difficult to shake! Rather than trying to catch up to years of advancements, I decided to rebuild the project from the ground up; doing so allows me to leverage modern technologies and frameworks a little more easily. And learning new technology is really what this tool was all about, so it seems fitting to retire the ancient version when it's no longer serving its original purpose.

A work-in-progress tool that aims to help artists by pooling all of their visual references into one place.  The images are displayed in a gallery, and can be expanded to a larger size if needed.  The tool gets the images from the user, who can either drag and drop the image from its location on their system, or input the image's path.

## Set-Up
This project requires Electron, React, and a few other packages.  Clone this repo, and run `npm install` in the project directory to install all the necessary packages.  Afterwards, run `npm run electron-build` to have Electron build the necessary modules (such as sqlite3).

## To-Do
* Add a tagging system to filter images
* Implement lazy-loading to improve performance
* Investigate other ways to improve the performance -- the app tends to hang when loading a large number of images
* Add the ability to put in a URL to an image, which the tool can then use to download said image and add it to the gallery
