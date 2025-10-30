<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="tcptemplates")
 */
class TCPTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string")*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $idletimeout;
    /** @Column(type="string",nullable=true)*/
    public $forcedeletetimeout100ms;
    /** @Column(type="string",nullable=true)*/
    public $aliveifactive;
    /** @Column(type="string",nullable=true)*/
    public $insertclientip;
    /** @Column(type="string",nullable=true)*/
    public $lanfastack;
    /** @Column(type="string",nullable=true)*/
    public $resetfwd;
    /** @Column(type="string",nullable=true)*/
    public $resetrev;
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
