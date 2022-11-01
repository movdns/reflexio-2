<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![license][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/movdns/reflexio-2">
    <img src="public/logo.png" alt="Logo" width="150px" height="150px">
  </a>

<h3 align="center">Reflexio</h3>

  <p align="center">
   Diary for self-analysis and mood tracker
    <br />

[![Demo][demo-shield]][demo-url]

  </p>
</div>


<details>
  <summary>Navigation</summary>
  <ol>
    <li><a href="#about">About The Project</a></li>
    <li> <a href="#getting-started">Getting Started</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#running">Running</a></li>
    <li><a href="#deploying">Deploying</a></li>
    <li><a href="#todo">Todo</a></li>
    <li><a href="#contacts">Contact</a></li>
  </ol>
</details>


<a name="about"></a>
## 🦄 About The Project


[![Product Name Screen Shot][product-screenshot]](https://reflexio-2.web.app)

Will be added later :)

### Built With:

[![TypeScript][TypeScript]][TypeScript-url]
[![React][React.js]][React-url]
[![Firebase][Firebase]][Firebase-url]
[![MUI][MUI]][MUI-url]
[![ExpressJs][ExpressJs]][ExpressJs-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<a name="getting-started"></a>
## 🚦 Getting Started


First of all, we need to configure Firebase Services:

1. #### Functions (backend API) <a name="node16"></a>
    [Firebase Console](https://console.firebase.google.com/) / Functions tab. <br />
    You need to switch your account to a `Blaze` (pay to go) plan.

2. #### Firestore (database)
   [Firebase Console](https://console.firebase.google.com/) / Firestore tab.

    Create such collections: `days`, `userSettings`, `users`.<br />
    You can use custom collection names, by editing `functions/.env`

3. #### Firebase Authentication (sign-in / sign-up providers)
   [Firebase Console](https://console.firebase.google.com/) / Authentication tab.

   Currently, app supports authorization using **GitHub** & **Google** providers. 
For demo purposes, we use the **Anonymous** method.

<a name="installation"></a>
## ⚙️ Installation

1. Clone the repo
   ```sh
   git clone https://github.com/movdns/reflexio-2.git
   ```
2. Install NPM packages from project root folder (yarn or npm)
    ```sh
   yarn install
   ```
   
3. Install packages in `functions` folder (node v16 is required)
    ```sh
   cd functions; yarn install
   ```

    ⚠️ If you are using a different version of node, you can handle it by using [NVM](https://github.com/nvm-sh/nvm) package. ⚠️

    ```sh
    nvm install 16
    nvm use 16
    ```

4. Rename `.env.local.sample` to `.env.local`, and fill it with yours Firebase App credentials
   ```
    REACT_APP_FIREBASE_API_KEY=
    REACT_APP_FIREBASE_AUTH_DOMAIN=
    REACT_APP_FIREBASE_PROJECT_ID=
    REACT_APP_FIREBASE_STORAGE_BUCKET=
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
    REACT_APP_FIREBASE_APP_ID=
   ```
   
    Also, set `PROJECT_ID` in `.firebaserc`
    ```
    {
       "projects": {
          "default": "PROJECT_ID"
       }
    }
    ```
5. Init Firebase 
   inside project root folder:
   
   ```sh
   firebase login
   firebase init
   firebase deploy
   ```
      
   Select below options (by using space btn):

    ``` 
     ◉ Firestore: Configure security rules and indexes files for Firestore
     ◉ Functions: Configure a Cloud Functions directory and its files
     ◉ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
    ❯◉ Emulators: Set up local emulators for Firebase products (optionally)
    ```

   Emulators - optionally <br />

   #### ℹ️ Key points:
   _Functions:_
   ```sh
   ? What language would you like to use to write Cloud Functions? TypeScript
   ? Do you want to use ESLint to catch probable bugs and enforce style? Yes
   ? Overwrite files? NO
   ```

   _Hosting:_
   ```
   ? What do you want to use as your public directory? public
   ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) N
   ```
6.  Setting up API routes paths

   Now we need to update `.env.local` to set the API route endpoints.
   ```
   # Example:
   REACT_APP_BACKEND_API_PRODUCTION_URL=https://us-central1-reflexio.cloudfunctions.net/api
   REACT_APP_BACKEND_API_DEVELOPMENT_URL=http://localhost:5001/reflexio/us-central1/api
   ```
   
   #### 1. Deploying Firebase Functions (PRODUCTION_URL)
   
      ```sh
      cd functions;
      yarn build;
      firebase deploy --only functions 
      ```
   
   Then deploying is finished, copy Function URL path, and paste it to `.env.local`, `REACT_APP_BACKEND_API_PRODUCTION_URL` field;
   <br /><br />
   
   #### 2. Run Firebase Functions emulator (DEVELOPMENT_URL)
   
      ```
      firebase emulators:start --only functions  
      ```
   
   Then emulator is running, you can find line `functions[zone]: http function initialized (url)`,
   paste url to `.env.local`, `REACT_APP_BACKEND_API_DEVELOPMENT_URL` field;
   
### ✅ Well Done! 
   #### Now you can deploy application, or run it using emulator!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="running"></a>
## 💻 Running


   ####  Start development server (Frontend)
   ```
   yarn start
   ```

   #### Emulate functions API endpoints (Backend)
   ```
   firebase emulators:start --only functions   
   ```

### ✅ Done! Check the result! `http://localhost:3000` 👀

   For live functions editing. (*optionally*)
   ```
   cd functions; nvm use 16; yarn build:watch
   ```
Run it in another tab of the terminal, with the build:watch running, you won't have
to build the function every time you change the code .



<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="deploying"></a>
## 🧱 Deploying 

#### Build frontend
   ```
   yarn build
   ```

#### Build Backend
   ```
   cd functions; nvm use 16; yarn build;
   ```

#### Deploy together
   ```
  firebase deploy
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a name="todo"></a>
## 🗒️ TODO

- [ ] Adaptation for devices (tablets, mobile).
- [ ] userSettings UI (for editing glyphs, tags, pallets, sentiments, etc).
- [ ] Advanced score\points calculation.
- [ ] Macro Diary overview (long-term summary).
- [ ] ...

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## ✈️ Contact
<a name="contacts"></a>

Denys Movchan - [personal page](https://dns.movchan.pro/)

Project Link: [https://github.com/movdns/reflexio-2](https://github.com/movdns/reflexio-2)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[license-shield]: https://img.shields.io/badge/-UNLICENSED-black.svg?style=for-the-badge&colorB=gold&label=LICENSE
[license-url]: https://github.com/movdns/reflexio-2/blob/master/LICENSE.txt

[TypeScript]: https://img.shields.io/badge/TypeScript-563D7C?style=for-the-badge&logo=typescript&logoColor=fff
[TypeScript-url]: https://www.typescriptlang.org/

[React.js]: https://img.shields.io/badge/React_18.2-13232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[MUI]: https://img.shields.io/badge/MUI_5.9-20232A?style=for-the-badge&logo=mui&logoColor=61DAFB
[MUI-url]: https://mui.com/

[Firebase]: https://img.shields.io/badge/Firebase_9.9-4A4A55?style=for-the-badge&logo=firebase
[Firebase-url]: https://firebase.google.com/

[ExpressJs]: https://img.shields.io/badge/ExpressJs-0769AD?style=for-the-badge&logo=express
[ExpressJs-url]: https://expressjs.com/

[product-screenshot]: public/screenshot.png
[demo-shield]: https://img.shields.io/badge/-Live_Demo-black.svg?style=for-the-badge&logo=AirPlayVideo&colorB=indianred
[demo-url]: https://reflexio-2.web.app