---
title: "Jujutsu: A Fresh Take on Version Control That Might Just Change How You Code"
date: "2026-03-12T23:00:00.000Z"
description: "Discover Jujutsu (jj) - a modern version control system that aims to fix Git's quirks while keeping you productive. Perfect for developers tired of Git's complexity."
---

Have you ever found yourself Googling "how to undo Git merge" for the hundredth time? Or spent way too long trying to figure out why your Git history looks like a bowl of spaghetti? Well, you're not alone, and there might be a solution on the horizon.

Meet **Jujutsu** (pronounced "joo-joot-su" and often shortened to `jj`) - a version control system that's trying to be what Git could have been if it was designed with today's developer experience in mind.

## Cool Resources to Get Started
- [Official Tutorial and Overview](https://docs.jj-vcs.dev/latest/tutorial/)
- [A helpful tutorial covering a wider range of features (still growing) by Steve Klabnik](https://steveklabnik.github.io/jujutsu-tutorial/)


## What is Jujutsu?

Jujutsu is Google's attempt at creating a "better Git," first released in 2023. It's a version control system that does everything Git does but tries really hard to not make you want to pull your hair out in the process.

The key difference? Where Git punishes you for experimenting (one wrong `reset --hard` and your afternoon is gone 💀), Jujutsu is designed to let you mess around freely and undo basically anything without consequences.

Full disclosure: I've been playing with `jj` on a side project for about a week now. I'm not some power user who's migrated their entire workflow — I'm still in the "ooh this is nice" phase. But even in that short time, there have been enough moments where I thought "why doesn't Git do this?" that I felt like writing about it.

## Why Did Someone Build Yet Another Version Control System?

If you've been coding for a while, you've probably had these moments with Git:

- **"Wait, how do I undo that commit again?"** - Git has like 47 different ways to undo things, and picking the wrong one can be... educational.
- **"Why is my history so messy?"** - Unlike **Mercurial's** cleaner linear history or **SVN's** simple numbered revisions, Git's branching can create histories that look like abstract art.
- **"I just want to change that commit message from 3 commits ago"** - In Git, this involves interactive rebasing, which can feel like surgery with a rusty spoon.

Jujutsu was born from these frustrations. Google developers got tired of fighting with Git on their massive codebases and thought, "What if we built something that just... works the way you'd expect it to?"

## The "Aha!" Moments: What Makes Jujutsu Different

Here are the things that made me go "wait, that's it?" in a good way:

1. **Your working directory IS a commit, always.** No more "oh no, I forgot to commit before switching branches!" This alone would have saved me from at least 3 panic attacks during my college projects :p

2. **History is editable and it doesn't feel like defusing a bomb.** Want to fix a commit message from 5 commits ago? Just... do it. No interactive rebase ritual required. I genuinely didn't believe this until I tried it.

3. **Conflicts don't stop the world.** In Git, a merge conflict feels like the build is on fire. In Jujutsu, conflicts are just recorded as part of the change and you resolve them when you're ready. No blocked state, no panic.

4. **Everything is undoable.** Every single operation gets logged, and you can undo any of them. I accidentally messed up a change while testing and just ran `jj op undo` and it was like nothing happened. Where was this during my internship 😭

## How Does It Stack Up Against Git?

Let's be real, the main comparison everyone cares about is Git. So let me focus there.

Git has `checkout`, `switch`, `restore`, and `reset` — four commands that all kinda-sorta do overlapping things. I've been using Git for years and I still Google the difference between `reset --soft`, `--mixed`, and `--hard` every single time. In Jujutsu, the commands just do what they say. There's less to memorize and less to screw up.

The other big thing is that Git treats your working directory and your commits as separate concepts. You make changes, you stage them, you commit them — three steps. Jujutsu collapses this. Your working directory is always a commit that's being updated in real-time. It sounds weird at first but once you get used to it, going back to `git add` feels unnecessarily tedious.

As for **SVN** and **Mercurial** — if you're still using those, Jujutsu borrows the good parts (Mercurial's friendliness, SVN's simplicity) without the limitations. But honestly if you're on SVN in 2026, you have bigger problems than which VCS to switch to 😅

**The Trade-offs though:**
Jujutsu is new. The ecosystem is small. No fancy GUI clients, limited IDE integration, and good luck convincing your team to try it when half of them just learned to stop using `git push --force`. But for personal projects or if you're starting something new? Worth a shot.

## "But I Have Years of Git History!" - Don't Worry

This is the part that sold me on even trying it. Jujutsu uses Git as its backend. Your `.git` folder stays as-is. Your teammates don't even need to know you're using `jj` unless you tell them.

- You can `jj clone` any GitHub, GitLab, or Bitbucket repo
- Your existing Git repositories work — just `cd` into them and start using `jj` commands
- When you push changes, they show up as normal Git commits
- Your colleagues keep using Git, you use `jj`, nobody fights

I literally `cd`'d into one of my existing repos and started running `jj` commands. No migration, no setup, no drama. That's the lowest barrier to entry I've ever seen for a new dev tool.

## Speed: The Pleasant Surprise

Ever waited for `git log` to load on a huge repository? Or watched `git rebase` chug along for minutes? Jujutsu was built with performance in mind from day one.

**Real-world differences:**
- **Large repositories**: Where Git might take 30 seconds to show history, Jujutsu often does it in 3-5 seconds
- **Complex rebases**: Operations that make Git sweat are often instant in Jujutsu
- **Working with huge files**: Better handling of large binaries compared to Git's sometimes-painful LFS system

I haven't tested it on anything massive myself, but even on my mid-sized repos the difference is noticeable. `jj log` feels instant compared to `git log --graph` which takes a visible pause on larger repos.

## A Quick Note on AI + Version Control

I don't have months of experience combining `jj` with Copilot or anything, so take this with a grain of salt. But one thing I've noticed is that when AI assistants suggest big changes across multiple files, the ability to just undo everything cleanly is really nice. With Git I'd usually create a throwaway branch, let the AI go wild, and then cherry-pick what I liked. With `jj` it's more fluid — try the change, don't like it, undo, try something else. Less branch management overhead for what is essentially "let me see if this AI suggestion is any good."

That said, I'm still figuring this out. If anyone has a proper workflow for this, hit me up on [Twitter](https://twitter.com/jai_dewani) because I'd love to hear about it 😄

## Should You Try It?

Look, I'm not going to mass-convert anyone. I've been using it for a week. But here's what I think:

If Git frustrates you regularly — like you've rage-quit a rebase or lost work to a bad reset — install `jj` alongside Git on a personal project and just play with it for a day. It uses Git under the hood so there's literally zero risk. Worst case you go back to Git and learned some new concepts. Best case you stop dreading version control.

If Git works fine for you and your team, there's no rush. Seriously. Don't be that person who pushes a new tool on the team just because you read a blog post about it (I've been that person, it doesn't end well 😂).

The sweet spot right now is using `jj` for personal projects and side work while keeping Git for team stuff. That's exactly what I'm doing and so far it's been a good balance.

## Wrapping Up

Jujutsu isn't going to replace Git tomorrow. But the ideas are solid, and the fact that it works seamlessly with existing Git repos means you can try it without committing to anything (pun intended :p).

I'll probably write a follow-up post once I've used it for a month or two with some actual command comparisons and workflow examples. For now, if you've ever muttered something unrepeatable while resolving a merge conflict, maybe give `jj` a spin. I'm glad I did.
