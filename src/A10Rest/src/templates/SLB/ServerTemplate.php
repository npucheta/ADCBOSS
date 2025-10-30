<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="servertemplates")
 */
class ServerTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string")*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $connlimit;
    /** @Column(type="string",nullable=true)*/
    public $connlimitnologging;
    /** @Column(type="string",nullable=true)*/
    public $dnsqueryinterval;
    /** @Column(type="string",nullable=true)*/
    public $dynamicserverprefix;
    /** @Column(type="string",nullable=true)*/
    public $extendedstats;
    /** @Column(type="string",nullable=true)*/
    public $logselectionfailure;
    /** @Column(type="string",nullable=true)*/
    public $healthcheckdisable;
    /** @Column(type="string",nullable=true)*/
    public $maxdynamicserver;
    /** @Column(type="string",nullable=true)*/
    public $minttlratio;
    /** @Column(type="string",nullable=true)*/
    public $spoofingcache;
    /** @Column(type="string",nullable=true)*/
    public $statsdataaction;
    /** @Column(type="string",nullable=true)*/
    public $slowstart;
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
