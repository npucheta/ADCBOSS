import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {F5DeviceDetailComponent} from './components/lb/f5-device-detail/f5-device-detail.component';
import {VirtualDetailComponent} from './components/lb/f5-objects-detail/virtual-detail/virtual-detail.component';
import {PoolDetailComponent} from './components/lb/f5-objects-detail/pool-detail/pool-detail.component';
import {NodeDetailComponent} from './components/lb/f5-objects-detail/node-detail/node-detail.component';
import {iRuleDetailComponent} from './components/lb/f5-objects-detail/i-rule-detail/i-rule-detail.component';
import {HTTPProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/httpprofile-detail/httpprofile-detail.component';
import {TCPProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/tcpprofile-detail/tcpprofile-detail.component';
import {UDPProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/udpprofile-detail/udpprofile-detail.component';
import {FastL4ProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/fast-l4-profile-detail/fast-l4-profile-detail.component';
import {ClientSSLProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/client-sslprofile-detail/client-sslprofile-detail.component';
import {ServerSSLProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/server-sslprofile-detail/server-sslprofile-detail.component';
import {FTPPProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/ftppprofile-detail/ftppprofile-detail.component';
import {HTTPClassDetailComponent} from './components/lb/f5-objects-detail/httpclass-detail/httpclass-detail.component';
import {MonitorDetailComponent} from './components/lb/f5-objects-detail/monitor-detail/monitor-detail.component';
import {SNATPoolDetailComponent} from './components/lb/f5-objects-detail/snatpool-detail/snatpool-detail.component';
import {PersistenceProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/persistence-profile-detail/persistence-profile-detail.component';
import {OneConnectProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/one-connect-profile-detail/one-connect-profile-detail.component';
import {StreamProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/stream-profile-detail/stream-profile-detail.component';
import {GSLBDeviceDetailComponent} from './components/gslb/gslbdevice-detail/gslbdevice-detail.component';
import {GSLBDevicesComponent} from './components/gslb/gslbdevices/gslbdevices.component';
import {WideIPDetailComponent} from './components/gslb/wide-ipdetail/wide-ipdetail.component';
import {GSLBiRuleDetailComponent} from './components/gslb/gslbi-rule-detail/gslbi-rule-detail.component';
import {GSLBPoolDetailComponent} from './components/gslb/gslbpool-detail/gslbpool-detail.component';
import {DataCenterDetailComponent} from './components/gslb/data-center-detail/data-center-detail.component';
import {ServerDetailComponent} from './components/gslb/server-detail/server-detail.component';
import {GSLBMonitorDetailComponent} from './components/gslb/gslbmonitor-detail/gslbmonitor-detail.component';
import {TopologyDetailComponent} from './components/gslb/topology-detail/topology-detail.component';
import {GSLBVirtualServerComponent} from './components/gslb/gslbvirtual-server/gslbvirtual-server.component';
import {LBObjectsComponent} from './components/lb/lbobjects/lbobjects.component';
import {LBMigrationComponent} from './components/lb/migration/lbmigration/lbmigration.component';
import {ObjectCleanUPComponent} from './components/lb/migration/object-clean-up/object-clean-up.component';
import {ArpMigrationComponent} from './components/lb/migration/arp-migration/arp-migration.component';
import {GSLBObjectsComponent} from './components/gslb/gslbobjects/gslbobjects.component';
import {VIPStatusComparisonComponent} from './components/lb/vipstatus-comparison/vipstatus-comparison.component';
import {DevicesComponent} from './components/devices/devices.component';
import {SearchComponent} from './components/search/search.component';
import {ExportComponent} from './components/export/export.component';
import {StatsComponent} from './components/stats/stats.component';
import {LoginComponent} from './shared/login/login.component';
import {SettingsComponent} from './components/system/settings/settings.component';
import {ArchivesComponent} from './components/archives/archives.component';
import {PKIComponent} from './components/pki/pki.component';
import {TaskListComponent} from './components/tasks/task-list/task-list.component';
import {TaskComponent} from './components/tasks/task/task.component';
import {HomeComponent} from './shared/home/home.component';
import {LogoutComponent} from './shared/logout/logout.component';
import {AuthGuardService} from './services/auth-guard.service';
import {VscreationComponent} from './components/lb/migration/vscreation/vscreation.component';
import {BackupsComponent} from './components/system/backups/backups.component';
import {UsersComponent} from './components/system/users/users.component';
import {SupportComponent} from './components/system/support/support.component';
import {LogsComponent} from './components/system/logs/logs.component';


//Netscler Components
import {NetscalerVirtualDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-virtual-detail/netscaler-virtual-detail.component';
import {NetscalerCSVirtualDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-csvirtual-detail/netscaler-csvirtual-detail.component';
import {NetscalerCRVirtualDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-crvirtual-detail/netscaler-crvirtual-detail.component';
import {NetscalerServicesDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-services-detail/netscaler-services-detail.component';
import {NetscalerServicegroupsDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-servicegroups-detail/netscaler-servicegroups-detail.component';
import {NetscalerPersistenceGroupsDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-persistence-groups-detail/netscaler-persistence-groups-detail.component';
import {NetscalerServerDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-server-detail/netscaler-server-detail.component';
import {NetscalerMonitorDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-monitor-detail/netscaler-monitor-detail.component';
import {NetscalerDBProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-dbprofile-detail/netscaler-dbprofile-detail.component';
import {NetscalerTCPProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-tcpprofile-detail/netscaler-tcpprofile-detail.component';
import {NetscalerHTTPProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-httpprofile-detail/netscaler-httpprofile-detail.component';
import {NetscalerSSLProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-sslprofile-detail/netscaler-sslprofile-detail.component';
import {NetscalerSSLDTLSProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-ssldtlsprofile-detail/netscaler-ssldtlsprofile-detail.component';
import {NetscalerNetProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-net-profile-detail/netscaler-net-profile-detail.component';
import {NetscalerCSActionDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-csaction-detail/netscaler-csaction-detail.component';
import {NetscalerCSPolicyDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-cspolicy-detail/netscaler-cspolicy-detail.component';
import {NetscalerCRPolicyDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-crpolicy-detail/netscaler-crpolicy-detail.component';

//Radware componenets
import {RadwareVirtualDetailComponent} from './components/lb/radware-objects-detail/radware-virtual-detail/radware-virtual-detail.component';
import {RadwareVirtualServiceDetailComponent} from './components/lb/radware-objects-detail/radware-virtual-service-detail/radware-virtual-service-detail.component';
import {RadwareServergroupsDetailComponent} from './components/lb/radware-objects-detail/radware-servergroups-detail/radware-servergroups-detail.component';
import {RadwareRealserversDetailComponent} from './components/lb/radware-objects-detail/radware-realservers-detail/radware-realservers-detail.component';

//AWS components
import {AWSELBDetailComponent} from './components/lb/aws-objects-detail/awselbdetail/awselbdetail.component';
import {AWSListenerDetailComponent} from './components/lb/aws-objects-detail/awslistener-detail/awslistener-detail.component';
import {AWSListenerv1DetailComponent} from './components/lb/aws-objects-detail/awslistenerv1-detail/awslistenerv1-detail.component';
import {AWSzoneDetailComponent} from './components/lb/aws-objects-detail/awszone-detail/awszone-detail.component';
import {AWSactionDetailComponent} from './components/lb/aws-objects-detail/awsaction-detail/awsaction-detail.component';
import {AWStargetgroupDetailComponent} from './components/lb/aws-objects-detail/awstargetgroup-detail/awstargetgroup-detail.component';
import {AWStargetDetailComponent} from './components/lb/aws-objects-detail/awstarget-detail/awstarget-detail.component';
import {AWSruleDetailComponent} from './components/lb/aws-objects-detail/awsrule-detail/awsrule-detail.component';
import {AWSsslpolicyDetailComponent} from './components/lb/aws-objects-detail/awssslpolicy-detail/awssslpolicy-detail.component';

//A10 componenets
import {A10VirtualDetailComponent} from './components/lb/a10-objects-detail/a10-virtual-detail/a10-virtual-detail.component';
import {A10VirtualServiceDetailComponent} from './components/lb/a10-objects-detail/a10-virtual-service-detail/a10-virtual-service-detail.component';
import {A10ServiceGroupDetailComponent} from './components/lb/a10-objects-detail/a10-service-group-detail/a10-service-group-detail.component';
import {A10ServersDetailComponent} from './components/lb/a10-objects-detail/a10-servers-detail/a10-servers-detail.component';

import {BackupDetailComponent} from './components/system/backup-detail/backup-detail.component';
import {UserDetailComponent} from './components/system/user-detail/user-detail.component';
import {CertificateDetailComponent} from './components/lb/certificate-detail/certificate-detail.component';
import {KeyDetailComponent} from './components/lb/key-detail/key-detail.component';

const ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'devices/performance', component: PKIComponent, canActivate: [AuthGuardService]},
    {path: 'archives', component: ArchivesComponent, canActivate: [AuthGuardService]},
    {path: 'search', component: SearchComponent, canActivate: [AuthGuardService]},
    {path: 'export', component: ExportComponent, canActivate: [AuthGuardService]},
    {path: 'tasklist', component: TaskListComponent, canActivate: [AuthGuardService]},
    {path: 'task/:id', component: TaskComponent, canActivate: [AuthGuardService]},
    {path: 'backup/:id', component: BackupDetailComponent, canActivate: [AuthGuardService]},
    {path: 'GSLBdevices', component: GSLBDevicesComponent, canActivate: [AuthGuardService]},
    {path: 'detail/:id', component: F5DeviceDetailComponent, canActivate: [AuthGuardService]},
    {path: 'gslbdetail/:id', component: GSLBDeviceDetailComponent, canActivate: [AuthGuardService]},
    {path: 'netscaler-virtual/:id/:hostname',component: NetscalerVirtualDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-csvirtual/:id/:hostname',component: NetscalerCSVirtualDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-crvirtual/:id/:hostname',component: NetscalerCRVirtualDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-virtualservice/:id/:hostname',component: NetscalerServicesDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-servicegroup/:id/:hostname',component: NetscalerServicegroupsDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-persistencegroup/:id/:hostname',component: NetscalerPersistenceGroupsDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-server/:id/:hostname',component: NetscalerServerDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-monitor/:id/:hostname',component: NetscalerMonitorDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-dbprofile/:id/:hostname',component: NetscalerDBProfileDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-tcpprofile/:id/:hostname',component: NetscalerTCPProfileDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-httpprofile/:id/:hostname',component: NetscalerHTTPProfileDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-netprofile/:id/:hostname',component: NetscalerNetProfileDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-sslprofile/:id/:hostname',component: NetscalerSSLProfileDetailComponent,canActivate: [AuthGuardService]  },
    {path: 'netscaler-ssldtlsprofile/:id/:hostname',     component: NetscalerSSLDTLSProfileDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-csaction/:id/:hostname',component: NetscalerCSActionDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-cspolicy/:id/:hostname',component: NetscalerCSPolicyDetailComponent,canActivate: [AuthGuardService]},
    {path: 'netscaler-crpolicy/:id/:hostname',component: NetscalerCRPolicyDetailComponent,canActivate: [AuthGuardService]},
    {path: 'radware-virtual/:id/:hostname', component: RadwareVirtualDetailComponent, canActivate: [AuthGuardService]},
    {path: 'radware-virtualservice/:id/:hostname',component: RadwareVirtualServiceDetailComponent,canActivate: [AuthGuardService]},
    {path: 'radware-servergroup/:id/:hostname',component: RadwareServergroupsDetailComponent,canActivate: [AuthGuardService]},
    {path: 'radware-server/:id/:hostname',component: RadwareRealserversDetailComponent,canActivate: [AuthGuardService]},
    {path: 'a10-virtual/:id/:hostname',component: A10VirtualDetailComponent, canActivate: [AuthGuardService]},
    {path: 'a10-virtual-service/:id/:hostname',component: A10VirtualServiceDetailComponent, canActivate: [AuthGuardService]},
    {path: 'a10-service-group/:id/:hostname',component: A10ServiceGroupDetailComponent, canActivate: [AuthGuardService]},
    {path: 'a10-server/:id/:hostname',component: A10ServersDetailComponent, canActivate: [AuthGuardService]},
    {path: 'aws-loadbalancer/:id/:hostname', component: AWSELBDetailComponent, canActivate: [AuthGuardService]},
    {path: 'aws-listener/:id/:hostname', component: AWSListenerDetailComponent, canActivate: [AuthGuardService]},
    {path: 'aws-listenerv1/:id/:hostname', component: AWSListenerv1DetailComponent, canActivate: [AuthGuardService]},
    {path: 'aws-zone/:id/:hostname', component: AWSzoneDetailComponent, canActivate: [AuthGuardService]},
    {path: 'aws-action/:id/:hostname', component: AWSactionDetailComponent, canActivate: [AuthGuardService]},
    {path: 'aws-targetgroup/:id/:hostname', component: AWStargetgroupDetailComponent, canActivate: [AuthGuardService]},
    {path: 'aws-target/:id/:hostname', component: AWStargetDetailComponent, canActivate: [AuthGuardService]},
    {path: 'aws-rule/:id/:hostname', component: AWSruleDetailComponent, canActivate: [AuthGuardService]},
    {path: 'aws-sslpolicy/:id/:hostname', component: AWSsslpolicyDetailComponent, canActivate: [AuthGuardService]},
    {path: 'virtual/:id/:hostname', component: VirtualDetailComponent, canActivate: [AuthGuardService]},
    {path: 'pool/:id/:hostname', component: PoolDetailComponent, canActivate: [AuthGuardService]},
    {path: 'node/:id/:hostname', component: NodeDetailComponent, canActivate: [AuthGuardService]},
    {path: 'irule/:id/:hostname', component: iRuleDetailComponent, canActivate: [AuthGuardService]},
    {path: 'httpprofile/:id/:hostname', component: HTTPProfileDetailComponent, canActivate: [AuthGuardService]},
    {path: 'tcpprofile/:id/:hostname', component: TCPProfileDetailComponent, canActivate: [AuthGuardService]},
    {path: 'udpprofile/:id/:hostname', component: UDPProfileDetailComponent, canActivate: [AuthGuardService]},
    {path: 'fastl4profile/:id/:hostname', component: FastL4ProfileDetailComponent, canActivate: [AuthGuardService]},
    {path: 'clientsslprofile/:id/:hostname',component: ClientSSLProfileDetailComponent,canActivate: [AuthGuardService]},
    {path: 'serversslprofile/:id/:hostname',component: ServerSSLProfileDetailComponent,canActivate: [AuthGuardService]},
    {path: 'ftpprofile/:id/:hostname', component: FTPPProfileDetailComponent, canActivate: [AuthGuardService]},
    {path: 'httpclass/:id/:hostname', component: HTTPClassDetailComponent, canActivate: [AuthGuardService]},
    {path: 'snatpool/:id/:hostname', component: SNATPoolDetailComponent, canActivate: [AuthGuardService]},
    {path: 'monitor/:id/:hostname', component: MonitorDetailComponent, canActivate: [AuthGuardService]},
    {path: 'persistenceprofile/:id/:hostname',component: PersistenceProfileDetailComponent,canActivate: [AuthGuardService]},
    {path: 'oneconnectprofile/:id/:hostname',component: OneConnectProfileDetailComponent,canActivate: [AuthGuardService]},
    {path: 'streamprofile/:id/:hostname', component: StreamProfileDetailComponent, canActivate: [AuthGuardService]},
    {path: 'wideip/:id/:hostname', component: WideIPDetailComponent, canActivate: [AuthGuardService]},
    {path: 'gslbirule/:id/:hostname', component: GSLBiRuleDetailComponent, canActivate: [AuthGuardService]},
    {path: 'gslbpool/:id/:hostname', component: GSLBPoolDetailComponent, canActivate: [AuthGuardService]},
    {path: 'datacenter/:id/:hostname', component: DataCenterDetailComponent, canActivate: [AuthGuardService]},
    {path: 'server/:id/:hostname', component: ServerDetailComponent, canActivate: [AuthGuardService]},
    {path: 'gslbmonitor/:id/:hostname', component: GSLBMonitorDetailComponent, canActivate: [AuthGuardService]},
    {path: 'topology/:id/:hostname', component: TopologyDetailComponent, canActivate: [AuthGuardService]},
    {path: 'gslbvirtualserver/:id/:hostname', component: GSLBVirtualServerComponent, canActivate: [AuthGuardService]},
    {path: 'lbobjects', component: LBObjectsComponent, canActivate: [AuthGuardService]},
    {path: 'certificate/:id/:hostname/:vendor', component: CertificateDetailComponent, canActivate: [AuthGuardService]},
    {path: 'certificate/:id/:hostname', component: CertificateDetailComponent, canActivate: [AuthGuardService]},
    {path: 'key/:id/:hostname', component: KeyDetailComponent, canActivate: [AuthGuardService]},
    {path: 'lbobjects/:option',component: LBObjectsComponent,
        /*children: [
         {path: 'virtuals', component: LBObjectsComponent},
         {path: 'pools', component: LBObjectsComponent},
         {path: 'nodes', component: LBObjectsComponent},
         {path: 'monitors', component: LBObjectsComponent},
         {path: 'snatpools', component: LBObjectsComponent},
         {path: '**', pathMatch: 'full', redirectTo: 'lbobjects/:type'}
         ]*/
        canActivate: [AuthGuardService]
    },
    {path: 'gslbobjects', component: GSLBObjectsComponent, canActivate: [AuthGuardService]},
    {path: 'gslbobjects/:option', component: GSLBObjectsComponent, canActivate: [AuthGuardService]},
    {path: 'devices', component: DevicesComponent, canActivate: [AuthGuardService]},
    {path: 'devices/:option', component: DevicesComponent, canActivate: [AuthGuardService]},
    {path: 'devices/:option/:device', component: DevicesComponent, canActivate: [AuthGuardService]},
    {path: 'lbmigration', component: LBMigrationComponent, canActivate: [AuthGuardService]},
    {path: 'lbmigration/:option', component: LBMigrationComponent, canActivate: [AuthGuardService]},
    {path: 'arpmigration', component: ArpMigrationComponent, canActivate: [AuthGuardService]},
    {path: 'objectcleanup', component: ObjectCleanUPComponent, canActivate: [AuthGuardService]},
    {path: 'vscreation', component: VscreationComponent, canActivate: [AuthGuardService]},
    {path: 'vipstatuscomparison', component: VIPStatusComparisonComponent, canActivate: [AuthGuardService]},
    {path: 'vipstatuscomparison/:option', component: VIPStatusComparisonComponent, canActivate: [AuthGuardService]},
    {path: 'stats', component: StatsComponent, canActivate: [AuthGuardService]},
    {path: 'settings', component: SettingsComponent, data: {title: 'Settings'}, canActivate: [AuthGuardService]},
    {path: 'support', component: SupportComponent, data: {title: 'Support'}, canActivate: [AuthGuardService]},
    {path: 'backups', component: BackupsComponent, data: {title: 'Backups'}, canActivate: [AuthGuardService]},
    {path: 'users', component: UsersComponent, data: {title: 'Users'}, canActivate: [AuthGuardService]},
    {path: 'user/:id', component: UserDetailComponent, data: {title: 'User'}, canActivate: [AuthGuardService]},
    {path: 'logs', component: LogsComponent, data: {title: 'Logs'}, canActivate: [AuthGuardService]},

    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
    providers: []
})
export class ADCBossRoutingModule {
}
