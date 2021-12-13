class Sem {
  constructor(sem_id, sem_name) {
    this.sem_id = sem_id;
    this.sem_name = sem_name;
    this.table = {};
  }

  push(element) {
    this.data[this.length] = element;
    this.length++;
    return this.data;
  }
}

class Subject extends Sem {
  constructor(
    sem_id,
    sem_name,
    course_id,
    course,
    course_code,
    credit_hour,
    taken
  ) {
    super(sem_id, sem_name);
    this.course_id = course_id;
    this.course = course;
    this.course_code = course_code;
    this.credit_hour = credit_hour;
    this.taken = taken;
  }
}

var currentTable = 0;

sem = [];
subject = [];
console.log(sem.length);
console.log(subject.length);

// document.getElementById("check").onclick = function () {
//   console.log(window.sem);
//   array = window.subject;
//   for (i = 0; i < array.length; i++) {
//     for (j = 0; j < array[i].length; j++) console.log(array[i][j]);
//   }
// };

function addSem() {
  //INDEX OF TABLE
  // let length = window.sem.length;
  let length = window.sem.length;
  let tableId = create_UUID();
  let createId = "table " + tableId;

  //SEND TO OBJECT
  if (length == 0) {
    sem[0] = new Sem(tableId, "table" + length);
  } else {
    sem.push(new Sem(tableId, "table" + length));
  }

  if (length == 0) {
    subject[0] = [];
  } else {
    subject.push([]);
  }

  console.log("Sem length:" + sem.length);
  console.log("Subject length:" + subject.length);
  // console.log(sem[length].sem_name);

  //CREATE ELEMENT
  var tablespace = document.createElement("DIV");
  var table = document.createElement("TABLE");
  var addbtn = document.createElement("DIV");
  var editbtn = document.createElement("DIV");
  var tableNameArea = document.createElement("DIV");
  var tablename = document.createElement("TEXTAREA");
  var muladdbtn = document.createElement("DIV");
  var deleteTableBtn = document.createElement("DIV");

  var buttonSection = document.createElement("DIV");

  var div = document.createElement("div");

  //CREDIT HOUR AREA

  var creditHourArea = document.createElement("DIV");
  creditHourArea.style.cssFloat = "right";

  //TOTAL CREDIT HOUR

  //LABEL
  var labelCreditArea = document.createElement("p");
  var labelTextTotalCredit = document.createTextNode("Total Ch:");
  labelCreditArea.appendChild(labelTextTotalCredit);
  labelCreditArea.style.display = "inline";

  var totalCreditArea = document.createElement("p");
  totalCreditArea.textContent = "";
  totalCreditArea.setAttribute("id", "totalcredithour_" + tableId);
  totalCreditArea.style.display = "inline";
  totalCreditArea.style.margin = "0.5rem";

  //TOTAL CREDIT HOUR TAKEN

  var labelCreditTakenArea = document.createElement("p");
  var labelTextTotalCreditTaken = document.createTextNode("Total Ch Taken:");
  labelCreditTakenArea.appendChild(labelTextTotalCreditTaken);
  labelCreditTakenArea.style.display = "inline";

  var totalCreditTakenArea = document.createElement("p");
  totalCreditTakenArea.textContent = "";
  totalCreditTakenArea.setAttribute("id", "totalcredithourtaken_" + tableId);
  totalCreditTakenArea.style.display = "inline";
  totalCreditTakenArea.style.margin = "0.5rem";

  creditHourArea.appendChild(labelCreditArea);
  creditHourArea.appendChild(totalCreditArea);
  creditHourArea.appendChild(labelCreditTakenArea);
  creditHourArea.appendChild(totalCreditTakenArea);

  //TABLE NAME
  var tableNameId = "tablename" + tableId;
  var t = document.createTextNode("table" + length);
  tablename.appendChild(t);
  tablename.setAttribute("id", tableNameId);
  tablename.readOnly = true;
  tablename.style.display = "inline-block";
  tablename.style.resize = "none";
  tableNameArea.className = "tablenamearea";

  tableNameArea.appendChild(tablename);

  //EDIT BUTTON FOR TABLENAME

  editButtonId = "editbuttonid_" + tableId;
  editButtonIcon = "editbuttonicon_" + tableId;

  editbtn.style.width = "56px";
  editbtn.style.height = "56px";
  editbtn.style.float = "right";
  editbtn.style.paddingTop = "5px";

  editbtn.innerHTML = `<button id="${editButtonId}" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onclick="changeState(this.id)">
        <i id="${editButtonIcon}" class="material-icons">edit</i>
        </button>`;

  tableNameArea.appendChild(editbtn);

  //TBODY
  var tablebody = document.createElement("TBODY");

  //TABLE HEADER
  var checkBoxAll = "checkboxall_" + tableId;

  var tr = document.createElement("tr");
  tr.innerHTML = `<th><input type="checkbox" name="" id="${checkBoxAll}" onclick="changeCheckboxForAll(this.id)"></th><th id="course_code ">Course code</th>
            <th id="course">Course</th>
            <th id="credit_hour">Credit hour</th>
            <th></th>`;

  //BUTTON SECTION

  //ADD SUBJECT BUTTON ELEMENT

  var addsection = document.createElement("DIV");
  addsection.className = "addsection";

  addbtn.innerHTML = `<button onclick="openModalAddSubject(this.id)" id="${tableId}" class="addsubject mdc-button mdc-button--raised " >
            <span class="mdc-button__label">Add Subject</span>
            </button>`;

  muladdbtn.innerHTML = `<button onclick="setCurrentForMulSub(this.id)" id="${
    "muladd_" + tableId
  }" class="addsubject mdc-button mdc-button--raised" >
            <span class="mdc-button__label">Add Multiple Subject</span>
            </button>`;

  deleteTableBtn.innerHTML = `<button onclick=" deleteSem(this.id)" id="${
    "delete_" + tableId
  }" class="deleteubject mdc-button mdc-button--outlined" >
  <i class="material-icons mdc-button__icon" aria-hidden="true">delete</i>
            <span class="mdc-button__label">Delete Table</span>
            </button>`;

  addbtn.style.float = "left";
  addbtn.style.margin = "0.5rem";
  muladdbtn.style.float = "left";
  muladdbtn.style.margin = "0.5rem";
  // deleteTableBtn.style.float = "left";
  deleteTableBtn.style.margin = "0.5rem";

  addsection.appendChild(addbtn);
  addsection.appendChild(muladdbtn);

  buttonSection.className = "button-section";
  // buttonSection.appendChild(addbtn);
  // buttonSection.appendChild(muladdbtn);
  buttonSection.appendChild(addsection);
  buttonSection.appendChild(deleteTableBtn);

  //INSERT ELEMENT HEADER TO TABLE
  table.appendChild(tr);
  table.appendChild(tablebody);
  table.setAttribute("id", "table" + tableId);

  //CREATE DIV FOR TABLE AND APPEND TABLE TO DIV
  div.appendChild(creditHourArea);
  div.appendChild(tableNameArea);
  div.appendChild(table);
  div.appendChild(buttonSection);
  div.className = "card";
  div.setAttribute("id", "card" + tableId);
  tablespace.appendChild(div);

  //MAKE THE ADD TABLE BUTTON TO THE LASS ELEMENT

  var element = document.getElementById("cards");
  //   element.appendChild(tablespace);

  var referenceNode = document.getElementById("addtablearea");

  element.insertBefore(tablespace, referenceNode);

  var classlength = document.getElementsByClassName("card").length;
  console.log("class length " + classlength);

  var upgreadedEditBtn = document.getElementById(editButtonId);
  componentHandler.upgradeElement(upgreadedEditBtn);

  //SEM PICKER LIST

  var selectlist = document.getElementById("semoption");

  var li = document.createElement("option");
  li.innerHTML = `${window.sem[length].sem_name}`;

  selectlist.appendChild(li);

  calculateTotalCredit(length);
  calculateTotalCreditTaken(length);
}

