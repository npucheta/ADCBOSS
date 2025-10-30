<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="siptemplates")
 */
class SIPTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string",nullable=true)*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $algsourcenat;
    /** @Column(type="string",nullable=true)*/
    public $algdestnat;
    /** @Column(type="string",nullable=true)*/
    public $callidpersistdisable;
    /** @Column(type="string",nullable=true)*/
    public $clientkeepalive;
    /** @Column(type="string",nullable=true)*/
    public $failedclientselection;
    /** @Column(type="string",nullable=true)*/
    public $failedserverselection;
    /** @Column(type="string",nullable=true)*/
    public $insertclientip;
    /** @Column(type="string",nullable=true)*/
    public $keepserveripifmatchacl;
    /** @Column(type="string",nullable=true)*/
    public $serverkeepalive;
    /** @Column(type="string",nullable=true)*/
    public $smpcallidrtpsession;
    /** @Column(type="string",nullable=true)*/
    public $serverselectionperrequest;
    /** @Column(type="string",nullable=true)*/
    public $timeout;
    /** @Column(type="string",nullable=true)*/
    public $dialogaware;
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
