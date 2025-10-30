<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="tcpproxytemplates")
 */
class TCPProxyTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string",nullable=true)*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $ackaggressiveness;
    /** @Column(type="string",nullable=true)*/
    public $dynamicbufferallocation;
    /** @Column(type="string",nullable=true)*/
    public $fintimeout;
    /** @Column(type="string",nullable=true)*/
    public $idletimeout;
    /** @Column(type="string",nullable=true)*/
    public $initcwnd;
    /** @Column(type="string",nullable=true)*/
    public $mss;
    /** @Column(type="string",nullable=true)*/
    public $nagle;
    /** @Column(type="string",nullable=true)*/
    public $receivebuffer;
    /** @Column(type="string",nullable=true)*/
    public $reno;
    /** @Column(type="string",nullable=true)*/
    public $transmitbuffer;
    /** @Column(type="string",nullable=true)*/
    public $resetfwd;
    /** @Column(type="string",nullable=true)*/
    public $resetrev;
    /** @Column(type="string",nullable=true)*/
    public $retransmitretries;
    /** @Column(type="string",nullable=true)*/
    public $insertclientip;
    /** @Column(type="string",nullable=true)*/
    public $synretries;
    /** @Column(type="string",nullable=true)*/
    public $timewait;
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
