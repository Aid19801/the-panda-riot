#the-panda-riot URL: https://www.ThePandaRiot.com

⭐️ Main Webapp:

git clone yarn install yarn start

the WebApp is split into ❸ user sections:

i. News Feed (fetches comedy news from other websites)
ii. Act Rater (open mic acts can be rated in a Reddit-style fashion, upward and downward votes)
iii. Other Media (embedded podcast, image gallery) - 🚨 not finished/not live 🚨
🚨 TO-DO => This auto generated mlab/mongo act profile should have to be verified before it is pushed into the act-rater. It shouldn't appear in act rater until they've confirmed "Include Me".

🚨 TO-DO => realTime update to upVote. Current: click upVote and it sends vote to Mongo. Expected: socketIO sends to mongo, but the prop is updated when it receives socketIO from back-end

From a dev perspective, it's split into ❸ separated concerns:-

⭐️ web app

REPO: https://github.com/Aid19801/the-panda-riot/ [here]

React, Redux, Firebase (for auth) and Node JS / MongoDB for act rater registration.

i. User signs up with Firebase (takes care of all password reset, signup, signout etc functionality)
ii. But at same time, we auto-generate an act profile (with placeholder for image, blank strings etc). User then updates act profile when they click 'include me' on Act Rater.
⭐️ 📰 news-getter (/scraper)

REPO: https://github.com/Aid19801/news-getter

node/express backend, CRON job, deployed to Heroku scrapes comedy websites => pushes into MongoDB mongodb://<dbuser>:<dbpassword>@ds247479.mlab.com:47479/news-stories collection: articles

Every one minute, the scrape repeats & updates Mongo.

⭐️ news-json-server (API / server)

REPO: https://github.com/Aid19801/news-json-server

reads from that MongoDB instance (news-stories) serves as JSON @ https://the-panda-riot-news-server.herokuapp.com/articles

⭐️ act-rater-server (API / server)

REPO: https://github.com/Aid19801/act-rater-server

reads acts profiles from separate MongoDB instance mongodb://<dbuser>:<dbpassword>@ds155164.mlab.com:55164/tpr-acts-rater

And serves as JSON @ https://thepanda-riot-act-rater-server.herokuapp.com/acts
