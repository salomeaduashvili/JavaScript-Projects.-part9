const prompt = require("prompt-sync")();
const figlet = require("figlet");
const csv = require("csv-parser");
const fs = require("fs");
const { table } = require("table");

/*
პროექტი 64 - Filtering Records - ჩანაწერების გაფილტვრა,
ჩანაწერების დახარისხება სასარგებლოა, მაგრამ ზოგჯერ საჭიროა შედეგების 
გაფილტვრა, რათა იპოვოთ ან აჩვენოთ მხოლოდ ის, რასაც ეძებთ.

მოცემული მონაცემებთა ნაკრების გათვალისწინებით:

| First Name | Last Name  | Position | Separation date  |
| --------- | --------- | ------------------- | ----------------- |
| John  | Johnson |  Manager |  2016-12-31 |
| Tou | Xiong | Software Engineer | 2016-10-05 |
| Michaela | Michaelson | District Manager | 2015-12-19 |
| Jake | Jacobson | Programmer |  |
| Jacquelyn | Jackson | DBA |  |
| Sally    | Weber| Web Developer | 2015-12-18 |

შექმენით პროგრამა, რომელიც საშუალებას აძლევს მომხმარებელს, აღმოაჩინოს
ის ჩანაწერები, რომელიც ემთხვევა მის საძიებო სტრიქონს. უნდა მოხდეს 
საძიებო სტრიქონის შედარება სახელის ან გვარის ველთან.

მაგალითად:
> Enter a search string: Jac
> Results:

| **Name** | **Position** | **Separation date**  |
| --------- | ------------ | -------------- |
| Jacquelyn Jackson | DBA |  |
| Jake Jacobson | Programmer |  |


მონაცემები იქონიეთ ობიექტების მასივში.,

დამატებითი გამოწვევა:
ჰკითხეთ მომხმარებელს, როგორ დალაგდეს ჩანაწერები. დაუშვით დახარისხება
თარიღის, პოზიციის ან გვარის მიხედვით.

Project 64 - Filtering Records - Filtering records,
Sorting records is useful, but sometimes you need to
filter the results to find or display only what you are looking for.

Given the following data set:

| First Name | Last Name | Position | Separation date |
| --------- | --------- | ------------------- | ----------------- |
| John | Johnson | Manager | 2016-12-31 |
| Tou | Xiong | Software Engineer | 2016-10-05 |
| Michaela | Michaelson | District Manager | 2015-12-19 |
| Jake | Jacobson | Programmer | |
| Jacquelyn | Jackson | DBA | |
| Sally | Weber| Web Developer | 2015-12-18 |

Create a program that allows a user to find
records that match their search string. The search string should be
matched to the first or last name field.

For example:
> Enter a search string: Jac
> Results:

| **Name** | **Position** | **Separation date** |
| --------- | ------------ | -------------- |
| Jacquelyn Jackson | DBA | |
| Jake Jacobson | Programmer | |

Keep the data in an array of objects.,

Additional challenge:
Ask the user how to sort the records. Allow sorting
by date, position, or last name.

*/

function filterObj() {
  let people = [
    {
      FirstName: "John",
      LastName: "Johnson",
      Position: "Manager",
      SeparationDate: "2016-12-31",
    },
    {
      FirstName: "Tou",
      LastName: "Xiong",
      Position: "Software Engineer",
      SeparationDate: "2016-10-05",
    },
    {
      FirstName: "Michaela",
      LastName: "Michaelson",
      Position: "District Manager",
      SeparationDate: "2015-12-19",
    },
    {
      FirstName: "Jake",
      LastName: "Jacobson",
      Position: "Programmer",
    },
    {
      FirstName: "Jacquelyn",
      LastName: "Jackson",
      Position: "DBA ",
    },
    {
      FirstName: "Sally",
      LastName: "Weber",
      Position: "Web Developer",
      SeparationDate: "2015-12-18",
    },
  ];
  let target = prompt("Enter a search string: ").trim();

  let filtered = people.filter(
    (person) =>
      person.FirstName.includes(target) || person.LastName.includes(target)
  );
  console.log(filtered);
  let choice = prompt("what value you want for data to be sorted for: ");
  let sorted;
  if (
    choice === "LastName" ||
    choice === "FirstName" ||
    choice === "Position"
  ) {
    sorted = filtered.sort((a, b) => a[choice].localeCompare(b[choice]));
  } else if (choice === "SeparationDate") {
    sorted = filtered
      .filter((key) => key.hasOwnProperty("SeparationDate"))
      .sort((a, b) => a.SeparationDate.localeCompare(b.SeparationDate));
  } else {
    console.log("Enter the right property name:!");
  }

  console.log("| **Name** | **Position** | **Separation date**|");
  console.log("| ---------| ------------ | ------------------ |");
  sorted.forEach((person) => {
    let name = `${person.FirstName} ${person.LastName}`;
    let position = person.Position;
    let date = person.SeparationDate;
    console.log(`| ${name} | ${position} | ${date || ""} |`);
  });
}

