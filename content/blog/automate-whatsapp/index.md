---
title: Create Your Own Whatsapp Spambot in 5 Minutes
date: "2020-12-19T12:00:00.000Z"
description: "Wanna Irritate your friends by creating a spam bot with whatsapp web withing minutes?"
---

Don't know about you but there were times when I just wanted to spam someone on whatsapp to irritate to ping him enough times that they reply back. You too? Then this script should come handy. 

Let's get over what we are going to do, We are going to use Developer Console to inject some script into WhatsApp Web. 

### Open WhatsApp Web and the chat in which your bot should spam

### Open Developer Console 
Either search for **Developer Tools** in the drop down menu in any browser or use the shortcut `Ctrl + Shift + I`and move to the **Console tab** where we can write Javascript and interact with the DOM (Document Object Model).

### Let's enter some text in the message box
We are going to use CSS selectors to select specific section of the web page and then use `document.querySelector()` to get the DOM object of that section. Let's select the input area object and store it in `textbox` variable
```
var textpath = '#main > footer > div._3SvgF._1mHgA.copyable-area > div.DuUXI > div > div._1awRl.copyable-text.selectable-text';
var textbox = document.querySelector(textpath);
```
Now type something directly in the message box, and enter `textbox.textContent` into the console and it should return the same text, let's try setting some text via the Developer Console insted of directly typing it in
```
textbox.textContent = "Some Text"
```
The same text must be update in the WhatsApp web GUI. Yaay, we hare half way done    
![](images/message.jpeg)
but ther is a problem, we have the record button where the send button is supposed to be. That's because we have changed the state of message box internally but the input needs to know that something has been typed on it to update the mic button to send button. Let's do this by 
```
window.InputEvent = window.Event || window.InputEvent
var event = new InputEvent('input', {bubbles: true});
textbox.dispatchEvent(event);
```
Now the send button is visible 
![](images/message1.jpeg)

### Send the message
All that is left is to select the send button and send a click signal to let it know the message is read to be sent. Lets do this by first selecting the send button and then by calling the click method. 

```
var buttonpath = '#main > footer > div._3SvgF._1mHgA.copyable-area > div:nth-child(3) > button';
var b = document.querySelectorAll(buttonpath)[0]
b.click();
```
### 🎉 You have now automated the process of sending one message, lets try send many 
One easy way is to just run this whole code in loop. 
```
var i = 0;
for(i=0;i<10;i++){
    var textpath = '#main > footer > div._3SvgF._1mHgA.copyable-area > div.DuUXI > div > div._1awRl.copyable-text.selectable-text';
    var textbox = document.querySelector(textpath);
    textbox.textContent = "Some Text";

    window.InputEvent = window.Event || window.InputEvent;
	var event = new InputEvent('input', {bubbles: true});
	textbox.dispatchEvent(event);
	
    var buttonpath = '#main > footer > div._3SvgF._1mHgA.copyable-area > div:nth-child(3) > button';
    var b = document.querySelectorAll(buttonpath)[0]
    b.click();
}
```
This is all great but lets make this code bit more genral by allowing the user to select the text and number of repetations at runtime. Now the user can enter the message the loop count in aleart boxes and the result should look something like this   

![](images/repeat.JPG)

### Extra bit
This is just the starting, you can customise this script in a number of ways to do different tasks, like I change a few things so now this song takes a message and sends each word as a seprate message, just because I hate when people do this to me. Why can't you send the send the whole messsage together? -_-

```
var message = prompt("Enter the message");
var message = message.split(' ');
var looper = 0;
for(looper=0;looper<message.length;looper++)
{
	window.InputEvent = window.Event || window.InputEvent;
	var d = new Date();
	var event = new InputEvent('input', {bubbles: true});
	var textbox= document.querySelector('#main > footer > div._3SvgF._1mHgA.copyable-area > div.DuUXI > div > div._1awRl.copyable-text.selectable-text');
	
	textbox.textContent = message[looper];
	textbox.dispatchEvent(event);
	var b = document.querySelectorAll('#main > footer > div._3SvgF._1mHgA.copyable-area > div:nth-child(3) > button')[0]
	b.click();
}
```

Try entering the lyrics of [Rap God](https://www.azlyrics.com/lyrics/eminem/rapgod.html) and watch your whatsapp hang. 😂😂 Do try out different things and let me know what all you did with this! 🤩


> *Like my content? Consider subscribing to my [Newsletter](https://buttondown.email/jai_dewani). or support me by [tweeting][tweet] about my blog*

[tweet]: https://twitter.com/intent/tweet?text=%22Automating%20WhatsApp%20in%205%20minutes%20to%20Irritate%20your%20friends%20by%20spamming%22%20-%20%40jai_dewani%20%0A%0Ahttp%3A//blogs.jaid.tech/automate-whatsapp/%0A%0A%23Blog%20%23WhatsApp%20%23AUTOMATION%20%23SpamALot%20