

const cityName = document.getElementById("cityName");
const country = document.getElementById("country");
const timeZone = document.getElementById("timeZone");
const coords = document.querySelector(".coord").querySelectorAll("p");
const weatherType = document.getElementById("weatherType");
const weatherDesc = document.getElementById("weatherDesc");
const temp = document.querySelector(".temp").querySelectorAll("p");
const visibility = document.getElementById("visibility");
const wind = document.querySelector(".wind").querySelectorAll("p");
const clouds = document.getElementById("clouds");
const weatherImg = document.getElementById("weatherImg");

function ktc(kelvin) {
    return (kelvin - 273.15).toFixed(2);  // Convert Kelvin to Celsius
}

function getdata(location){
    let loc=location;
    let url=(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=e29b84fb67d2515b505ed73393cce6ef`);
const xhr=new XMLHttpRequest();
xhr.open("get" ,url,true);
xhr.onload=function(){
    if(this.status===200){
        let data=JSON.parse(this.responseText);
        console.log(data);
        cityName.textContent = `Location : ${data.name}`;
        country.textContent = `Country : ${data.sys.country}`;
        timeZone.textContent = `Timezone : ${data.timezone}`;
        coords[0].textContent = `Longitude : ${data.coord.lon}`;
        coords[1].textContent = `Latitude : ${data.coord.lat}`;
        weatherType.textContent = `Weather type : ${data.weather[0].main}`;
        weatherDesc.textContent = `Weather description : ${data.weather[0].description}`;
        weatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp[0].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
        temp[1].textContent = `But it feels like ${ktc(data.main.feels_like)}`;
        temp[2].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
        temp[3].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
        temp[4].textContent = `Pressure : ${data.main.pressure}`;
        temp[5].textContent = `Humidity : ${data.main.humidity}`;
        visibility.textContent = `Visibility : ${data.visibility}`;
        wind[0].textContent = `Wind speed : ${data.wind.speed}`;
        wind[1].textContent = `Wind deg : ${data.wind.deg}`;


        document.querySelector(".searchBox").classList.add("onSearch");
        document.querySelector(".content").classList.add("onContent");
    }
    else{
        alert("some error occured");
    }
}
xhr.send()
}
// getdata();

const searchBtn=document.querySelector(".searchBtn");
const searchBox=document.querySelector(".searchInput");

searchBox.addEventListener("keypress", (e) => {
    if (e.which === 13) {
        let searchVal = searchBox.value;
        if (searchVal === "") {
            alert("Enter location name in the search box")
        } else if (searchVal !== "") {
            searchVal = searchVal.split("");
            searchVal[0] = searchVal[0].toUpperCase();
            searchVal = searchVal.join("");
            getdata(searchVal);
        }
    }
});

searchBtn.addEventListener("click" ,()=>{
    let searchval=searchBox.value;
    if(searchval===""){
        alert("enter the location name in searchbox");
    }
    else if(searchval!==""){
//         searchval=searchval.split("");
// searchval[0]=searchval[0].toUpperCase();
// searchval=searchval.join("");
getdata(searchval);
    }
});
