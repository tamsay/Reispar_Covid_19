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