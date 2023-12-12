const accesskey="sV4bPLNT8NePIYR7ZwLWj6MK8eA8h2rK9KCPPsxsOCY"

const formEl=document.querySelector("form")
const inputEl=document.getElementById("searchinput")
const searchResults=document.querySelector(".search-results")
const showMore =document.getElementById("showmorebutton")

let inputData =""
let page =1;

async function searchImage(){
    inputData =inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`

    const response = await fetch(url)
    const data = await response.json()

    const results=data.results
    
    if(page==1)
    {
        searchResults.innerHTML =""
    }
    results.map((result)=>{
        const imgagewrapper =document.createElement('div')
        imgagewrapper.classList.add("search-result")
        const image =document.createElement('img')
        image.src =result.urls.small
        image.alt =result.alt_description
        const imagelink=document.createElement('a')
        imagelink.href =result.links.html
        imagelink.target ="_blank"
        imagelink.textContent =result.alt_description


        imgagewrapper.appendChild(image);
        imgagewrapper.appendChild(imagelink);
        searchResults.appendChild(imgagewrapper);
    })

    page++
    if(page>1)
    {
        showMore.style.display ="block"

    }
}
formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page =1;
    searchImage()
});


showMore.addEventListener("click",()=>{
    searchImage()
});
