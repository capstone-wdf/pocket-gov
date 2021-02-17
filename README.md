# PocketGov

PocketGov is a civic information mobile app that equips our users with the latest happenings in the U.S. government. Users can search for, compare, and follow elected officials and legislation. Our goal is to make politics engaging and accessible. 


Created by [May Hein](https://github.com/mayhein), [Ahmad Zaki](https://github.com/AhmadZaki33), [Anya Dunaif](https://github.com/aannyyaa), and [Eric Zou](https://github.com/uoze).

## How to use our app

- Download the Expo Go app.

- Access our published application [here](https://expo.io/@pocketgov/projects/pocketgov).

  - Android users can scan the QR code.

  - iOS users can request a link to view the application.

## How to run our app locally

- Fork and clone this repository.

- cd into the pocket-gov folder.

- `npm install`

- Create a secrets.js file in the root directory and paste this code along with your keys
``` 
const ppApiKey = <YOUR_PROPUBLICA_API_KEY_HERE>;
export const config = {
  headers: {
    "X-API-KEY": ppApiKey,
  },
};

export const firebaseConfig = <YOUR_FIREBASE_CONFIG_HERE>

export const gCloudKey = <YOUR_GOOGLE_CLOUD_KEY_HERE> 
```
- `npm start` or `expo start`

## Technologies

Frontend: React Native, React Navigation, React Native Paper, Redux, Victory.js

Backend: Firebase, Cloud FireStore 

## App Screenshots

<img src="https://user-images.githubusercontent.com/62243114/108268742-f78a2600-713a-11eb-94ef-bfa988806343.PNG" width="300" />     <img src="https://user-images.githubusercontent.com/62243114/108268755-fc4eda00-713a-11eb-893b-179ff48d5017.PNG" width="300" />     <img src="https://user-images.githubusercontent.com/62243114/108268768-01ac2480-713b-11eb-9489-a6e2dc910df6.PNG" width="300" />


<img src="https://user-images.githubusercontent.com/62243114/108268795-0a9cf600-713b-11eb-9d7d-457db809c1e1.PNG" width="300" />     <img src="https://user-images.githubusercontent.com/62243114/108268810-0f61aa00-713b-11eb-903f-8e36a89652d8.PNG" width="300" />


