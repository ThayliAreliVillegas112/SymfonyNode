const getEmployeeById = async id =>{
    return await $.ajax({
        type: 'GET',
        url : 'http://localhost/CompanySN/Employee/public/index.php/employee/' + id
    }).done(res => res);
};

const getId = async id => {
    document.getElementById("id_delete").value = id;
    console.log(id_delete);
    console.log(document.getElementById("id_delete").value);
};

const getInfo = async id =>{
   let employee = await getEmployeeById(id);
   var dateCreated = new Date(employee.employee[0].registered.date).toLocaleString();
    // let dateUpdated = new Date(employee.employee[0].updated.date).toLocaleString();

   if (employee.employee[0].updated == null){
        var dateUpdated = "No hay fecha de actualización";
   }else{
        var dateUpdated = new Date(employee.employee[0].updated.date).toLocaleString();
   };
    
   document.getElementById('name').value = employee.employee[0].name;
   document.getElementById('adress').value = employee.employee[0].adress;
   document.getElementById('salary').value = employee.employee[0].salary;
   document.getElementById('registered').value = dateCreated;
   document.getElementById('updated').value = dateUpdated;
   document.getElementById('status').value = employee.employee[0].status ? "Activo" : "Inactivo";
   document.getElementById('idOffice').value = employee.employee[0].idOffice;
   console.log(employee);
};
const getInfoUpdate = async id =>{
    let employee = await getEmployeeById(id);
    let dateCreated = new Date(employee.employee[0].registered.date).toLocaleString();
    // let dateUpdated = new Date(employee.employee[0].updated.date).toLocaleString();
    if (employee.employee[0].updated == null){
        var dateUpdated = "No hay fecha de actualización";
    }else{
        var dateUpdated = new Date(employee.employee[0].updated.date).toLocaleString();
    };
    
    document.getElementById('id_update').value = id;
    document.getElementById('name_update').value = employee.employee[0].name;
    document.getElementById('adress_update').value = employee.employee[0].adress;
    document.getElementById('salary_update').value = employee.employee[0].salary;
    document.getElementById('registered_update').value = dateCreated;
    document.getElementById('updated_update').value = dateUpdated;
    document.getElementById('idOffice_update').value = employee.employee[0].idOffice;
};
const getEmployee = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost/CompanySN/Employee/public/index.php/employee'
    }).done(res => {
        console.log(res.listEmployee); 

        let listEmployee = res.listEmployee;
        let table = $("#tabla");
        table.append(
            "<tr class='table'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Name</th>" +
            "<th scope='col'>Address</th>" +
            "<th scope='col'>Salary</th>" +
            "<th scope='col'>Registered</th>" +
            "<th scope='col'>Updated</th>" +
            "<th scope='col'>Status</th>" +
            "<th scope='col'>id Office</th>" +
            "<th scope='col'>Acciones</th>" +
            "</tr>")

        for (let i = 0; i < listEmployee.length; i++) {
            let dateCreated = new Date(listEmployee[i].registered.date).toLocaleString();
            if (listEmployee[i].updated == null){
                var dateUpdated = "Sin registro";
            }else{
                var dateUpdated = new Date(listEmployee[i].updated.date).toLocaleString();
            }
            
            table.append(
                "<tr>" +
                "<td>" + listEmployee[i].id + "</td>" +
                "<td>" + listEmployee[i].name + "</td>" +
                "<td>" + listEmployee[i].adress + "</td>" +
                "<td>" + listEmployee[i].salary + "</td>" +
                "<td>" + dateCreated + "</td>" +
                "<td>" + dateUpdated + "</td>" +
                "<td>" + listEmployee[i].status + "</td>" +
                "<td>" + listEmployee[i].idOffice + "</td>" +
                "<td>"+ '<button onclick="getInfo('+ listEmployee[i].id +');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#details"> Detalles</button> </td>'+
                "<td>"+ '<button onclick="getInfoUpdate('+ listEmployee[i].id +');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update"> Modificar</button> </td>'+
                "<td>"+ '<button onclick="getId('+ listEmployee[i].id +');" type="button" class="btn btn-danger text-dark" data-bs-toggle="modal" data-bs-target="#delete2"> Eliminar</button> </td>'+
                "</tr>")
        }
    });
};

const registerEmployee = async() =>{
    let name = document.getElementById('name_register').value;
    let adress = document.getElementById('adress_register').value;
    let salary = document.getElementById('salary_register').value;
    var date = Date.now();
    let registered = document.getElementById(date);
    let idOffice = document.getElementById('idOffice_register').value;

    await $.ajax({
        type: 'POST',
        url: 'http://localhost/CompanySN/Employee/public/index.php/employee/create' ,
        data: {name, adress,salary, registered, idOffice}
    }).done(function(res){
        console.log(res);
    });
};

const updateEmployee = async () =>{
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;
    let adress = document.getElementById('adress_update').value;
    let salary = document.getElementById('salary_update').value;
    let idOffice = document.getElementById('idOffice_update').value;
    // let updated = document.getElementById(now()).value;
    console.log(id);

    $.ajax({
        type: 'POST', 
        url: 'http://localhost/CompanySN/Employee/public/index.php/employee/update/' + id,
        data:{name, adress, salary, idOffice }
    }).done(function(res) {
        console.log(res);
    });
};

const deleteEmployee = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'GET',
        url: 'http://localhost/CompanySN/Employee/public/index.php/employee/delete/' + id
    }).done(res => {
        console.log(res);
        //getEmployee();
    });
};