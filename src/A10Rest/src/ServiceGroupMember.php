<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="servicegroups_members")
 */
class ServiceGroupMember{
  /**
	  * @Id
	  * @Column(type="string")*/
    public $a10url;


  /** @Column(type="string",nullable=true)*/
  public $name;

      /** @Column(type="integer",nullable=true)*/
  public $port;
      /** @Column(type="string",nullable=true)*/
  public $memberstate;
      /** @Column(type="string",nullable=true)*/
  public $memberstatsdatadisable;
      /** @Column(type="string",nullable=true)*/
  public $memberpriority;
      /** @Column(type="string",nullable=true)*/
  public $uuid;


  /**
    * @ManyToMany(targetEntity="ServiceGroup")
    * @JoinTable(name="servicegroups_members_relation",
    *      joinColumns={@JoinColumn(name="servera10url", referencedColumnName="a10url")},
    *      inverseJoinColumns={@JoinColumn(name="servicegroupname", referencedColumnName="name")}
    *      )
    */
  public $servicegroups_members;

  /**
    * @ManyToOne(targetEntity="PortTemplate")
    * @JoinColumn(name="templateport", referencedColumnName="name")
    */
  public $porttemplateObject;
  /**
    * has a hostname
    *
    * @ManyToOne(targetEntity="A10")
    * @JoinColumn(name="hostname", referencedColumnName="hostname",onDelete="CASCADE")*/
  public $a10_object;

  /** @Column(type="string", nullable=true)*/
  public $vendor;
  public function __construct() {
     $this->servicegroups_members = new ArrayCollection();
 }
}
