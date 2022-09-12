+++
title="radix2any"
draft=false
date=2022-08-23
[extra]
toc=true
+++

## radix2any

This is a library for converting numbers between different bases. It's still in the design phase, but the basic premise is to allow you create an arbitrary number system using a string and then convert between that number system and any other number system.  

The radix would be based on the amount of unique characters added to the string. For example, if you wanted to create a hexadecimal number system you would create a string like this:

```rust
let hex: &str = "0123456789abcdef";
let hex: String = "0123456789abcdef";
```

This is just a rough example, I still haven't decided if I want to use a macro to create a constant charset or if I want to use a function to create the charset. The difference between the two would be that the macro would be set at compile time, while the function would be set at runtime. I'm thinking I'll add both features eventually, but seperate them enough for people to choose based on their needs.

todo.....
