<?php

namespace App\Controller;

header('Access-Control-Allow-Origin:*');  //se agregó esta linea que sirve para el error del CORS
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

// Json response
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class EmployeeController extends AbstractController
{
    
    public function employee()
    {

        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('SELECT e.id, e.name, e.adress, e.salary, e.registered, e.updated, e.status, e.idOffice FROM App:Employees e');
        $listEmployee = $query->getResult();
        $data = [
            'status' => 200,
            'message' => 'Hola! No se han encontrado resultados'
        ];
        if (count($listEmployee) > 0) {
            $data = [
                'status' => 200,
                'message' => 'Hola! Se encontraron ' . count($listEmployee) . 'Resultados',
                'listEmployee' => $listEmployee
            ];
        }
        return new JsonResponse($data);
    }

    public function employee_by_id($id)
    {
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('SELECT e.id, e.name, e.adress, e.salary, e.registered, e.updated, e.status, e.idOffice FROM App:Employees e WHERE e.id = :e');
        $query->setParameter(':e', $id);
        $employee = $query->getResult();
        $data = [
            'status' => 200,
            'message' => 'Hola! Se ha encontrado al empleado. ',
            'employee' => $employee
        ];
        return new JsonResponse($data);
    }

    public function create_employee(Request $request){
        $em = $this->getDoctrine()->getManager();

        $name = $request->get('name', null);
        $adress = $request->get('adress', null);
        $salary = $request->get('salary', null);
        $registered = $request->get('registered', null);
        $idOfficce = $request->get('idOffice', null);
        $dtTmp = new \DateTime('now');

        $employee = new  \App\Entity\Employees();

        $employee->setName($name);
        $employee->setAdress($adress);
        $employee->setSalary($salary);
        $employee->setRegistered($dtTmp);
        $employee->setStatus(1);
        $employee->setIdOffice($idOfficce);

        $em->persist($employee); //sentencia de la insercción
        $em->flush(); // Es como un commit

        $data = [
            'status' => 200,
            'message' => 'Hola! Se ha creado correctamente. ',
            'employee' => $employee
        ];

        return new JsonResponse($data);
    }

    public function delete_employee($id){
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('UPDATE App:Employees e SET e.status = 0 WHERE e.id = :id');
        $query->setParameter(':id', $id);
        $employee = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'Hola! Se ha deshabilitado el empleado correctamente. ',
            'employee' => $employee
        ];
        return new JsonResponse($data);
    }

    public function update_employee(Request $request, $id){
        $em = $this->getDoctrine()->getManager();

        $name = $request->get('name', null);
        $adress = $request->get('adress', null);
        $salary = $request->get('salary', null);
        $updated = $request->get('updated', null);
        $idOffice = $request->get('idOffice', null);
        $dtTmp = new \DateTime('now');

        $query = $em->createQuery(
            'UPDATE App:Employees e SET e.name = :name, e.adress = :adress, e.salary = :salary, e.updated = :updated, e.idOffice = :idOffice
            WHERE e.id = :id'
        );

        $query->setParameter('name', $name);
        $query->setParameter('adress', $adress);
        $query->setParameter('salary', $salary);
        $query->setParameter('updated', $dtTmp);
        $query->setParameter('idOffice', $idOffice);
        $query->setParameter('id', $id);
        $flag = $query->getResult();

        if($flag == 1){
            $data = [
                'status' => 200,
                'message' => 'Hola! Se ha actualizado correctamente. '
            ];
        }else{
            $data = [
                'status' => 200,
                'message' => 'Hola! No se ha actualizado correctamente. '
            ];
        }
        return new JsonResponse($data);
    }

}
