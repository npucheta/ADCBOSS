<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="virtualporttemplates")
 */
class VirtualPortTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string")*/
    public $a10url;

        /** @Column(type="string",nullable=true)*/
    public $aflow;
    /** @Column(type="string",nullable=true)*/
    public $allowsynotherflags;
    /** @Column(type="string",nullable=true)*/
    public $connlimit;
    /** @Column(type="string",nullable=true)*/
    public $connlimitreset;
    /** @Column(type="string",nullable=true)*/
    public $connlimitnologging;
    /** @Column(type="string",nullable=true)*/
    public $allowviptorportmapping;
    /** @Column(type="string",nullable=true)*/
    public $dropunknownconn;
    /** @Column(type="string",nullable=true)*/
    public $resetunknownconn;
    /** @Column(type="string",nullable=true)*/
    public $resetl7onfailover;
    /** @Column(type="string",nullable=true)*/
    public $ignoretcpmsl;
    /** @Column(type="string",nullable=true)*/
    public $snatportpreserve;
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
