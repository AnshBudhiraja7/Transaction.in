var firebaseConfig = {
    apiKey: "AIzaSyA-teYBGhAa7KmYa2IW9wx66VUdmhsqzvI",
    authDomain: "billing-565b3.firebaseapp.com",
    databaseURL: "https://billing-565b3-default-rtdb.firebaseio.com",
    projectId: "billing-565b3",
    storageBucket: "billing-565b3.appspot.com",
    messagingSenderId: "1079915732213",
    appId: "1:1079915732213:web:eea86fe01231d9cba6f9bc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
document.addEventListener("contextmenu", function (e){
    e.preventDefault();
}, false);

function Login() {
    Username = document.getElementById("Username").value
    Password = document.getElementById("Password").value
    if (Username != "" && Password != "") {
        if (Username == "Admin" && Password == "Admin123") {
            window.location.href = "AdminAccounts.html"
        }
        else {
            firebase.database().ref().child("Admin").on("value", function (snap) {
                Obj = snap.val()
                if (Obj == null) {
                    alert("Error Occured.Try Again Later")
                }
                else {
                    var count = 0
                    Allkey = Object.keys(Obj)
                    Allkey.map(function (key) {
                        if (Obj[key].User == Username && Obj[key].Pass == Password) {
                            count = count + 1
                            localStorage.setItem("AccountKey", JSON.stringify(key))
                            document.getElementById("Username").value = ""
                            document.getElementById("Password").value = ""
                            window.location.href = "CreateAccount.html"
                        }
                    })
                    if (count == 0) {
                        alert("Wrong Username and Password")
                    }
                }
            })
        }
    }
    else {
        alert("Field is Empty")
    }
}
function Show() {
    localStorage.clear()
    document.getElementById("modal").style.display = "block"
    document.getElementsByClassName("overlay")[0].style.display = "block"
    document.getElementsByClassName("input")[0].style.opacity = "0.5"
    document.getElementsByClassName("input")[1].style.opacity = "0.5"
    document.getElementsByClassName("input")[2].style.opacity = "0.5"
    document.getElementsByClassName("input")[3].style.opacity = "0.5"
    document.getElementsByClassName("input")[4].style.opacity = "0.5"
    document.getElementsByClassName("input")[5].style.opacity = "0.5"
    document.getElementsByClassName("input")[6].style.opacity = "0.5"
    document.getElementsByClassName("input")[7].style.opacity = "0.5"
    document.getElementsByClassName("btns")[0].style.opacity = "0.5"
}
function Close() {
    document.getElementById("modal").style.display = "none"
    document.getElementsByClassName("overlay")[0].style.display = "none"
    document.getElementsByClassName("input")[0].style.opacity = "1"
    document.getElementsByClassName("input")[1].style.opacity = "1"
    document.getElementsByClassName("input")[2].style.opacity = "1"
    document.getElementsByClassName("input")[3].style.opacity = "1"
    document.getElementsByClassName("input")[4].style.opacity = "1"
    document.getElementsByClassName("input")[5].style.opacity = "1"
    document.getElementsByClassName("input")[6].style.opacity = "1"
    document.getElementsByClassName("input")[7].style.opacity = "1"
    document.getElementsByClassName("btns")[0].style.opacity = "1"
}
function Create() {
    name = document.getElementById("name").value
    phone = document.getElementById("phone").value
    email = document.getElementById("email").value
    address = document.getElementById("address").value
    bname = document.getElementById("bname").value
    btype = document.getElementById("btype").value
    user = document.getElementById("user").value
    pass = document.getElementById("pass").value
    var d = new Date()
    var date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    if (name != "" && phone != "" && email != "" && address != "" && bname != "" && btype != "" && user != "" && pass != "") {
        var Obj = {
            Name: name,
            Phone: phone,
            Email: email,
            Address: address,
            BName: bname,
            BType: btype,
            User: user,
            Pass: pass,
            Date: date,
        }
        firebase.database().ref().child("Admin").push(Obj)
        Clear()
        alert("Account Created")
    }
    else {
        alert("Field is Empty")
    }

}
function phonecheck() {
    phone = document.getElementById("phone").value
    if (phone == "") {
        document.getElementById("i").innerHTML = ""
        document.getElementById("btn1").style.display = "block"
    }
    else {
        firebase.database().ref().child(`Admin`).on("value", function (Snap) {
            Obj = (Snap.val());
            if (Obj == null) {
                document.getElementById("i").innerHTML = "No Account Found on this phone Number"
                document.getElementById("btn1").style.display = "block"
                document.getElementById("i").style.color = "#5cb85d"
            }
            else {
                Allkey = Object.keys(Obj)
                phn = Allkey.filter(function (key) {
                    return phone == Obj[key].Phone
                })
                if (phn != "") {
                    document.getElementById("i").innerHTML = "Account already exist on this Phone Number"
                    document.getElementById("i").style.color = "red"
                    document.getElementById("btn1").style.display = "none"
                }
                else {
                    document.getElementById("i").innerHTML = "No Account Found on this phone Number"
                    document.getElementById("btn1").style.display = "block"
                    document.getElementById("i").style.color = "#5cb85d"
                }
            }
        })
    }
}
function usercheck() {
    user = document.getElementById("user").value
    if (user == "") {
        document.getElementById("i2").innerHTML = "Don't use space between your username"
        document.getElementById("i2").style.color = "red"
        document.getElementById("btn1").style.display = "block"
    }
    else {
        if (user == "Admin" || user == "admin") {
            document.getElementById("i2").innerHTML = "This Username is already taken"
            document.getElementById("i2").style.color = "red"
            document.getElementById("btn1").style.display = "none"
        }
        else {
            firebase.database().ref().child(`Admin`).on("value", function (Snap) {
                Obj = (Snap.val());
                if (Obj == null) {
                    document.getElementById("i2").innerHTML = "No Account Found on this Username"
                    document.getElementById("btn1").style.display = "block"
                    document.getElementById("i2").style.color = "#5cb85d"
                }
                else {
                    Allkey = Object.keys(Obj)
                    usr = Allkey.filter(function (key) {
                        return user == Obj[key].User
                    })
                    if (usr != "") {
                        document.getElementById("i2").innerHTML = "This Username is already taken"
                        document.getElementById("i2").style.color = "red"
                        document.getElementById("btn1").style.display = "none"
                    }
                    else {
                        document.getElementById("i2").innerHTML = "Username is perfect"
                        document.getElementById("btn1").style.display = "block"
                        document.getElementById("i2").style.color = "#5cb85d"
                    }
                }
            })

        }
    }
}
function Clear() {
    document.getElementById("name").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("email").value = ""
    document.getElementById("address").value = ""
    document.getElementById("bname").value = ""
    document.getElementById("btype").value = ""
    document.getElementById("user").value = ""
    document.getElementById("pass").value = ""
    document.getElementById("i").innerHTML = ""
    document.getElementById("i2").innerHTML = ""
    document.getElementById("btn1").style.display = "block"
}