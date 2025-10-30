<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="policytemplates")
 */
class PolicyTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string",nullable=true)*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $timeout;
    /** @Column(type="string",nullable=true)*/
    public $usedestinationip;
    /** @Column(type="string",nullable=true)*/
    public $overlimit;
    /** @Column(type="string",nullable=true)*/
    public $overlap;
    /** @Column(type="string",nullable=true)*/
    public $share;
    /** @Column(type="string",nullable=true)*/
    public $fulldomaintree;
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
