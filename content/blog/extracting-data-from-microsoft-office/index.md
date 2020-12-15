---
title: Extracting Images, Audio, Videos from Microsoft Office files 
date: "2020-12-15T18:00:00.000Z"
description: "Microsoft office files are ZIP files under the hood, every tried unzipping them?"
---

Around 2007, Microsoft switched from there propitary binary format doc, ppt, xls, etc to a open format which stores data as collection of XML files all ziped togeter with everything from media to template information. These new formats are called doc**x**, ppt**x**, xls**x**, etc where **X** stands for XML and allows this format to be more open and accessible, allowing this format to be parsed and understood by any other software that wishes to parse it and with this DOCX is the most used and popular standard. Same goes to other Microsoft formats. 

Since all Microsoft formats are ZIP files which contain everything in XML format, all blob elements like Images, Videos and Audio are stored as it is in `/media` folder. 

Extension is just a fancy codeword for your operating system to help him understand how to handle a file, to open it in MS word or MS Powerpoint. The actuall file type is determied by the Signature of files (magic number) which is a sequence of bytes present in the header which is unique for each file type [List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures).

> **Talk is cheap, Show me the code** - Linus Torvalds  

<div style="text-align:center"><img src="images/good-stuff.gif" /></div>


## See it for yourself

Open your docx, pptx or any MS Office file in a text editor which should display it in hexadecimal format. Look up the first 4 bytes (8 characters) which should be `504b 0304` and lookup the [Signature of Zip files](https://filesignatures.net/index.php?page=search&search=ZIP&mode=EXT). **They both match!** Hence internally both the files are the same, the only different is caused by the OS assigning different softwares to open a file depending on extension on the file. 


![](./images/text-file.JPG)

Enough analysing, lets get inside this mess!

## Lets Hack Microsoft Office files!
<div style="text-align:center"><img src="images/hacking.gif" /></div>



Open any Zip Programs like 7-Zip or WinZip and select a MS Office file and choose `Extract to` and select the location where you want to unzip the file. 
![](images/unzip.JPG)

### How Media is stored in MS Office files
What makes this new format open is that the images, videos and anything media is stored as it is in the media folder as visible in the folder structure below. 

What makes this even better is that all the text and meta-information is stored in XML format which can be ready openly and parsed easiely after understanding the format of XML which is universal for each MS Office file. **Just copy and paste all the media and your work is done!**

![](images/folder.JPG)



## Extra bits 

There are a lot of files that use the same technique of hiding there data behind a ziped file with extensions to let the OS know how to handle the file in exectuion like

- aar, apk - Android application archive files, create when App Installer files are genrated.
- epub - An ebook file format 
- ipa - It is an iOS application archive file, used to distribute installable apps 
- jar - An archive of Java class files and metadata into one package for easy distribution
- kmz - Used for expressing geographic annotation and visualization within two-dimensional maps and three-dimensional Earth browsers
- maff - Mozilla Archive format, used to store all the contents of a webpage in a ZIP file for ease of managment
- odp, ods, odt - Used by office suites like OpenOffice and LibreOffice. Text documents (. odt), as well as spreadsheets (. ods) and also presentations (. odp).

> *Like my content? Consider subscribing to my [Newsletter](https://buttondown.email/jai_dewani).*