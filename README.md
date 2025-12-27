 JavaScript Practice - Interactive Console Projects: 64–75;

This project contains JavaScript console-based exercises, each designed to strengthen understanding of strings, numbers, user input, functions, loops, arrays, objects and conditionals.
Tasks use prompt-sync to collect user input and run directly in the terminal.

ეს პროექტი შეიცავს ინტერაქტიულ JavaScript ამოცანას, რომლებიც დაგეხმარებათ სტრიქონების, რიცხვების, ფუნქციების, ციკლების, მასივების, ობიექტებისა და პირობითი ოპერატორების უკეთ გაგებაში.
ამოცანა ტერმინალში მუშაობს და მომხმარებლის ინფუთს იღებს prompt-sync–ით.

---
script.js includes :

## 📚 Projects / პროექტები

### ✅ Project 64 – Filtering Records

Filter data by first or last name

Sort: FirstName, LastName, Position, SeparationDate

Display results as a table

### ✅ Project 65 – Who’s in Space?

Open Notify API

List of people in space (ISS)

### ✅ Project 66 – Grabbing the Weather

OpenWeatherMap API

Current city weather (°C)

### ✅ Project 67 – Flickr Photo Search

- Flickr Public Photos API

- Search photos by tag

### ✅ Project 68 – Movie Recommendations

- Displaying movie information (conceptual example)

- Recommendation by rating

### ✅ Project 69 – FIGlet ASCII Art

- Convert text to ASCII art

- Font selection

### ✅ Project 70 – Testing my twttr

- Removing Vowels from a String

- Modular Structure + Testing

### ✅ Project 71 – Back to Bank

Return score based on greeting (0 / 20 / 100)

case-insensitive logic

### ✅ Project 72 – Vanity Plate Validation

- License plate validation according to rules

- returns true / false

### ✅ Project 73 – Refueling

- Convert fraction to percentage (X/Y → %)

- Fuel gauge: E, F, or Z%

### ✅ Project 74 – Pizza Py

- Reading pizza menu from CSV file

- Generating ASCII table

### ✅ Project 75 – Scourgify

- "Cleaning" CSV data

- Separating first and last names into separate columns

---

tests.js includes :

- Testing Approach

Instead of using Jest or Mocha, this project uses custom test helper functions:

- test() – checks returned values

- testError() – checks thrown errors

Each function has its own test block.

Functions Overview
### 1️⃣ shorten(word)

- Removes all vowels (a e i o u, case-insensitive) from a string.

Examples:

- twitter → twttr

- AEIOU → ""

### 2️⃣ value(word)

- Calculates score based on specific letter rules.

Examples:

- hello → 0

- hola → 20

- bonjorno → 100

### 3️⃣ isValid(username)

Validates a username with rules such as:

- Must contain letters

- Numbers allowed only at the end

- No special characters

- Cannot start with numbers

Examples:

- aks97 → true

- david10 → false

### 4️⃣ convert(fraction)

- Converts a fraction string (X/Y) into a percentage.

Error handling:

- Invalid format (3/9/5)

- Non-integers (1.5/3)

- Division by zero (3/0)

X > Y (9/3)

### 5️⃣ gauge(percent)

Returns fuel gauge representation:

- <= 1 → E

- >= 99 → F

- Otherwise → "XX%"
 

## 🚀 Run the project / გაშვება

1. Install Node.js
2. Install **prompt-sync** 
```bash
npm install prompt-sync
```
3. Install dependencies:
```bash
npm install figlet
```
4. Run the script:

```bash
node script.js
```
5. Run the tests:

```bash
node tests.js
```

---

## 📝 Technologies Used / გამოყენებული ტექნოლოგიები

- **JavaScript**
- **Node.js**
- **prompt-sync**
- File System (fs)
