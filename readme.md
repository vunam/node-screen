# Extra console screen for Node

Mirrors your Node app output on your console to a browser. It's useful for running your node application on a different screen instead of alt tabbing your terminal window. This is handy for continious console output when you're working remote on a small laptop screen and need an extra display like your mobile phone or tablet.

## Installation

Put *var screen = require('node-screen');*
at the beginning of your application and initiate by setting *screen();* Optional port parameter. Default port is 8888.

Connect any device to the port. On OSX I simply use my-device-name.local:8888 to connect.

## To do

- Better HTML formatting
- Colors
- Input from device
- array of last x number of lines
- Options
- Connecting server via www
