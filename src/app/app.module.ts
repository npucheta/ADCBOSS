// libraries and core
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CustomMaterialModule} from './modules/custom-material.module';

import 'hammerjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Validator} from 'validator.ts/Validator';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {GaugeModule} from 'angular-gauge';
import 'ts-helpers';
import {} from 'is';

// shared components
// import {SharedModule} from './modules/shared.module';
import {DashboardComponent} from './shared/dashboard/dashboard.component';
import {HomeComponent} from './shared/home/home.component';
import {LoginComponent} from './shared/login/login.component';
import {SettingsComponent} from './components/system/settings/settings.component';
import {CanvasDialogComponent} from './shared/canvas-dialog/canvas-dialog.component';
import {SuccessComponent} from './shared/toast/success/success.component';
import {ErrorComponent} from './shared/toast/error/error.component';
import {LogoutComponent} from './shared/logout/logout.component';
import {DoughnutComponent} from './shared/charts/doughnut.component';

// directives
import {DirectivesModule} from './modules/directives.module';

// services
import {ServicesModule} from './modules/services.module';

// pipes
import {PipesModule} from './modules/pipes.module';

// components
import {LBMigrationComponent} from './components/lb/migration/lbmigration/lbmigration.component';
import {VIPStatusComparisonComponent} from './components/lb/vipstatus-comparison/vipstatus-comparison.component';
import {SearchComponent} from './components/search/search.component';
import {ExportComponent} from './components/export/export.component';
import {StatsComponent} from './components/stats/stats.component';
import {F5DeviceDetailComponent} from './components/lb/f5-device-detail/f5-device-detail.component';
import {ArchivesComponent} from './components/archives/archives.component';
import {ArchiveDetailComponent} from './components/archive-detail/archive-detail.component';
import {DiffComponent} from './components/diff/diff.component';
import {PKIComponent} from './components/pki/pki.component';
import {DevicesComponent} from './components/devices/devices.component';
import {ADCBossRoutingModule} from './app-routing.module';
import {VirtualDetailComponent} from './components/lb/f5-objects-detail/virtual-detail/virtual-detail.component';
import {PoolDetailComponent} from './components/lb/f5-objects-detail/pool-detail/pool-detail.component';
import {NodeDetailComponent} from './components/lb/f5-objects-detail/node-detail/node-detail.component';
import {iRuleDetailComponent} from './components/lb/f5-objects-detail/i-rule-detail/i-rule-detail.component';
import {ProfileDetailComponent} from './components/lb/f5-objects-detail/f5-profiles/profile-detail/profile-detail.component';
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
import {GSLBObjectsComponent} from './components/gslb/gslbobjects/gslbobjects.component';
import {AWSDeviceDetailComponent} from './components/lb/aws-device-detail/aws-device-detail.component';
import {AWSELBDetailComponent} from './components/lb/aws-objects-detail/awselbdetail/awselbdetail.component';
import {AWSListenerDetailComponent} from './components/lb/aws-objects-detail/awslistener-detail/awslistener-detail.component';
import {AWSzoneDetailComponent} from './components/lb/aws-objects-detail/awszone-detail/awszone-detail.component';
import {AWSruleDetailComponent} from './components/lb/aws-objects-detail/awsrule-detail/awsrule-detail.component';
import {AWSactionDetailComponent} from './components/lb/aws-objects-detail/awsaction-detail/awsaction-detail.component';
import {AWStargetgroupDetailComponent} from './components/lb/aws-objects-detail/awstargetgroup-detail/awstargetgroup-detail.component';
import {AWSsslpolicyDetailComponent} from './components/lb/aws-objects-detail/awssslpolicy-detail/awssslpolicy-detail.component';
import {AWStargetDetailComponent} from './components/lb/aws-objects-detail/awstarget-detail/awstarget-detail.component';
import {NetscalerDeviceDetailComponent} from './components/lb/netscaler-device-detail/netscaler-device-detail.component';
import {NetscalerVirtualDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-virtual-detail/netscaler-virtual-detail.component';
import {NetscalerCSVirtualDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-csvirtual-detail/netscaler-csvirtual-detail.component';
import {NetscalerCRVirtualDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-crvirtual-detail/netscaler-crvirtual-detail.component';
import {NetscalerServicegroupsDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-servicegroups-detail/netscaler-servicegroups-detail.component';
import {NetscalerServicesDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-services-detail/netscaler-services-detail.component';
import {NetscalerPersistenceGroupsDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-persistence-groups-detail/netscaler-persistence-groups-detail.component';
import {RadwareDeviceDetailComponent} from './components/lb/radware-device-detail/radware-device-detail.component';
import {RadwareVirtualDetailComponent} from './components/lb/radware-objects-detail/radware-virtual-detail/radware-virtual-detail.component';
import {RadwareVirtualServiceDetailComponent} from './components/lb/radware-objects-detail/radware-virtual-service-detail/radware-virtual-service-detail.component';
import {RadwareServergroupsDetailComponent} from './components/lb/radware-objects-detail/radware-servergroups-detail/radware-servergroups-detail.component';
import {RadwareRealserversDetailComponent} from './components/lb/radware-objects-detail/radware-realservers-detail/radware-realservers-detail.component';
import {RadwareClassesDetailComponent} from './components/lb/radware-objects-detail/radware-classes-detail/radware-classes-detail.component';
import {NetscalerProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-profile-detail/netscaler-profile-detail.component';
import {GenericObjectDetailComponent} from './components/lb/generic-object-detail/generic-object-detail.component';
import {GenericObjectChartDetailComponent} from './components/lb/generic-object-chart-detail/generic-object-chart-detail.component';
import {NetscalerServerDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-server-detail/netscaler-server-detail.component';
import {NetscalerMonitorDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-monitor-detail/netscaler-monitor-detail.component';
import {NetscalerTCPProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-tcpprofile-detail/netscaler-tcpprofile-detail.component';
import {NetscalerSSLProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-sslprofile-detail/netscaler-sslprofile-detail.component';
import {NetscalerSSLDTLSProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-ssldtlsprofile-detail/netscaler-ssldtlsprofile-detail.component';
import {NetscalerDBProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-dbprofile-detail/netscaler-dbprofile-detail.component';
import {NetscalerHTTPProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-httpprofile-detail/netscaler-httpprofile-detail.component';
import {NetscalerCSActionDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-csaction-detail/netscaler-csaction-detail.component';
import {NetscalerCSPolicyDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-cspolicy-detail/netscaler-cspolicy-detail.component';
import {NetscalerCRPolicyDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-crpolicy-detail/netscaler-crpolicy-detail.component';
import {NetscalerNetProfileDetailComponent} from './components/lb/netscaler-objects-detail/netscaler-profiles/netscaler-net-profile-detail/netscaler-net-profile-detail.component';
import {AWSListenerv1DetailComponent} from './components/lb/aws-objects-detail/awslistenerv1-detail/awslistenerv1-detail.component';
import {IconSVGComponent} from './shared/icon-svg/icon-svg.component';
import {ArpMigrationComponent} from './components/lb/migration/arp-migration/arp-migration.component';
import {ObjectCleanUPComponent} from './components/lb/migration/object-clean-up/object-clean-up.component';

import {VerticalMenuComponent} from './shared/dashboard/vertical-menu.component';
import {CustomCardComponent} from './shared/custom-card/custom-card.component';
import {CustomLayoutComponent} from './shared/custom-layout/custom-layout.component';
import {DeviceF5Component} from './components/devices/types/device-f5/device-f5.component';
import {DeviceCitrixNetscalerComponent} from './components/devices/types/device-citrix-netscaler/device-citrix-netscaler.component';
import {DeviceRadwareAlteonComponent} from './components/devices/types/device-radware-alteon/device-radware-alteon.component';
import {DeviceCiscoCssComponent} from './components/devices/types/device-cisco-css/device-cisco-css.component';
import {DeviceAwsELBComponent} from './components/devices/types/device-aws-elb/device-aws-elb.component';
import {CustomTableComponent} from './shared/custom-table/custom-table.component';
import {TaskListComponent} from './components/tasks/task-list/task-list.component';
import {TaskComponent} from './components/tasks/task/task.component';
import { DeviceA10Component } from './components/devices/types/device-a10/device-a10.component';
import { A10DeviceDetailComponent } from './components/lb/a10-device-detail/a10-device-detail.component';
import { A10VirtualDetailComponent } from './components/lb/a10-objects-detail/a10-virtual-detail/a10-virtual-detail.component';
import { A10VirtualServiceDetailComponent } from './components/lb/a10-objects-detail/a10-virtual-service-detail/a10-virtual-service-detail.component';
import { A10ServiceGroupDetailComponent } from './components/lb/a10-objects-detail/a10-service-group-detail/a10-service-group-detail.component';
import { A10ServersDetailComponent } from './components/lb/a10-objects-detail/a10-servers-detail/a10-servers-detail.component';
import { VscreationComponent } from './components/lb/migration/vscreation/vscreation.component';
import { BackupsComponent } from './components/system/backups/backups.component';
import { UsersComponent } from './components/system/users/users.component';
import { SupportComponent } from './components/system/support/support.component';
import { LogsComponent } from './components/system/logs/logs.component';
import { BackupDetailComponent } from './components/system/backup-detail/backup-detail.component';
import { UserDetailComponent } from './components/system/user-detail/user-detail.component';
import { CustomMsgComponent } from './shared/toast/custommsg/custommsg.component';
import { CertificateDetailComponent } from './components/lb/certificate-detail/certificate-detail.component';
import { KeyDetailComponent } from './components/lb/key-detail/key-detail.component';
import { DeviceDetailComponent } from './components/lb/device-detail/device-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        F5DeviceDetailComponent,
        DevicesComponent,
        VirtualDetailComponent,
        PoolDetailComponent,
        NodeDetailComponent,
        iRuleDetailComponent,
        ProfileDetailComponent,
        HTTPProfileDetailComponent,
        TCPProfileDetailComponent,
        UDPProfileDetailComponent,
        FastL4ProfileDetailComponent,
        ClientSSLProfileDetailComponent,
        ServerSSLProfileDetailComponent,
        FTPPProfileDetailComponent,
        HTTPClassDetailComponent,
        MonitorDetailComponent,
        SNATPoolDetailComponent,
        PersistenceProfileDetailComponent,
        OneConnectProfileDetailComponent,
        StreamProfileDetailComponent,
        GSLBDeviceDetailComponent,
        GSLBDevicesComponent,
        WideIPDetailComponent,
        GSLBiRuleDetailComponent,
        GSLBPoolDetailComponent,
        DataCenterDetailComponent,
        ServerDetailComponent,
        GSLBMonitorDetailComponent,
        TopologyDetailComponent,
        GSLBVirtualServerComponent,
        LBObjectsComponent,
        GSLBObjectsComponent,
        SearchComponent,
        LBMigrationComponent,
        ExportComponent,
        StatsComponent,
        DashboardComponent,
        LoginComponent,
        SettingsComponent,
        CanvasDialogComponent,
        HomeComponent,
        SuccessComponent,
        ErrorComponent,
        LogoutComponent,
        DoughnutComponent,
        VIPStatusComparisonComponent,
        ArchivesComponent,
        ArchiveDetailComponent,
        DiffComponent,
        PKIComponent,
        AWSDeviceDetailComponent,
        AWSELBDetailComponent,
        AWSListenerDetailComponent,
        AWSzoneDetailComponent,
        AWSruleDetailComponent,
        AWSactionDetailComponent,
        AWStargetgroupDetailComponent,
        AWSsslpolicyDetailComponent,
        AWStargetDetailComponent,
        NetscalerDeviceDetailComponent,
        NetscalerVirtualDetailComponent,
        NetscalerCSVirtualDetailComponent,
        NetscalerCRVirtualDetailComponent,
        NetscalerServicegroupsDetailComponent,
        NetscalerServicesDetailComponent,
        NetscalerPersistenceGroupsDetailComponent,
        NetscalerProfileDetailComponent,
        RadwareDeviceDetailComponent,
        RadwareVirtualDetailComponent,
        RadwareVirtualServiceDetailComponent,
        RadwareServergroupsDetailComponent,
        RadwareRealserversDetailComponent,
        RadwareClassesDetailComponent,
        GenericObjectDetailComponent,
        GenericObjectChartDetailComponent,
        NetscalerServerDetailComponent,
        NetscalerMonitorDetailComponent,
        NetscalerProfileDetailComponent,
        NetscalerTCPProfileDetailComponent,
        NetscalerSSLProfileDetailComponent,
        NetscalerSSLDTLSProfileDetailComponent,
        NetscalerDBProfileDetailComponent,
        NetscalerHTTPProfileDetailComponent,
        NetscalerCSActionDetailComponent,
        NetscalerCSPolicyDetailComponent,
        NetscalerCRPolicyDetailComponent,
        NetscalerNetProfileDetailComponent,
        AWSListenerv1DetailComponent,
        IconSVGComponent,
        ArpMigrationComponent,
        ObjectCleanUPComponent,
        VerticalMenuComponent,
        CustomCardComponent,
        CustomLayoutComponent,
        DeviceF5Component,
        DeviceCitrixNetscalerComponent,
        DeviceRadwareAlteonComponent,
        DeviceCiscoCssComponent,
        DeviceAwsELBComponent,
        CustomTableComponent,
        TaskListComponent,
        TaskComponent,
        DeviceA10Component,
        A10DeviceDetailComponent,
        A10VirtualDetailComponent,
        A10VirtualServiceDetailComponent,
        A10ServiceGroupDetailComponent,
        A10ServersDetailComponent,
        VscreationComponent,
        BackupsComponent,
        UsersComponent,
        SupportComponent,
        LogsComponent,
        BackupDetailComponent,
        UserDetailComponent,
        CustomMsgComponent,
        CertificateDetailComponent,
        KeyDetailComponent,
        DeviceDetailComponent
    ],
    entryComponents: [
        CanvasDialogComponent,
        SuccessComponent,
        ErrorComponent
    ],
    imports: [
        CustomMaterialModule.forRoot(),
        DirectivesModule,
        ServicesModule.forRoot(),
        PipesModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        BusyModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        ADCBossRoutingModule,
        ChartsModule,
        GaugeModule.forRoot()
    ],
    providers: [
        Validator,
    ],
    bootstrap: [AppComponent],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
