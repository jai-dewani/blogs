# Introduction to the CQRS Pattern
CQRS splits things up: one model for commands (writes), another for queries (reads). Your read side can be super fast and tailored for how people use your data, while your write side focuses on keeping everything correct and consistent. Bottom line: stick with CRUD for straightforward apps, but consider CQRS if you're hitting pain points with performance, complexity, or scaling. 

## Problem
Read and write performance of any system has an inherent imbalance where writes are more expensive. The traditional approach of using a single data model becomes increasingly difficult to optimize for both read and write together.

## Solution
Split the conceptual model into separate models for update and display, which are referred to as command and query respectively, hence being called `CommandQuerySeparation`. This works really well when working in more complicated domains, where having the same conceptual model for commands and queries leads to a more complex model that does neither well.

> Command Query Responsibility Segregation (CQRS) is a software architectural pattern that separates the operations that read data (queries) from those that update data (commands). By decoupling these responsibilities, CQRS enables more scalable, flexible, and maintainable systems, especially in complex domains. This pattern is commonly used in event-driven architectures and systems that require high performance, scalability, or have complex business logic. 


# The difference between Commands and Queries

Commands and queries are like two sides of the same coin when you’re building apps. Think of commands as instructions you give your app to make something happen—like adding a new user, updating a profile, or deleting a post. They’re all about changing stuff.

Queries, on the other hand, are more like questions you ask your app. You’re not trying to change anything; you just want some information back. For example, “Show me all the posts from today” or “What’s the user’s email address?” Queries just fetch data and leave everything else untouched.

So, in short: commands make changes, queries just get info. Keeping them separate helps keep your code organized and easier to manage, especially as your app grows. 


## Benefits of using CQRS
One of the best things about CQRS is how it lets you scale reads and writes independently. For instance, if your app gets a lot more reads than writes, you can focus on making the read side faster and more robust without complicating the write side. I’ve found that using different data models for reading and writing makes life a lot easier—your read model can be optimized for speed and convenience, while your write model can focus on data integrity and validation.

Security is another area where CQRS shines. Since commands and queries take separate paths, it’s much simpler to control who can do what, without getting lost in a maze of permissions. When you’re working with complex business rules, keeping commands and queries apart really helps prevent your codebase from becoming a tangled mess. Personally, I’ve noticed it’s much easier to add new features or make changes when everything is clearly separated.

Performance is a big plus, too. Reads can be lightning fast and easily cached, while writes can take the time they need to ensure everything is correct. And if you’re interested in event sourcing, CQRS is a natural fit—you can keep a complete history of every change, which is super helpful for debugging or understanding how your data ended up in its current state.

## Typical use cases and scenarios  

Context: 
> CQRS is a concept that builds on Domain Driven Design (DDD), and an important strategic concept of DDD is the so-called `Bounded Context`. There can be multiple Bounded Contexts in a single application and they can be implemented in different ways


Here's the thing—most systems actually fit the CRUD mental model just fine, and you should stick with that unless you have a good reason not to. CQRS works best when applied to specific *bounded contexts* rather than your entire system.

CQRS really shines in high-performance applications where you have way more reads than writes (or vice versa). It lets you separate the load and even use different systems for each if needed. But remember, there are other options too, like using separate read/write databases or a reporting database. 

## CQRS vs. traditional CRUD

So, how does CQRS stack up against the classic CRUD approach? Well, CRUD (Create, Read, Update, Delete) is what most of us start with—one model, one set of operations, everything in one place. It’s simple and works great for a lot of apps, especially when things aren’t too complicated and performance isn’t a huge concern.

But as your app grows, you might notice that trying to optimize for both reads and writes with a single model gets tricky. You end up with code that’s hard to maintain, and sometimes you have to make weird compromises just to keep things working. That’s where CQRS comes in.

With CQRS, you split things up: one model for commands (writes/updates), and another for queries (reads). This means you can make your read side super fast and tailored for how people actually use your data, while keeping your write side focused on making sure everything stays correct and consistent. It’s like having two toolkits—one for building stuff, and one for looking at it.

In short: CRUD is awesome for straightforward apps, but if you’re running into pain points with performance, complexity, or scaling, CQRS might be worth a look. It’s not a silver bullet, but it can make life a lot easier in the right situations. 


## Event sourcing and its relationship with CQRS

Alright, let’s talk about event sourcing and how it fits in with CQRS. Imagine you’re keeping a diary, but instead of just writing down the current state of your life (“Today I have a dog and a new job”), you jot down every single thing that happens (“Adopted a dog,” “Started a new job,” “Moved to a new city,” etc.). That’s basically what event sourcing is for your app—it stores every change as an event, rather than just the latest state.

Now, why does this matter for CQRS? Well, CQRS is all about separating reads and writes, right? Event sourcing takes this a step further by making your write side all about recording events. Every time something changes, you save an event (“UserCreated,” “OrderPlaced,” “EmailChanged”). Then, when you need to know the current state, you just replay all those events in order to rebuild it.

The cool part is that this works really well with CQRS. Your command side (writes) just records events, and your query side (reads) can build whatever view of the data it needs by processing those events. Plus, you get a full history of everything that’s ever happened in your system, which is awesome for debugging, audits, or just figuring out “how did we get here?”

Of course, event sourcing isn’t required for CQRS, but they’re like peanut butter and jelly—they just go together nicely, especially in complex systems where you want that extra flexibility and traceability.  

# Real-world example

> A great metaphor for CQRS would be the old-fashioned manual banking systems (before software existed). There were tellers who dealt with monetary transactions - they would spend the entire work day adding, removing and transferring sums of money between accounts. That's the transactional "system". And then at the end of the day/week/month the accountants in each branch of the bank would go over all the transaction ledgers and generate the up-to-date balances, calculate the interest due and various fees, etc. The accountants could see the bigger picture, while the tellers just cared about helping customers move money around. Those accountants represent the reporting "systems" which consume the business events coming from the transactional side, and have an eventually-consistent birds eye view of everything happening on the transactional side.  
[u/addys on Is it really true that CQRS is very helpful and effective when using with microservices](https://www.reddit.com/r/dotnet/comments/1bfwhk0/comment/kv6nqvw/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)


# Conclusion and further reading  

All in all, there are various ways to optimize your system. CQRS works well when you have a drastic difference between your read and write models, but being forced to use the same model for both is causing friction or loss of performance.

- [CQRS](https://martinfowler.com/bliki/CQRS.html)
- [CQRS pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Is it really true that CQRS is very helpful and effective when using with microservices.](https://www.reddit.com/r/dotnet/comments/1bfwhk0/is_it_really_true_that_cqrs_is_very_helpful_and/)