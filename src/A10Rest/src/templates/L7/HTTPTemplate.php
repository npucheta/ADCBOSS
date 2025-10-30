<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="httptemplates")
 */
class HTTPTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string")*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
  public $compressionenable;
  /** @Column(type="string",nullable=true)*/
  public $compressionkeepacceptencoding;
  /** @Column(type="string",nullable=true)*/
  public $compressionlevel;
  /** @Column(type="string",nullable=true)*/
  public $compressionminimumcontentlength;
  /** @Column(type="string",nullable=true)*/
  public $insertclientip;
  /** @Column(type="string",nullable=true)*/
  public $clientiphdrreplace;
  /** @Column(type="string",nullable=true)*/
  public $insertclientport;
  /** @Column(type="string",nullable=true)*/
  public $logretry;
  /** @Column(type="string",nullable=true)*/
  public $nonhttpbypass;
  /** @Column(type="string",nullable=true)*/
  public $redirect;
  /** @Column(type="string",nullable=true)*/
  public $rdsecure;
  /** @Column(type="string",nullable=true)*/
  public $redirectrewrite;
  /** @Column(type="string",nullable=true)*/
  public $redirectsecure;
  /** @Column(type="string",nullable=true)*/
  public $retryon5xx;
  /** @Column(type="string",nullable=true)*/
  public $stricttransactionswitch;
  /** @Column(type="string",nullable=true)*/
  public $term11clienthdrconnclose;
  /** @Column(type="string",nullable=true)*/
  public $urlhashpersist;
  /** @Column(type="string",nullable=true)*/
  public $reqhdrwaittime;
  /** @Column(type="string",nullable=true)*/
  public $requestlinecaseinsensitive;
  /** @Column(type="string",nullable=true)*/
  public $keepclientalive;
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
