<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="udptemplates")
 */
class UDPTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string")*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $idletimeout;
    /** @Column(type="string",nullable=true)*/
    public $statelessconntimeout;
    /** @Column(type="string",nullable=true)*/
    public $immediate;
    /** @Column(type="string",nullable=true)*/
    public $reselectifserverdown;
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
