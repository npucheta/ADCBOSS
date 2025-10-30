<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="serverssltemplates")
 */
class ServerSSLTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string",nullable=true)*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $enabletlsalertlogging;
    /** @Column(type="string",nullable=true)*/
    public $closenotify;
    /** @Column(type="string",nullable=true)*/
    public $sessionticketenable;
    /** @Column(type="string",nullable=true)*/
    public $ocspstapling;
    /** @Column(type="string",nullable=true)*/
    public $useclientsni;
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
