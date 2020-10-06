---
title: Converting .pcap to .csv using 
date: "2020-10-6T18:00:00.000Z"
description: "Even after searching the whole web I couldn't find one simple way to convert PCAP files to CSV ones, until my friend told me about this "
---

PCAP files are mostly used to store captured network traffic, but they aren't the best for doing analysis. Hence the first step before doing any analysis is to convert them to CSV format yet there isn't a standard or a simplified way to do so, hence I am sharing what I have scavenged from the web while doing my project which was Implimenting the paper [Deep Packet: A Novel Approach For Encrypted Traffic Classification Using Deep Learning](https://arxiv.org/pdf/1709.02656.pdf)

This method has been tested on Ubuntu and should work on any other linux platform. 

## Install argus via terminal  
`sudo apt-get install argus-client`

## Convert .pcap to .argus file format 
`argus -r filename.pcap -w filename.argus`  
-r &lt;FILE&gt; Read FILE  
-w &lt;FILE&gt; Write FILE  


## Convert .argus to .csv file forrmat while choosing which features to extract
`ra -r filename.argus -u -s <features-comma-seprated>`  

Example:  
`ra -r filename.argus -u -s rank, stime, ltime, dur`  

-r &lt;FILE&gt; Read FILE  
-u Print time values using Unix time format (seconds from the Epoch).  
-s Specify the fields to print.  

The list of available fields to print can be found [here](http://manpages.ubuntu.com/manpages/bionic/man1/ra.1.html). After selecting your required set of fields this indeed is a very short and effective way of converting .pcap to .csv for further analysis which in my case was Deep Learning

Hope this helps you :)