function getValue() {
  //GET ALL VALUE FROM INPUT
  var course = document.getElementById("coursenameinput").value;
  var course_code = document.getElementById("coursecodeinput").value;
  var credit_hour = document.getElementById("credithourinput").value;

  function beginsWithFloat(val) {
    val = parseFloat(val);
    return !isNaN(val);
  }

  //CREATE ALL VARIABLES
  if (beginsWithFloat(credit_hour) == false) {
    alert("Credit hour must be a number");
  } else {
    console.log(window.sem);
    console.log("Debug id :" + window.currentTable);

    var index;

    for (i = 0; i < window.sem.length; i++) {
      if (window.sem[i].sem_id == window.currentTable) {
        console.log(window.currentTable);
        index = i;
      }
    }

    var currentTableId = window.sem[index].sem_id;

    var tableId = "table" + currentTableId;

    console.log("Current table id : " + tableId);

    var table = document.getElementById(tableId);

    console.log("ROW TO BECOME ID" + table.tBodies[0].rows.length);

    var rowCount = 0;

    rowCount = create_UUID();

    //CHECK SEM NEM
    var s_id = window.currentTable;
    var s_name = window.sem[index].sem_name;
    var c_id = rowCount;
    var c_name = course;
    var c_code = course_code;
    var c_hour = credit_hour;
    var taken = "false";

    var subjectId = s_id + "_" + c_id;
    var checkBox = "check_" + subjectId;
    var buttonId = "button" + subjectId;
    var listId = "list" + subjectId;
    var iconId = "icon" + subjectId;
    var ulId = "ul" + subjectId;
    var editId = "edit_" + subjectId;
    var deleteId = "delete_" + subjectId;

    //CREATING NEW ROW
    window.subject[index].push(
      new Subject(s_id, s_name, c_id, c_name, c_code, c_hour, taken)
    );

    var newRow = document
      .getElementById(tableId)
      .getElementsByTagName("tbody")[0]
      .insertRow();
    // newRow = "<td>New row text</td><td>New row 2nd cell</td>"; <-- won't work
    newRow.innerHTML = `
                        <td><input type="checkbox" name=" " id=${checkBox} onclick="changeCheckbox(this.id)" value="false"></td>
                        <td>${course_code}</td>
                        <td>${course}</td>
                        <td>${credit_hour}</td>
                        <td id=${buttonId}>
                        
                        <button id="${listId}" class="mdl-button mdl-js-button mdl-button--icon">
                            <p id='${iconId}' class="material-icons">more_vert</p>
                    </button>

                    <ul id='${ulId}' class="mdl-menu mdl-js-menu" for="${listId}">
                        <li id='${editId}'class="editmenu mdl-menu__item" onclick="editsubject(this.id)">Edit</li>                          
                        <li id='${deleteId}'class="deletemenu mdl-menu__item" onclick="deletesubject(this.id)">Delete</li>
                    </ul>
                    
                    </td>
                    `;

    var button = document.getElementById(listId);
    componentHandler.upgradeElement(button);

    var icon = document.getElementById(iconId);
    componentHandler.upgradeElement(icon);

    var ul = document.getElementById(ulId);
    componentHandler.upgradeElement(ul);

    var editsub = document.getElementById(editId);
    componentHandler.upgradeElement(editsub);

    var deletesub = document.getElementById(editId);
    componentHandler.upgradeElement(deletesub);

    calculateTotalCredit(index);
    calculateTotalCreditTaken(index);
    progressBar();
    cookieManagement();
  }
}

var states = ["EDIT", "DONE"], // your possible states
  current_state = 0; // your flag

