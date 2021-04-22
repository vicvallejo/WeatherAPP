
var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var fordate;
var fortemp;
var himidity;
var windspeed;
var but11;
var CitiStore = localStorage.getItem('myArray');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
   storeTodos(username);
    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a city');
  }
};


var buttonClickHandler = function (event) {
  var user = event.target.getAttribute('value');
    getUserRepos(user);

};



var getUserRepos = function (user) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + user + '&units=metric&appid=89e57efb54e5a4863d782e97c763d2cd';

  localStorage.setItem("c", user);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

      console.log(data);
   
      var cric = data.weather[0].icon;
      var lati = data.coord.lat;
      var long = data.coord.lon;
      var curt = data.main.temp;
      var humi = data.main.humidity;
      var windi = data.wind.speed;
      var curdate = data.main.dt_txt;

      list = document.createElement('li');
      list.setAttribute("id", "currlist");

      var imagec = document.createElement('img');
      imagec.setAttribute("src", "http://openweathermap.org/img/wn/"+cric+"@2x.png");
      var h5cf = document.createElement('h5');
      h5cf.textContent = curdate;
      var h4cf = document.createElement('h4');
      h4cf.textContent = curt+" Cent";
      var p1cf = document.createElement('p');
      p1cf.textContent = humi + " % Huminity";
      var p2cf = document.createElement('section');
      p2cf.textContent = windi+" wind speed";
    
      list.appendChild(h5cf);
      list.appendChild(imagec);
      list.appendChild(h4cf);
      list.appendChild(p1cf);
      list.appendChild(p2cf);
      
    
     h5cf.setAttribute("id", "h5c");
     imagec.setAttribute("id", "imaec");
     h4cf.setAttribute("id", "h4c");
     p1cf.setAttribute("id", "p1c");
     p2cf.setAttribute("id", "p2c");
    
     document.getElementById('currwe').appendChild(list);


     var uviUrl = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lati + '&lon=' + long + '&appid=89e57efb54e5a4863d782e97c763d2cd';
     fetch(uviUrl)
       .then(response => response.json())
       .then(data => {
         var uvi = data.value;
         console.log(uvi);
         list1 = document.createElement('li');
         list1.setAttribute("id", "currlist2");
         diviuvin = document.createElement('h5');
         diviuvin.textContent = uvi + " UV Index";
         diviuvin.setAttribute("id","uvidi");
         list1.appendChild(diviuvin);

         document.getElementById('currwe').appendChild(list1);       
         
       });
   });
    

  var UrlFor = 'https://api.openweathermap.org/data/2.5/forecast?q=' + user + '&units=metric&appid=89e57efb54e5a4863d782e97c763d2cd';
  fetch(UrlFor)
    .then(response => response.json())
    .then(data => {

      var arrday = [3, 11, 19, 27, 35];
       
      for (var i = 0; i < arrday.length; i++) {
        var hour = arrday[i];
        var day = data.list[hour];
        var fordate = day.dt_txt;
        var fortemp = day.main.temp;
        var foricon = day.weather[0].icon;
        var himidity = day.main.humidity;
        var windspeed = day.wind.speed;
        
        list = document.createElement('li');
        list.setAttribute("id", "forelist");
  
        var imagew = document.createElement('img');
        imagew.setAttribute("src", "http://openweathermap.org/img/wn/"+foricon+"@2x.png");
        var h5wf = document.createElement('h5');
        h5wf.textContent = fordate;
        var h4wf = document.createElement('h4');
        h4wf.textContent = fortemp + " Cent";
        var p1wf = document.createElement('p');
        p1wf.textContent = himidity + " % Huminity";
        var p2wf = document.createElement('section');
        p2wf.textContent = windspeed + " Wind Speed";
      
        list.appendChild(h5wf);
        list.appendChild(imagew);
        list.appendChild(h4wf);
        list.appendChild(p1wf);
        list.appendChild(p2wf);
      
       h5wf.setAttribute("id", "h5w");
       imagew.setAttribute("id", "ima");
       h4wf.setAttribute("id", "h4w");
       p1wf.setAttribute("id", "p1w");
       p2wf.setAttribute("id", "p2w");
      
       document.getElementById('wedays').appendChild(list);
      }
   });
}



function storeTodos(user) {
 
 localStorage.setItem("cities" ,JSON.stringify(user));
 var todo = CitiStore;

 var li1 = document.createElement("li");
 li1.textContent = user;

  var but1 = document.createElement("button");
  but1.setAttribute("id", "butret");
  but1.setAttribute("value", user);
  but1.setAttribute("class", " .btn-inline");

  li1.appendChild(but1);

  document.getElementById('cities').appendChild(li1);

  var but11 = document.querySelector('#butret');
  but11.addEventListener('click', buttonClickHandler);

 console.log(CitiStore);
};

function lodquerry() {
  var user = document.getElementById("#butret").value;
  getUserRepos();
}


userFormEl.addEventListener('submit', formSubmitHandler);




