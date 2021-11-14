<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Office
 *
 * @ORM\Table(name="office")
 * @ORM\Entity
 */
class Office
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="office_code", type="string", length=6, nullable=false)
     */
    private $officeCode;

    /**
     * @var string
     *
     * @ORM\Column(name="adress", type="string", length=100, nullable=false)
     */
    private $adress;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOfficeCode(): ?string
    {
        return $this->officeCode;
    }

    public function setOfficeCode(string $officeCode): self
    {
        $this->officeCode = $officeCode;

        return $this;
    }

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(string $adress): self
    {
        $this->adress = $adress;

        return $this;
    }


}