function changeState(getid) {
  current_state = !current_state; // switch
  document.getElementById(getid).value = states[current_state ? 1 : 0]; // write your state

  console.log(current_state);

  if (current_state == 1) {
    var fields = getid.split("_");
    var name = fields[0];
    var getIndex = fields[1];
    var num;

    for (i = 0; i < window.sem.length; i++) {
      if (window.sem[i].sem_id == getIndex) {
        num = i;
      }
    }

    var before = window.sem[num].sem_name;

    var getTableId = "tablename" + getIndex;
    var getTable = document.getElementById(getTableId);

    getTable.removeAttribute("readonly");
    getTable.style.border = "#999 solid 1px";
    getTable.style.borderRadius = "5px";
    getTable.style.backgroundColor = "white";
    getTable.style.overflow = "hidden";
    getTable.style.resize = "none";

    var editButtonIcon = "editbuttonicon_" + getIndex;

    var edit = document.getElementById(editButtonIcon);

    console.log(edit);

    edit.textContent = "done";
  } else {
    var fields = getid.split("_");
    var name = fields[0];
    var getIndex = fields[1];
    var num;

    for (i = 0; i < window.sem.length; i++) {
      if (window.sem[i].sem_id == getIndex) {
        num = i;
      }
    }

    var before = window.sem[num].sem_name;

    var getTableId = "tablename" + getIndex;

    var getTable = document.getElementById(getTableId);
    getTable.readOnly = true;
    getTable.style.border = "none";
    getTable.style.overflow = "hidden";
    getTable.style.resize = "none";
    getTable.style.backgroundColor = "transparent";

    var doneEditName = "editbuttonid_" + getIndex;
    var doneEdit = document.getElementById(getid);
    var editButtonIcon = "editbuttonicon_" + getIndex;

    var edit = document.getElementById(editButtonIcon);
    edit.textContent = "edit";

    console.log(getTable.value);

    window.sem[num].sem_name = getTable.value;

    console.log(window.sem[num]);

    for (i = 0; i < window.subject[num].length; i++) {
      window.subject[num][i].sem_name = getTable.value;

      // console.log(window.subject[getid][i].sem_name);
    }

    console.log("Sem name" + window.sem[num].sem_name);

    var opts = document.getElementById("semoption").options;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].innerText == before) {
        opts[i].innerText = window.sem[num].sem_name;

        break;
      }
    }
  }
}

function editsubject(geteditid) {
  var setcurrent = geteditid.split("_");

  window.currentTable = setcurrent[1];
  document.getElementById("semoption").removeAttribute("disabled");
  setOptionToCurrent();
  openFAB();

  console.log("GetEditId: " + geteditid);

  var editElement = document.getElementById(geteditid);

  var fields = geteditid.split("_");
  var name = fields[0];
  var getTableIndex = fields[1];
  var getIndex = fields[2];
  var semnum;
  var num;

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == getTableIndex) {
      semnum = i;
    }
  }

  for (i = 0; i < window.subject[semnum].length; i++) {
    if (window.subject[semnum][i].course_id == getIndex) {
      num = i;
    }
  }

  console.log("Get index " + getIndex);
  console.log(fields);
  console.log(semnum);
  console.log("Length " + window.subject[semnum].length);
  console.log(num);
  console.log("See subject :" + window.subject[semnum][num].course);
  console.log(window.subject[semnum]);

  for (i = 0; i < 3; i++) {
    if (i == 0) {
      document.getElementById("coursenameinput").focus();
    } else if (i == 1) {
      document.getElementById("coursecodeinput").focus();
    } else {
      document.getElementById("credithourinput").focus();
    }
  }

  document.getElementById("coursenameinput").value =
    window.subject[semnum][num].course;
  document.getElementById("coursecodeinput").value =
    window.subject[semnum][num].course_code;
  document.getElementById("credithourinput").value =
    window.subject[semnum][num].credit_hour;

  var createButtonId = `doneeditsubject('${
    "variable_" + getTableIndex + "_" + getIndex
  }');`;

  var getButton = document.getElementById("donefabbutton");
  getButton.setAttribute("onClick", createButtonId);
}

function deletesubject(geteditid) {
  //   var deleteElement = document.getElementById(geteditid);

  var fields = geteditid.split("_");
  var name = fields[0];
  var getTableIndex = fields[1];
  var getIndex = fields[2];
  var semnum;
  var num;

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == getTableIndex) {
      semnum = i;
    }
  }

  console.log(fields);
  console.log(semnum);

  for (i = 0; i < window.subject[semnum].length; i++) {
    if (window.subject[semnum][i].course_id == getIndex) {
      num = i;
    }
  }

  var getDeleteTable = "table" + getTableIndex;

  console.log("Table to delete : " + getDeleteTable);

  var deleteTable = document.getElementById(getDeleteTable).tBodies[0];

  for (var i = 0; i < deleteTable.rows.length; i++) {
    var trs = deleteTable.getElementsByTagName("tr")[i];
    var cellVal = trs.cells[4].id;

    var fields = cellVal.split("_");
    var one = fields[0];
    var theIdRow = fields[1];

    console.log("Delete row : " + theIdRow);

    if (theIdRow == window.subject[semnum][num].course_id) {
      deleteTable.deleteRow(i);
      window.subject[semnum].splice(num, 1);
    }
  }

  calculateTotalCredit(semnum);
  calculateTotalCreditTaken(semnum);
  progressBar();
}

