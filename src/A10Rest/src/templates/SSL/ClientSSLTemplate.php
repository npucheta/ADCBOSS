<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="clientssltemplates")
 */
class ClientSSLTemplate {
  /**
	  * @Id
	  * @Column(type="string")*/
    public $name;

    /** @Column(type="string",nullable=true)*/
    public $a10url;

    /** @Column(type="string",nullable=true)*/
    public $ocspstapling;
    /** @Column(type="string",nullable=true)*/
    public $clientcertificate;
    /** @Column(type="string",nullable=true)*/
    public $closenotify;
    /** @Column(type="string",nullable=true)*/
    public $enabletlsalertlogging;
    /** @Column(type="string",nullable=true)*/
    public $sslfalsestartdisable;
    /** @Column(type="string",nullable=true)*/
    public $disablesslv3;
    /** @Column(type="string",nullable=true)*/
    public $authorization;
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
