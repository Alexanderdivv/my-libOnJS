var quotes=["The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela",
            "The way to get started is to quit talking and begin doing. -Walt Disney",
            "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. -Steve Jobs", 
            "If life were predictable it would cease to be life, and be without flavor-Eleanor Roosevelt"];
  
function generate(){
  let random = Math.floor(Math.random() * quotes.length);
  console.log(quotes[random]);
  document.getElementById('quoteSection').innerHTML=quotes[random];
}

function seeAllQuotes(){
  text = "<ul>";  //create bullet
  for (i=0; i<quotes.length; i++){
      text  += "<li>" + quotes[i] + "</li>";
  }
  text += "</ul>";
  document.getElementById("quoteSection").innerHTML = text;
}

function newQuotes(){
  var newQuotes = document.getElementById("insertSection").value;
  alert("quotes added");
  quotes.push(newQuotes);
  seeAllQuotes();
}