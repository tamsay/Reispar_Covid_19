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
    newsdata.articles.forEach((article) => {
			
      const div = document.createElement("div");
      const title = document.createElement('h2');
      const image = document.createElement('img')
      const url = document.createElement('a')
      const imageLink = document.createElement('a')
      const urlParagraph = document.createElement('p');

      div.className = "news"
      image.className = 'imageLink'
      
      url.setAttribute('href', `${article.url}`)
      url.setAttribute('target', '_blank')


      url.innerText = `Click To Visit Page`;
      urlParagraph.appendChild(url);

      title.innerText = `${article.title}`

      image.setAttribute('src', `${article.image}`);
      imageLink.appendChild(image);
      imageLink.setAttribute('href', `${article.url}`)
      imageLink.setAttribute('target', '_blank')

      div.appendChild(title);
      div.appendChild(urlParagraph);
      div.appendChild(imageLink);
      articlesDiv.appendChild(div)
    })
}

fetch('https://gnews.io/api/v3/search?q=example&token=b0f2424c549bcfcad8558f929836b197')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        recievedNews(data)
    });