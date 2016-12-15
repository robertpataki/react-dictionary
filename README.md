# React Dictionary App

I am building a simple web app, which is very similar to the notebooks kids use at school to put an expression on the left, and the meaning on the right. We used to call it 'dictionary notebook' (szótárfüzet in Hungarian). This dictionary is pocket ready, so you can have it with you anywhere, and the searching feature makes it easy to find translations.

This is a demo project with the aim to help Amy (the bestest girlfriend ever) to learn Hungarian, and at the same time to help me to learn React/Redux/Firebase/Heroku/ES6/Webpack etc.

Making a responsive and easy to use web app, which works great both on desktop/laptop and touch devices is definitely in the focus - I have been making great efforts to make the application feel like it was native on all devices.

Right now the app only works on the front-end, the auth and persistence logic is all done by Firebase, but I would love to dwell into ***NodeJS*** and the backend more, making use of universal rendering.

At the moment the app is heavily work in progress, and only available through invitation.

## Dev stack

### Front-end

  - React/Redux
  - ES6/Babel/Webpack
  - Sass/Bourbon/Susy
  - Browsersync (no HMR for now)

### Unit Testing

  - Karma, Mocha, Expect, TestUtils

### Back-end

- The simplest Express instance serving static files
- Firebase for storage and authentication logic
- Heroku serves the app (for now)


## Dev notes

### Start the server

  $ npm run dev

### Run Webpack

  $ webpack -w

### Testing

  $ npm test

## Contributing / testing

If you are interested, and would be happy to help me with testing the app, awesome - drop me a line (robert at robertpataki dot com)!

## Licence

The MIT License (MIT)
Copyright (c) 2016 Rob Pataki

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
