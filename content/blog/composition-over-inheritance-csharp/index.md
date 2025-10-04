---
title: Is “Composition over Inheritance” Hard in C#?
date: "2025-10-02T20:00:00.000Z"
description: "Exploring why C# makes inheritance effortless with simple syntax while composition requires extensive boilerplate code for method delegation. A look at how other languages like Go and Kotlin solve this problem and what strategies C# developers use to work around these limitations."
---

> This post is a summary with some of my personal opinions on this post on Reddit - [Why "composition over inheritance" is still hard in C#](https://www.reddit.com/r/csharp/comments/1mpiqmz/why_composition_over_inheritance_is_still_hard_in/?share_id=XhntU5Nhp8bkMygmQZslj&utm_content=1&utm_medium=ios_app&utm_name=iossmf&utm_source=share&utm_term=22)


Somehow I have felt this issue, but recently learned the problem isn't a personal one but more generic. 
TIL: “Prefer composition over inheritance.” It’s a common design principle meant to avoid fragile class hierarchies. But if you’re a C# developer, you’ve probably noticed something: inheritance is easy, while composition often feels like a chore.

Let’s explore why, what the community says about it, and how other languages (like Go) approach the problem.

## Inheritance is effortless in C#

C# makes inheritance ridiculously convenient. Want to extend a class? It’s literally one line:
```csharp
class MyButton : Button 
{
    // override OnClick or add custom behavior
}
```

And that’s it — you instantly get all of `Button`’s behavior, plus your own.

## Composition is boilerplate-heavy

Now let’s try the same idea using composition:
```csharp
class MyButton 
{
    private Button _button = new Button();

    public void Draw() => _button.Draw();
    public void Click() => _button.Click();
    public void Resize() => _button.Resize();
    // …and dozens more methods to delegate
}
```

Notice the problem? You’re writing tons of glue code just to forward calls to the underlying object. No special syntax exists to reduce this boilerplate.

That friction alone pushes many developers back toward inheritance, even when composition would be a better long-term choice.

## Frameworks don’t help

It’s not just the syntax. Many .NET frameworks (WinForms, WPF, Unity) were designed around subclassing.

They expect you to override `OnX` methods and extend classes directly. Over time, this leads to brittle hierarchies that are hard to untangle.

As one developer put it:

> “I’ve wasted months untangling WinForms inheritance chains… absolute nightmare.”

## The button example: subclass explosion

A classic illustration is the humble UI button.

- You want a blue button → subclass.
- You want a pill-shaped button → subclass.
- You want a button that logs clicks → subclass again.

Suddenly, you’re juggling classes like `BluePillLoggingButton` and `RoundedRedButtonWithAnalytics`.

With composition, you could build a `Button` that has a `ColorBehavior`, a `ShapeBehavior`, and a `LoggingBehavior`. Each concern stays separate, and you don’t drown in subclasses.

The catch: in C#, composition means writing all those delegate methods by hand.

## What other languages do better

Languages like Kotlin or Go provide syntax that makes composition less painful.

In Kotlin, you can delegate automatically:
```kotlin
class LoggingRepository(private val repo: Repository) : Repository by repo {
    override fun save(item: Item) {
        println("Logging save")
        repo.save(item)
    }
}
```

That `by repo` forwards all the methods for you.

In Go, there’s embedding:
```go
type Engine struct{}

func (e Engine) Start() { fmt.Println("Engine starting...") }

type Car struct {
    Engine  // embedded, not just a field
}

func (c Car) Drive() {
    c.Start() // method is accessible directly!
    fmt.Println("Car driving...")
}
```

Go’s embedding is essentially composition with inheritance-like syntax. No boilerplate, but still flexible.

## Community strategies in C#

Since C# doesn’t support delegation out of the box, developers resort to:
- Source generators to auto-generate forwarding methods
- Dynamic proxies for runtime delegation
- Mixin libraries to simulate traits
- Or just sticking with inheritance when it’s “good enough”

Others have suggested a hybrid approach: use composition for flexible behaviors, inheritance for core identity, and aggressively seal classes to prevent hierarchy sprawl.

## The takeaway

Composition often produces cleaner, more modular code. But in C#, it comes at a cost: inheritance is one line, composition is 30 lines of boilerplate.

Until the language itself adds built-in delegation or mixin support, “prefer composition over inheritance” will remain easier said than done.