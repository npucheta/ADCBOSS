<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="virtualservertemplates")
 */
class VirtualServerTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string")*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $connlimit;
    /** @Column(type="string",nullable=true)*/
    public $connlimitreset;
    /** @Column(type="string",nullable=true)*/
    public $connlimitnologging;
    /** @Column(type="string",nullable=true)*/
    public $subnetgratuitousarp;
    /** @Column(type="string")*/
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
