let name=document.getElementById("name");
let email=document.getElementById("email");
let btn=document.getElementById("btn");
let cont=document.getElementById("cont");
let photo=document.getElementById("photo");
let state=false;
let currentid=null;
let arr=[];
async function postdata(e) {
    e.preventDefault();
    let obj={
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        photo:document.getElementById("photo").value,
    };
    try{
        let res=await axios.post("https://renderserver-1-kpt3.onrender.com/userDetails",obj)
        alert("submitted");
        // console.log(res.data);
    
    }
    catch(error){
        console.log(error);
    }
}
async function getdata(e) {
    e.preventDefault();
    try{
        let res=await axios.get("https://renderserver-1-kpt3.onrender.com/userDetails");
        console.log(res.data);
        arr=res.data;
        displayData(arr);
    }catch(error){
        console.log(error);
    }
}
btn.addEventListener("click",postdata);

function displayData(data){
    cont.innerHTML=""
    data.map((ele)=> {
        let div=document.createElement("div");
        let name=document.createElement("name");
        name.innerText=ele.name;
        let email=document.createElement("email");
        email.innerText=ele.email;
        let photo=document.createElement("photo");
        photo.innerText=ele.photo;
        let btn=document.createElement("button");
        btn.innerText="edit";
        btn.addEventListener("click",()=>{
            let div=document.createElement("div");
            let name=document.createElement("name");
            name.innerText=ele.name;
            let email=document.createElement("email");
            email.innerText=ele.email;
            let photo=document.createElement("photo");
            photo.innerText=ele.photo;
            let btn=document.createElement("button");
            btn.innerText="edit";
       btn.addEventListener("click",()=>{
                
        })
   
        })
    })
}