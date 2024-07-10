let name=document.getElementById("name");
let email=document.getElementById("email");
let btn=document.getElementById("btn");
let cont=document.getElementById("cont");
let photo=document.getElementById("photo");
let form=document.getElementById("form")
let state=false;
let currentid=null;
let arr=[];
async function postdata() {
    let obj={
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        photo:document.getElementById("photo").value,
    };
    try{
        let res=await axios.post("https://renderserver-lnh1.onrender.com/userDetails",obj)
        alert("submitted");
        getdata()
        form.reset()
        console.log(res.data);
    
    }
    catch(error){
        console.log(error);
    }
}
async function getdata() {
   
    try{
        let res=await axios.get("https://renderserver-lnh1.onrender.com/userDetails");
        console.log(res.data);
        arr=res.data;
        displayData(arr);
    }catch(error){
        console.log(error);
    }
}
getdata();
async function deleteData(data){
    try{
        let res=await axios.delete("https://renderserver-lnh1.onrender.com/userDetails/${data.id}");
        alert("deleted");
        getdata();
    }catch(error){
        console.log(error);
    }
}
btn.addEventListener("click",postdata);
function displayData(data){
    cont.innerHTML=""
    data.map((ele) => {
        let div=document.createElement("div");
        let name=document.createElement("name");
        name.innerText=ele.name;
        let email=document.createElement("email");
        email.innerText=ele.email;
        let photo=document.createElement("img");
        photo.src=ele.photo;
        let btn=document.createElement("button");
        btn.innerText="edit";
        btn.addEventListener("click",() => {
            getDataforEdit(ele);
        });
        let del=document.createElement("button");
        del.innerText="delete";
        del.addEventListener("click",() => {
            deleteData(ele);
    });
    div.append(name,email,photo,btn,del);
    cont.append(div);
 } );
}
displayData(arr);
function getDataforEdit(data){
    let obj={
        name:(document.getElementById("name").value=data.name),
        email:(document.getElementById("email").value=data.email),
        photo:(document.getElementById("photo").value=data.photo),
    };
    btn.innerText="update";
    state=true;
    currentid=data.id;
}
async function updatedata(){
    let updateobj={
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        photo:document.getElementById("photo").value,
    };
    try{
        let res=await axios.patch(
            'https://renderserver-lnh1.onrender.com/userDetails/${currentid}',
            updateobj
        );
        alert("updated");
        state=false;
        }catch(error){
            console.log(error);
    }
}
btn.addEventListener("click", (e) =>{
    e.preventDefault();
    if(state===true){
        updatedata();
        }else{
            postdata();
        }
});