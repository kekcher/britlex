/*Переменные*/
let userName = "";
let text = "";
let colorUser = "white";
let colorBack = "black";
let errorUser;

function User(userName,text,colorUser,colorBack){
    this.userName = userName;
    this.text = text;
    this.colorUser = colorUser;
    this.colorBack = colorBack;
}

/*Достаём данные из локального хранилища*/
if(localStorage){
    if(localStorage.length < 4){
        for(let i=0;i<localStorage.length;i++){
            let user = JSON.parse(localStorage.getItem(localStorage.key(i)))
            addReview(user);
        }
    }
    else{
        for(let i=0;i<3;i++){
            let user = JSON.parse(localStorage.getItem(localStorage.key(i)))
            addReview(user);
        }
        document.querySelector(".accordion_box").style.display = "flex";
    }
}

function formActive(){
    document.querySelector(".form").style.display = "flex";
    document.querySelector(".blur").style.filter = "blur(15px)";
    document.querySelector(".form_box").classList.toggle("start_animation");
}


//Функция поиска нужного label
function LabelSearch(labels,id){
    for(let item of labels){
        if(item.htmlFor == id){
            return item;
        }
    }
}



/*Событие нажатия на кнопку Talk*/
document.querySelector(".head_btn").onclick = formActive;

/*Нажатие на кнопку старт*/
document.querySelector(".start_btn").onclick = () =>{
    document.getElementById("skills").scrollIntoView();
}


/*Событие нажатия на цены*/
document.querySelector(".pricing_block").onclick = (e) =>{
    if(e.target.tagName !== "BUTTON"){
        return;
    }
    else{
        formActive();
    }
}

/*Закрытие формы*/
document.querySelector(".close_btn").onclick = () =>{
    document.querySelector(".form_box").classList.toggle("start_animation");
    document.querySelector(".form").style.display = "none";
    document.querySelector(".video_box").style.display = "none";
    document.querySelector(".blur").style.removeProperty('filter');
    document.querySelector(".video").src = "";
    document.querySelector(".video_sign").textContent ="";
}

/*Функция Error*/
function error(input){
    input.classList.add("error_input");
    input.value = "";
    let textErr = LabelSearch(document.querySelectorAll("label"),input.id).textContent.replace(":","");
    let p = document.createElement("p");
    p.className = "error_label";
    p.textContent = textErr;
    input.closest("div").append(p);
}

/*Работа с формой*/
for(let i=0; i<5; i++){
    formblock[i].onblur = (e)=>{
        if(e.target.type == "text"){
            let regText = /^[a-zA-ZА-Яа-я\-]+$/;
            if(!regText.test(e.target.value)||e.target.value == ""){
                error(e.target);
            }
        }
        else if(e.target.type == "email"){
            let regEm = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if(!regEm.test(e.target.value)||e.target.value == ""){
                error(e.target);
            }
        }
        else{
            let regTel = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
            if(!regTel.test(e.target.value)||e.target.value == ""){
                error(e.target);
            }
        }
    }
    formblock[i].onfocus = (e) =>{
        e.target.classList.remove("error_input");
        e.target.closest("div").children[2] ? e.target.closest("div").children[2].remove() : false;
    }
}

/*Отправление формы*/
document.querySelector(".submit").onclick = () =>{
    let logic = true
    for(let i=0; i<5; i++){
        formblock[i].dispatchEvent(new Event("focus"));
        if(formblock[i].value == "" ){
            logic = false;
            formblock[i].dispatchEvent(new Event("blur"));
        }
    }
    if(!logic){
        return;
    }
    document.querySelector(".close_btn").dispatchEvent(new Event("click"));
    for(let i=0; i<5; i++){
        formblock[i].value = "";
    }
    alert("Congratulation!");
}

/*Подписка на сайте*/
document.querySelector(".enter_em").onblur = (e) => {
    let regEm = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!regEm.test(e.target.value)||e.target.value == ""){
        e.target.classList.add("error_input");
        e.target.value = "";
        e.target.placeholder = "ENTER EMAIL!";
    }
} 
document.querySelector(".enter_em").onfocus = (e) => {
    e.target.classList.remove("error_input");
    e.target.placeholder = "Enter Your E-mail";
}
document.querySelector(".cont_btn").onclick = (e) =>{
    if(document.querySelector(".enter_em").value == ""){
        document.querySelector(".enter_em").dispatchEvent(new Event("blur"));
        return;
    }
    else{
        alert("Congratulation!");
        document.querySelector(".enter_em").value = "";
    }
}

/*функция открывания видео*/
function openVideo(url, sign){
    document.querySelector(".blur").style.filter = "blur(15px)";
    document.querySelector(".form_box").classList.toggle("start_animation");
    document.querySelector(".video_box").style.display = "flex";
    document.querySelector(".video").src = url;
    document.querySelector(".video_sign").textContent = sign;
}