function doneeditsubject(geteditid) {
  console.log(geteditid);

  var fields = geteditid.split("_");
  var name = fields[0];
  var getTableIndex = fields[1];
  var getIndex = fields[2];
  var semnum;
  var num;

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == getTableIndex) {
      semnum = i;
    }
  }

  for (i = 0; i < window.subject[semnum].length; i++) {
    if (window.subject[semnum][i].course_id == getIndex) {
      num = i;
    }
  }

  var getTableId = "table" + getTableIndex;

  var course = document.getElementById("coursenameinput").value;
  var course_code = document.getElementById("coursecodeinput").value;
  var credit_hour = document.getElementById("credithourinput").value;

  var option_sem = document.getElementById("semoption").value;

  console.log(course);
  console.log(course_code);
  console.log(credit_hour);

  console.log(semnum);
  console.log(num);

  console.log(window.subject[semnum][num].course);

  window.subject[semnum][num].course = course.toString();
  window.subject[semnum][num].course_code = course_code.toString();
  window.subject[semnum][num].credit_hour = credit_hour.toString();

  var as = document.getElementById(getTableId);

  var subjectId = getTableIndex + "_" + getIndex;
  var buttonId = "button" + subjectId;
  var listId = "list" + subjectId;
  var iconId = "icon" + subjectId;
  var ulId = "ul" + subjectId;
  var editId = "edit_" + subjectId;
  var deleteId = "delete" + subjectId;

  var getRow = parseInt(num) + parseInt(1);

  console.log(getRow);
  var trs = as.getElementsByTagName("tr")[getRow];

  trs.innerHTML = `
                        <td><input type="checkbox" name="  " id=${subjectId} value="false"></td>
                        <td>${course_code}</td>
                        <td>${course}</td>
                        <td>${credit_hour}</td>
                        <td id=${buttonId}>
                        
                        <button id="${listId}" class="mdl-button mdl-js-button mdl-button--icon">
                            <p id='${iconId}' class="material-icons">more_vert</p>
                    </button>

                    <ul id='${ulId}' class="mdl-menu mdl-js-menu" for="${listId}">
                        <li id='${editId}'class="editmenu mdl-menu__item" onclick="editsubject(this.id)">Edit</li>                          
                        <li id='${deleteId}'class="deletemenu mdl-menu__item" onclick="">Delete</li>
                    </ul>
                    
                    </td>
                    `;

  var button = document.getElementById(listId);
  componentHandler.upgradeElement(button);

  var icon = document.getElementById(iconId);
  componentHandler.upgradeElement(icon);

  var ul = document.getElementById(ulId);
  componentHandler.upgradeElement(ul);

  var editsub = document.getElementById(editId);
  componentHandler.upgradeElement(editsub);

  var deletesub = document.getElementById(editId);
  componentHandler.upgradeElement(deletesub);

  var getButton = document.getElementById("donefabbutton");
  getButton.setAttribute("onClick", "javascript:getValue();");

  //IF THE VALUE OPTIONS CHANGES

  var sel = document.getElementById("semoption");
  var getTableId = "";
  var getTableNum = 0;

  if (sel.options[sel.selectedIndex].text == window.sem[semnum].sem_name) {
    console.log(" The subject is same with the option");
  } else {
    //DELETING ROW THAT EXIST IN TABLE BEFORE

    var getDeleteTable = "table" + getTableIndex;

    console.log("Table to delete : " + getDeleteTable);

    var deleteTable = document.getElementById(getDeleteTable).tBodies[0];

    for (var i = 0; i < deleteTable.rows.length; i++) {
      var trs = deleteTable.getElementsByTagName("tr")[i];
      var cellVal = trs.cells[4].id;

      var fields = cellVal.split("_");
      var one = fields[0];
      var theIdRow = fields[1];

      console.log("Delete row : " + theIdRow);

      if (theIdRow == window.subject[semnum][num].course_id) {
        deleteTable.deleteRow(i);
        window.subject[semnum].splice(num, 1);
      }

      calculateTotalCredit(semnum);
      calculateTotalCreditTaken(semnum);
    }

    //ADDING ROW TO TARGETTED TABLE

    var str = sel.options[sel.selectedIndex].text;

    var getCurrentTable;

    for (i = 0; i < window.sem.length; i++) {
      if (window.sem[i].sem_name == str) {
        getCurrentTable = window.sem[i].sem_id;
      } else {
        console.log("error");
      }
    }

    window.currentTable = getCurrentTable;

    console.log("MOVE CURRENT TABLE ID" + window.currentTable);

    getValue();
  }
  progressBar();
  cookieManagement();
}

function deleteSem(value) {
  var r = confirm("Confirm delete?");
  if (r == true) {
    deleteAction();
    progressBar();
    cookieManagement();
  } else {
    console.log("You pressed Cancel!");
  }

  function deleteAction() {
    var fields = value.split("_");
    var name = fields[0];
    var tableIndex = fields[1];

    var index;

    for (i = 0; i < window.sem.length; i++) {
      if (window.sem[i].sem_id == tableIndex) {
        console.log(tableIndex);
        index = i;
      }
    }

    var tbl = document.getElementById("table" + tableIndex);
    tbl.remove();

    document.getElementById("card" + tableIndex).parentElement.remove();

    window.sem.splice(index, 1);

    console.log(window.sem);

    //DELETE SPLICE ALL THE ELEMENT IN ARRAY
    for (j = 0; j < window.subject[index].length; j++) {
      window.subject[index].splice(j, 1);
    }

    window.subject.splice(index, 1);

    console.log(window.subject);
  }
}

//CSV FILE MANAGEMENT

var el = document.getElementById("fileUpload");
el.onchange = function () {
  Upload();
};

function Upload() {
  data = [];

  var csvData = new Array();

  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      var reader = new FileReader();
      reader.onload = function (e) {
        var rows = e.target.result.split("\n");
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

            generateArray(csvData);
            generateAllBuild();
          } else {
            console.log("The table change cancelled");
          }
        } else {
          console.log("Table inserted");
          console.log("The table will be inserted now");

          //Put here
          generateArray(csvData);
          generateAllBuild();

          console.log(window.sem);
          console.log(window.subject);
        }
      };
      reader.readAsText(fileUpload.files[0]);
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }

  document.getElementById("fileUpload").value = null;
}

