---
title: "Jujutsu: Another niche Version Control System?"
date: "2026-03-12T23:00:00.000Z"
description: "Discover Jujutsu (jj) - a modern version control system that aims to fix Git's quirks while keeping you productive. Perfect for developers tired of Git's complexity."
---

I have had it with git - is what I usually say when I have to do anything more complex than a syncing my feature branch with the master branch since I "must" include the latest changes from some LLM powered system rewrite to test my part of changes. Phew.

Meet **Jujutsu** (pronounced "joo-joot-su" and often shortened to `jj`) - a version control system that's trying to be what Git could have been if it was designed with today's developer experience in mind. Sad that Linus couldn't even predict what Software Engineering would be like today 20 years ago.

## Cool Resources to Get Started
- [Official Tutorial and Overview](https://docs.jj-vcs.dev/latest/tutorial/)
- [A helpful tutorial covering a wider range of features (still growing) by Steve Klabnik](https://steveklabnik.github.io/jujutsu-tutorial/)


## What is Jujutsu?

Jujutsu is a new take on version control, from the little I understand it works as a UI layer providing some very new ideas to someone who has only ever used Git his whole life. 

Full disclosure: It's only been about a week now. I'm not some power user who's migrated their entire workflow — I'm still in the "ooh this is nice" phase. But even in that short time, there have been enough moments where I thought "This sure is one step ahead" that I felt like writing about it.

## Why Did Someone Build Yet Another Version Control System?

Don't get me wrong, Git is amazing, but everything has it limits and I am sure there are workflows in the current Software Lifecycle that were never imagined when the core of Git was being written. So it is expected that sometimes it becomes the root of the friction.

I am not sure if this was the original idea behind but Martin von Zweigbergk originally started Jujutsu (jj) as a hobby project in late 2019 to experiment with a different user experience in version control but now has started to gain traction and even used at some scale inside Google, though not sure at which scale. (Any Googler ready to shed some facts? xD)

## What Makes Jujutsu Different

Here are the things that made me go "wait, that's it?" in a good way:

1. **Your working directory IS a commit** - This takes a bit of getting used to but I don't think it's bad, and it means I never have to 'git stash' just to peek at another branch. My unfinished work is just there, safely recorded.

2. **History is editable** - After using it a bit I started noticing a lot of usecases where git wizards might pullout the rebase workflow are now abstracted and made user friendly. Want to fix a commit message from 5 commits ago? Just... do it. No interactive rebase ritual required.

3. **Ignore conflicts till the end; like in real life.** - A merge conflict in Git feels harsh at times. In Jujutsu, conflicts are just recorded as part of the change and you resolve them when you're ready. No blocked state, no panic.

4. **Everything is undoable.** - Off the top of your head, what are the differences betwen various modes of reset in Git? Feels daunting, ain't it? In JJ, if you mess up, you just `jj op undo`.

## Jujutsu vs Git?

Let's be real, the main comparison everyone cares about is Git. So let me focus there.

Git has `checkout`, `switch`, `restore`, and `reset` — four commands that all kinda-sorta do overlapping things. I've been using Git for years and I still Google the difference between `reset --soft`, `--mixed`, and `--hard` every single time. In Jujutsu, the commands just do what they say. There's less to memorize and less to screw up.

The other big thing is that Git treats your working directory and your commits as separate concepts. You make changes, you stage them, you commit them — three steps. Jujutsu collapses this. Your working directory is always a commit that's being updated in real-time. It sounds weird at first but once you get used to it, going back to `git add` feels unnecessarily tedious.

As for SVN and Mercurial — if you're still using those, Jujutsu borrows the good parts (Mercurial's friendliness, SVN's simplicity) without the limitations. But honestly if you're on SVN in 2026, you have bigger plans than which VCS to switch to 😅

_Hint_ - Jujustsu works as a UI layer, read more to understand how.

**The Trade-offs though:**

Jujutsu is new but introduces a lot of interesting ideas on how Version Control can be done differently. Yet this is all new so the people who can help you from a sticky situation are also few. No fancy GUI clients, limited IDE integration or at times I found VSCode fighting against JJ, making my day a bit harder and good luck convincing your teammates who spent their last decade learning how to stop making mistakes in `git`. But for personal projects or if you're starting something new? Worth a shot.

## Fits right in with your existing Git History

The most beautiful part? Jujutsu uses Git as its backend. Your `.git` folder stays as-is. Your teammates don't even need to know you're using `jj` unless you tell them.

- You can `jj clone` any GitHub, GitLab, or Bitbucket repo, I tried with the repo these blogs are hosted on and it worked like _that_.
- Your existing Git repositories work — just `cd` into them and start using `jj` commands
- When you push changes, they show up as normal Git commits
- Your colleagues can keep using Git, you can use `jj`, no one would be wiser.

I literally `cd`'d into one of my existing repos and started running `jj` commands. No migration, no setup, no drama. That's the lowest barrier to entry I've ever seen for a new dev tool.


## A Quick Note on AI + Version Control

I don't have months of experience combining `jj` with Copilot or anything, so don't quote me on this - But one thing I've noticed is that when AI assistants suggest big changes across multiple files, the ability to just undo everything cleanly is really nice. The same can be done with `git` but it comes with years of being afraid to do `git reset` for me. With `jj` it's more easy to try the change, don't like it, undo, try something else. Less effort overhead for what is essentially "let me see if this AI suggestion is any good."

That said, I'm still figuring this out. If anyone has a proper workflow for this, hit me up on [Twitter](https://twitter.com/jai_dewani) because I'd love to hear about it 😄

## Should You Try It?

Don't swap your main work repo over yet. But next time you start a 'test' project, run jj init instead of git init. If you hate it, you can literally just delete the .jj folder and keep using the .git one that’s already there. There’s zero risk.


The sweet spot right now is using `jj` for personal projects and side work while keeping Git for team stuff. That's exactly what I'm doing and so far it's been a good balance.

## Wrapping Up

Jujutsu isn't going to replace Git tomorrow. But the ideas are solid, and the fact that it works seamlessly with existing Git repos means you can try it without committing to anything (pun intended xD).
