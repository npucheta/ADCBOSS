<?php
use Doctrine\Common\Collections\ArrayCollection;
/**
 * @Entity @Table(name="a10s")
 */
class A10 {
	/**
	  * @Id
	  * @Column(type="string")*/
		public $hostname;

    /** @Column(type="string")*/
  		public $username;

      /** @Column(type="string")*/
  		public $password;
}
