<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="servicegroups")
 */
class ServiceGroup {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

/** @Column(type="string")*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $protocol;
    /** @Column(type="string",nullable=true)*/
    public $lbmethod;
    /** @Column(type="string",nullable=true)*/
    public $statelessautoswitch;
    /** @Column(type="string",nullable=true)*/
    public $resetonserverselectionfail;
    /** @Column(type="string",nullable=true)*/
    public $priorityaffinity;
    /** @Column(type="string",nullable=true)*/
    public $backupservereventlog;
    /** @Column(type="string",nullable=true)*/
    public $statsdataaction;
    /** @Column(type="string",nullable=true)*/
    public $extendedstats;
    /** @Column(type="string",nullable=true)*/
    public $trafficreplicationmirror;
    /** @Column(type="string",nullable=true)*/
    public $trafficreplicationmirrordarepl;
    /** @Column(type="string",nullable=true)*/
    public $trafficreplicationmirroriprepl;
    /** @Column(type="string",nullable=true)*/
    public $trafficreplicationmirrorsadarepl;
    /** @Column(type="string",nullable=true)*/
    public $trafficreplicationmirrorsarepl;
    /** @Column(type="string",nullable=true)*/
    public $healthcheckdisable;
    /** @Column(type="string",nullable=true)*/
    public $samplersptime;
    /** @Column(type="string")*/
    public $uuid;

    /**
      * @ManyToOne(targetEntity="PortTemplate")
      * @JoinColumn(name="templateport", referencedColumnName="name")
      */
    public $porttemplateObject;

    /**
      * @ManyToOne(targetEntity="ServerTemplate")
      * @JoinColumn(name="templateserver", referencedColumnName="name")
      */
    public $servertemplateObject;

    /**
      * @ManyToOne(targetEntity="PolicyTemplate")
      * @JoinColumn(name="templatepolicy", referencedColumnName="name")
      */
    public $policytemplateObject;
    /**
      * has a hostname
      *
      * @ManyToOne(targetEntity="A10")
      * @JoinColumn(name="hostname", referencedColumnName="hostname",onDelete="CASCADE")*/
    public $a10_object;

    /** @Column(type="string", nullable=true)*/
    public $vendor;
}
