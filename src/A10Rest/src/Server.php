<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="servers")
 */
class Server {
  /**
	  * @Id
	  * @Column(type="string")*/
  public $name;


  /** @Column(type="string",nullable=true)*/
  public $a10url;

  /** @Column(type="string",nullable=true)*/
  public $host;
  /** @Column(type="string",nullable=true)*/
  public $action;
  /** @Column(type="string",nullable=true)*/
  public $templateserver;
  /** @Column(type="string",nullable=true)*/
  public $healthcheckdisable;
  /** @Column(type="string",nullable=true)*/
  public $connlimit;
  /** @Column(type="string",nullable=true)*/
  public $nologging;
  /** @Column(type="string",nullable=true)*/
  public $weight;
  /** @Column(type="string",nullable=true)*/
  public $slowstart;
  /** @Column(type="string",nullable=true)*/
  public $spoofingcache;
  /** @Column(type="string",nullable=true)*/
  public $statsdataaction;
  /** @Column(type="string",nullable=true)*/
  public $extendedstats;
  /** @Column(type="string")*/
  public $uuid;

 /**
   * @ManyToMany(targetEntity="ServerPort")
   * @JoinTable(name="server_serverports_relation",
   *      joinColumns={@JoinColumn(name="serveraname", referencedColumnName="name")},
   *      inverseJoinColumns={@JoinColumn(name="serverporta10url", referencedColumnName="a10url", unique=true)}
   *      )
   */
   public $serverports;

   /**
  * @ManyToOne(targetEntity="ServerTemplate")
  * @JoinColumn(name="templateserver", referencedColumnName="name")
  */
   public $servertemplateObject;

   /**
     * has a hostname
     *
     * @ManyToOne(targetEntity="A10")
     * @JoinColumn(name="hostname", referencedColumnName="hostname",onDelete="CASCADE")*/
   public $a10_object;

   /** @Column(type="string", nullable=true)*/
   public $vendor;
   
 public function __construct() {
    $this->serverports = new ArrayCollection();
}
}
