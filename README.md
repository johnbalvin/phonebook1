# Phonebook challenge
## Usage 1

1. Go to [https://storage.googleapis.com/johnbalvin/examples/phonebook1/index.html](https://storage.googleapis.com/johnbalvin/examples/phonebook1/index.html)
2. Just type what you want to search
3. In case of sorting, just click on Name, Number or address, the arrow's direction indicates it's order.

## Usage 2

1. Clone repository
2. Open index.html in your browser
3. Just type what you want to search
4. In case of sorting, just click on Name, Number or address, the arrow's direction indicates it's order..

## Relevant information
- I need to create a cloud function [https://cloud.google.com/functions](https://cloud.google.com/functions) because endpoint [http://www.mocky.io/v2/581335f71000004204abaf83](http://www.mocky.io/v2/581335f71000004204abaf83) does not provide the right cors headers and I got cors error [https://stackoverflow.com/questions/10636611/how-does-access-control-allow-origin-header-work](https://stackoverflow.com/questions/10636611/how-does-access-control-allow-origin-header-work) , so I use it as a proxy and send the right headers, you need to fix that