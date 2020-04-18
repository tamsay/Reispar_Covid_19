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
        // createArticle(article,name)
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

// fetch('https://gnews.io/api/v3/search?q=covid-19 | coronavirus?&token=b0f2424c549bcfcad8558f929836b197')
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//       console.log(data)
//         recievedNews(data)
//     });

    fetch('    https://newsapi.org/v2/everything?q=covid-19 AND coronavirus&pageSize=8&apiKey=95652013248a41419ede93837e41b30d')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      console.log(data)
        recievedNews(data)
    });




    /*
    Carousel
*/
$('#carousel-example').on('slide.bs.carousel', function (e) {
  /*
      CC 2.0 License Iatek LLC 2018 - Attribution required
  */
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 5;
  var totalItems = $('.carousel-item').length;

  if (idx >= totalItems-(itemsPerSlide-1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i=0; i<it; i++) {
          // append slides to end
          if (e.direction=="left") {
              $('.carousel-item').eq(i).appendTo('.carousel-inner');
          }
          else {
              $('.carousel-item').eq(0).appendTo('.carousel-inner');
          }
      }
  }
});