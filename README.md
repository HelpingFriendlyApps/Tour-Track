# Tour Track

##Phish Statistics Visualizer. 

Tour Track takes data from ever phish show, venue, live-track, tour, concert, etc,. and visualizes it in an aesthetic and pleasing way. Enables users with current phish.net accounts to import their list of attended shows and view personalized statistics. Signin utilizes Facebook oAuth for future implementation of social postings of personal data.

## Stack
Front-End: [Angular](https://angularjs.org/) & [d3.js](http://d3js.org/)<br>
Back-End: [Node.js](http://www.nodejs.org/) & [Express](http://expressjs.com/)<br>
Database: [PostgreSQL](http://www.postgresql.org/) with [Knex.js](http://knexjs.org/)<br>
Styling: [SASS](http://sass-lang.com/) w/ [Bourbon](http://bourbon.io/), [Neat](http://neat.bourbon.io/) and [Bitters](http://bitters.bourbon.io/)

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Getting Started

```bash
# Install Dependencies
$ npm install

# Database (development)
$ createdb tourtrack_dev
$ knex migrate:latest

# Starting the Server
$ npm start
```
