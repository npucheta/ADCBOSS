<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="dnstemplates")
 */
class DNSTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string",nullable=true)*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $defaultpolicy;
    /** @Column(type="string",nullable=true)*/
    public $disablednstemplate;
    /** @Column(type="string",nullable=true)*/
    public $enablecachesharing;
    /** @Column(type="string",nullable=true)*/
    public $redirecttotcpport;
    /** @Column(type="string",nullable=true)*/
    public $queryidswitch;
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
