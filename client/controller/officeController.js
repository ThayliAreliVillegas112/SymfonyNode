const getOfficeById = async id =>{
    return await $.ajax({
        type: 'GET',
        url : 'http://localhost:4000/offices/' + id
    }).done(res => res);
};

const getOfficeId = async id => {
    document.getElementById("id_delete").value = id;
    console.log(id_delete);
    console.log(document.getElementById("id_delete").value);
};

const getOfficeInfo = async id =>{
   let office = await getOfficeById(id);
   document.getElementById('adress2').value = office.office[0].adress;
   document.getElementById('office_code').value = office.office[0].office_code;
   
   
   console.log(office);
};
const getInfoOfficeUpdate = async id =>{
    let office = await getOfficeById(id);
    
    document.getElementById('id2_update').value = id;
    document.getElementById('office_code_update').value = office.office[0].office_code;
    document.getElementById('adress2_update').value = office.office[0].adress;
    
};
const getOffice = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/offices'
    }).done(res => {
        console.log(res.listOffice); 

        let listOffice = res.listOffice;
        let table = $("#tabla2");
        table.append(
            "<tr class='table'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Office code</th>" +
            "<th scope='col'>Address</th>" +
            "<th scope='col'>Acciones</th>" +
            "</tr>")

        for (let i = 0; i < listOffice.length; i++) {
            
            table.append(
                "<tr>" +
                "<td>" + listOffice[i].id + "</td>" +
                "<td>" + listOffice[i].office_code + "</td>" +
                "<td>" + listOffice[i].adress + "</td>" +
                "<td>"+ '<button onclick="getOfficeInfo('+ listOffice[i].id +');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#details2"> Detalles</button> </td>'+
                "<td>"+ '<button onclick="getInfoOfficeUpdate('+ listOffice[i].id +');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update2"> Modificar</button> </td>'+
                "<td>"+ '<button onclick="getOfficeId('+ listOffice[i].id +');" type="button" class="btn btn-danger text-dark" data-bs-toggle="modal" data-bs-target="#delete2"> Eliminar</button> </td>'+
                "</tr>")
        }
    });
};



const updateOffice = async () =>{
    let id = document.getElementById('id2_update').value;
    let office_code = document.getElementById('office_code_update').value;
    let adress = document.getElementById('adress2_update').value;
    
    console.log(id);

    await $.ajax({
        type: 'POST', 
        url: 'http://localhost:4000/offices/update/' + id,
        data:{office_code, adress}
    }).done(function(res) {
        console.log(res);
    });
};

const deleteOffice = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/offices/delete' + id
    }).done(res => {
        console.log(res);
        //getoffice();
    });
};

const registerOffice = async () => {
    let office_code = document.getElementById('office_code_register').value;
    let adress = document.getElementById('adress2_register').value;

    await $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/offices/create',
        data: { office_code, adress }
    }).done(function (res) {
       console.log(res);

    });
};