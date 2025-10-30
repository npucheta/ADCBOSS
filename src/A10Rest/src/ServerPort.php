<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="serverports")
 */
class ServerPort {
  /**
	  * @Id
	  * @Column(type="string")*/
  public $a10url;

/** @Column(type="string",nullable=true)*/
public $portnumber;
/** @Column(type="string",nullable=true)*/
public $protocol;
/** @Column(type="string",nullable=true)*/
public $range;
/** @Column(type="string",nullable=true)*/
public $templateport;
/** @Column(type="string",nullable=true)*/
public $action;
/** @Column(type="string",nullable=true)*/
public $nossl;
/** @Column(type="string",nullable=true)*/
public $healthcheckdisable;
/** @Column(type="string",nullable=true)*/
public $weight;
/** @Column(type="string",nullable=true)*/
public $connlimit;
/** @Column(type="string",nullable=true)*/
public $nologging;
/** @Column(type="string",nullable=true)*/
public $statsdataaction;
/** @Column(type="string",nullable=true)*/
public $extendedstats;
/** @Column(type="string")*/
public $uuid;


/**
  * @ManyToOne(targetEntity="PortTemplate")
  * @JoinColumn(name="templateserverport", referencedColumnName="name")
  */
public $serverporttemplateObject;

/**
  * @ManyToOne(targetEntity="ServerSSLTemplate")
  * @JoinColumn(name="templateserverssl", referencedColumnName="name")
  */
public $serverssltemplateObject;
/**
  * has a hostname
  *
  * @ManyToOne(targetEntity="A10")
  * @JoinColumn(name="hostname", referencedColumnName="hostname",onDelete="CASCADE")*/
public $a10_object;

/** @Column(type="string", nullable=true)*/
public $vendor;

}
