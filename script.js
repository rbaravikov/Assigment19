const h1 = document.createElement("h1")
h1.innerHTML = `View VIP only <input type="checkbox">`
document.body.append(h1)
const checkbox = document.querySelector("input")
const searchForm = document.createElement("form")
let dataArray = []

searchForm.innerHTML = '<form action="#"><input type="search" id="search"><button type="submit">Search</button></form>'

document.body.append(searchForm)
const searchBtn = document.querySelector("button")

fetch("https://polar-chartreuse-silverfish.glitch.me/")
.then(res => res.json())
.then(data => {
    dataArray = data
    const table = document.createElement("table")
    table.innerHTML = `
    <tr><th>ID</th><th>Photo</th><th>Name</th><th>Surname</th><th>City</th><th>Favourite Color</th></tr>`
    document.body.appendChild(table)
    dataArray.map(element => tableUpdate(element));
}).catch(e => console.log(e.message))

const tableUpdate = (element) => {
    const table = document.querySelector("table")
    const row = table.insertRow()
    const firstName = element.name.split(" ")[0]
    const lastName = element.name.split(" ")[1]
    row.innerHTML = `<td>${element.id}</td><td><img src="${element.image}" alt="profile_pic"></td><td>${firstName}</td><td>${lastName}</td><td>${element.city}</td><td>${element.fav_color}</td>`
}

const filterBasedOnVipCheckbox = () => {
    if(checkbox.checked) {
        const table = document.querySelector("table")
        table.innerHTML = `
    <tr><th>ID</th><th>Photo</th><th>Name</th><th>Surname</th><th>City</th><th>Favourite Color</th></tr>`
        dataArray.map(x => {if(x.vip)tableUpdate(x)})
} else {
    const table = document.querySelector("table")
        table.innerHTML = `
    <tr><th>ID</th><th>Photo</th><th>Name</th><th>Surname</th><th>City</th><th>Favourite Color</th></tr>`
        dataArray.map(x => tableUpdate(x))
}}

checkbox.addEventListener('click', filterBasedOnVipCheckbox)

searchBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    const searchInput = document.getElementById("search")
    if(searchInput.value === '') return
    const table = document.querySelector("table")
        table.innerHTML = `
    <tr><th>ID</th><th>Photo</th><th>Name</th><th>Surname</th><th>City</th><th>Favourite Color</th></tr>`
    dataArray.map(x => {if (x.name.toLowerCase().includes(searchInput.value.toLowerCase()) && checkbox.checked == x.vip) tableUpdate(x)
    })
    if(document.querySelectorAll("tr").length < 2) {
        dataArray.map(element => tableUpdate(element));
        filterBasedOnVipCheckbox()
        return alert("Not found")
    }
})