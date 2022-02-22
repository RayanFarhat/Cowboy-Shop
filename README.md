# Cowboy-Shop
##### This is a responsive virtual shop website for buying clothes in your account(not really paying anything).
##### This repository is for the project's website: [https://ryanshop-98e7a.web.app/](https://ryanshop-98e7a.web.app/).
## Long Description:
This website sells cowboy outfits, The website allow you to browsing anonymously but you need to login with google account to be able for buying stuff.<br/>
When browsing you can add products to the cart by pressing "+" logo, anf after you add things to the cart you need to add your credit card info(not real just for visualization), and once you successfully insert everything right you can order it.<br/>
once done you can see it in your "orders list" and you can also cancel it if you want to.<br/>
The website is responsive for all screen sizes.
## The Goal:
This is my first web development project, i did it for practicing.
## Development:
The website is built mainly with [ReactJS](https://reactjs.org/) for frontend and [Firebase](https://firebase.google.com/) tools for backend. If you are not familiar with them, I suggest checking out their documentation.
#### Install:
First, I started Reacjs project with this command:<br/>
```
npx create-react-app cowboyshop
```
I used also [MUI](https://mui.com/) for frontend stuff, you can install it with this commands:
```
npm install @mui/material
npm install @mui/icons-material
npm install @emotion/react @emotion/styled
```
You need also to install [reactjs-popup](https://react-popup.elazizi.com/), it is a beautiful library that helped me so much in designing the pop up windoes. Install it with this command:
```
npm install reactjs-popup –save
```
Then, you need to install Firebase libraries and tools with this command:
```
npm install firebase react-firebase-hooks
```
#### start:
Once everything is ready you can run the website in the local server `http://localhost:3000` and edit it with this command:
```
npm run start
```
#### debloy on firebase:
I think it is a good idea to read the docs [here](https://firebase.google.com/docs/hosting/quickstart) because it may change so often.
#### Organization:
Components live in `src/Components` and every component style live in `src/componentsStyle`.
