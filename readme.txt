April 15, 2022

C:\dev\newsapi-react-next-sanity

Derived from tutorial:
    Beginner Next.js Tutorial - Coding A News App With Next.js
    https://www.youtube.com/watch?v=xtItzwYG6oQ

    by PortEXE

This app retrieves news articles through NewsAPI 
based on either one or two interests chosen at 
random from a list of personal interests.

This list of personal interests is stored in a sanity.io 
database which can be updated by pressing 'Edit' to go 
to an online interface that sanity.io makes available.



In order for a deployed build to work, it is necessary 
to connect to NewsAPI from the server side, which is 
what this build does.

In a previous project, the api call to NewsAPI is from the 
client side, and therefore only works locally.

The previous project:
    https://github.com/jergra/NewsAPI-app
    C:\dev\news-api-app


start:
    npm run dev

deployed:
    https://newsapi-react-next-sanity.vercel.app/

update:
    git add .
    git commit -m "message"
    git push


To remake the sanity database, go into sanity/schemas/ and change
the files there, then run 'sanity init', answer some questions,
then run 'sanity start', add some new content using the interface.
The projectId has now changed.  Put the new project id into lib/client
in the root. A new API token is also needed, which will go in .env.
Therefore the environment variables at Vercel also needs to be updated.
Sanity Studio also needs to be redeployed. cd into sanity and run 'sanity deploy'.
'sanity help' will bring up help.
Run 'npm run dev' in the root.

