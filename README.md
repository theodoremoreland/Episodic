# Outbreak

## Table of contents

- [Overview](#overview)
- [Learnings](#learnings)
- [Technologies used](#technologies-used)
- [Screenshots](#screenshots)
  - [Desktop](#desktop)
  - [Mobile](#mobile)

## Overview

This web application was originally written using a Python serverless API via AWS Lambda and AWS API Gateway for the back-end and a standard CRA based React front-end, but has since been converted to a full-stack NextJS based application. This conversion was done to practice NextJS.

## Learnings

- layout.tsx is the equivalent of index.html in standard React apps in the sense that it houses the root HTML: html and body tags. But it is TS/JS, so global styles and components should go there as well. It's like a combo between index.html and App.tsx.
- Pages automatically map to a URL that shadows the dir structure without the next to import each page into the App.tsx file. For example, a file located at trends/page.tsx will automatically render at /trends.
- Pages go in a folder of a name that shadows the desired URL path and the goes in a file named page.tsx.
- The page.tsx located next to layout.tsx by default represents the page rendered at "/".
- Assets like fonts, images, and icons go in the public folder. For example public/images or public/fonts.
- REST API routes use file based routing just like pages, but must go in the api folder and instead of a page.tsx file there is a route.tsx file. Something like api/trends/route.ts.
- Each REST API function corresponds to an HTTP method. For example a function named GET handles GET requests. If desiring a function that handles multiple HTTP methods, abstract a separate function then reuse across GET, POST, PUT, etc. methods in the route.ts file.
- Access the api route via path matching a pattern like api/trends (i.e. same as page URLs but with /api prepended).
- Next version 16.1.4 has serious security issues so I needed to update to version 16.1.6.

## Technologies used

- React.js
- TypeScript
- JavaScript (ES6)
- NextJS
- PostgreSQL
- PL/pgSQL
- HTML
- CSS
- AWS RDS

## Screenshots

### Desktop

### Mobile
