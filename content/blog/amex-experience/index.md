---
title: Interview experience of EDA/CFR Capabilities American Express On-Campus 
date: "2020-09-18T10:00:00.000Z"
description: "No one told me I needed soft skills and personality other than my technical skills"
---

![Interviewing](frustrated.jpg)

> Photo by [Tim Gouw](https://unsplash.com/@punttim?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/frustrated?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)

American Express came to our campus in the second-third week of September for the following job roles 

- Data Analysis & Stewardship
- Product Management & Development
- Business Insights & Analytics

We were asked to provide our order of preference, mine was 2,1,3 because I wanted an SDE centric role and also I am the last person you should come for business Insights.

# **First Round: Resume Shortlisting**  
25 of us got into the next round. Don't ask me why? how? Like they every tell :p

# **Second Round: Coding + Aptitude Test** 
It was a 45+30 minute test on mettl with full screen on but no camera, 30 minutes for 2 coding questions which were mostly easy based on string or arrays. Didn't even need to write the best optimal solution O(nlogn), instead, O(n^2) worked in one of the questions. The Aptitude section required a very fast solving and response rate, 60 questions in 45 minutes with +1 and -0.25 (throwback to JEE)! Out of 60, around 40 were general aptitude whereas the last 20 were related to theoretical computer science, the output of C, Java programs. 

*Note:* We could have attempted both (coding + aptitude) of the section in any other, but couldn't skip from one to another and expect to go back.  

So I went first with the coding section, solved both of them in 15 minutes, stretched my hands for the next 5 minutes (it was going to be one hell of a ride)! Some questions were just made long out just to waste our time, so I skipped anything which has a long question statement or I wasn't comfortable with the topic. 

Hopefully, I solved around 50-55 of them (don't know how many were right :p) and got selected for the next round. 

# **Third Round: Pre-Placement Round**  
Now you must ask me, shouldn't pre-placement happen before any selection round takes place? Also pre-placement ROUND? Shouldn't it just be a webinar?  
Yes, I was here just a week ago. They got all the selected students from 6 colleges and put into a webinar expecting us to interact and answer questions and ask our doubts and somehow they will select the next round of student.....pretty new for me too!  

Legend has that no one knows how they did it, but I got selected so little did I cared at that moment? :D

# **Fourth Round: Interviews** 
There were 3 interviews, I only got till the 2nd one, and here is my experience & views after discussing with other members

## Round one: Technical Interview 
A panel of two took my interview asking me technical questions in the following order, 

- About yourself: Told them about what I have done in the past 3 years, things I have learned, and my work experience

- Projects: Spent a lot of time discussing my projects listed in my resume, they told me to talk about the project so I told them about a Competitive-programming platform I build, had some good discussion about it, and my other projects.  
In Short: They care about your motive as much as they do about the tech, keep a good story about why you build a project, could touch upon a need you faced or some problem you noticed in day to day life and not *I find this tech cool, hence I build it*. Having a good project is as important as a good story around it and good presentation skills!

- Puzzles: They asked me a puzzle on probability, my brain goes brrrrrrrrrrr....*dead*. RIP. Then asked an easy problem out of pity
    - *Puzzle 1:* A man has 53 socks in his drawer: 21 identical blue, 15 identical black, and 17 identical red. The lights are fused and he is completely in the dark. How many socks must he take out to make 100 percent certain he has a pair of black socks?
    - *Puzzle 2:* A car travels the first half of a motorway journey at an average speed of 40 mph, and the second half of the journey at an average speed of 60 mph. What is the average speed for the entire journey?


- Coding: Asked me if I know about the Fibonacci series and then asked me to code it
```
def fib(n):
    fib_arr = [0,1] 
    for i in range(n-2): 
        temp = fib_arr[-1] + fib_arr[-2]
        fib_arr.append(temp)
    return fib_arr
```
If you look closely, it will return [0,1] for n=1 which is wrong, so I corrected it after it was pointed out to me by adding 
```
    if n==1:
        return [0]
```
Then I was asked what all languages are you comfortable with other than Python, I said C and JavaScript. They asked me if I write this function in C what problem will you face? I was supposed to answer that integers in C can face Overflow problems with big numbers but my mind was already going brrrrrrrrrrrrrrr.......*dead* 

After this, they asked me to do the same without using an array which I easily did. Then I was asked how good I was in python and then questions on python syntax:

- What are Decorators, generators, yield, pass, and continue?

After which I was taken into the DSA section with the following questions

- Difference between Binary Tree and Binary Search Tree? 
- Do you know any self-balancing tree? How do they self balance themselves? 
- You have a sorted link list you need to find a specific number in the list in an optimal way, you are given a function which can return value at any index. 

Then I was asked what all subjects I have studied during my college, I replied some of them are OS, DBMS, and **Big Data**.   
Even after my strong emphasis on *Big Data* I was asked questions on OS.....oh my darn luck!

- Difference between multitasking, multithreading, multiprocessing? 
- Mutex and Semaphore

Then some question based on Amex 

- What Amex does? 
- How credit cards work and how Amex earns money? 

And thus my first interview ended, 6 out 8 of us got into the next round

## Round two: Tech + HR 

In this interview We mostly discussed my resume, work experience, and two of my four projects in my resume, I assumed certain things while explaining my first one which must have had its negative impact. 

Other than this I was asked a SQL question where there is some data in table A and a subset of it in table B with additional information in other columns that aren't in table A. How will you print all the data from both tables A & B? 
Ans: Left Join 

And the regular, *Why Amex?*

## Round three: Missed it :\
Couldn't qualify for this round. PS: This was the last round. 