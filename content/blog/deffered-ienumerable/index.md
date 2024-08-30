---
title: IEnumerable execution is deferred 
date: "2020-11-20T18:00:00.000Z"
description: "This is an interesting story about how the 1% of the time when you don't know what you're doing can come back to bite you. This is when I learned about the concept of deferred execution in C#, including its effects on performance, memory efficiency, and composition, as well as the differences between IEnumerable and List"
---

## Backstory

We were debugging a piece of code in C# and had added stopwatch to measure the performance of execution of certain sections of the code and for some reason looping over a set of elements was taking 50 seconds when all the per-processing was taking like under 0.1 sec. After an undisclosed hours of debugging (cause it was humiliating) we found the out that the dataset was a IEnumerable and the 50 seconds were actually taken in the pre-processing, but due to the nature of deferred execution, stopwatch was showing the execution time of registering the query and not it’s execution. 

So this blog is more for me than for you, hoping 5 years from now I will stumble onto the same issue can google will recommend me own blog ☠️

## What is Deferred Execution?

Deferred execution, also known as lazy evaluation, means that the evaluation of an expression is delayed until its realized value is actually required or requested. In the context of IEnumerable, this means that when you define a query, it isn't executed immediately. Instead, the query is only executed when you iterate over the results.

## How Deferred Execution Works

When you create a LINQ query or any other IEnumerable sequence, you're essentially creating a blueprint for how to get the data, not the data itself. The actual execution of this blueprint is postponed until you start iterating over the sequence.

```
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var evenNumbers = numbers.Where(n => n % 2 == 0);
// At this point, no filtering has actually occurredIn this example, evenNumbers is an IEnumerablethat represents the concept of "all even numbers in the list". The Where method hasn't actually been called yet.
```

## Benefits of Deferred Execution

- **Improved Performance:** By delaying execution, you can avoid unnecessary computations. If you only need the first few elements of a large sequence, deferred execution allows you to stop processing once you have what you need.
- **Memory Efficiency:** Since the entire result set doesn't need to be in memory at once, you can work with very large data sets more efficiently.
- **Composition:** You can build complex queries by chaining multiple operations together without incurring the cost of multiple iterations over the data.

## When is the Query Actually Executed?

The query is executed when:

- You iterate over the results using a foreach loop
- You call methods like ToList(), ToArray(), or ToDictionary()
- You use operators like First(), Last(), or Count()

## Example of Deferred Execution

```javascript
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var query = numbers.Where(n => n > 2).Select(n => n * 2);
numbers.Add(6); // This will affect the query result
foreach (var num in query)
{
    Console.WriteLine(num); // Output: 6, 8, 10, 12
}
```

In this example, even though we modified the numbers list after defining the query, the new element is included in the result. This is because the query isn't executed until the foreach loop.

```csharp
var stopwatch = new Stopwatch();

IList<string> paragraph = new List<string> { "This", "is", "a", "test", "program" };

stopwatch.Start(); // Timmer started

var waitingParagrapg = paragraph.Select(value =>
{
    Thread.Sleep(500); // Do some heavy processing
    return value;
});

Console.WriteLine($"Time taken - {stopwatch.Elapsed}"); // Around 00:00:00.0006335
stopwatch.Restart(); // Reset timer to -> 0

foreach (var value in waitingParagrapg)
{
    Console.Write($"{value} "); // Output: This is a test program
}

Console.WriteLine($"Time taken - {stopwatch.Elapsed}"); // Around 00:00:02.6724506
```

In this example, even though we are stopping the execution using `Thread.Sleep` in the `.Select` projection, this doesn’t gets executed until we start writing all the elements one by one. 

And this is how you can create that typing awareness animation with some tweeking of randomness in `Thread.Sleep` time to give it that effect

![typing awareness animation](./media/WindowsTerminal_U4dYkwMC6t.gif)

## Difference between Deferred Execution of IEnumerable and a List in C#

Understanding the difference between IEnumerable and List in terms of execution is crucial for efficient C# programming. Here's a comparison:

- **Evaluation:** IEnumerable uses deferred execution, List executes immediately and stores all results in memeory.
- **Memory:** IEnumerable is memory efficient since it doesn’t store all elements in memory at once, whereas List does hence it can be memory-intensive
- **Performance:** IEnumerable can be performant when don’t need all elements at once, List can be faster for when you need repeated access to elements since the data is already in-memory.

Here's an example to illustrate the difference:

```
var numbers = new List<int> { 1, 2, 3, 4, 5 };

// IEnumerable (deferred execution)
var evenNumbersQuery = numbers.Where(n => n % 2 == 0);

// List (immediate execution)
var evenNumbersList = numbers.Where(n => n % 2 == 0).ToList();

numbers.Add(6);

Console.WriteLine("IEnumerable results:");
foreach (var num in evenNumbersQuery)
{
    Console.WriteLine(num); // Output: 2, 4, 6
}

Console.WriteLine("List results:");
foreach (var num in evenNumbersList)
{
    Console.WriteLine(num); // Output: 2, 4
}
```

In this example, the IEnumerable query (evenNumbersQuery) includes the newly added number 6, while the List (evenNumbersList) does not, as it was evaluated before the addition.

Choose between IEnumerable and List based on your specific use case, considering factors like data size, frequency of access, and whether you need a snapshot or the most up-to-date data.

## Conclusion

99% of the times I would have gotten away without knowing, but it’s for that 1% when not having a deeper or clear understanding of the platform/framework you work with can come back to bite you xD. It was a learning experience, for sure!!