filterObj();

/*
პროექტი 65 - Who’s in Space? - ვინ არის კოსმოსში?,
იცოდით, რომ ზუსტად შეგიძლიათ გაიგოთ, ვინ არის ახლა კოსმოსში? ამის შესახებ ინფორმაციას 
Open Notify API გვაწვდის. ეწვიეთ ბმულს: http://api.open-notify.org/astros.json, რომ 
ნახოთ არა მხოლოდ რამდენი ადამიანი იმყოფება ამჟამად კოსმოსში, არამედ - მათი სახელები და 
ის, თუ რომელ კოსმოსურ ხომალდზე იმყოფებიან.

შექმენით პროგრამა, რომელიც ამოიღებს ამ მონაცემებს და აჩვენებს ინფორმაციას ამ API-დან 
ცხრილის ფორმატში.

Project 65 - Who’s in Space? - Who is in Space?
Did you know that you can find out exactly who is in space right now?
The Open Notify API provides this information. Visit the link: http://api.open-notify.org/astros.json to
see not only how many people are currently in space, but also their names and
which spacecraft they are on.

Create a program that extracts this data and displays the information from this API
in a table format.

For example:

| **Name** | **Craft** | 
| --------- | ------------ | 
| Gennady Padalka | ISS |
| Mikhail Kornienko | ISS |
| Scott Kelly |  ISS | 

*/

