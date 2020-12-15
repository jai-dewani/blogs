---
title: Extracting Images, Audio, Videos from Microsoft Office files 
date: "2020-11-20T18:00:00.000Z"
description: "Microsoft office files are ZIP files under the hood, every tried unzipping them?"
---

Around 2007, Microsoft switched from there propitary binary format doc, ppt, xls, etc to a open format which stores data as collection of XML files all ziped togeter with everything from media to template information. These new formats are called doc**x**, ppt**x**, xls**x**, etc where **X** stands for XML and allows this format to be more open and accessible, allowing this format to be parsed and understood by any other software that wishes to parse it and with this DOCX is the most used and popular standard. Same goes to other Microsoft formats. 

Since all Microsoft formats are ZIP files which contain everything in XML format, all blob elements like Images, Videos and Audio are stored as it is in `/media` folder. 

Extension is just a fancy codeword for your operating system to help him understand how to handle a file, to open it in MS word or MS Powerpoint. The actuall file type is determied by the Signature of files (magic number) which is a sequence of bytes present in the header which is unique for each file type [List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures).

> **Talk is cheap, Show me the code** - Linus Torvalds  

![](https://media1.giphy.com/media/SWdNAbwRVQbODxsi4g/giphy.gif?cid=ecf05e47nnmtiei1m2edqr8r5johbvtw6jfuf0o7zf7dyo1u&rid=giphy.gif)  
<a href="https://giphy.com/gifs/adultswim-show-me-good-stuff-it-off-SWdNAbwRVQbODxsi4g">via GIPHY</a></p>  

## See it for yourself

Open your docx, pptx or any MS Office file in a text editor which should display it in hexadecimal format. Look up the first 4 bytes (8 characters) which should be `504b 0304` and lookup the [Signature of Zip files](https://filesignatures.net/index.php?page=search&search=ZIP&mode=EXT). **They both match!** Hence internally both the files are the same, the only different is caused by the OS assigning different softwares to open a file depending on extension on the file. 


![](./images/text-file.JPG)

Enough analysing, lets get inside this mess!

## Lets Hack Microsoft Office files!
![Felicity Hacking GIF](https://media1.tenor.com/images/c16813c33283d6b86e1585fe0d991f55/tenor.gif?itemid=5117206)
<div class="tenor-gif-embed" data-postid="5117206" data-share-method="host" data-width="100%" data-aspect-ratio="1.7857142857142858"><a href="https://tenor.com/view/felicity-hacking-typing-knuckles-badass-gif-5117206">Felicity Hacking GIF</a> from <a href="https://tenor.com/search/felicity-gifs">Felicity GIFs</a></div>

Open any Zip Programs like 7-Zip or WinZip and select a MS Office file and choose `Extract to` and select the location where you want to unzip the file. 
![](images/unzip.JPG)

### How Media is stored in MS Office files
What makes this new format open is that the images, videos and anything media is stored as it is in the media folder as visible in the folder structure below. 

What makes this even better is that all the text and meta-information is stored in XML format which can be ready openly and parsed easiely after understanding the format of XML which is universal for each MS Office file. 

![](images/folder.JPG)

Just copy and paste all the media and your work is done! 