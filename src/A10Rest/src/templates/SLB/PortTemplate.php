<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="porttemplates")
 */
class PortTemplate {
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
    public $destnat;
    /** @Column(type="string",nullable=true)*/
    public $dynamicmemberpriority;
    /** @Column(type="string",nullable=true)*/
    public $decrement;
    /** @Column(type="string",nullable=true)*/
    public $extendedstats;
    /** @Column(type="string",nullable=true)*/
    public $nossl;
    /** @Column(type="string",nullable=true)*/
    public $statsdataaction;
    /** @Column(type="string",nullable=true)*/
    public $healthcheckdisable;
    /** @Column(type="string",nullable=true)*/
    public $inbandhealthcheck;
    /** @Column(type="string",nullable=true)*/
    public $weight;
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
