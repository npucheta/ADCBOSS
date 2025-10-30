<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="virtuals")
 */
class VirtualServer {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

  /** @Column(type="string",nullable=true)*/
  public $a10url;

  /** @Column(type="string",nullable=true)*/
  public $ipaddress;
  /** @Column(type="string",nullable=true)*/
  public $netmask;
  /** @Column(type="string",nullable=true)*/
  public $enabledisableaction;
  /** @Column(type="string",nullable=true)*/
  public $redistributionflagged;
  /** @Column(type="string",nullable=true)*/
  public $arpdisable;
  /** @Column(type="string",nullable=true)*/
  public $statsdataaction;
  /** @Column(type="string",nullable=true)*/
  public $extendedstats;
  /** @Column(type="string")*/
  public $uuid;

  /**
 * @ManyToOne(targetEntity="VirtualServerTemplate")
 * @JoinColumn(name="templatevirtualserver", referencedColumnName="name")
 */
  public $templatevirtualserverObject;

  /**
    * @ManyToMany(targetEntity="VirtualServerPort")
    * @JoinTable(name="virtuals_virtualports_relation",
    *      joinColumns={@JoinColumn(name="virtualname", referencedColumnName="name")},
    *      inverseJoinColumns={@JoinColumn(name="virtualportnamea10url", referencedColumnName="a10url", unique=true)}
    *      )
    */
  public $virtualports;
  /**
    * has a hostname
    *
    * @ManyToOne(targetEntity="A10")
    * @JoinColumn(name="hostname", referencedColumnName="hostname",onDelete="CASCADE")*/
  public $a10_object;

  /** @Column(type="string", nullable=true)*/
  public $vendor;

  public function __construct() {
     $this->virtualports = new ArrayCollection();
 }
}