function generateArray(csvData) {
  //CSV DATA TO ARRAY AND CHECK HOW MANY SEM
  var newarray = csvData.map(function (value, index) {
    console.log("Csv data" + csvData[index][0]);

    var reg = /^[0-9]*[.]?[0-9]*$/;

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

  var getSem;

  //Id contained unique value

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

  //Building Table

  console.log("Get sem " + getSem);

  //Build array for every sem

  var semName = [];

  for (i = 0; i < getSem.length; i++) {
    console.log("Just for checking:" + getSem[i]);

    for (var j = 0; j < csvData.length; j++) {
      if (getSem[i] == csvData[j][0]) {
        semName.push(csvData[j][1]);
        break;
      }
    }
  }

  for (i = 0; i < getSem.length; i++) {
    console.log("Sem id" + getSem[i]);
    console.log("Sem name length: " + semName.length);
    console.log("Sem name: " + semName[i]);
    if (getSem.length == 0) {
      window.sem[0] = new Sem(getSem[i], semName[i]);
    } else {
      window.sem.push(new Sem(getSem[i], semName[i]));
    }

    if (getSem.length == 0) {
      window.subject[0] = [];
    } else {
      window.subject.push([]);
    }
  }

  const arrFiltered = csvData.filter((el) => {
    return el != null && el != "";
  });

  for (j = 0; j < csvData.length; j++) {
    var s_id = csvData[j][0];
    var s_name = csvData[j][1];
    var c_id = csvData[j][2];
    var c_name = csvData[j][3];
    var c_code = csvData[j][4];
    var c_hour = csvData[j][5];
    var taken = csvData[j][6];

    var findIndex;

    for (var x = 0; x < window.sem.length; x++) {
      if (csvData[j][0] == window.sem[x].sem_id) {
        findIndex = x;
        break;
      }
    }

    window.subject[findIndex].push(
      new Subject(s_id, s_name, c_id, c_name, c_code, c_hour, taken)
    );
  }

  console.log("DATA LENGTH : " + window.subject.length);
}

function generateAllBuild() {
  console.log("run through build");

  for (var i = 0; i < window.sem.length; i++) {
    console.log("run here");

    buildSem(window.sem[i].sem_id, window.sem[i].sem_name, i);

    for (var j = 0; j < window.subject[i].length; j++) {
      var s_id = window.subject[i][j].sem_id;
      var s_name = window.subject[i][j].sem_name;
      var c_id = window.subject[i][j].course_id;
      var c_name = window.subject[i][j].course;
      var c_code = window.subject[i][j].course_code;
      var c_hour = window.subject[i][j].credit_hour;
      var taken = window.subject[i][j].taken;

      buildSubject(c_id, c_name, c_code, c_hour, s_id);
    }
  }
}

function buildSem(gettableId, gettablename, index) {
  //INDEX OF TABLE
  let length = index;
  let tableId = gettableId;
  let createId = "table " + tableId;

  //CREDIT HOUR AREA

  var creditHourArea = document.createElement("DIV");
  creditHourArea.style.cssFloat = "right";

  //TOTAL CREDIT HOUR

  //LABEL
  var labelCreditArea = document.createElement("p");
  var labelTextTotalCredit = document.createTextNode("Total Ch:");
  labelCreditArea.appendChild(labelTextTotalCredit);
  labelCreditArea.style.display = "inline";

  var totalCreditArea = document.createElement("p");
  totalCreditArea.textContent = "";
  totalCreditArea.setAttribute("id", "totalcredithour_" + tableId);
  totalCreditArea.style.display = "inline";
  totalCreditArea.style.margin = "0.5rem";

  //TOTAL CREDIT HOUR TAKEN

  var labelCreditTakenArea = document.createElement("p");
  var labelTextTotalCreditTaken = document.createTextNode("Total Ch Taken:");
  labelCreditTakenArea.appendChild(labelTextTotalCreditTaken);
  labelCreditTakenArea.style.display = "inline";

  var totalCreditTakenArea = document.createElement("p");
  totalCreditTakenArea.textContent = "";
  totalCreditTakenArea.setAttribute("id", "totalcredithourtaken_" + tableId);
  totalCreditTakenArea.style.display = "inline";
  totalCreditTakenArea.style.margin = "0.5rem";

  creditHourArea.appendChild(labelCreditArea);
  creditHourArea.appendChild(totalCreditArea);
  creditHourArea.appendChild(labelCreditTakenArea);
  creditHourArea.appendChild(totalCreditTakenArea);

  //CREATE ELEMENT
  var tablespace = document.createElement("DIV");
  var table = document.createElement("TABLE");
  var addbtn = document.createElement("DIV");
  var editbtn = document.createElement("DIV");
  var tableNameArea = document.createElement("DIV");
  var tablename = document.createElement("TEXTAREA");
  var muladdbtn = document.createElement("DIV");
  var deleteTableBtn = document.createElement("DIV");

  var buttonSection = document.createElement("DIV");

  var div = document.createElement("div");

  //TABLE NAME
  var tableNameId = "tablename" + tableId;
  var t = document.createTextNode(gettablename);
  tablename.appendChild(t);
  tablename.setAttribute("id", tableNameId);
  tablename.readOnly = true;
  tablename.style.display = "inline-block";
  tablename.style.resize = "none";
  tableNameArea.className = "tablenamearea";

  tableNameArea.appendChild(tablename);

  //EDIT BUTTON FOR TABLENAME

  var editButtonId = "editbuttonid_" + tableId;
  var editButtonIcon = "editbuttonicon_" + tableId;

  editbtn.style.width = "56px";
  editbtn.style.height = "56px";
  editbtn.style.float = "right";
  editbtn.style.paddingTop = "5px";

  editbtn.innerHTML = `<button id="${editButtonId}" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onclick="changeState(this.id)">
        <i id="${editButtonIcon}" class="material-icons">edit</i>
        </button>`;

  tableNameArea.appendChild(editbtn);

  //TBODY
  var tablebody = document.createElement("TBODY");

  //TABLE HEADER

  var checkBoxAll = "checkboxall_" + tableId;

  var tr = document.createElement("tr");
  tr.innerHTML = `<th><input type="checkbox" name="" id="${checkBoxAll}" onclick="changeCheckboxForAll(this.id)"></th><th id="course_code ">Course code</th>
            <th id="course">Course</th>
            <th id="credit_hour">Credit hour</th>
            <th></th>`;

  //BUTTON SECTION

  //ADD SUBJECT BUTTON ELEMENT

  var addsection = document.createElement("DIV");
  addsection.className = "addsection";

  addbtn.innerHTML = `<button onclick="openModalAddSubject(this.id)" id="${tableId}" class="addsubject mdc-button mdc-button--raised " >
            <span class="mdc-button__label">Add Subject</span>
            </button>`;

  muladdbtn.innerHTML = `<button onclick="setCurrentForMulSub(this.id)" id="${
    "muladd_" + tableId
  }" class="addsubject mdc-button mdc-button--raised" >
            <span class="mdc-button__label">Add Multiple Subject</span>
            </button>`;

  deleteTableBtn.innerHTML = `<button onclick=" deleteSem(this.id)" id="${
    "delete_" + tableId
  }" class="deleteubject mdc-button mdc-button--outlined" >
  <i class="material-icons mdc-button__icon" aria-hidden="true">delete</i>
            <span class="mdc-button__label">Delete Table</span>
            </button>`;

  addbtn.style.float = "left";
  addbtn.style.margin = "0.5rem";
  muladdbtn.style.float = "left";
  muladdbtn.style.margin = "0.5rem";
  // deleteTableBtn.style.float = "left";
  deleteTableBtn.style.margin = "0.5rem";

  addsection.appendChild(addbtn);
  addsection.appendChild(muladdbtn);

  buttonSection.className = "button-section";
  // buttonSection.appendChild(addbtn);
  // buttonSection.appendChild(muladdbtn);
  buttonSection.appendChild(addsection);
  buttonSection.appendChild(deleteTableBtn);

  //INSERT ELEMENT HEADER TO TABLE
  table.appendChild(tr);
  table.appendChild(tablebody);
  table.setAttribute("id", "table" + tableId);

  //CREATE DIV FOR TABLE AND APPEND TABLE TO DIV
  div.appendChild(creditHourArea);
  div.appendChild(tableNameArea);
  div.appendChild(table);
  div.appendChild(buttonSection);
  div.className = "card";
  div.setAttribute("id", "card" + tableId);
  tablespace.appendChild(div);

  //MAKE THE ADD TABLE BUTTON TO THE LASS ELEMENT

  var element = document.getElementById("cards");
  //   element.appendChild(tablespace);

  var referenceNode = document.getElementById("addtablearea");

  element.insertBefore(tablespace, referenceNode);

  var classlength = document.getElementsByClassName("card").length;
  console.log("class length " + classlength);

  var upgreadedEditBtn = document.getElementById(editButtonId);
  componentHandler.upgradeElement(upgreadedEditBtn);

  //SEM PICKER LIST

  var selectlist = document.getElementById("semoption");

  var li = document.createElement("option");
  li.innerHTML = `${window.sem[length].sem_name}`;

  selectlist.appendChild(li);
}

function buildSubject(course_id, course, course_code, credit_hour, tableIndex) {
  //CREATE ALL VARIABLES

  var tableId = "table" + tableIndex;

  console.log("Table Id:" + tableId);

  for (i = 0; i < window.sem.length; i++) {
    console.log("lOOPING COUNT" + i);
    console.log("lOOPING LENGTH" + window.sem.length);
    console.log("Sem id " + window.sem[i].sem_id);
    console.log("Sem id in array" + tableIndex);

    if (window.sem[i].sem_id == tableIndex) {
      var index = i;
    } else {
      console.log("Not find table");
    }
  }

  console.log("Index of table " + index);

  var table = document.getElementById(tableId);

  var getLength = window.subject[index].length;

  rowCount = course_id;

  //CHECK SEM NEM

  var s_id = tableIndex;
  var s_name = window.sem[index].sem_name;
  var c_id = rowCount;
  var c_name = course;
  var c_code = course_code;
  var c_hour = credit_hour;
  var taken = "false";

  var subjectId = s_id + "_" + c_id;
  var checkboxId = "check_" + subjectId;
  var buttonId = "button" + subjectId;
  var listId = "list" + subjectId;
  var iconId = "icon" + subjectId;
  var ulId = "ul" + subjectId;
  var editId = "edit_" + subjectId;
  var deleteId = "delete_" + subjectId;

  var newRow = document
    .getElementById(tableId)
    .getElementsByTagName("tbody")[0]
    .insertRow();
  // newRow = "<td>New row text</td><td>New row 2nd cell</td>"; <-- won't work
  newRow.innerHTML = `
                        <td><input type="checkbox" name="  " id=${checkboxId} onclick="changeCheckbox(this.id)" value="false"></td>
                        <td>${course_code}</td>
                        <td>${course}</td>
                        <td>${credit_hour}</td>
                        <td id=${buttonId}>
                        
                        <button id="${listId}" class="mdl-button mdl-js-button mdl-button--icon">
                            <p id='${iconId}' class="material-icons">more_vert</p>
                    </button>

                    <ul id='${ulId}' class="mdl-menu mdl-js-menu" for="${listId}">
                        <li id='${editId}'class="editmenu mdl-menu__item" onclick="editsubject(this.id)">Edit</li>                          
                        <li id='${deleteId}'class="deletemenu mdl-menu__item" onclick="deletesubject(this.id)">Delete</li>
                    </ul>
                    
                    </td>
                    `;

  var button = document.getElementById(listId);
  componentHandler.upgradeElement(button);

  var icon = document.getElementById(iconId);
  componentHandler.upgradeElement(icon);

  var ul = document.getElementById(ulId);
  componentHandler.upgradeElement(ul);

  var editsub = document.getElementById(editId);
  componentHandler.upgradeElement(editsub);

  var deletesub = document.getElementById(editId);
  componentHandler.upgradeElement(deletesub);

  calculateTotalCredit(index);
  calculateTotalCreditTaken(index);
}

function download_csv() {
  if (window.subject.length > 0) {
    var data = [];

    var rowcount = 0;

    for (i = 0; i < window.subject.length; i++) {
      for (j = 0; j < window.subject[i].length; j++) {
        data.push([]);

        data[rowcount].push([
          window.subject[i][j].sem_id,
          window.subject[i][j].sem_name,
          window.subject[i][j].course_id,
          window.subject[i][j].course,
          window.subject[i][j].course_code,
          window.subject[i][j].credit_hour,
          window.subject[i][j].taken,
        ]);

        rowcount = rowcount + 1;
      }
    }

    var csv =
      "sem_id,sem_name,course_id,course,course_code,credit_hour,taken\n";
    data.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });

    console.log(csv);
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "studyplan.csv";
    hiddenElement.click();
  } else {
    alert("Nothing to be downloaded");
  }
}