/*Открытие видео*/
document.querySelector(".skills_block").onclick = (e) =>{
    if(e.target.tagName != "BUTTON"){
        return;
    }
    else{
        switch(e.target.id){
            case "speak" :
                openVideo("https://www.youtube.com/embed/IZpja7SFRus","Speaking");
                break;
            case "write" :
                openVideo("https://www.youtube.com/embed/4V0wKH6hd30","Writing");
                break;
            case "read" :
                openVideo("https://www.youtube.com/embed/n-cvZgiC4rQ","Reading");
                break;
            default:
                openVideo("https://www.youtube.com/embed/bEB8-SWMYhI","Listening");
                break;
        }
    }
}

/*Изменение авотарки юзера*/
document.getElementById("colorUser").oninput = (e) =>{
    document.querySelector(".create_user").style.color = e.target.value;
    colorUser = e.target.value;
}
document.getElementById("colorBack").oninput = (e) =>{
    document.querySelector(".avatar").style.backgroundColor = e.target.value;
    colorBack = e.target.value;
}

/*Проверка ника*/
document.getElementById("nik").onblur = (e) =>{
    let regNik = /^[a-zA-Z0-9_.]{1,30}$/;
    if(!regNik.test(e.target.value)||e.target.value == ""){
        errorUser = true;
        e.target.value = "";
        let interval = setInterval(()=>{
            if(!errorUser){
                clearInterval(interval);
            }
            else{
                e.target.classList.toggle("error_input");
            }
        },300)
    }
}
document.getElementById("nik").onfocus = (e) =>{
    e.target.className = "input_user";
    errorUser = false;
}
document.getElementById("nik").addEventListener("input", function(){
    userName = this.value;
})

/*Функция создания отзыва*/
function review(user){
    let div = document.createElement("div");//Основной блок отзыва


        let divAvatar = document.createElement("div");
        divAvatar.innerHTML = `
            <i class="icon-snapchat-ghost user"></i>
        `;
        divAvatar.className = "avatar_mini";
        divAvatar.style.color = user.colorUser;
        divAvatar.style.backgroundColor = user.colorBack;

        div.innerHTML = `
            <i class="icon-cancel delete_review" onclick = "deleteRev(this)"></i>
        `;
        div.append(divAvatar);
        div.innerHTML += `
            <div class="user_reviews_block">
                    <h2 class="username">${user.userName}</h2>
                    <p class="username_text">${user.text}</p>
                </div>
        `;
    return div;
}

/*функция добавления отзыва*/
function addReview(user){
    document.querySelector(".reviews").prepend(review(user));
}

/*функция открытия отзыва*/
function openReviews(user){
    document.querySelector(".reviews").append(review(user));
}

/*Функция замены*/
function replaceReview(user){
    document.querySelector(".reviews").getElementsByTagName("div")[0].replaceWith(review(user));
}

/*Возвращения назад*/
function returnCreateRev(){
    document.getElementById("colorUser").value = "#FFFFFF";
    document.getElementById("colorBack").value = "#000000";
    document.getElementById("colorUser").dispatchEvent(new Event("input"));
    document.getElementById("colorBack").dispatchEvent(new Event("input"));
    document.getElementById("nik").value = "";
    document.querySelector(".reviews_sign").value = "";
}

/*Нажатие на кнопку оставить отзыв*/
document.querySelector(".submit_reviews").onclick = () =>{
    text = document.querySelector(".reviews_sign").value;
    if(userName == ""){
        alert("Введите ник!");
        return;
    }
    if(text =="" ){
        alert("Введите текст!");
        return;
    }
    if(localStorage.length){
        for(let i=0; i<localStorage.length; i++){
            if(userName == localStorage.key(i)){
                alert("Такой ник уже занят!");
                return
            }
        }
    }
    let user = new User(userName,text,colorUser,colorBack);
    localStorage.setItem(user.userName,JSON.stringify(user));
    if(localStorage.length < 4){
        addReview(user);
        returnCreateRev();
    }
    else{
        replaceReview(user);
        document.querySelector(".accordion_box").style.display = "flex";
        returnCreateRev();
    }
}

/*Удаление отзыва*/
function deleteRev(e){
    console.log(e.closest("div").getElementsByTagName("h2")[0].textContent);
    localStorage.removeItem(e.closest("div").getElementsByTagName("h2")[0].textContent);
    e.closest("div").remove();
}

/*Нажатие на гармошку*/
document.querySelector(".accordion_box").onclick = (e) =>{
    let div = document.createElement("div");
    div.className = "reviews"
    document.querySelector(".reviews").replaceWith(div);
    for(let i=0; i<localStorage.length;i++){
        let user = JSON.parse(localStorage.getItem(localStorage.key(i)))
        openReviews(user);
    }
}
