<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="sourceippersisttemplates")
 */
class SourceIPPersistTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string",nullable=true)*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $donthonorconnrules;
    /** @Column(type="string",nullable=true)*/
    public $enforcehigherpriority;
    /** @Column(type="string",nullable=true)*/
    public $hashpersist;
    /** @Column(type="string",nullable=true)*/
    public $incldstip;
    /** @Column(type="string",nullable=true)*/
    public $inclsport;
    /** @Column(type="string",nullable=true)*/
    public $timeout;
    /** @Column(type="string",nullable=true)*/
    public $netmask;
    /** @Column(type="string",nullable=true)*/
    public $netmask6;
    /** @Column(type="string",nullable=true)*/
    public $matchtype;
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
