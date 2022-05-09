April 15, 2022

C:\dev\news-api-app-next

Derived from tutorial:
    Beginner Next.js Tutorial - Coding A News App With Next.js
    https://www.youtube.com/watch?v=xtItzwYG6oQ

    by PortEXE

This app retrieves news articles through NewsAPI based on
either one or two interests chosen at 
random from a list of personal interests.

The list of personal interests is in db.json. 
To retrieve the interests, the app makes an api call to 
the db.json file on the github, not locally. 

There is a limit of 30 terms allowed in this db.json.
To get around this limitation, the terms are stored in
the db.json as a single string, so now there is only one
item in the db.json.

To change the personal interests, change db.json 
here, then push to github. A better solution, which 
would allow for updates to interests directly from the website, 
would be to store interests in a database like Firebase or 
MongoDB Online, but this would also require setting up authentication.

In order for a deployed, as opposed to local, build to 
work, it is necessary to call the api from the server side, 
which is what this build does.

In a previous project, the api call to NewsAPI is from the 
client side, and therefore only works locally.

The previous project:
    https://github.com/jergra/NewsAPI-app
    C:\dev\news-api-app


start:
    npm run dev

deployed:
    https://news-api-app-next.vercel.app/

update:
    git add .
    git commit -m "message"
    git push

