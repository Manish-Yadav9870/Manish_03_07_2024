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
    if (obj.name==""||obj.email==""||obj.photo==""){
        alert("Please fill all the fields");
        return
    }
    try{
        let res=await axios.post("https://renderserver-lnh1.onrender.com/userDetails",obj);
        alert("Submitted");
      
        getdata();
        form.reset();
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
        let res=await axios.delete(`https://renderserver-lnh1.onrender.com/userDetails/${data.id}`);
        alert("deleted");
        getdata();
    }catch(error){
        console.log(error);
    }
}
// btn.addEventListener("click",postdata);
function displayData(data){
    cont.innerHTML=""
    data.map((ele) => {
        let div=document.createElement("div");
        div.id="Display_data"
        let name=document.createElement("name");
        name.innerText=ele.name;
        let email=document.createElement("email");
        email.innerText=ele.email;
        let photo=document.createElement("img");
        photo.src=ele.photo;
        let btndiv=document.createElement("div")
        btndiv.id=btndiv;
        let editbtn=document.createElement("button");
        editbtn.innerText="Edit";
        editbtn.addEventListener("click",() => {
            getDataforEdit(ele);
            document.getElementById("form").scrollIntoView({behavior:"smooth"})
        });
        let del=document.createElement("button");
        del.innerText="Delete";
        del.addEventListener("click",() => {
            deleteData(ele);
    });
    btndiv.append(editbtn,del);
    div.append(photo,name,email,btndiv);
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
    console.log(currentid);
}
async function updatedata(){
    let updateobj={
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        photo:document.getElementById("photo").value
    };
    try{
        let res=await axios.patch(`https://renderserver-lnh1.onrender.com/userDetails/${currentid}`,updateobj);
        console.log(res);
        alert("Updated");
        state=false;
    btn.innerText="Submit";
    form.reset();
    
    getdata();
        }catch(error){
            console.log(error);
    }
}
btn.addEventListener("click", (e) =>{
    e.preventDefault();
    if(state){
        updatedata();
        }else{
            postdata();
        }
});
let feedbackbtn=document.getElementById("feedbackbtn");
feedbackbtn.addEventListener("click",() => {
function emptyfeedback(){
    document.getElementById("feedback").value="";
}
if (feedback.value==""){
    alert("Please fill all the fields")
    return
}else
alert("Your Feedback Is Submitted");
emptyfeedback();
});