//CREATE UUID
function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

//FOR ADDING MULTIPLE SUBJECT
function muladdsubjectarea() {
  var getArea = document.getElementById("mularea");

  var createArea = document.createElement("DIV");
  var courseCodeArea = document.createElement("INPUT");
  var courseArea = document.createElement("INPUT");
  var creditHourArea = document.createElement("INPUT");

  courseCodeArea.className = "mul";
  courseCodeArea.setAttribute("id", "mulcoursecode");
  courseCodeArea.placeholder = "Course Code";

  courseArea.className = "mul";
  courseArea.setAttribute("id", "mulcourse");
  courseArea.placeholder = "Course ";

  creditHourArea.className = "mul";
  creditHourArea.setAttribute("id", "mulcredithour");
  creditHourArea.placeholder = "Credit Hour";

  createArea.appendChild(courseCodeArea);
  createArea.appendChild(courseArea);
  createArea.appendChild(creditHourArea);

  getArea.appendChild(createArea);
}

function muldeletesubjectarea() {
  var parent = document.getElementById("mularea");
  parent.removeChild(parent.lastElementChild);
}

function muldone() {
  var divNode = document.getElementById("mularea");
  var inputNodes = divNode.getElementsByTagName("DIV");

  for (var i = 0; i < inputNodes.length; ++i) {
    var inputNode = inputNodes[i];

    var inputAreas = inputNode.getElementsByTagName("INPUT");

    document.getElementById("coursecodeinput").value = inputAreas[0].value;
    document.getElementById("coursenameinput").value = inputAreas[1].value;
    document.getElementById("credithourinput").value = inputAreas[2].value;

    getValue();
    progressBar();
    cookieManagement();
  }

  //RESET THE AREA BACK

  var myNode = document.getElementById("mularea");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }

  muladdsubjectarea();

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == window.currentTable) {
      var semnum = i;
    }
  }

  calculateTotalCredit(semnum);
  calculateTotalCreditTaken(semnum);

  mulcancel();
}

