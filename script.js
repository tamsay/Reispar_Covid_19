const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})

// const key = "e6ef2cde327f46e3820d0344025b79fc"
// const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${key}`


const recievedNews = (newsdata) => {
    const articlesDiv = document.querySelector("#newsFeed")
    newsdata.articles.forEach((article) => {
			
			//Here we create and add html elements to our html file
      const div = document.createElement("div")
      div.className = "news"
      div.innerHTML = `
      <h2>${article.title}</h2>
			<img src="${article.urlToImage}"/>`
      articlesDiv.appendChild(div)
    })
}

var url = 'http://newsapi.org/v2/top-headlines?' +
  'country=us&' +
  'apiKey=95652013248a41419ede93837e41b30d';
//Fetch sends a request to the API.
//Promise makes it possible to run this in the background. När vi får APIet då går den vidare och skickar tillbaka JSON.
fetch(url)
  .then(response => response.json())
  .then(recievedNews)

var req = new Request(url);
fetch(req)
.then(function(response) {
console.log(response.json());
})

const displayData = () => {
  
  fetch('https://cors-anywhere.herokuapp.com/https://reisparcovid19.herokuapp.com?continent=world')
  .then((res) => res.json())
  .then((data) => {
    let output = '<h2>World Stats</h2>';
    data.output += `
        <ul>
          <li>${stat.Total_Cases}<li>
          <li>${stat.Total_Recovered}<li>
        </ul>  
    `;
    document.getElementById('resultDisplay').innerHTML = output;
  });
  
}

//this function fetches data from the reispar covid API
const worldData = () => {
  
  fetch('https://cors-anywhere.herokuapp.com/https://reisparcovid19.herokuapp.com?continent=world')
  .then((res) => res.json())
  .then((data) => {
    let output = '<h2>COvid Stats</h2>';
    data.forEach(function(stat){
      output += `
        <table>
        <tr>
          <td>${stat.Country}</td>
          <td>${stat.Total_Cases}</td>
          <td>${stat.Total_Recovered}</td>
          <td>${stat.Active_Cases}</td>
          <td>${stat.Serious}</td>
        </tr>
       </table>
      `;
    })
    document.getElementById('countryStatistics').innerHTML = output;
  });
  
}

worldData();