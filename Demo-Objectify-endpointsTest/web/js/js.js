var API = "http://localhost:8080/_api/v1/student";
var submit = document.getElementById("registerButton");

submit.addEventListener("click", registerEvent);

function registerEvent(event) {

    var form = document.getElementById("registerForm");
    form.method = "POST";
    var data = toJson(form);
    var jsonRequest = JSON.stringify(data, null, 2);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("Dang ky thanh cong");
            alert("Thanh cmn cong roi, vui qua :((");
        } else {

        }
    }
    xhr.open("POST", API, true);
    xhr.send(jsonRequest);
    console.log(jsonRequest);

}


function toJson(form) {
    var formData = new FormData(form);
    var JsonRaw = {};
    JsonRaw["id"] = new Date().getTime();
    for (const [K, V] of formData.entries()) {
        JsonRaw[K] = V;
    }
    return JsonRaw;
}

// <------------------------------GetList----------------------------->
var getListBtn = document.getElementById("getList");
getListBtn.addEventListener("click", getList);

function getList() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", API, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

            var jsonObject = JSON.parse(this.responseText);
            var HTMLContent = '';
            HTMLContent += '<ul>';
            for (var i = 0; i < jsonObject.length; i++) {

                HTMLContent += '<li> ID:' + jsonObject[i].id + 'Name: ' + jsonObject[i].fullName + '------------RollNumber: ' + jsonObject[i].rollNumber + '----address: ' + jsonObject[i].address + '</li>'
            }
            HTMLContent += '</ul>'
            var listHTML = document.getElementById("list");
            listHTML.innerHTML = HTMLContent;
        }
    }
    xhr.send();
}

//<---------------------------------Get 1 Student by ID--------------------------->
var idExample = "1511081121992";
document.getElementById("getStudentById").addEventListener("click", getStudentById);

function getStudentById() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", API + "/" + idExample, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            console.log(this.status);
            console.log("ok");
            var jsonObject = JSON.parse(this.responseText);
            console.log(this.responseText);
            var HTMLContent = '';
            HTMLContent += '<ul>';
            HTMLContent += '<li>ID: ' + jsonObject.id + '----------Name: ' + jsonObject.fullName + '-------RollNumber: ' + jsonObject.rollNumber + '-----address: ' + jsonObject.address + '</li>';
            HTMLContent += '</ul>';
            document.getElementById('list').innerHTML = HTMLContent;
        }
    }


    xhr.send()
}

//<---------------------Delete Student------------------------------------------>
var deleteId = "1511081121992";
document.getElementById("delete").addEventListener("click", deleteStudent);

function deleteStudent() {
    if (confirm("Do you really want to delete?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", API + "/" + deleteId, true);
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log(this.responseText);
                alert("DELETE SUCCESSFULLY!")
            }
        }
        xhr.send();
    }

}

//<--------------------------------Edit Student------------------------------------>

document.getElementById("edit").addEventListener("click", edit);

function edit() {
    var idStudent = document.getElementById("id").value;
    var fullName = document.getElementById("fullName").value;
    var rollNumber = document.getElementById("rollNumber").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var studentData = {
        "id": idStudent,
        "fullName": fullName,
        "rollNumber": rollNumber,
        "address": address,
        "email": email
    }
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", API + "/" + idStudent, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            alert("SUCCESSFULLY");
        }
    }
    xhr.send(JSON.stringify(studentData));
}
