---
title: Your one stop solution to sharing your resume with evryone
date: "2021-07-16T02:00:00.000Z"
description: "Have you ever filled out a recruitment form where you had to provide a URL to your resume and after submiting the form you realise you can add an achivement or two of yours but then you would have to share the link to the update resume which you can't do. Let's see how you can solve this problem"
---


Things I am going to cover: 

→ Hosting your resume hassle free  
→ How to use your [github.io](http://github.io) domain instead of random google drive links   
→ Update your resume with easy commits on the same URL 

> You can checkout my [template repository](https://github.com/jai-dewani/resume) for yourself and start using it with just one click

![GitHub @jai_dewani/resume](github.jpeg)

## The Problem

It has been a reoccurring problem in my life, where suppose I am filling a form where I am asked to provide a link pointing to my **latest** resume (emphasis on latest, cause of most of these forms were to be shared with HRs and recruiters so you want all the latest achievements there), and till very  recent I used Google Drive to upload and then create a sharable link to do so, 

And most often than not my slow brain would think of that **one** important thing I missed or I might a mail next day saying I won a big hackathon (lol, like that is going to happen) or I got selected into a prestige program. Now I need this information to be there on that resume, so what should I do? So finally I found a good enough solution for this. 

## The Solution

Before I explain my solution, My Resume is written in latex which I need to compile to generate my resume in PDF so I have incorporated that step as well to save my 10 seconds which I waste on compiling 😂 but you can skip that step and directly push your pdf instead of latex files though you might need to remove all the compiling features from the .yaml workflow file. Don't hesitate to reach out to me on twitter [@jai_dewani](www.twitter.com/jai_dewani) if you need any help customizing this repository to your need.  

Here is what my solution is: 

- Create a repository named `resume`  
- Commit all the required latex files into the main branch  
- Commit an `index.html` which when hit should redirect you to your resume.
So theoretically you could just share the URL `<github-username>.github.io/resume` and it will redirect the person to `<github-username>.github.io/resume/Resume-<name>.pdf`. Here is what that HTML looks like 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading, wait....</title>
</head>
<body>
    Loading, wait....
</body>

<script> 
location.href = "https://jai-dewani.github.io/resume/resume.pdf";
</script>
</html>
```



- Create a GitHub workflow that would move this file to the `gh-pages` with the`index.html` file as well cause that file would be hit if anyone tried to visit `<github-username>.github.io/resume` so we need to redirect them to `<github-username>.github.io/resume/Resume-<name>.pdf` which the html file can do for us. 

- Enable GitHub pages for `gh-pages` so as to host all the files in that branch on your `<github-username>.github.io/resume` URL.

Now when you share the URL to the repo `<github-username>.github.io/resume` and it will redirect the person to your resume `<github-username>.github.io/resume/Resume-<name>.pdf` or you could share the pdf link directly, totally an aesthetic choice. 

Some advantages of this are:

- Since you are using a GitHub repository, it should be easy to override the PDF resume, make a commit, push on master branch and the GitHub action would make all the changes required in the `gh-pages` branch

- The URL that you would share for resume will have your github-username as well so it would help create a different identity of you compared to most resume links which are just long-ass Google Drive links. 

I think I now have a permanent solution to this problem which I personally like (cause came up with this idea on my own :p, other people could be using this same strategy but it just poped up in my head during shower, the place every good idea originated xD)

PS: You even connect the main branch of your repo to overleaf after connecting your github to overleaf for update the latex file from overleaf only which provides you an almost live rendered version of your latex and push from there to your repo which would then compile the latex file and push the PDF into `gh-pages` branch.

Did I just spend 4 hours solving a problem that takes 10 mins manually? Yes. 
and I would do that again if required, every time 😂

> PS: You can checkout my resume at [https://jai-dewani.github.io/resume](https://jai-dewani.github.io/resume)

## Update

I am now using iframe to render the pdf on the `<github-username>.github.io/resume` page only, instead of redirecting to the full pdf URL, this was I can skip that ugly redirecting page and the URL looks clean as well. So the new `index.html` looks like 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - Jai Kumar Dewani</title>
    <style>
        *{
            border:0;
            margin:0;
        }
    </style>
</head>
<body>
    <div style="height: 100vh;">
        <iframe src="https://jai-dewani.github.io/resume/resume.pdf" width="100%" height="100%">
    </div>
</body>
</html>
```

I haven't used PDF.js yet because I think people feel comfortable in whatever PDD engine their browser is using cause they are used to by now.

Do let me know if there is anything missing or something I more which I can add on to this to make it better cause the base idea was mine but a lot of small things that you see here were suggested to me by other people

Credits: 

- Thanks to [@ronaksakhuja](https://github.com/ronaksakhuja) and [@rajivnayanc](https://github.com/rajivnayanc) for sharing their [@ronaksakhuja/resume](https://github.com/ronaksakhuja/resume) and \<private\> repositories for giving me an idea, how I can create an action for compiling the latex file to generate the PDF on the fly on every update (makes my life so easy)
- [@imabp](https://github.com/imabp/) gave me the idea to make this a template repository, check out his [version](https://github.com/imabp/resume)
- Thanks to [@harshkapadia2](https://github.com/harshkapadia2/) for sharing his [@harshkapadia2/resume](https://github.com/harshkapadia2/resume) repository and giving me some ideas on how I can improve my action file and also pointing out that [@himanshusharma89](https://github.com/himanshusharma89/) is using some sort of method to embed his PDF in the HTML view so the mobile users don't need to download the file just for viewing. CHeckout this repo here [@himanshusharma89/resume](https://github.com/himanshusharma89/resume/)