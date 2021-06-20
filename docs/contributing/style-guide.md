We follow the [Roblox style guide](https://roblox.github.io/lua-style-guide). More information will come soon.

<!---
## Guiding Principles

* The purpose of a style guide is to avoid arguments.
    * There's no one right answer to how to format code, but consistency is important, so we agree to accept this one, somewhat arbitrary standard so we can spend more time writing code and less time arguing about formatting details in the review.
* Optimize code for reading, not writing.
    * You will write your code once. Many people will need to read it, from the reviewers, to any one else that touches the code, to you when you come back to it in six months.
    * All else being equal, consider what the diffs might look like. It's much easier to read a diff that doesn't involve moving things between lines. Clean diffs make it easier to get your code reviewed.
* Avoid magic, such as surprising or dangerous Lua features:
    * Magical code is really nice to use, until something goes wrong. Then no one knows why it broke or how to fix it.
    * Metatables are a good example of a powerful feature that should be used with care.
* Be consistent with idiomatic Lua when appropriate.

## File Structure
Files should consist of these things (if present) in order:

1. An optional block comment talking about why this file exists
    * Don't attach the file name, author, or date -- these are things that our version control system can tell us.
2. Services used by the file, using `GetService`
3. Module imports, using `require`
4. Module-level variables and functions
5. The object the module returns
6. A return statement!

## Requires
* All `require` calls should be at the top of a file, making dependencies static.
* Use relative paths when importing modules from the same package.

```lua
local OtherThing = require(script.Parent.OtherThing)
```

* Use absolute paths when importing modules from a different package.

```lua
local CorePackages = game:GetService("CorePackages")
local Roact = require(CorePackages.Roact)
```

## Naming
* Spell out words fully! Abbreviations generally make code easier to write, but harder to read.
* Use `PascalCase` names for class and enum-like objects.
* Use `PascalCase` for all Roblox APIs. `camelCase` APIs are mostly deprecated, and therefore shouldn't be used.
* Use `camelCase` names for local variables, member values, and functions.
* Functions may be `PascalCase` if they are one word. An exmample of this is `:Stop()`
* For acronyms within names, don't capitalize the whole thing. For example, `aJsonVariable` or `MakeHttpCall`.
* The exception to this is when the abbreviation represents a set. For example, in `anRGBValue` or `GetXYZ`. In these cases, RGB should be treated as an abbreviation of RedGreenBlue and not as an acronym.
* Consants are treated as local varibles. This is __not__ the same as the Roblox Style Guide.
* Prefix private members with an underscore, like `_camelCase`.
    * Lua does not have visibility rules, but using a character like an underscore helps make private access stand out.
* A File's name should match the name of the object it exports.
    * If your module exports a single function named `doSomething`, the file should be named `doSomething.lua`.

`FooThing.lua`:

```lua
local fooThreshold = 6

local FooThing = {}

FooThing.someMemberConstant = 5

function FooThing.go()
    print("Foo Delta:", FooThing.someMemberConstant - fooThreshold)
end

return FooThing
```

## Comments

* Wrap comments to 80 columns wide.
    * It's easier to read comments with shorter lines, but fitting code into 80 columns can be challenging.
* Use single line comments for inline notes:
    * If the comment spans multiple lines, use multiple single-line comments.

```lua
-- This condition is really important because the world would blow up if it
-- were missing.
if not foo then
    stopWorldFromBlowingUp()
end
```

* Use block comments for documenting items:
    * Use a block comment at the top of files to describe their purpose.
    * Use a block comment before functions or objects to describe their intent.

```lua
--[[
    Shuts off the cosmic moon ray immediately.

    Should only be called within 15 minutes of midnight Mountain Standard
    Time, or the cosmic moon ray may be damaged.
]]
local function stopCosmicMoonRay()
    cosmicMoonRay:Stop()
end
```

* Comments should focus on why code is written a certain way instead of what the code is doing.

Good:
```lua
-- Without this condition, the aircraft hangar would fill up with water.
if waterLevelTooHigh() then
    drainHangar()
end
```
{: .style-good }

Bad:
```lua
-- Check if the water level is too high.
if waterLevelTooHigh() then
    -- Drain the hangar
    drainHangar()
end
```
{: .style-bad }

No section comments.

Comments that only exist to break up a large file are a code smell; you probably need to find some way to make your file smaller instead of working around that problem with section comments. Comments that only exist to demark already obvious groupings of code (e.g. --- VARIABLES ---) and overly stylized comments can actually make the code harder to read, not easier. Additionally, when writing section headers, you (and anyone else editing the file later) have to be thorough to avoid confusing the reader with questions of where sections end.

Some examples of ways of breaking up files:

Move inner classes and static functions into their own files, which aren't included in the public API. This also makes testing those classes and functions easier.
Check if there are any existing libraries that can simplify your code. If you're writing something and think that you could make part of this into a library, there's a good chance someone already has.
If you can't break the file up, and still feel like you need section headings, consider these alternatives.

If you want to put a section header on a group of functions, put that information in a block comment attached to the first function in that section. You should still make sure the comment is about the function its attached to, but it can also include information about the section as a whole. Try and write the comment in a way that makes it clear what's included in the section.


--[[
    All of the readX functions return the next token from the string
    passed in to the Reader or returns nil if the next token doesn't
    match the type the function is trying to read.

    local test = "123 ABC"
    i = reader:readInt()
    print(i, ",", test.remaining) -- 123 , ABC

    readInt reads an integer, positive or negative.
]]
function Reader:readInt() -- ...

-- readFloat reads a floating point number, but does not accept
-- scientific notation
function Reader:readFloat() -- ...
The same can be done for a group of variables in some cases. All the same caveats apply though, and you have to consider whether one block comment or a normal comment on each variable (or even using just whitespace to separate groups) would be more readable.

General organization of your code can aid readibility while making logical sections more obvious as well. Module level variables and functions can appear in any order, so you can sometimes put a group of variables above a group of functions to make a section.--->