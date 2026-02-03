# Outbreak

## Table of contents

- [Overview](#overview)
- [Learnings](#learnings)
- [Technologies used](#technologies-used)
- [Screenshots](#screenshots)
  - [Desktop](#desktop)
  - [Mobile](#mobile)

## Overview

This web application allows school administrators to report and track illness related absences of staff and students.

- Create an account
- Request affiliation to registered school
- Report illnesses by week (avoid daily granularity to protect privacy and repetition)
  - Report by # of staff/student
  - Report by
    - COVID
    - Influenza (Flu)
    - RSV
    - Pneumonia
    - Strep Throat
    - Bronchitis
    - Stomach Flu
    - Pink Eye
    - Flu-like Symptoms
    - Other
- Dashboard for viewing data by school only if affiliated (to protect privacy)
  - Dashboard aggregates all schools regardless of affiliation, but available aggregates only available for affiliates
  - Filters/Aggregates by state, city for both dashboard views
    - Additional week filter for affiliates
- Data table exportable to CSV

Models:

Users

- user_id
- email
- password
- affiliate_school_id
- date_joined
- last_login

Schools

- school_id (uuid)
- name (varchar)
- street (varchar)
- city ()
- state ()
- level (Primary, Secondary, Postsecondary)
- population (int)
- date_added (date)

Reports

- reported_by (uuid - foreign key)
- staff_report (jsonb)
- student_report (jsonb)
- school_id (uuid - foreign key)
- week_ending_date (date)
- date_reported (date)

Illnesses

- illness_id (int - foreign key)
- name (varchar)
- description (varchar)
- date_added (date)
- category (varchar)
- last_modified_date (date)

NOTE: This web application was originally written using a Python serverless API via AWS Lambda and AWS API Gateway for the back-end and a standard CRA based React front-end, but has since been converted to a full-stack NextJS based application. This conversion was done to practice NextJS.

## Learnings

- `layout.tsx` is the equivalent of `index.html` in standard React apps in the sense that it houses the root HTML: html and body tags. But it is TS/JS, so global styles and components should go there as well. It's like a combo between `index.html` and `App.tsx`.

- Pages automatically map to a URL that shadows the dir structure without the next to import each page into the `App.tsx` file. For example, a file located at `trends/page.tsx` will automatically render at `/trends`.

- Pages go in a folder of a name that shadows the desired URL path and the goes in a file named `page.tsx`.

- The `page.tsx` located next to `layout.tsx` by default represents the page rendered at "`/`".

- Assets like fonts, images, and icons go in the `public` folder. For example `public/images` or `public/fonts`.

- REST API routes use file based routing just like pages, but must go in the api folder and instead of a page.tsx file there is a `route.ts` file. Something like `api/trends/route.ts`.

- Each REST API function corresponds to an HTTP method. For example a function named `GET` handles `GET` requests. If desiring a function that handles multiple HTTP methods, abstract a separate function then reuse across `GET`, `POST`, `PUT`, etc. methods in the `route.ts` file.

- Access the api route via path matching a pattern like `api/trends` (i.e. same as page URLs but with `/api/` prepended).

- Next version `16.1.4` has serious security issues so I needed to update to version `16.1.6`.

- The `.next/` folder contains the build files and should be gitignored, but keep in mind that the NextJS default `.gitignore` assumes a specific relative placement of the folder and might not actually ignore the folder if located elsewhere.

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