function mulcancel() {
  var mulmodal = document.getElementById("mulModal");

  mulmodal.style.display = "none";
}

//OPEN MODAL ADD SUBJECT
function openModalAddSubject(tableId) {
  window.currentTable = tableId;

  document.getElementById("coursenameinput").value = "";

  document.getElementById("coursecodeinput").value = "";

  document.getElementById("credithourinput").value = "";

  setOptionToCurrent();

  console.log("Debug id:" + window.currentTable);

  // function cancelDropDown(ev) {
  //   ev.preventDefault();
  // }

  // document.getElementById("selectElement").addEventListener("mousedown", cancelDropDown, false);

  document.getElementById("semoption").disabled = "true";

  openFAB();
}

function setCurrentForMulSub(value) {
  var fields = value.split("_");
  var name = fields[0];
  var tableIndex = fields[1];

  mulmodal.style.display = "block";
  window.currentTable = tableIndex;
}

//OPEN CHOOSE STUY PLAN

function openChooseModal() {
  var chooseModal = document.getElementById("chooseModal");

  chooseModal.style.display = "block";
}

function setOptionToCurrent() {
  var sel = document.getElementById("semoption");

  for (var i = 0; i < window.sem.length; i++) {
    if (window.currentTable == window.sem[i].sem_id) {
      var getName = window.sem[i].sem_name;
      var val = i;
      console.log("Option index" + i);
    } else {
      console.log("Not find");
    }
  }

  sel.options[0].disabled = true;

  for (var i = 0; i < sel.options.length; ++i) {
    if (sel.options[i].innerHTML === getName) {
      sel.selectedIndex = i;
      console.log(sel.options[i].innerHTML);
      break;
    }
  }
}

//CHECKBOX MANAGEMENT FOR ALL CLICK

function changeCheckboxForAll(value) {
  var fields = value.split("_");
  var getTableIndex = fields[1];
  var semnum;

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == getTableIndex) {
      semnum = i;
    }
  }

  var decider = document.getElementById(value);
  if (decider.checked) {
    console.log("check");

    var table = document.getElementById("table" + getTableIndex);

    var content = table.getElementsByTagName("tbody")[0];

    for (var i = 0; i < content.rows.length; i++) {
      content.rows[i].style.backgroundColor = "#dddddd";

      window.subject[semnum][i].taken = "true";

      //SET THE CHECKBOX TO TRUE

      var getTableId = window.subject[semnum][i].sem_id;
      var getTheId = window.subject[semnum][i].course_id;

      var checkBoxId = "check_" + getTableId + "_" + getTheId;

      console.log("Check box id" + checkBoxId);

      var getCheckBox = document.getElementById(checkBoxId);

      getCheckBox.checked = true;
    }

    calculateTotalCreditTaken(semnum);

    progressBar();
    cookieManagement();
  } else {
    console.log("unchecked");

    var table = document.getElementById("table" + getTableIndex);

    var content = table.getElementsByTagName("tbody")[0];

    for (var i = 0; i < content.rows.length; i++) {
      content.rows[i].style.backgroundColor = "white";

      window.subject[semnum][i].taken = "false";

      //SET THE CHECKBOX TO TRUE
      var getTableId = window.subject[semnum][i].sem_id;
      var getTheId = window.subject[semnum][i].course_id;

      var checkBoxId = "check_" + getTableId + "_" + getTheId;

      console.log("Check box id" + checkBoxId);

      var getCheckBox = document.getElementById(checkBoxId);

      getCheckBox.checked = false;
    }

    calculateTotalCreditTaken(semnum);
    progressBar();
    cookieManagement();
  }
}