async function whoIsInSpace() {
  try {
    let response = await fetch("http://api.open-notify.org/astros.json");
    if (response.status !== 200) {
      throw new Error("Request failed");
    }
    let data = await response.json();
    console.log("| **Name** | **Craft** |");
    console.log("| --------- | ---------|");
    let people = data.people;
    people.forEach((person) => {
      if (person.craft === "ISS") {
        console.log(`|${person.name}| ${person.craft}|`);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}
whoIsInSpace();

/*
პროექტი 66 - Grabbing the Weather - ამინდის გაგება,
დღეს კარგი ამინდი იქნება? თუ ქურთუკი უნდა ვიქონიი? OpenWeatherMap API-ის გამოყენებით, 
ბმულით: http://openweathermap.org/ , შექმენით პროგრამა, რომელიც მოგთხოვთ ქალაქის 
სახელს და დააბრუნებს ქალაქის მიმდინარე ტემპერატურას.

Project 66 - Grabbing the Weather - Understanding the weather,
Will the weather be nice today? Or should I wear a jacket? Using the OpenWeatherMap API,
link: http://openweathermap.org/ , create a program that asks for a city
name and returns the current temperature of the city.

For example:
> Where are you? Chicago IL
> Chicago weather:
> 65 degrees Fahrenheit
Current weather and forecast
OpenWeather provides comprehensive weather data services, including current, forecast, 
and historical weather information. Explore a wide range of APIs for solar radiation, 
road risk assessment, solar energy prediction, and more, with global coverage and 
user-friendly access. Ideal for developers and businesses seeking accurate and 
reliable weat...*/

async function theWeather() {
  let city = prompt("Enter the city: ");
  let apiKey = 123; //this is an example! write ur key. //

  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log(` Weather in ${data.name}`);
    console.log(`Temperature: ${data.main.temp}`);
    console.log(` Condition: ${data.weather[0].description}`);
  } catch (error) {
    console.log(error.message);
  }
}
theWeather();

/*
პროექტი 67 - Flickr Photo Search - ფოტოს ძებნა Flickr-ზე,
ზოგიერთი სერვისი ძიების ფუნქციებს უზრუნველჰყოფს და გაძლევთ კონტროლი საშუალებას თქვენ 
მიერ მიღებულ შედეგებზე. თქვენ მხოლოდ სწორი მოთხოვნის (request) ჩამოყალიბება გჭირდებათ. 
შექმენით პროგრამა გრაფიკული ინტერფეისით, რომელიც იღებს საძიებო სტრიქონს (string) და 
აჩვენებს ფოტოებს, რომლებიც შეესაბამება ამ ძიებას. სერვისად გამოიყენეთ Flickr-ის საჯარო 
ფოტოების ბმული: https://www.flickr.com/services/feeds/docs/photos_public/ 

Project 67 - Flickr Photo Search - Search for photos on Flickr,
Some services provide search functionality and give you control over the results you get.
You just need to formulate the right request.
Create a program with a graphical interface that takes a search string and
returns photos that match that search. Use the Flickr public photos link as a service: https://www.flickr.com/services/feeds/docs/photos_public/
*/

async function flickrImg(str) {
  try {
    let response = await fetch(
      `https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${str}`
    );
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}
flickrImg("skyline gtr-35");

/*
პროექტი 68 - Movie Recommendations - ფილმის რეკომენდაციები,
დაწერეთ პროგრამა, რომელიც აჩვენებს ინფორმაციას მოცემული ფილმის შესახებ. გამოიყენეთ
Rotten Tomatoes-ს API მისამართზე: http://developer.rottentomatoes.com/ და მიიღეთ API key
. მოითხოვეთ საძიებო input და აჩვენეთ შემდეგი მონაცემები: სათაური, წელი, რეიტინგი, 
გამოშვების დრო და მოკლე შინაარსი, თუ ასეთი არსებობს. მაშინ, თუ ფილმისთვის აუდიტორიის
მიერ მიცემული შეფასება 80%-ს აღემატება, პროგრამა რეკომენდაციას უწევს მომხმარებელს, რომ 
ეს ფილმი ახლავე ნახოს. თუ ქულა 50%-ზე დაბალია, რეკომენდაციაა, რომ მომხმარებელმა 
ფილმის ყურებას თავი აარიდოს. 

Project 68 - Movie Recommendations - Write a program that displays information about a given movie. Use the Rotten Tomatoes API at http://developer.rottentomatoes.com/ and get an API key.
Request a search input and display the following data: title, year, rating,
release time, and synopsis, if any. Then, if the audience rating for the movie is above 80%, the program recommends that the user
watch the movie now. If the rating is below 50%, the user is recommended to
avoid watching the movie.

For example:
> Enter the name of a movie: Guardians of the Galaxy
> Title: Guardians of the Galaxy
> Year: 2014
> Rating: PG-13
> Running Time: 121 minutes
> Description: From Marvel...
> You should watch this movie right now!*/

async function movieRecommendation() {
  try {
    let response = await fetch("http://developer.rottentomatoes.com/");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log(`${data.title}`);
    console.log(`${data.Year}`);
    console.log(`${data.Rating}`);
    console.log(`${data.RunningTime}`);
    console.log(`${data.Description}`);
    if (data.Rating > 80) {
      console.log("You should watch this movie right now!");
    }
    if (data.Rating < 50) {
      console.log("I would not reccomand you to watch this movie");
    }
  } catch (error) {
    console.log(error.message);
  }
}

/*პროექტი 69 - Frank, Ian and Glen’s Letters - ფრენკის, იანის და გლენის წერილები,
FIGlet, სახელწოდებით ფრენკის, იანის და გლენის წერილების მიხედვით, არის პროგრამა 
1990-იანი წლების დასაწყისიდან, რომელიც განკუთვნილია ჩვეულებრივი ტექსტისგან დიდი 
ასოების შესაქმნელად, ესაა ე.წ. ASCII ხელოვნების ერთგვარი ფორმა:

                    
| () | __  | || |__ ()
| | | |/ /  \ | | ' | / |
| | |   <  / | || | | | _ \
||||__|  _|| |||_/

FIGlet-ის მიერ მხარდაჭერილ შრიფტებს შორის არის figlet.org/examples.html.

განახორციელეთ პროგრამა, რომელიც:

ელოდება ორ არგუმენტს მომხმარებლის input-ის სახით:
ტექსტის str-ს (სტრიქონს).,
სასურველი შრიფტის სახელწოდებას.,

შემდეგ კი პროგრამამ უნდა გამოიტანოს ჩაწერილი ტექსტი სასურველი შრიფტით.

Project 69 - Frank, Ian and Glen’s Letters - Frank, Ian and Glen’s Letters,
FIGlet, named after Frank, Ian and Glen’s Letters, is a program from the early 1990s designed to generate uppercase letters from plain text, a form of ASCII art:

| () | __ | || |__ ()
| | | |/ / \ | | ' | / |
| | | < / | | | | | _ \
||||__| _|| |||_/

The fonts supported by FIGlet are figlet.org/examples.html.

Write a program that:

Expects two arguments as user input:

a string of text,

the name of the desired font,

and then outputs the text in the desired font.

*/

function figletFont(word, font) {
  figlet.text(word, { font: font }, (error, result) => {
    if (error) {
      console.log("couldn't generate the ASCII art");
      console.log(error.message);
      return;
    }
    console.log("\nGenerated ASCII Art:\n");
    console.log(result);
  });
}
let word = prompt("Enter your word: ");
let font = prompt("Enter the font you would like: ");

figletFont(word, font);

/*
პროექტი 70 - Testing my twttr - ჩემი twttr-ის ტესტირება,
ხელახლა დაწერეთ Setting up my twttr-ის კოდი ქვემოთ მოცემული სტრუქტურით, სადაც 
shorten ელოდება str-ს input-ად და აბრუნებს იმავე str-ს, მაგრამ ყველა ხმოვანის 
(A, E, I, O, და U) გამოტოვებით, მიუხედავად იმისა, ისინი პატარა რეგისტრშია თუ - დიდში. 
shell  
function main() {
    
}

function shorten(word) {
    
}


შემდეგ, სხვა ფაილში, შექმენით ერთი ან მეტი ფუნქცია, რომელიც ერთობლივად ამოწმებს თქვენი
კოდის მუშაობას.


Project 70 - Testing my twttr - Testing my twttr,
Rewrite the Setting up my twttr code with the structure below, where
shorten expects a str as input and returns the same str, but with all vowels
(A, E, I, O, and U) omitted, regardless of whether they are in lowercase or uppercase.
shell
function main() {

}

function shorten(word) {

}

Then, in another file, create one or more functions that collectively test your
code.

*/

function main() {
  let string = prompt("Enter your word: ");
  console.log(shorten(string));
}

function shorten(word) {
  let result = "";
  let vowels = "aeiou";
  for (let letters of word) {
    if (!vowels.includes(letters.toLowerCase())) {
      result += letters;
    }
  }
  return result;
}

main();
module.exports = shorten;

/*
პროექტი 71 - Back to Bank - ბანკის პროგრამის ტესტირება,
ხელახლა დაწერეთ პროგრამა Home Federal Savings Bank, მოახდინეთ 
თქვენი კოდის რესტრუქტურიზაცია ქვემოთ მოცემულის მიხედვით, 
სადაც value ელოდება str-ს (სტრიქონს) input-ად, შემდეგ აბრუნებს 
მთელ რიცხვს (int), კერძოდ 0-ს, იმ შემთხვევაში, თუ ეს str იწყება 
"hello"-თი; 20-ს, თუ str იწყება "h"-თი (მაგრამ არ არის "hello") 
და 100-ს ყველა სხვა შემთხვევაში. str-ში ჩაწერილ დაბალი ან მაღალი 
რეგისტრის სიმბოლოებს მნიშვნელობა არ მიანიჭოთ. შეგიძლიათ, 
ივარაუდოთ, რომ სტრიქონი, რომელიც value ფუნქციას გადაეცემა, 
ასოებამდე, წინ სივრცეს (space) არ შეიცავს. მხოლოდ main ფუნქციამ 
უნდა დაბეჭდოს შედეგი.
shell  
function main() {
...
}
    

function value(greeting) {
 ...
}
 
სხვა ფაილში შექმენით სამი ან მეტი ფუნქცია, რომლებიც ერთობლივად 
შეამოწმებენ თქვენი კოდის მუშაობას.

Project 71 - Back to Bank - Testing a Bank Program,
Rewrite the Home Federal Savings Bank program,
restructuring your code as follows,
where value expects a string as input, then returns an
int, namely 0 if the string starts with
"hello"; 20 if the string starts with "h" (but is not "hello"); and 100 otherwise. Do not assign a value to the lowercase or uppercase characters in str. You can
assume that the string passed to the value function does not contain any spaces before or after the letters. Only the main function
should print the result.
shell
function main() {
...
}

function value(greeting) {
...
}

In another file, create three or more functions that together
test the operation of your code.

*/

function mainGreeting() {
  let greeting = prompt("Greet me: ").toLowerCase().trim();
  console.log(value(greeting));
}

function value(greeting) {
  greeting = greeting.toLowerCase();
  if (greeting === "hello") {
    return 0;
  } else if (greeting[0] === "h") {
    return 20;
  } else {
    return 100;
  }
}
mainGreeting();
module.exports = value;

/*
პროექტი 72 - Re-requesting a Vanity Plate - "სანომრე ნიშნების" 
ხელახლა აღება,
https://www.youtube.com/embed/mQZmCJUSC6g?si=cgVAythYMFfl7JHv

ახლიდან დაწერეთ პროგრამა Vanity Plates, თქვენი კოდის რესტრუქტურიზაცია 
კი მოახდინეთ ქვემოთ მოცემულის მიხედვით, სადაც isValid ელოდება str-ს input-ის სახით 
და აბრუნებს true-ს, თუ ეს str აკმაყოფილებს ყველა მოთხოვნას, ხოლო თუ ვერ აკმაყოფილებს, 
მაშინ - false-ს.
shell  
function main() {
    ...
}

function isValid(s) {
    ...
}
 
სხვა ფაილში დაწერეთ ოთხი ან მეტი ფუნქცია, რომლებიც ერთობლივად და საფუძვლიანად 
შეამოწმებენ თქვენს isValid ფუნქციაში დაწერილ კოდს.

Project 72 - Re-requesting a Vanity Plate - Re-requesting a "License Plate",
https://www.youtube.com/embed/mQZmCJUSC6g?si=cgVAythYMFfl7JHv

Rewrite the Vanity Plates program, restructuring your code as follows, where isValid expects a str as input
and returns true if the str meets all the requirements, and false if it does not.
shell
function main() {
...
}

function isValid(s) {
...
}

In another file, write four or more functions that collectively and thoroughly
test the code written in your isValid function.

*/

function mainPlates() {
  let plate = prompt("Enter your plate: ").toUpperCase().trim();
  console.log(isValid(plate));
}

function isValid(plate) {
  plate = plate.toUpperCase();
  let plateLetter1 = /[0-9]/.test(plate[0]);
  let plateLetter2 = /[0-9]/.test(plate[1]);
  let symbols = /[^A-Z0-9]/.test(plate);
  let firstNumber = false;
  let zeroCheck = true;
  let middleNumber = false;

  for (let i = 0; i < plate.length; i++) {
    let test = /[0-9]/.test(plate[i]);
    if (test) {
      if (!firstNumber) {
        firstNumber = true;
        if (plate[i] === "0") {
          zeroCheck = false;
          break;
        }
      } else {
        continue;
      }
    }

    if (firstNumber && !test) {
      middleNumber = true;
      break;
    }
  }

  if (plate.length < 2 || plate.length > 6) {
    return false;
  } else if (symbols) {
    return false;
  } else if (plateLetter1 || plateLetter2) {
    return false;
  } else if (!zeroCheck) {
    return false;
  } else if (middleNumber) {
    return false;
  } else {
    return true;
  }
}
mainPlates();
module.exports = isValid;

/*
პროექტეი 73 - Refueling - საწვავის ხელახლა შევსება,
ხელახლა შექმენით Fuel Gauge პროგრამა, თქვენი კოდის რესტრუქტურიზაცია კი ქვემოთ 
მოცემულის მიხედვით მოახდინეთ.

convert ფუნქცია input-ად ელის str-ს - X/Y ფორმატში (სადაც X-იც და Y-იც მთელი რიცხვებია)
და აბრუნებს ამ წილადს პროცენტის სახით, რომელიც დამრგვალებულია უახლოეს მთელ 
რიცხვამდე (int) 0-დან 100-ის ჩათვლით. თუ X და/ან Y არ არის მთელი რიცხვი, 
ან თუ X მეტია Y-ზე, მაშინ კონვერტაციამ უნდა გამოიწვიოს შეცდომა 
(Error - გამოიყენეთ throw statement). თუ Y არის 0, მაშინ კონვერტაციამ უნდა გამოიწვიოს
სხვა შეცდომა, რომელიც მიუთითებს, რომ 0-ზე გაყოფა არ შეიძლება.

gauge ფუნქცია ელის int-ს და აბრუნებს str-ს, რომელიც არის:
"E", თუ ეს int არის 1-ზე ნაკლები ან მისი ტოლი;,
"F", თუ ეს int არის 99-ზე მეტი ან მისი ტოლი;,
და "Z%" ნებისმიერ სხვა შემთხვევაში, სადაც Z წარმოადგენს აღნიშნულ მთელ რიცხვს (int-ს).,
shell  
function main() {
    ...
}

function convert(fraction) {
    ...
}

function gauge(percentage) {
    ...
}
 
შექმენით ორი ან მეტი ფუნქცია, რომლებიც ერთობლივად შეამოწმებენ convert-ისა და gauge-ს 
კოდის ფუნქციონირებას.YouTube

Project 73 - Refueling - Rebuild the Fuel Gauge program, and restructure your code as shown below. The convert function takes a string in the format X/Y (where both X and Y are integers) and returns that fraction as a percentage, rounded to the nearest integer (int) between 0 and 100. If X and/or Y are not integers, or if X is greater than Y, then the conversion should raise an error (Error - use the throw statement). If Y is 0, then the conversion should raise another error indicating that division by 0 is not possible. The gauge function expects an int and returns a str that is:
"E" if the int is less than or equal to 1;,
"F" if the int is greater than or equal to 99;,
and "Z%" in any other case, where Z is a specified integer (int).,
shell
function main() {
...
}

function convert(fraction) {
...
}

function gauge(percentage) {
...
}

Create two or more functions that together test the functionality of the convert and gauge
code.YouTube

*/

function convert(fraction) {
  fraction = fraction.trim();
  let splited = fraction.split("/");
  if (splited.length !== 2) {
    throw new Error("Invalid Format!");
  }
  let x = Number(splited[0]);
  let y = Number(splited[1]);

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new Error("Wrong input: numbers are not integers");
  }

  if (y === 0) {
    throw new Error("Number cant be devided by 0!");
  }

  if (x > y) {
    throw new Error("X can't be greater than y!");
  }

  const percentage = Math.round((x / y) * 100);
  return percentage;
}

module.exports = convert;

function gauge(percentage) {
  if (percentage <= 1) {
    return "E";
  } else if (percentage >= 99) {
    return "F";
  } else {
    return `${percentage}%`;
  }
}

module.exports = gauge;

function mainRefueling() {
  try {
    const fraction = prompt("Enter the fraction: x/y:");
    const percent = convert(fraction);
    console.log(gauge(percent));
  } catch (error) {
    console.log(error.message);
  }
}
mainRefueling();

/*
პროექტი 74 - Pizza Py - პინოქიოს პიცა,
https://www.youtube.com/embed/TkABR72j7jU?si=eppYeKTFG7wqGkhm

ჰარვარდის მოედანზე ყველაზე პოპულარული პიცერია არის Pinocchio's Pizza & Subs, aka Noch's
, რომელიც ცნობილია თავისი სიცილიური პიცით.

ჩვეულებრივ, სტუდენტები პიცას ნაჭრებად ყიდულობენ, მაგრამ Pinocchio's-ს ასევე მენიუში აქვს 
მთელი პიცაც, სიცილიური პიცების ამ CSV ფაილის, sicilian.csv-ის თანახმად, იხილეთ:

Sicilian Pizza,Small,Large

Cheese,$25.50,$39.95
1 item,$27.50,$41.95
2 items,$29.50,$43.95
3 items,$31.50,$45.95
Special,$33.50,$47.95

ასევე, ჩვეულებრივი პიცების CSV ფაილი იხილეთ: 
https://cs50.harvard.edu/python/2022/psets/6/pizza/regular.csv

რა თქმა უნდა, CSV ფაილი არ არის მომხმარებლისთვის ყველაზე მოსახერხებელი ფორმატი. 
უფრო ლამაზი შეიძლება იყოს ცხრილი, ფორმატირებული, როგორც ASCII, შემდეგნაირად:

+------------------+---------+---------+
| Sicilian Pizza   | Small   | Large   |
+==================+=========+=========+
| Cheese           | $25.50  | $39.95  |
+------------------+---------+---------+
| 1 item           | $27.50  | $41.95  |
+------------------+---------+---------+
| 2 items          | $29.50  | $43.95  |
+------------------+---------+---------+
| 3 items          | $31.50  | $45.95  |
+------------------+---------+---------+
| Special          | $33.50  | $47.95  |
+------------------+---------+---------+
შექმენით პროგრამა, რომელიც გამოსცემს ცხრილს, რომელიც ფორმატირებულია ASCII art-ის 
tabulate-ს სახით. შეგიძლიათ ამგვარი დაფორმატებისთვის საჭირო კოდი თავად დაწეროთ, ან, 
ალტერნატიულად, გამოიყენოთ რომელიმე package.

Project 74 - Pizza Py - Pinocchio's Pizza,
https://www.youtube.com/embed/TkABR72j7jU?si=eppYeKTFG7wqGkhm

The most popular pizzeria in Harvard Square is Pinocchio's Pizza & Subs, aka Noch's
, which is known for its Sicilian pizza.

Students usually buy pizza by the slice, but Pinocchio's also has
whole pizzas on the menu, according to this CSV file of Sicilian pizzas, sicilian.csv:

Sicilian Pizza,Small,Large

Cheese,$25.50,$39.95
1 item,$27.50,$41.95
2 items,$29.50,$43.95
3 items,$31.50,$45.95
Special,$33.50,$47.95

Also, a CSV file of regular pizzas can be found here:
https://cs50.harvard.edu/python/2022/psets/6/pizza/regular.csv

Of course, a CSV file is not the most user-friendly format.
A nicer table might be formatted as ASCII, like this:

+------------------+--------+--------+
| Sicilian Pizza | Small | Large |
+=====================+===========+
| Cheese | $25.50 | $39.95 |
+------------------+--------+--------+
| 1 item | $27.50 | $41.95 |
+------------------+--------+--------+
| 2 items | $29.50 | $43.95 |
+------------------+--------+--------+
| 3 items | $31.50 | $45.95 |
+------------------+--------+--------+
| Special | $33.50 | $47.95 |
+------------------+--------+--------+

Create a program that outputs a table formatted as an ASCII art
tabulate. You can write the code for this formatting yourself, or,
alternatively, use one of the packages.

*/
function pizza() {
  const results = [];

  fs.createReadStream("regular.csv")
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
      console.log(data);
    })
    .on("end", () => {
      const data = [];
      data.push(["Regular Pizza", "Small", "Large"]);

      results.forEach((item) => {
        data.push([item["Regular Pizza"], item.Small, item.Large]);
      });

      const output = table(data);
      console.log(output);
    });
}
pizza();

/*
პროექტი 75 - Scourgify,
აჰ, კარგი, - თქვა ტონკსმა და საბარგული დახურა, - ცოტა გაწმენდა არ აწყენდა, - მან ჯოხი 
ჰედვიგის გალიას მიუშვირა, - Scourgify! -  დარჩენილი რამდენიმე ბუმბული გაქრა.,
“ჰარი პოტერი და ფენიქსის ორდენი”,

მონაცემებსაც ხშირად სჭირდება „გაწმენდა“, როგორც მისი ფორმატის ცვლილება, 
რათა მნიშვნელობები უფრო ორგანიზებულ ფორმატში იყოს. განვიხილოთ, მაგალითად, 
სტუდენტების ეს CSV ფაილი, before.csv : 
https://cs50.harvard.edu/python/2022/psets/6/scourgify/before.csv:

name,house
"Abbott, Hannah",Hufflepuff
"Bell, Katie",Gryffindor
"Bones, Susan",Hufflepuff
...

მიუხედავად იმისა, რომ ფაილში თითოეულ "ხაზში" (row) გვხვდება სამი მნიშვნელობა 
(გვარი, სახელი და ჰოგვორტსის სახლი), პირველი ორი გაერთიანებულია ერთ „სვეტში“ 
(column) - name, რომელიც გამოყოფილია ორმაგი ბრჭყალებით, გვარსა და სახელს კი მძიმე და 
ერთი ინტერვალი (space) ჰყოფთ. თუ ჰოგვარტსს სურს, თითოეულ სტუდენტს წერილი 
გაუგზავნოს, მაგალითად, ერთობლივად - მეილის საშუალებით, ეს იდეალური მოცემულობა 
არ არის. უცნაური იქნებოდა წერილის დაწყება შემდეგი სიტყვებით:

Dear Potter, Harry,

ამის ნაცვლად, უნდა იყოს, მაგალითად:

Dear Harry,

შექმენით პროგრამა, რომელიც ამ მონაცემებს გარდაქმნის აღნიშნული სახის output-ად, 
ყოფს თითოეულ გაერთიანებულ სახელსა და გვარს ცალ-ცალკე: სახელად და გვარად. 
ეს ნიშნავს, რომ "Potter, Harry",Gryffindor - ის მაგივრად, 
გვექნება: Harry,Potter,Gryffindor

Project 75 - Scourgify,
Ah, well, - Tonks said, closing the trunk, - a little cleaning wouldn't hurt, - she pointed her wand at
Hedwig's cage, - Scourgify! - The few remaining feathers are gone.,
"Harry Potter and the Order of the Phoenix",

Data also often needs to be "scourged", as in a change in its format,
so that the values ​​are in a more organized format. Consider, for example, this CSV file of students, before.csv:
https://cs50.harvard.edu/python/2022/psets/6/scourgify/before.csv:

name,house
"Abbott, Hannah",Hufflepuff
"Bell, Katie",Gryffindor
"Bones, Susan",Hufflepuff
...

Although each "row" in the file contains three values ​​
(last name, first name, and Hogwarts house), the first two are combined into a single "column"
(name), which is separated by double quotes, and the last name and first name are separated by a comma and a single space. If Hogwarts wants to send a letter to each student, for example, collectively - via email, this is not an ideal situation. It would be strange to start a letter with the following words:

Dear Potter, Harry,

Instead, it should be, for example:

Dear Harry,

Write a program that converts this data into the following type of output,
splits each combined first and last name into a separate first and last name.
This means that instead of "Potter, Harry",Gryffindor,
we will have: Harry,Potter,Gryffindor

*/

function hpSort() {
  const results = [];

  fs.createReadStream("before.csv")
    .pipe(csv())
    .on("data", (data) => {
      const [last, first] = data.name.split(",");
      results.push([first, last, data.house]);
    })
    .on("end", () => {
      const data = [["first", "last", "house"], ...results];

      const output = table(data);

      console.log(output);
    });
}

hpSort();
