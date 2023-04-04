var clutter = "";

function encryption() {
  document
    .querySelector("#encrypt-btn")
    .addEventListener("click", function (e) {
      var text = document.querySelector("#txtmsg").value;
      console.log(text);
      var password = document.getElementById("password").value;
      console.log(password);
      const str = text.split("");
      console.log(str);
      str.forEach((element) => {
        clutter += `&#128${element.charCodeAt()} `;
      });
      console.log(clutter);

      document.querySelector("#result").innerHTML = clutter;

      var dataarr = [];
      if (JSON.parse(localStorage.getItem("data1"))) {
        dataarr = JSON.parse(localStorage.getItem("data1"));
        dataarr.push({ pass: password, input: text, clutter: clutter });
      } else {
        dataarr = [{ pass: password, input: text, clutter: clutter }];
      }
      console.log(dataarr);
      localStorage.setItem("data1", JSON.stringify(dataarr));
    });
}

function decryption() {
  document.querySelector("#decrypt-btn").addEventListener("click", function () {
    var clutter2 = "";
    var input2 = document.querySelector("#emojimsg").value;
    var final = document.querySelector("#finalpassword").value;
    var user = JSON.parse(localStorage.getItem("data1"));
    console.log(user);

    var str2 = input2.split(" ");

    str2.forEach((ele) => {
      clutter2 += `&#${ele.codePointAt(0)} `;
    });
    console.log(clutter2);

    var found;
    for (let i of user) {
      if (i.clutter == clutter2 && i.pass == final) {
        found = i;
        console.log(i);
      } else {
        found = "";
      }
    }
    if (found.clutter === clutter2) {
      document.querySelector("#result").style.display = `block`;
      document.querySelector("#result").style.color = `#eee`;
      document.querySelector("#result").innerHTML = found.input;
    } else {
      document.querySelector("#result").style.display = `block`;
      document.querySelector("#result").style.color = `red`;
      document.querySelector("#result").innerHTML = "Wrong password!";
    }
  });
}

function btnClicking() {
  document.querySelector("#dec-btn").addEventListener("click", function (e) {
    document.querySelector("#decryption").style.display = "block";
    document.querySelector("#encryption").style.display = "none";
    document.querySelector("#enc-btn").style.backgroundColor = "#222";
    document.querySelector("#enc-btn svg").style.backgroundColor = "#222";
    document.querySelector("#dec-btn").style.backgroundColor = "#333";
    document.querySelector("#dec-btn svg").style.backgroundColor = "#333";
    document.querySelector("#main>h1 span img").style.rotate = "270deg";
    document.querySelector("#result").style.display = "none";
  });
  document.querySelector("#enc-btn").addEventListener("click", function (e) {
    document.querySelector("#encryption").style.display = "block";
    document.querySelector("#decryption").style.display = "none";
    document.querySelector("#dec-btn").style.backgroundColor = "#222";
    document.querySelector("#encdec>#dec-btn svg").style.backgroundColor =
      "#222";
    document.querySelector("#enc-btn").style.backgroundColor = "#333";
    document.querySelector("#encdec>#enc-btn svg").style.backgroundColor =
      "#333";
    document.querySelector("#main>h1 span img").style.rotate = "90deg";
    document.querySelector("#result").style.display = "none";
  });

  document
    .querySelector("#encrypt-btn")
    .addEventListener("click", function (e) {
      document.querySelector("#result").style.display = "block";
    });

  document
    .querySelector("#decrypt-btn")
    .addEventListener("click", function (e) {
      document.querySelector("#result").style.display = "block";
    });
}

btnClicking();
encryption();
decryption();
