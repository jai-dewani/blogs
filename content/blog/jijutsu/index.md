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

If you've used **Git**, **SVN**, or **Mercurial**, you know what version control is - it's like having a time machine for your code. You can save snapshots of your work, go back to previous versions, and collaborate with others without stepping on each other's toes.

Jujutsu is Google's attempt at creating a "better Git," first released in 2023. Think of it as Git's younger, more organized sibling who learned from all of Git's mistakes. While Git can feel like trying to edit a document by shouting commands at it, Jujutsu aims to be more like having a conversation with a smart assistant who actually understands what you want to do.

The key difference? Where Git can be... let's say "unforgiving" when you mess up, Jujutsu is designed to let you experiment freely and fix things easily.

## Why Did Someone Build Yet Another Version Control System?

Great question! If you've been coding for a while, you've probably had these moments with Git:

- **"Wait, how do I undo that commit again?"** - Git has like 47 different ways to undo things, and picking the wrong one can be... educational.
- **"Why is my history so messy?"** - Unlike **Mercurial's** cleaner linear history or **SVN's** simple numbered revisions, Git's branching can create histories that look like abstract art.
- **"I just want to change that commit message from 3 commits ago"** - In Git, this involves interactive rebasing, which can feel like surgery with a rusty spoon.

Jujutsu was born from these frustrations. Google developers got tired of fighting with Git on their massive codebases and thought, "What if we built something that just... works the way you'd expect it to?"

## The "Aha!" Moments: What Makes Jujutsu Different

Here's where Jujutsu gets interesting. Remember how in **Photoshop** you can edit any layer without destroying your work? Or how **Google Docs** lets you suggest edits without permanently changing the document? Jujutsu applies similar thinking to version control.

**The Big Ideas:**

1. **Every change is instantly saved** - Your working directory IS a commit, always. No more "oh no, I forgot to commit before switching branches!"

2. **History is editable** - Unlike Git where changing history feels dangerous, Jujutsu makes it feel natural. Think of it like editing a draft - you can rearrange paragraphs, fix typos, or restructure without fear.

3. **Conflicts are just another type of change** - Instead of Git's "CONFLICT! EVERYTHING IS BROKEN!" approach, Jujutsu treats conflicts like **VSCode** treats merge conflicts - just another thing to resolve when you're ready.

4. **Operations are reversible** - Every action generates an operation log (like **Photoshop's** history panel), so you can undo literally anything.

## How Does It Stack Up Against the Tools You Know?

**vs. Git:**
- **Git**: "Here's a Swiss Army knife with 47 blades. Good luck!" 
- **Jujutsu**: "Here's a tool that does exactly what you're thinking."

Git's learning curve is... steep. Jujutsu aims for intuitive. Where Git has `checkout`, `switch`, `restore`, and `reset` all doing similar-but-different things, Jujutsu has commands that do what they say.

**vs. SVN:**
Remember **Subversion**? It was simple but limiting - one main line of development, numbered commits. Jujutsu gives you SVN's simplicity with Git's power, minus Git's complexity.

**vs. Mercurial:**
**Mercurial** was always the "friendlier Git," and Jujutsu takes that concept further. If Mercurial is a friendly neighbor, Jujutsu is like having a personal assistant for your code.

**The Trade-offs:**
Jujutsu is newer, so the ecosystem is smaller. No **GitHub Desktop** equivalent yet, fewer IDE integrations, and your team probably hasn't heard of it. But if you're tired of Git's quirks, it might be worth exploring.

## "But I Have Years of Git History!" - Don't Worry

Here's the clever part: Jujutsu speaks Git fluently. It's like having a bilingual friend who can translate between you and Git.

**What this means practically:**
- You can `jj clone` any GitHub, GitLab, or Bitbucket repo
- Your existing Git repositories work as-is - just `cd` into them and start using `jj` commands
- Your teammates can keep using Git while you use Jujutsu on the same project
- When you push changes, they show up as normal Git commits

It's like using **VS Code** to edit files while your colleague uses **Vim** - you're both editing the same files, just with different tools. The underlying Git repository doesn't care which tool you used to make changes.

## Speed: The Pleasant Surprise

Ever waited for `git log` to load on a huge repository? Or watched `git rebase` chug along for minutes? Jujutsu was built with performance in mind from day one.

**Real-world differences:**
- **Large repositories**: Where Git might take 30 seconds to show history, Jujutsu often does it in 3-5 seconds
- **Complex rebases**: Operations that make Git sweat are often instant in Jujutsu
- **Working with huge files**: Better handling of large binaries compared to Git's sometimes-painful LFS system

Think of it like switching from an old laptop to an M2 MacBook - everything just feels snappier.

## Why Jujutsu Pairs Naturally with AI Coding Assistants

With the rise of AI coding assistants like **GitHub Copilot**, **Cursor**, and **Claude**, the way we write code is changing rapidly. Version control needs to keep up - and Jujutsu might be better suited for this new world than Git.

**Here's why:**

- **Cleaner history for AI context** - LLMs work better with clean, well-structured commit histories. Jujutsu's natural tendency toward tidy, logical commits means AI tools get better context when analyzing your codebase.

- **Easier experimentation** - When an AI suggests a large refactor, you want to try it without fear. Jujutsu's "everything is reversible" philosophy makes it perfect for quickly testing AI-generated changes and discarding them if they don't work out.

- **Better diff management** - AI assistants often make sweeping changes across many files. Jujutsu's superior conflict handling and change management make it easier to review, split, and curate AI-generated code before committing it.

- **Parallel workstreams** - Working with multiple AI-generated solutions simultaneously? Jujutsu's approach to managing multiple changes in parallel is far more natural than Git's branch-heavy workflow, letting you compare different AI suggestions side by side.

Think of it this way: Git was designed for humans carefully crafting each commit. Jujutsu is flexible enough to handle the rapid, iterative experimentation that comes naturally when you have an AI pair programmer by your side.

## Should You Make the Switch?

Here's my honest take: if you're constantly frustrated with Git, Jujutsu is worth trying. If Git works fine for you, there's no rush.

**Good candidates for trying Jujutsu:**
- You're tired of Git's complexity
- You work on large repositories where Git feels slow
- You frequently need to edit commit history
- You're starting a new project and can choose your tools

**Maybe stick with Git if:**
- Your entire team is comfortable with Git
- You rely heavily on Git-specific tools and integrations
- You're working on a project with strict tooling requirements

**The Low-Risk Way to Try It:**
1. Install Jujutsu alongside Git (they play nice together)
2. Try it on a personal project or a copy of an existing repo
3. Use both tools side-by-side until you're comfortable
4. Gradually introduce it to your team if you like it

The worst that can happen? You learn some new concepts and go back to Git. The best? You might find version control enjoyable again.

## Wrapping Up

Jujutsu isn't trying to replace Git everywhere overnight - it's trying to be the tool Git could have been with 20 years of hindsight. Whether it succeeds will depend on adoption, but the ideas behind it are solid.

If you've ever thought "there has to be a better way" while wrestling with Git, maybe give Jujutsu a try. Who knows? You might just find your new favorite development tool.
