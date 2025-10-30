<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="virtualserverports")
 */
class VirtualServerPort {
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
  public $name;

  /** @Column(type="string",nullable=true)*/
  public $connlimit;
  /** @Column(type="string",nullable=true)*/
  public $reset;
  /** @Column(type="string",nullable=true)*/
  public $nologging;
  /** @Column(type="string",nullable=true)*/
  public $usealternateport;
  /** @Column(type="string",nullable=true)*/
  public $action;
  /** @Column(type="string",nullable=true)*/
  public $defselectionifpreffailed;
  /** @Column(type="string",nullable=true)*/
  public $haconnmirror;
  /** @Column(type="string",nullable=true)*/
  public $skiprevhash;
  /** @Column(type="string",nullable=true)*/
  public $messageswitching;
  /** @Column(type="string",nullable=true)*/
  public $forceroutingmode;
  /** @Column(type="string",nullable=true)*/
  public $resetonserverselectionfail;
  /** @Column(type="string",nullable=true)*/
  public $clientipstickynat;
  /** @Column(type="string",nullable=true)*/
  public $extendedstats;
  /** @Column(type="string",nullable=true)*/
  public $snatonvip;
  /** @Column(type="string",nullable=true)*/
  public $statsdataaction;
  /** @Column(type="string",nullable=true)*/
  public $syncookie;
  /** @Column(type="string",nullable=true)*/
  public $noautouponaflex;
  /** @Column(type="string",nullable=true)*/
  public $scaleoutbucketcount;
  /** @Column(type="string",nullable=true)*/
  public $auto;
  /** @Column(type="string",nullable=true)*/
  public $servicegroup;
  /** @Column(type="string",nullable=true)*/
  public $ipinip;
  /** @Column(type="string",nullable=true)*/
  public $rtpsipcallidmatch;
  /** @Column(type="string",nullable=true)*/
  public $usercvhopforresp;
  /** @Column(type="string",nullable=true)*/
  public $usedefaultifnoserver
  /** @Column(type="string",nullable=true)*/;
  public $nodestnat;
  /** @Column(type="string")*/
  public $uuid;

  /**
 * @ManyToOne(targetEntity="PolicyTemplate")
 * @JoinColumn(name="templatepolicy", referencedColumnName="name")
 */
  public $policytemplateObject;
  /**
 * @ManyToOne(targetEntity="SourceIPPersistTemplate")
 * @JoinColumn(name="templatepersistsourceip", referencedColumnName="name")
 */
  public $sourceippersisttemplateObject;
  /**
 * @ManyToOne(targetEntity="DestinationIPPersistTemplate")
 * @JoinColumn(name="templatepersistdestinationip", referencedColumnName="name")
 */
  public $destinationippersisttemplateObject;
  /**
 * @ManyToOne(targetEntity="SSLIDPersistTemplate")
 * @JoinColumn(name="templatepersistsslsid", referencedColumnName="name")
 */
  public $sslipersisttemplateObject;
  /**
 * @ManyToOne(targetEntity="TCPTemplate")
 * @JoinColumn(name="templatepersistsourceiptcp", referencedColumnName="name")
 */
  public $tcptemplateObject;
  /**
 * @ManyToOne(targetEntity="UDPTemplate")
 * @JoinColumn(name="templateudp", referencedColumnName="name")
 */
  public $udptemplateObject;
  /**
 * @ManyToOne(targetEntity="VirtualPortTemplate")
 * @JoinColumn(name="templatevirtualport", referencedColumnName="name")
 */
  public $virtualporttemplateObject;
  /**
    * has a hostname
    *
    * @ManyToOne(targetEntity="A10")
    * @JoinColumn(name="hostname", referencedColumnName="hostname",onDelete="CASCADE")*/
  public $a10_object;

  /** @Column(type="string", nullable=true)*/
  public $vendor;
}