function changeCheckbox(value) {
  var fields = value.split("_");
  var getTableIndex = fields[1];
  var getIndex = fields[2];
  var semnum;
  var num;

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == getTableIndex) {
      semnum = i;
    }
  }

  for (i = 0; i < window.subject[semnum].length; i++) {
    if (window.subject[semnum][i].course_id == getIndex) {
      num = i;
    }
  }

  var decider = document.getElementById(value);
  if (decider.checked) {
    console.log("check");

    var table = document.getElementById("table" + getTableIndex);

    var content = table.getElementsByTagName("tbody")[0];

    for (var i = 0; i < content.rows.length; i++) {
      if (i == num) {
        content.rows[i].style.backgroundColor = "#dddddd";
      }
    }

    window.subject[semnum][num].taken = "true";

    calculateTotalCreditTaken(semnum);
    progressBar();
    cookieManagement();
  } else {
    console.log("unchecked");

    var table = document.getElementById("table" + getTableIndex);

    var content = table.getElementsByTagName("tbody")[0];

    for (var i = 0; i < content.rows.length; i++) {
      if (i == num) {
        content.rows[i].style.backgroundColor = "white";
      }
    }

    window.subject[semnum][num].taken = "false";

    calculateTotalCreditTaken(semnum);
    progressBar();
    cookieManagement();
  }
}

function calculateTotalCredit(semnum) {
  var totalCredit = 0;

  for (i = 0; i < window.subject[semnum].length; i++) {
    var getCreditHour = window.subject[semnum][i].credit_hour;

    var x = parseFloat(getCreditHour);
    totalCredit = totalCredit + x;
  }

  var totalCreditHourArea = document.getElementById(
    "totalcredithour_" + window.sem[semnum].sem_id
  );

  totalCreditHourArea.innerHTML = totalCredit.toString();

  console.log("text" + totalCredit.toString);
  console.log(totalCreditHourArea);
  console.log("Total credit :" + totalCredit);
}

function calculateTotalCreditTaken(semnum) {
  var totalCredit = 0;

  for (i = 0; i < window.subject[semnum].length; i++) {
    if (window.subject[semnum][i].taken == "true") {
      var getCreditHour = window.subject[semnum][i].credit_hour;

      var x = parseFloat(getCreditHour);
      totalCredit = totalCredit + x;
    }
  }

  var totalCreditHourArea = document.getElementById(
    "totalcredithourtaken_" + window.sem[semnum].sem_id
  );

  totalCreditHourArea.innerHTML = totalCredit.toString();

  console.log("Total credit taken :" + totalCredit);
}

function progressBar() {
  var progressbar = document.getElementById("progressbarid");

  var totalCh = 0;
  var totalChTaken = 0;

  for (var i = 0; i < window.subject.length; i++) {
    for (var j = 0; j < window.subject[i].length; j++) {
      var num = 0;
      num = parseFloat(window.subject[i][j].credit_hour);
      totalCh = totalCh + num;

      if (window.subject[i][j].taken == "true") {
        totalChTaken = totalChTaken + num;
      }
    }
  }

  var progress = (totalChTaken / totalCh) * 100;

  console.log(totalCh);
  console.log(totalChTaken);

  document.getElementById("calculateprogress").innerHTML =
    String(totalChTaken) + "/" + String(totalCh);

  progressbar.style.width = progress + "%";
  progressbar.style.transition = "all 2s";
}

function resetStudyPlan() {
  var r = confirm("Confirm Reset?");
  if (r == true) {
    resetAction();
  } else {
    console.log("You pressed Cancel!");
  }

  function resetAction() {
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
    progressBar();
    cookieManagement();
  }
}

$(document).ready(function () {
  var data = JSON.parse(localStorage.getItem("subject"));

  // console.log("debug local storage:"+ data);

  if (data.length > 0) {
    console.log("Get through local storage");

    var keys = Object.keys(data);

    var hold = [];

    for (var i = 0, len = keys.length; i < len; i++) {
      window.subject.push([]);
    }

    for (var i = 0, len = keys.length; i < len; i++) {
      console.log(data[0][0].course);

      console.log(data[i].length);

      //Local storage to array subject

      if (data[i].length > 0) {
        for (var j = 0; j < data[i].length; j++) {
          var s_id = data[i][j].sem_id;
          var s_name = data[i][j].sem_name;
          var c_id = data[i][j].course_id;
          var c_name = data[i][j].course;
          var c_code = data[i][j].course_code;
          var c_hour = data[i][j].credit_hour;
          var taken = data[i][j].taken;

          window.subject[i].push(
            new Subject(s_id, s_name, c_id, c_name, c_code, c_hour, taken)
          );

          console.log("good");
        }
      }
    }

    //Local storage to array sem

    for (var j = 0; j < window.subject.length; j++) {
      if (window.subject[j].length > 0) {
        console.log(window.subject.length);

        var id = window.subject[j][0].sem_id;
        var name = window.subject[j][0].sem_name;
        window.sem.push(new Sem(id, name));
      }
    }

    console.log(window.subject);

    generateAllBuild();

    cookieProgressBar();
  }
});

function cookieProgressBar() {
  console.log("get thorugh progress bar");

  //set checkbox to true every sem

  for (var i = 0; i < window.subject.length; i++) {
    var dontTick = "true";

    var value = "checkboxall_" + window.subject[i][0].sem_id;

    for (var j = 0; j < window.subject[i].length; j++) {
      
      if (window.subject[i][j].taken == "false") {
        console.log("this subject flase " + window.subject[i][j].course);
        dontTick = "false";
      }
    }

    console.log("Dont tick value " + dontTick);

    if (dontTick == "false") {
      console.log("this table false " + window.subject[i][0].sem_name);
      document.getElementById(value).checked = false;
    } else if (dontTick == "true") {
      console.log("this table true " + window.subject[i][0].sem_name);
      document.getElementById(value).checked = true;
    }
  }

   //set checkbox to true every subject

   for (var i = 0; i < window.subject.length; i++) {

    for (var j = 0; j < window.subject[i].length; j++) {

        var value = "check_" + window.subject[i][j].sem_id + "_" + window.subject[i][j].course_id;

        if (window.subject[i][j].taken == "true") {
            document.getElementById(value).checked = true;

            var table = document.getElementById("table" + window.subject[i][j].sem_id);

            var content = table.getElementsByTagName("tbody")[0];

            for (var x = 0; x < content.rows.length; x++) {
                if (x == j) {
                    content.rows[x].style.backgroundColor = "#dddddd";
                }
            }
        }
    }

}
}

function cookieManagement() {
  window.localStorage.setItem("subject", JSON.stringify(window.subject));

  console.log("Local storage Saved");
}
