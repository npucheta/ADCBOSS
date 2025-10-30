<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="diametertemplates")
 */
class DiameterTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string")*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $customizecea;
    /** @Column(type="string",nullable=true)*/
    public $dwrtime;
    /** @Column(type="string",nullable=true)*/
    public $idletimeout;
    /** @Column(type="string",nullable=true)*/
    public $multipleoriginhost;
    /** @Column(type="string",nullable=true)*/
    public $originhost;
    /** @Column(type="string",nullable=true)*/
    public $productname;
    /** @Column(type="string",nullable=true)*/
    public $vendorid;
    /** @Column(type="string",nullable=true)*/
    public $sessionage;
    /** @Column(type="string",nullable=true)*/
    public $uuid;
    /**
      * has a hostname
      *
      * @ManyToOne(targetEntity="A10")
      * @JoinColumn(name="hostname", referencedColumnName="hostname",onDelete="CASCADE")*/
    public $a10_object;

    /** @Column(type="string", nullable=true)*/
    public $vendor;
}
