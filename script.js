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

const recievedNews = (newsdata) => {

    const articlesDiv = document.querySelector("#newsFeed")

    let  createArticle=(article, activeClass)=>{	
      const wrapperDiv = document.createElement('div')
      const div = document.createElement("div");
      const title = document.createElement('h2');
      const image = document.createElement('img')
      const url = document.createElement('a')
      const imageLink = document.createElement('a')
      const urlParagraph = document.createElement('p');

      div.className = activeClass
      
      url.setAttribute('href', `${article.url}`)
      url.setAttribute('target', '_blank')

      url.innerText = `Click To Visit Page`;
      urlParagraph.appendChild(url);

      title.innerText = `${article.title}`

      image.className = 'imageLink img-fluid mx-auto d-block'
      image.setAttribute('src', `${article.urlToImage}`);
      imageLink.appendChild(image);
      imageLink.setAttribute('href', `${article.url}`)
      imageLink.setAttribute('target', '_blank')

      div.appendChild(title);
      div.appendChild(urlParagraph);
      div.appendChild(imageLink);
      articlesDiv.appendChild(div)
      
    };

    for(let x=0; x <= newsdata.articles.length; x++){
      let article = newsdata.articles[x];
      
      if( x === 0){
        let name = "news carousel-item col-12 col-sm-6 col-md-4 col-lg-3 active"
        createArticle(article, name)
      }
      else if((x >= 1) && (x < newsdata.articles.length)){
        let name = "news carousel-item col-12 col-sm-6 col-md-4 col-lg-3"
        createArticle(article,name)
      }
      else {
        let name = "news carousel-item col-12 col-sm-6 col-md-4 col-lg-3"
      
        const wrapperDiv = document.createElement('div')
        const div = document.createElement("div");
        const title = document.createElement('h2');
        const image = document.createElement('img')
        const url = document.createElement('a')
        const imageLink = document.createElement('a')
        const urlParagraph = document.createElement('p');

        div.className = name
        
        url.setAttribute('href', `https://ourworldindata.org/covid-testing`)
        url.setAttribute('target', '_blank')

        url.innerText = `Click To Visit Page`;
        urlParagraph.appendChild(url);

        title.innerText = `To understand the global pandemic, we need global testing – the Our World in Data COVID-19 Testing dataset`

        image.className = 'imageLink img-fluid mx-auto d-block'
        image.setAttribute('src', `https://ourworldindata.org/default-thumbnail.jpg`);
        imageLink.appendChild(image);
        imageLink.setAttribute('href', `https://ourworldindata.org/covid-testing`)
        imageLink.setAttribute('target', '_blank')

        div.appendChild(title);
        div.appendChild(urlParagraph);
        div.appendChild(imageLink);
        articlesDiv.appendChild(div)
      }
    };
}

    fetch('https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=covid-19 AND coronavirus AND health&pageSize=20&apiKey=95652013248a41419ede93837e41b30d')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      console.log(data)
       recievedNews(data)
    });

const createTable=(tableData)=>{
  
    $("#countryStatistics").tabulator({
      
      autoResize: true,
      height: 400,
      virtualDomBuffer:300,
      placeholder: 'Data Loading',
      // layout:"fitColumns",
      layout:"fitDataStretch",

      rowFormatter:function(row){
        if(row.getData().col == "blue"){
            row.getElement().style.backgroundColor = "#A6A6DF";
        }
    },
  
      columns:[
        {title:"Country", field:"Country", sorter: 'string', editor:"false", frozen:true},
        {title:"Total Cases", field:"Total_Cases", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"New Cases", field:"New_Cases", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"Total Deaths", field:"Total_Deaths", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"New Deaths", field:"New_Deaths", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"Total Recovered", field:"Total_Recovered", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"Active Cases", field:"Active_Cases", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"Serious/Critical", field:"Serious/Critical", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"Total Cases/Million", field:"Tot_Cases", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"Deaths", field:"Deaths", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"Total Tests", field:"Total_Tests", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"Tests/Million", field:"Tests", align:"center", sorter: 'number', editor:false, formatter:"money", formatterParams:{thousand:",", precision:false}},
        {title:"Continents", field:"Continents", align:"center", sorter: 'string', editor:false},
      ],
    });
  
    $("#countryStatistics").tabulator('setData', tableData)
}

$(window).resize(function(){
  $("#countryStatistics").tabulator("redraw", true); //trigger full rerender including all data and rows
});


var myHeaders = new Headers();
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
fetch("https://reisparcovid19.herokuapp.com?continent=world", requestOptions)
  .then(response => response.json())
  .then(result =>{
  createTable(result);
  }) 
  .catch(error => console.log('error', error));


  $('#carouselExampleIndicators').carousel({
    interval :5000
  })