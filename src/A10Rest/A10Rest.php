<?php
include ('httpful.phar');
require_once "bootstrap.php";
require_once "includes.php";
includes();

function authenticate ($a10){
  $data =  array(
              'username'    => 'admin',
              'password'    => 'a10'
        );

  $url="http://".$a10->hostname."/axapi/v3/auth";
	$response = \Httpful\Request::post($url)->sendsJson()->body(array('credentials'=>$data))->send();
	 //var_dump($response->body);
	 return $response->body->authresponse->signature;
}
function getRestElements($a10,$url){
  echo "#############################################################\n";
	$url="http://".$a10->hostname."/axapi/v3/".$url;
	//echo "HTTP REQUEST";
	//echo $url;
  echo $a10->signature."\n";
	$response = \Httpful\Request::get($url)
                                ->sendsJson()
                                ->addHeader('Authorization', 'A10 '.$a10->signature)
                                ->send();
	 //var_dump($response->body);
	 return $response->body;
}


function Casting(&$destination, stdClass $source)
{
    $sourceReflection = new \ReflectionObject($source);
    $sourceProperties = $sourceReflection->getProperties();
    foreach ($sourceProperties as $sourceProperty) {
        $name = $sourceProperty->getName();
    $name_no_dash=str_replace('-','',$name); //removes dashes as they cannot be used for var name

		if(gettype($source->$name)=="string" || gettype($source->$name)=="integer")
      $destination->{$name_no_dash} = $source->$name;
    //else
      //$destination->{$name_no_dash} = json_encode($source->$name); //Convert Array to JSON

			$destination->vendor="A10";
    }
    return $destination;
}


function dump_element($entityManager,$a10,$url,$find_string){
	$elements_rest=getRestElements($a10,$url);
	$id=null;
	foreach ($elements_rest as $elements_rest_table) //hack to workaround issue with Objectkey
		{
		$elements=$elements_rest_table;
		foreach ($elements as $element){
			switch($find_string){
        case "Server":
            $elementObject=new Server();
            Casting ($elementObject,$element);
            $id=$elementObject->name;

            if(property_exists($element,'template-server')){
              $template = $entityManager->getRepository("ServerTemplate")->find($element->{'template-server'});
              $elementObject->servertemplateObject=$template;
            }

            $serverports=$element->{'port-list'};
            foreach ($serverports as $serverport)
            {
              //var_dump($serverport);
              $serverportObject=new ServerPort();
    					Casting ($serverportObject,$serverport);

              if(property_exists($serverport,'template-port')){
                $template = $entityManager->getRepository("PortTemplate")->find($serverport->{'template-port'});
                $serverportObject->serverporttemplateObject=$template;
              }
              if(property_exists($serverport,'template-server-ssl')){
                $template = $entityManager->getRepository("ServerSSLTemplate")->find($serverport->{'template-server-ssl'});
                $serverportObject->serverssltemplateObject=$template;
              }
              $element_from_DB = $entityManager->getRepository("ServerPort")->find($serverportObject->a10url);

    					if(!$element_from_DB)
    						$entityManager->persist($serverportObject);
              $elementObject->serverports->add($serverportObject);

            }
            break;
        case "ServiceGroup":
            $elementObject=new ServiceGroup();
            Casting ($elementObject,$element);
            $id=$elementObject->name;

            if(property_exists($element,'template-port')){
              $template = $entityManager->getRepository("PortTemplate")->find($element->{'template-port'});
              $elementObject->porttemplateObject=$template;
            }
            if(property_exists($element,'template-server')){
              $template = $entityManager->getRepository("ServerTemplate")->find($element->{'template-server'});
              $elementObject->servertemplateObject=$template;
            }
            if(property_exists($element,'template-policy')){
              $template = $entityManager->getRepository("PolicyTemplate")->find($element->{'template-policy'});
              $elementObject->policytemplateObject=$template;
            }
            $memberlists=$element->{'member-list'};
            foreach ($memberlists as $memberlist)
            {
              //var_dump($serverport);
              $serviceGroupMemberRelation=new ServiceGroupMember();
              Casting ($serviceGroupMemberRelation,$memberlist);
              if(property_exists($memberlist,'member-template')){
                $template = $entityManager->getRepository("PortTemplate")->find($memberlist->{'member-template'});
                $serviceGroupMemberRelation->porttemplateObject=$template;
              }
              $element_from_DB = $entityManager->getRepository("ServiceGroupMember")->find($serviceGroupMemberRelation->name);

              if(!$element_from_DB)
                $entityManager->persist($serviceGroupMemberRelation);

              $serviceGroupMemberRelation->servicegroups_members->add($elementObject);

            }
            break;
        case "VirtualServer":
            $elementObject=new VirtualServer();
            Casting ($elementObject,$element);
            $id=$elementObject->name;
            //var_dump($element);
            if(property_exists($element,'template-virtual-server')){
              $templatevs = $entityManager->getRepository("VirtualServerTemplate")->find($element->{'template-virtual-server'});
              $elementObject->templatevirtualserverObject=$templatevs;
            }

            $portlist=$element->{'port-list'};
            foreach ($portlist as $virtualport)
            {
              //var_dump($virtualport);
              $virtualServerPort=new VirtualServerPort();
              Casting ($virtualServerPort,$virtualport);
              $element_from_DB = $entityManager->getRepository("VirtualServerPort")->find($virtualServerPort->name);

              if(property_exists($virtualport,'template-policy')){
                $template = $entityManager->getRepository("PolicyTemplate")->find($virtualport->{'template-policy'});
                $virtualServerPort->policytemplateObject=$template;
              }
              if(property_exists($virtualport,'template-persist-source-ip')){
                $template = $entityManager->getRepository("SourceIPPersistTemplate")->find($virtualport->{'template-persist-source-ip'});
                $virtualServerPort->sourceippersisttemplateObject=$template;
              }
              if(property_exists($virtualport,'template-persist-destination-ip')){
                $template = $entityManager->getRepository("DestinationIPPersistTemplate")->find($virtualport->{'template-persist-destination-ip'});
                $virtualServerPort->destinationippersisttemplateObject=$template;
              }
              if(property_exists($virtualport,'template-persist-ssl-sid')){
                $template = $entityManager->getRepository("SSLIDPersistTemplate")->find($virtualport->{'template-persist-ssl-sid'});
                $virtualServerPort->sslipersisttemplateObject=$template;
              }
              if(property_exists($virtualport,'template-tcp')){
                $template = $entityManager->getRepository("TCPTemplate")->find($virtualport->{'template-tcp'});
                $virtualServerPort->tcptemplateObject=$template;
              }
              if(property_exists($virtualport,'template-udp')){
                $template = $entityManager->getRepository("UDPTemplate")->find($virtualport->{'template-udp'});
                $virtualServerPort->udptemplateObject=$template;
              }
              if(property_exists($virtualport,'template-virtual-port')){
                $template = $entityManager->getRepository("VirtualPortTemplate")->find($virtualport->{'template-virtual-port'});
                $virtualServerPort->virtualporttemplateObject=$template;
              }
              $elementObject->virtualports->add($virtualServerPort);

              if(!$element_from_DB)
                $entityManager->persist($virtualServerPort);

            }

            break;
          default://if child object (ie templates) then no extra logic, just create it and pesist
          //if(gettype($element)!="integer")
            $className = $find_string;
            $elementObject = new $className();
            Casting ($elementObject,$element);
            $id=$elementObject->name;
            //var_dump($elementObject);
          break;
        }
        if($id)
  				{
  					$element_from_DB = $entityManager->getRepository($find_string)->find($id);
  					if(!$element_from_DB)
  						$entityManager->persist($elementObject);
  					else
  						$elementObject=$element_from_DB;
  				}
      }
    }
    $entityManager->flush();

  }
