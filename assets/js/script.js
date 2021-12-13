//Variables

var overlay = $("#overlay"),
  fab = $(".fab"),
  mulfab = $(".multiple_fab"),
  submit = $("#submit"),
  done = $(".done"),
  cancelbutton = $(".cancel");

//fab click

done.on("click", closeFAB);
overlay.on("click", closeFAB);
cancelbutton.on("click", closeFAB);

function openFAB() {
  fab.addClass("active");
  overlay.addClass("dark-overlay");
}

function closeFAB(event) {
  if (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  fab.removeClass("active");
  overlay.removeClass("dark-overlay");
}

//FOR ADD MULTIPLE SUBJECT MODAL

// Get the modal
var mulmodal = document.getElementById("mulModal");

// Get the <span> element that closes the modal
var mulspan = document.getElementsByClassName("mulclose")[0];

// When the user clicks on <span> (x), close the modal
mulspan.onclick = function () {
  mulmodal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == mulmodal) {
    mulmodal.style.display = "none";
  }
};

//FOR CHOOSE SUBJECT MODAL

// Get the modal
var choosemodal = document.getElementById("chooseModal");

// Get the <span> element that closes the modal
var chooseModalspan = document.getElementsByClassName("choosemodalclose")[0];

// When the user clicks on <span> (x), close the modal
chooseModalspan.onclick = function () {
  choosemodal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == choosemodal) {
    choosemodal.style.display = "none";
  }
};

$(document).ready(function () {
  $("#uia_it").click(function () {
    $.ajax({
      url:
        "https://azrihasin.github.io/oop-study-plan/assets/available_studyplan/bit_uia.csv",
      dataType: "text",
      success: function (newdata) {
        createTableByUrl(newdata);
      },
    });
  });
});

$(document).ready(function () {
  $("#uia_cs").click(function () {
    $.ajax({
      url:
        "https://azrihasin.github.io/oop-study-plan/assets/available_studyplan/bcs_uia.csv",
      dataType: "text",
      success: function (newdata) {
        createTableByUrl(newdata);
      },
    });
  });
});

function createTableByUrl(newdata) {
  data = [];

  var csvData = new Array();
  console.log(data);
  var rows = newdata.split("\n");
  for (var i = 1; i < rows.length; i++) {
    if (rows[i].match(/^[,\s]*$/)) {
      continue;
    }

    csvData.push(rows[i].split(","));
  }
  //CHECK IF THE TABLE IS EMPTY OR NOT
  if (window.sem.length > 0) {
    var check = confirm("All the existing table will be deleted");
    if (check == true) {
      console.log("The table will be inserted now");

      //CSV DATA TO ARRAY AND CHECK HOW MANY SEM
      var newarray = csvData.map(function (value, index) {
        console.log("Csv data" + csvData[index][0]);

        var reg = /^[0-9]*[.]?[0-9]*$/;

        // console.log(reg.test(csvData[index][0]));
        // if (reg.test(csvData[index][0])) {
        //   return csvData[index][0];
        // }

        return csvData[index][0];
      });

      // REFINE AND REMOVE THE UNDEFINED VALUE

      var selectlist = document.getElementById("semoption");

      var rows = selectlist.getElementsByTagName("option");
      while (rows.length > 1) {
        rows[1].parentNode.removeChild(rows[1]);
      }

      var data = newarray.filter(function (element) {
        return element !== undefined;
      });

      console.log(data);

      var getSem;

      getSem = [...new Set(data)];

      console.log("Sem length :" + getSem.length);

      //REMOVE ALL ELEMENT

      for (var i = 0; i < window.sem.length; i++) {
        var tableIndex = window.sem[i].sem_id;
        var tbl = document.getElementById("table" + tableIndex);
        tbl.remove();

        document.getElementById("card" + tableIndex).parentElement.remove();
      }

      //REMOVE ALL ARRAY

      window.sem = [];
      window.subject = [];

      //BUILD THE TABLE
      generateArray(csvData);
      generateAllBuild();
    } else {
      console.log("The table change cancelled");
    }
  } else {
    console.log("Table inserted");
    console.log("The table will be inserted now");

    //CSV DATA TO ARRAY AND CHECK HOW MANY SEM
    var newarray = csvData.map(function (value, index) {
      console.log("Csv data" + csvData[index][0]);

      var reg = /^[0-9]*[.]?[0-9]*$/;

      // console.log(reg.test(csvData[index][0]));
      // if (reg.test(csvData[index][0])) {
      //   return csvData[index][0];
      // }

      return csvData[index][0];
    });

    // REFINE AND REMOVE THE UNDEFINED VALUE

    var selectlist = document.getElementById("semoption");

    var rows = selectlist.getElementsByTagName("option");
    while (rows.length > 1) {
      rows[1].parentNode.removeChild(rows[1]);
    }

    var data = newarray.filter(function (element) {
      return element !== undefined;
    });

    console.log(data);

    var getSem;

    getSem = [...new Set(data)];

    console.log("Sem length :" + getSem.length);

    //BUILD THE TABLE
    generateArray(csvData);
    generateAllBuild();
  }

  choosemodal.style.display = "none";
  cookieManagement();
}

function toggle() {

  if (document.getElementById("pin").value == "OFF") {
    document.getElementById("pin").value = "ON";
    document.getElementById("pin").style.opacity = "1";
    var header = document.getElementById("headerArea"); 
    header.style.position = "static";
    header.style.top ="0";
    console.log("true");
  } else {
    document.getElementById("pin").value = "OFF";
    document.getElementById("pin").style.opacity = "0.4";

    var header = document.getElementById("headerArea"); 
    header.style.position = "sticky";
    header.style.top ="2em";
    console.log("false");
  }
}