$a10 = new A10();
$a10->hostname='a10';
$a10->username='a10';
$a10->password='a10';
$signature = authenticate($a10);
$a10->signature=$signature;


$urls_to_classes =  array(
                        'slb/template/port-list'   => 'PortTemplate',
                        'slb/template/server-list'    => 'ServerTemplate',
                        'slb/template/virtual-server-list'   => 'VirtualServerTemplate',
                        'slb/template/virtual-port-list'   => 'VirtualPortTemplate',
                        'slb/template/tcp-list'   => 'TCPTemplate',
                        'slb/template/udp-list'   => 'UDPTemplate',
                        'slb/template/http-list'   => 'HTTPTemplate',
                        'slb/template/diameter-list'   => 'DiameterTemplate',
                        'slb/template/dns-list'   => 'DNSTemplate',
                        'slb/template/ftp-list'   => 'FTPTemplate',
                        'slb/template/imap-pop3-list'   => 'IMAPPOP3Template',
                        'slb/template/policy-list'   => 'PolicyTemplate',
                        'slb/template/sip-list'   => 'SIPTemplate',
                        'slb/template/smtp-list'   => 'SMTPTemplate',
                        'slb/template/tcp-proxy-list'   => 'TCPProxyTemplate',
                        'slb/template/persist/destination-ip-list'   => 'DestinationIPPersistTemplate',
                        'slb/template/persist/source-ip-list'   => 'SourceIPPersistTemplate',
                        'slb/template/persist/ssl-sid-list'   => 'SSLIDPersistTemplate',
                        'slb/template/client-ssl-list'   => 'ClientSSLTemplate',
                        'slb/template/server-ssl-list'   => 'ServerSSLTemplate',
                        'slb/server-list'   => 'Server',
                        'slb/service-group-list'   => 'ServiceGroup',
                        'slb/virtual-server-list'   => 'VirtualServer'
                  );
/*
foreach ($urls_to_classes as $url => $classType)
  {
    echo "Dumping ".$url." ".$classType."\n";
    dump_element($entityManager,$a10,$url,$classType);
  }
*/
var_dump(getRestElements($a10,'/gslb'));
