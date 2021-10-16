REM NOTES: 


@echo off
setlocal enabledelayedexpansion
mode con lines=20 cols=125
chcp 65001 >nul 2>&1
cd /d "%~dp0"
title Post Tweaks

set VERSION=1.5
set VERSION_INFO=22/01/2021

call:SETVARIABLES >nul 2>&1

ver | find "10." >nul 2>&1
if !ERRORLEVEL! neq 0 (
    echo ERROR: Your current Windows version is not supported
    echo.
    echo Press any key to exit . . .
    pause >nul && exit
)

openfiles >nul 2>&1
if !ERRORLEVEL! neq 0 (
    echo !S_GRAY!You are not running as !RED!Administrator!S_GRAY!...
    echo This batch cannot do it's job without elevation!
    echo.
    echo Right-click and select !S_GREEN!^'Run as Administrator^' !S_GRAY!and try again...
    echo.
    echo Press any key to exit . . .
    pause >nul && exit
)

ping -n 1 "google.com" >nul 2>&1
if !ERRORLEVEL! neq 0 (
    echo !RED!ERROR: !S_GRAY!No internet connection found
    echo.
    echo Please make sure you are connected to the internet and try again . . .
    pause >nul && exit
)

set "NEEDEDFILES=modules/7z.exe modules/7z.dll modules/choicebox.exe modules/nsudo.exe modules/devicecleanup.exe resources/procexp.exe resources/ExtremePerformance.pow resources/SetTimerResolutionService.exe resources/SDL.dll resources/nvdrsdb0.bin resources/nvdrsdb1.bin"
for %%i in (!NEEDEDFILES!) do (
    if not exist %%i (
        set "MISSINGFILES=True"
        echo !RED!ERROR: !S_GREEN!%%i !S_GRAY!is missing
    )
)
if "!MISSINGFILES!"=="True" echo. & echo Downloading missing files please wait...!S_GREEN!
for %%i in (!NEEDEDFILES!) do if not exist %%i call:CURL "0" "https://raw.githubusercontent.com/ArtanisInc/Post-Tweaks/main/%%i" "%%i"

whoami /user | find /i "S-1-5-18" >nul 2>&1
if !ERRORLEVEL! neq 0 call "modules\nsudo.exe" -U:T -P:E -UseCurrentConsole "%~dpnx0" && exit

:SYSTWEAKS
   PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& {Start-Process PowerShell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -NoExit -Command "Checkpoint-Computer -Description "Post Install" -RestorePointType "MODIFY_SETTINGS"; " ' " -Verb RunAs}" >nul 2>&1
    regedit /e "%UserProfile%\desktop\Registry Backup.reg" >nul 2>&1
    bcdedit /export "%UserProfile%\desktop\backupbcd.bcd" >nul 2>&1

echo Disabling UAC
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "EnableVirtualization" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "EnableInstallerDetection" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "PromptOnSecureDesktop" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "EnableLUA" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "EnableSecureUIAPaths" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "ConsentPromptBehaviorAdmin" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "ValidateAdminCodeSignatures" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "EnableUIADesktopToggle" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "ConsentPromptBehaviorUser" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "FilterAdministratorToken" /t REG_DWORD /d "0" /f >nul 2>&1

echo Enabling Windows Components
dism /online /enable-feature /featurename:Hyper-V /all /norestart >nul 2>&1
dism /online /enable-feature /featurename:LegacyComponents /all /norestart >nul 2>&1
dism /online /enable-feature /featurename:DirectPlay /all /norestart >nul 2>&1
dism /online /enable-feature /featurename:NetFx4-AdvSrvs /all /norestart >nul 2>&1
dism /online /enable-feature /featurename:NetFx3 /all /norestart >nul 2>&1

echo BCDEDIT
bcdedit /set disabledynamictick Yes >nul 2>&1
bcdedit /set useplatformclock No >nul 2>&1
bcdedit /set useplatformtick Yes >nul 2>&1
bcdedit /set tscsyncpolicy Enhanced >nul 2>&1
bcdedit /set nx AlwaysOff >nul 2>&1
bcdedit /set pae ForceDisable >nul 2>&1
bcdedit /set ems No >nul 2>&1
bcdedit /set bootems No >nul 2>&1
bcdedit /set integrityservices disable >nul 2>&1
bcdedit /set tpmbootentropy ForceDisable >nul 2>&1
bcdedit /set debug No >nul 2>&1
bcdedit /set hypervisorlaunchtype Off >nul 2>&1
bcdedit /set disableelamdrivers Yes >nul 2>&1
bcdedit /set firstmegabytepolicy UseAll >nul 2>&1
bcdedit /set avoidlowmemory 0x8000000 >nul 2>&1
bcdedit /set allowedinmemorysettings 0x0 >nul 2>&1
bcdedit /set isolatedcontext No >nul 2>&1
bcdedit /set vsmlaunchtype Off >nul 2>&1
bcdedit /set vm No >nul 2>&1
bcdedit /set nolowmem Yes >nul 2>&1
bcdedit /set x2apicpolicy Enable >nul 2>&1
bcdedit /set configaccesspolicy Default >nul 2>&1
bcdedit /set MSI Default >nul 2>&1
bcdedit /set usephysicaldestination No >nul 2>&1
bcdedit /set usefirmwarepcisettings No >nul 2>&1
bcdedit /set linearaddress57 OptOut >nul 2>&1
bcdedit /set increaseuserva 268435328 >nul 2>&1
bcdedit /set bootmenupolicy Legacy >nul 2>&1
bcdedit /set quietboot Yes >nul 2>&1
bcdedit /set {globalsettings} custom:16000067 true >nul 2>&1
bcdedit /set {globalsettings} custom:16000068 true >nul 2>&1
bcdedit /set {globalsettings} custom:16000069 true >nul 2>&1
bcdedit /timeout 3 >nul 2>&1

echo Process Scheduling
reg add "HKLM\SYSTEM\CurrentControlSet\Control\PriorityControl" /v "Win32PrioritySeparation" /t REG_DWORD /d "38" /f >nul 2>&1

echo Disabling Mitigations
call:POWERSHELL "ForEach($v in (Get-Command -Name \"Set-ProcessMitigation\").Parameters[\"Disable\"].Attributes.ValidValues){Set-ProcessMitigation -System -Disable $v.ToString()}"

echo Removing Kernel Blacklist
reg delete "HKLM\System\CurrentControlSet\Control\GraphicsDrivers\BlockList\Kernel" /va /reg:64 /f >nul 2>&1

echo Disabling Memory compression
call:POWERSHELL "Disable-MMAgent -MemoryCompression -ApplicationPreLaunch"

echo Disabling DMA memory protection and cores isolation
reg add "HKLM\SOFTWARE\Policies\Microsoft\FVE" /v "DisableExternalDMAUnderLock" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DeviceGuard" /v "EnableVirtualizationBasedSecurity" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DeviceGuard" /v "HVCIMATRequired" /t REG_DWORD /d "0" /f >nul 2>&1

echo Power settings
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Power" /v "CsEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Power" /v "EnergyEstimationEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Power" /v "PerfCalculateActualUtilization" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Power" /v "SleepReliabilityDetailedDiagnostics" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Power" /v "EventProcessorEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Power" /v "QosManagesIdleProcessors" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Power" /v "DisableVsyncLatencyUpdate" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Power" /v "DisableSensorWatchdog" /t REG_DWORD /d "1" /f >nul 2>&1

echo MMCSS
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "NetworkThrottlingIndex" /t REG_DWORD /d "10" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "SystemResponsiveness" /t REG_DWORD /d "10" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "NoLazyMode" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" /v "LazyModeTimeout" /t REG_DWORD /d "150000" /f >nul 2>&1

echo Disabling automatic folder type discovery
reg add "HKCU\SOFTWARE\Classes\Local Settings\SOFTWARE\Microsoft\Windows\Shell\Bags\AllFolders\Shell" /v "FolderType" /t REG_SZ /d "NotSpecified" /f >nul 2>&1
reg delete "HKCU\SOFTWARE\Classes\Local Settings\SOFTWARE\Microsoft\Windows\Shell\Bags" /f >nul 2>&1

echo Disabling Aero shake
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "DisallowShaking" /t REG_DWORD /d "1" /f >nul 2>&1

echo Do not use AutoPlay for all media and devices
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers" /v "DisableAutoplay" /t REG_DWORD /d "1" /f >nul 2>&1

echo Disabling automatic maintenance
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Schedule\Maintenance" /v "MaintenanceDisabled" /t REG_DWORD /d "1" /f >nul 2>&1

echo Disabling Hibernation
reg add "HKLM\System\CurrentControlSet\Control\Power" /v "HibernateEnabled" /t REG_DWORD /d "0" /f >nul 2>&1

echo Disabling Downloads blocking
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Attachments" /v "SaveZoneInformation" /t REG_DWORD /d "1" /f >nul 2>&1

echo Disabling Malicious SOFTWARE removal tool from installing
reg add "HKLM\SOFTWARE\Policies\Microsoft\MRT" /v "DontOfferThroughWUAU" /t REG_DWORD /d "1" /f >nul 2>&1

echo Change Windows feedback to Never
reg add "HKCU\SOFTWARE\Microsoft\Siuf\Rules" /v "NumberOfSIUFInPeriod" /t REG_DWORD /d "0" /f >nul 2>&1

echo Show BSOD details instead of the sad smiley
reg add "HKLM\System\CurrentControlSet\Control\CrashControl" /v "DisplayParameters" /t REG_DWORD /d "1" /f >nul 2>&1

echo Disabling Administrative shares
reg add "HKLM\System\CurrentControlSet\Services\LanmanServer\Parameters" /v "AutoShareWks" /t REG_DWORD /d "0" /f >nul 2>&1

echo Sound communications do nothing
reg add "HKCU\SOFTWARE\Microsoft\Multimedia\Audio" /v "UserDuckingPreference" /t REG_DWORD /d "3" /f >nul 2>&1

echo Speed up start time
reg add "HKCU\AppEvents\Schemes" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "DelayedDesktopSwitchTimeout" /t REG_DWORD /d "0" /f >nul 2>&1

echo Disabling KB4524752 support notifications
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Gwx" /v "DisableGwx" /t REG_DWORD /d "1" /f >nul 2>&1

echo Disabling KB4524752 support notifications
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate" /v "DisableOSUpgrade" /t REG_DWORD /d "1" /f >nul 2>&1

echo Disabling FSO Globally and GameDVR
reg add "HKCU\SOFTWARE\Microsoft\GameBar" /v "ShowStartupPanel" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\GameBar" /v "GamePanelStartupTipIndex" /t REG_DWORD /d "3" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\GameBar" /v "AllowAutoGameMode" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\GameBar" /v "AutoGameModeEnabled" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\GameBar" /v "UseNexusForGameBarEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\System\GameConfigStore" /v "GameDVR_FSEBehaviorMode" /t REG_DWORD /d "2" /f >nul 2>&1
reg add "HKCU\System\GameConfigStore" /v "GameDVR_FSEBehavior" /t REG_DWORD /d "2" /f >nul 2>&1
reg add "HKCU\System\GameConfigStore" /v "GameDVR_HonorUserFSEBehaviorMode" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\System\GameConfigStore" /v "GameDVR_DXGIHonorFSEWindowsCompatible" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\System\GameConfigStore" /v "GameDVR_EFSEFeatureFlags" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\System\GameConfigStore" /v "GameDVR_DSEBehavior" /t REG_DWORD /d "2" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\PolicyManager\default\ApplicationManagement\AllowGameDVR" /v "value" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKU\.DEFAULT\Software\Microsoft\GameBar" /v "AutoGameModeEnabled" /t REG_DWORD /d "1" /f >nul 2>&1
reg delete "HKCU\System\GameConfigStore\Children" /f >nul 2>&1
reg delete "HKCU\System\GameConfigStore\Parents" /f >nul 2>&1

echo Disabling power throttling
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Power\PowerThrottling" /v "PowerThrottlingOff" /t REG_DWORD /d "1" /f >nul 2>&1

echo Mouse options
reg add "HKCU\Control Panel\Mouse" /v "SmoothMouseXCurve" /t REG_BINARY /d "0000000000000000c0cc0c0000000000809919000000000040662600000000000033330000000000" /f >nul 2>&1
reg add "HKCU\Control Panel\Mouse" /v "SmoothMouseYCurve" /t REG_BINARY /d "0000000000000000000038000000000000007000000000000000a800000000000000e00000000000" /f >nul 2>&1
reg add "HKCU\Control Panel\Mouse" /v "MouseSensitivity" /t REG_SZ /d "10" /f >nul 2>&1
reg add "HKCU\Control Panel\Mouse" /v "MouseSpeed" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKCU\Control Panel\Mouse" /v "MouseThreshold1" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKCU\Control Panel\Mouse" /v "MouseThreshold2" /t REG_SZ /d "0" /f >nul 2>&1

echo Disabling Startup Sound
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Authentication\LogonUI\BootAnimation" /v "DisableStartupSound" /t REG_DWORD /d "1" /f >nul 2>&1

echo Mouse and Keyboard Buffering
reg add "HKLM\SYSTEM\CurrentControlSet\Services\mouclass\Parameters" /v "MouseDataQueueSize" /t REG_DWORD /d "16" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\kbdclass\Parameters" /v "KeyboardDataQueueSize" /t REG_DWORD /d "16" /f >nul 2>&1

echo Make desktop faster
reg add "HKU\.DEFAULT\Control Panel\Desktop" /v "ForegroundLockTimeout" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKU\.DEFAULT\Control Panel\Desktop" /v "MenuShowDelay" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKU\.DEFAULT\Control Panel\Desktop" /v "MouseWheelRouting" /t REG_DWORD /d "0" /f >nul 2>&1

echo Acessibility keys
reg add "HKU\.DEFAULT\Control Panel\Accessibility\HighContrast" /v "Flags" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKU\.DEFAULT\Control Panel\Accessibility\Keyboard Response" /v "Flags" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKU\.DEFAULT\Control Panel\Accessibility\MouseKeys" /v "Flags" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKU\.DEFAULT\Control Panel\Accessibility\SoundSentry" /v "Flags" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKU\.DEFAULT\Control Panel\Accessibility\StickyKeys" /v "Flags" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKU\.DEFAULT\Control Panel\Accessibility\TimeOut" /v "Flags" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKU\.DEFAULT\Control Panel\Accessibility\ToggleKeys" /v "Flags" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKCU\Control Panel\Accessibility\MouseKeys" /v "Flags" /t REG_SZ /d "186" /f >nul 2>&1
reg add "HKCU\Control Panel\Accessibility\MouseKeys" /v "MaximumSpeed" /t REG_SZ /d "40" /f >nul 2>&1
reg add "HKCU\Control Panel\Accessibility\MouseKeys" /v "TimeToMaximumSpeed" /t REG_SZ /d "3000" /f >nul 2>&1

echo SvcHostSplitThreshold
reg add "HKLM\SYSTEM\CurrentControlSet\Control" /v "SvcHostSplitThresholdInKB" /t REG_DWORD /d "!SVCHOST!" /f >nul 2>&1

echo Memory and disk
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "ContigFileAllocSize" /t REG_DWORD /d "1536" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "DisableDeleteNotification" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "DontVerifyRandomDrivers" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "FileNameCache" /t REG_DWORD /d "1024" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "LongPathsEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "NtfsAllowExtendedCharacter8dot3Rename" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "NtfsBugcheckOnCorrupt" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "NtfsDisable8dot3NameCreation" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "NtfsDisableCompression" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "NtfsDisableEncryption" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "NtfsEncryptPagingFile" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "NtfsMemoryUsage" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "NtfsMftZoneReservation" /t REG_DWORD /d "3" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "PathCache" /t REG_DWORD /d "128" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "RefsDisableLastAccessUpdate" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "NtfsDisableLastAccessUpdate" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "UdfsSoftwareDefectManagement" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\filesystem" /v "Win31FileSystem" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\executive" /v "AdditionalCriticalWorkerThreads" /t REG_DWORD /d "16" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\executive" /v "AdditionalDelayedWorkerThreads" /t REG_DWORD /d "16" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\i/o system" /v "CountOperations" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\memory management" /v "ClearPageFileAtShutdown" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\memory management" /v "IoPageLockLimit" /t REG_DWORD /d "8000000" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\memory management" /v "LargeSystemCache" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\memory management" /v "SystemPages" /t REG_DWORD /d "4294967295" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\memory management" /v "DisablePagingExecutive" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\memory management\prefetchparameters" /v "EnableBoottrace" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\memory management\prefetchparameters" /v "EnablePrefetcher" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\memory management\prefetchparameters" /v "EnableSuperfetch" /t REG_DWORD /d "0" /f >nul 2>&1

echo Disabling NTFS/ReFS mitigations
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager" /v "ProtectionMode" /t REG_DWORD /d "0" /f >nul 2>&1

echo Disabling Windows attempt to save as much RAM as possible, such as sharing pages for images, copy-on-write for data pages, and compression
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\Memory Management" /v "DisablePagingCombining" /t REG_DWORD /d "1" /f >nul 2>&1

echo Disabling Tsx/Meltdown/Spectre patches
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\Kernel" /v "DisableTsx" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\Memory Management" /v "EnableCfg" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\Memory Management" /v "FeatureSettings" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\Memory Management" /v "FeatureSettingsOverride" /t REG_DWORD /d "3" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\Memory Management" /v "FeatureSettingsOverrideMask" /t REG_DWORD /d "3" /f >nul 2>&1

echo Kernel settings
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\kernel" /v "DpcWatchdogProfileOffset" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\kernel" /v "DisableExceptionChainValidation" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\kernel" /v "KernelSEHOPEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\kernel" /v "DpcWatchdogPeriod" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\kernel" /v "MitigationOptions" /t REG_BINARY /d "22222222222222222002000000200000" /f >nul 2>&1
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\kernel" /v "MitigationAuditOptions" /t REG_BINARY /d "20000020202022220000000000000000" /f >nul 2>&1

REM echo Disabling fast startup
REM reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\Power" /v "HiberbootEnabled" /t REG_DWORD /d "0" /f >nul 2>&1

echo Disabling Sleep study
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\Power" /v "SleepStudyDisabled" /t REG_DWORD /d "1" /f >nul 2>&1

echo Disabling Windows Customer Experience Improvement Program
reg add "HKLM\SOFTWARE\Policies\Microsoft\SQMClient\Windows" /v "CEIPEnable" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\SQMClient" /v "CorporateSQMURL" /t REG_SZ /d "0.0.0.0" /f >nul 2>&1

echo Disabling SmartScreen
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\System" /v "EnableSmartScreen" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v "SmartScreenEnabled" /t REG_SZ /d "Off" /f >nul 2>&1
reg add "HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Explorer" /v "SmartScreenEnabled" /t REG_SZ /d "Off" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\AppHost" /v "EnableWebContentEvaluation" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\AppHost" /v "EnableWebContentEvaluation" /t REG_DWORD /d "0" /f >nul 2>&1

echo Clean Image File Execution Options and set csrss to realtime
for /f "tokens=*" %%i in ('reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options"') do reg delete "%%i" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\csrss.exe\PerfOptions" /v "CpuPriorityClass" /t REG_DWORD /d "4" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\csrss.exe\PerfOptions" /v "IoPriority" /t REG_DWORD /d "3" /f >nul 2>&1

echo Disabling performance counter
for %%i in (wsearchidxpi wmiaprpl usbhub ugthrsvc ugatherer termservice
    tcpip spooler "smsvchost 5.0.0.0" "smsvchost 4.0.0.0"
    "smsvchost 3.0.0.0" "servicemodelservice 3.0.0.0" tapisrv
    "windows workflow foundation 3.0.0.0" "windows workflow foundation 4.0.0.0"
    "windows workflow foundation 5.0.0.0" "servicemodeloperation 4.0.0.0"
    "servicemodeloperation 3.0.0.0" "servicemodelendpoint 4.0.0.0"
    "servicemodelendpoint 3.0.0.0" rdyboost perfproc perfnet perfdisk
    outlook msscntrs "msdtc bridge 5.0.0.0" "msdtc bridge 4.0.0.0"
    "msdtc bridge 3.0.0.0" msdtc lsa esent remoteaccess
    bits aspnet_state asp.net_4.0.30319 asp.net ".netframework"
    ".NET CLR Data" ".NET CLR Networking" ".NET CLR Networking 5.0.0.0"
    ".NET CLR Networking 4.0.0.0" ".NET Data Provider for Oracle"
    ".NET Data Provider for SqlServer" ".NET Memory Cache 4.0"
    ".NET Memory Cache 4.1") do lodctr /d:%%i >nul 2>&1

echo Removing ProcessorAffinityMask
for /f %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Services" /s /f "ProcessorAffinityMask"^| findstr "HKEY"') do reg delete "%%i" /v "ProcessorAffinityMask" /f >nul 2>&1

echo Set all IoLatencyCaps to 0
for /f %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Services" /s /f "IoLatencyCap"^| findstr "HKEY"') do reg add "%%i" /v "IoLatencyCap" /t REG_DWORD /d "0" /f >nul 2>&1

echo Disabling Link power management mode
for /f %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Services" /s /f "EnableHIPM"^| findstr "HKEY"') do reg add "%%i" /v "EnableHIPM" /t REG_DWORD /d "0" /f >nul 2>&1
for /f %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Services" /s /f "EnableDIPM"^| findstr "HKEY"') do reg add "%%i" /v "EnableDIPM" /t REG_DWORD /d "0" /f >nul 2>&1

echo USB Hubs against power saving
for /f "tokens=*" %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Enum" /s /f "EnhancedPowerManagementEnabled"^| findstr "HKEY"') do (
    reg add "%%i" /v "EnhancedPowerManagementEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "%%i" /v "AllowIdleIrpInD3" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "%%i" /v "EnableSelectiveSuspend" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "%%i" /v "DeviceSelectiveSuspended" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "%%i" /v "SelectiveSuspendEnabled" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "%%i" /v "SelectiveSuspendOn" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "%%i" /v "fid_D1Latency" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "%%i" /v "fid_D2Latency" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "%%i" /v "fid_D3Latency" /t REG_DWORD /d "0" /f >nul 2>&1
)
reg add "HKLM\SYSTEM\CurrentControlSet\Control\usbflags" /v "fid_D1Latency" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Control\usbflags" /v "fid_D2Latency" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Control\usbflags" /v "fid_D3Latency" /t REG_DWORD /d "0" /f >nul 2>&1

echo StorPort against power saving
for /f "tokens=*" %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Enum" /s /f "StorPort"^| findstr "StorPort"') do reg add "%%i" /v "EnableIdlePowerManagement" /t REG_DWORD /d "0" /f >nul 2>&1

echo Removing IRQ Priorities
for /f %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\PriorityControl" /f "irq"^| findstr "irq"') do reg delete "HKLM\SYSTEM\CurrentControlSet\Control\PriorityControl" /v "%%i" /f >nul 2>&1

echo Enabling MSI mode for PCI devices except sound
for /f %%i in ('wmic path Win32_IDEController get PNPDeviceID^| findstr /L "PCI\VEN_"') do reg add "HKLM\SYSTEM\CurrentControlSet\Enum\%%i\Device Parameters\Interrupt Management\MessageSignaledInterruptProperties" /v "MSISupported" /t REG_DWORD /d "1" /f >nul 2>&1
for /f %%i in ('wmic path Win32_USBController get PNPDeviceID^| findstr /L "PCI\VEN_"') do reg add "HKLM\SYSTEM\CurrentControlSet\Enum\%%i\Device Parameters\Interrupt Management\MessageSignaledInterruptProperties" /v "MSISupported" /t REG_DWORD /d "1" /f >nul 2>&1
for /f %%i in ('wmic path Win32_VideoController get PNPDeviceID^| findstr /L "PCI\VEN_"') do reg add "HKLM\SYSTEM\CurrentControlSet\Enum\%%i\Device Parameters\Interrupt Management\MessageSignaledInterruptProperties" /v "MSISupported" /t REG_DWORD /d "1" /f >nul 2>&1
for /f %%i in ('wmic path Win32_NetworkAdapter get PNPDeviceID^| findstr /L "PCI\VEN_"') do reg add "HKLM\SYSTEM\CurrentControlSet\Enum\%%i\Device Parameters\Interrupt Management\MessageSignaledInterruptProperties" /v "MSISupported" /t REG_DWORD /d "1" /f >nul 2>&1
for /f %%i in ('wmic path Win32_SoundDevice get PNPDeviceID^| findstr /L "PCI\VEN_"') do reg add "HKLM\SYSTEM\CurrentControlSet\Enum\%%i\Device Parameters\Interrupt Management\MessageSignaledInterruptProperties" /v "MSISupported" /t REG_DWORD /d "0" /f >nul 2>&1

echo Removing DevicePriority and setting affinity policy
for /f "tokens=*" %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Enum" /s /f "Affinity Policy"^| findstr /l "VEN_"') do (
    reg delete "%%i" /v "DevicePriority" /f >nul 2>&1
    reg add "%%i" /v "DevicePolicy" /t REG_DWORD /d "5" /f >nul 2>&1
)
for /f "tokens=*" %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Enum" /s /f "Affinity Policy"^| findstr /v "VEN_"') do reg add "%%i" /v "DevicePolicy" /t REG_DWORD /d "3" /f >nul 2>&1

echo Removing affinity mask
for /f "tokens=*" %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Enum" /s /f "AssignmentSetOverride"^| findstr "HKEY"') do reg delete "%%i" /v "AssignmentSetOverride" /f >nul 2>&1

echo DedicatedSegmentSize in Intel iGPU
for /f %%i in ('reg query "HKLM\SOFTWARE\Intel" /s /f "GMM"^| findstr "HKEY"') do reg add "%%i" /v "DedicatedSegmentSize" /t REG_DWORD /d "4132" /f >nul 2>&1

echo Use big page file
wmic computersystem where name="%computername%" set AutomaticManagedPagefile=False >nul 2>&1
wmic pagefileset where name="C:\\pagefile.sys" set InitialSize=!PAGEFILE!,MaximumSize=!PAGEFILE! >nul 2>&1

echo Text Improvements Avalon
for %%i in (HKLM\SOFTWARE HKLM\SOFTWARE\WOW6432Node HKCU\SOFTWARE) do (
    reg query "%%i\Microsoft\Avalon.Graphics" /ve >nul 2>&1
    if !ERRORLEVEL! equ 0 (
        reg add "%%i\Microsoft\Avalon.Graphics" /v "ClearTypeLevel" /t REG_DWORD /d "100" /f >nul 2>&1
        reg add "%%i\Microsoft\Avalon.Graphics" /v "EnhancedContrastLevel" /t REG_DWORD /d "0" /f >nul 2>&1
        reg add "%%i\Microsoft\Avalon.Graphics" /v "GammaLevel" /t REG_DWORD /d "1600" /f >nul 2>&1
        reg add "%%i\Microsoft\Avalon.Graphics" /v "GrayscaleEnhancedContrastLevel" /t REG_DWORD /d "0" /f >nul 2>&1
        reg add "%%i\Microsoft\Avalon.Graphics" /v "PixelStructure" /t REG_DWORD /d "1" /f >nul 2>&1
        reg add "%%i\Microsoft\Avalon.Graphics" /v "TextContrastLevel" /t REG_DWORD /d "6" /f >nul 2>&1
    )
)

echo Disabling event windows
reg add "HKLM\SOFTWARE\Microsoft\Wbem\CIMOM" /v "EnableEvents" /t REG_DWORD /d "0" /f >nul 2>&1

echo Disabling Preemption and V-Sync Idle Timeout for gpu
reg add "HKLM\System\CurrentControlSet\Control\GraphicsDrivers\Scheduler" /v "EnablePreemption" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\System\CurrentControlSet\Control\GraphicsDrivers\Scheduler" /v "VsyncIdleTimeout" /t REG_DWORD /d "0" /f >nul 2>&1

echo GPU scheduling
reg add "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" /v "HwSchedMode" /t REG_DWORD /d "2" /f >nul 2>&1

echo Display tweaks
for /f "delims=DesktopMonitor, " %%i in ('wmic path Win32_DesktopMonitor get DeviceID^| findstr /l "DesktopMonitor"') do reg add "!VIDEO_ADAPTER_PATH!" /v "Display%%i_PipeOptimizationEnable" /t REG_DWORD /d "1" /f >nul 2>&1

if "!GPU!"=="NVIDIA" (
    echo Unhide silk smooth
    reg add "HKLM\SYSTEM\CurrentControlSet\Services\nvlddmkm\FTS" /v "EnableRID61684" /t REG_DWORD /d "1" /f >nul 2>&1
    echo Enabling kboost
    reg add "!VIDEO_ADAPTER_PATH!" /v "EnableCoreSlowdown" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "EnableMClkSlowdown" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "EnableNVClkSlowdown" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "PerfLevelSrc" /t REG_DWORD /d "2222" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "powermizerenable" /t REG_DWORD /d "1" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "powermizerlevel" /t REG_DWORD /d "1" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "powermizerlevelac" /t REG_DWORD /d "1" /f >nul 2>&1
    echo Melody GPU tweaks
    reg add "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" /v "DpiMapIommuContiguous" /t REG_DWORD /d "1" /f >nul 2>&1
    for %%i in (DefaultD3TransitionLatencyActivelyUsed DefaultD3TransitionLatencyIdleLongTime DefaultD3TransitionLatencyIdleMonitorOff DefaultD3TransitionLatencyIdleNoContext
        DefaultD3TransitionLatencyIdleShortTime DefaultD3TransitionLatencyIdleVeryLongTime DefaultLatencyToleranceIdle0 DefaultLatencyToleranceIdle0MonitorOff
        DefaultLatencyToleranceIdle1 DefaultLatencyToleranceIdle1MonitorOff DefaultLatencyToleranceMemory DefaultLatencyToleranceNoContext DefaultLatencyToleranceNoContextMonitorOff
        DefaultLatencyToleranceOther DefaultLatencyToleranceTimerPeriod DefaultMemoryRefreshLatencyToleranceActivelyUsed DefaultMemoryRefreshLatencyToleranceMonitorOff
        DefaultMemoryRefreshLatencyToleranceNoContext Latency MaxIAverageGraphicsLatencyInOneBucket MiracastPerfTrackGraphicsLatency MonitorLatencyTolerance
        MonitorRefreshLatencyTolerance TransitionLatency) do reg add "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers\Power" /v "%%i" /t REG_DWORD /d "1" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "D3PCLatency" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "F1TransitionLatency" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "PciLatencyTimerControl" /t REG_DWORD /d "32" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "RMDeepL1EntryLatencyUsec" /t REG_DWORD /d "0" /f >nul 2>&1
    for %%i in (PreferSystemMemoryContiguous LOWLATENCY Node3DLowLatency RmGspcMaxFtuS
        RmGspcMinFtuS RmGspcPerioduS RMLpwrEiIdleThresholduS RMLpwrGrIdleThresholduS
        RMLpwrGrRgIdleThresholduS RMLpwrMsIdleThresholduS VRDirectFlipDPCDelayuS
        VRDirectFlipTimingMarginuS VRDirectJITFlipMsHybridFlipDelayuS vrrCursorMarginuS
        vrrDeflickerMarginuS vrrDeflickerMaxUs) do reg add "!VIDEO_ADAPTER_PATH!" /v "%%i" /t REG_DWORD /d "1" /f >nul 2>&1
    echo Importing Nvidia settings
    taskkill /f /im "nvcplui.exe" >nul 2>&1
    copy /y "resources\nvdrsdb0.bin" "%ProgramData%\NVIDIA Corporation\Drs" >nul 2>&1
    copy /y "resources\nvdrsdb1.bin" "%ProgramData%\NVIDIA Corporation\Drs" >nul 2>&1
)

if "!GPU!"=="AMD" (
    echo General AMD GPU settings
    reg add "!VIDEO_ADAPTER_PATH!" /v "EnableUlps" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "DisableDMACopy" /t REG_DWORD /d "1" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "DisableBlockWrite" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "DisableDrmdmaPowerGating" /t REG_DWORD /d "1" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "StutterMode" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "PP_SclkDeepSleepDisable" /t REG_DWORD /d "1" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!" /v "PP_ThermalAutoThrottlingEnable" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!\UMD" /v "Main3D_DEF" /t REG_STRING /d "1" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!\UMD" /v "Main3D" /t REG_BINARY /d "3100" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!\UMD" /v "ShaderCache" /t REG_BINARY /d "3200" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!\UMD" /v "Tessellation_OPTION" /t REG_BINARY /d "3200" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!\UMD" /v "Tessellation" /t REG_BINARY /d "3100" /f >nul 2>&1
    reg add "!VIDEO_ADAPTER_PATH!\UMD" /v "VSyncControl" /t REG_BINARY /d "3000" /f >nul 2>&1
    reg add "HKLM\SYSTEM\CurrentControlSet\Services\amdlog" /v "Start" /t REG_DWORD /d "4" /f >nul 2>&1
    echo Melody GPU tweaks
    for %%i in (LTRSnoopL1Latency LTRSnoopL0Latency LTRNoSnoopL1Latency LTRMaxNoSnoopLatency KMD_RpmComputeLatency
        DalUrgentLatencyNs memClockSwitchLatency PP_RTPMComputeF1Latency PP_DGBMMMaxTransitionLatencyUvd
        PP_DGBPMMaxTransitionLatencyGfx DalNBLatencyForUnderFlow DalDramClockChangeLatencyNs
        BGM_LTRSnoopL1Latency BGM_LTRSnoopL0Latency BGM_LTRNoSnoopL1Latency BGM_LTRNoSnoopL0Latency
        BGM_LTRMaxSnoopLatencyValue BGM_LTRMaxNoSnoopLatencyValue) do reg add "!VIDEO_ADAPTER_PATH!" /v "%%i" /t REG_DWORD /d "1" /f >nul 2>&1
)


echo Set large page drivers
reg add "HKLM\SYSTEM\currentcontrolset\control\session manager\Memory Management" /v "LargePageDrivers" /t REG_MULTI_SZ /d "!DRIVERLIST!!NIC_SERVICE!" /f >nul 2>&1

echo Clean and set Thread Prioritys for drivers
for /f %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Services" /s /f "ThreadPriority"^| findstr "HKEY"') do reg delete "%%i" /v "ThreadPriority" /f >nul 2>&1
for %%i in (AFD Audiosrv disk iaStorAC iaStorAVC NDIS Ntfs storahci stornvme Tcpip TCPIP6) do (
    reg query "HKLM\SYSTEM\CurrentControlSet\Services\%%i" /ve >nul 2>&1
    if !ERRORLEVEL! equ 0 reg add "HKLM\System\CurrentControlSet\Services\%%i\Parameters" /v "ThreadPriority" /t REG_DWORD /d "0" /f >nul 2>&1
)
for %%i in (amdkmdag atikmpag atikmdag nvlddmkm DXGKrnl HDAudBus HidUsb igdkmd64 kbdhid monitor mouhid usbccgp usbehci usbhub USBHUB3 usbohci usbuhci USBXHCI) do (
    reg query "HKLM\SYSTEM\CurrentControlSet\Services\%%i" /ve >nul 2>&1
    if !ERRORLEVEL! equ 0 reg add "HKLM\System\CurrentControlSet\services\%%i\Parameters" /v "ThreadPriority" /t REG_DWORD /d "15" /f >nul 2>&1
)
for /f "tokens=3" %%i in ('reg query "HKLM\SYSTEM\ControlSet001\Control\Class\{4d36e972-e325-11ce-bfc1-08002be10318}" /s /f "Service"^| findstr "Service"^| findstr /v "kdnic vwifimp RasSstp RasAgileVpn Rasl2tp PptpMiniport RasPppoe NdisWan"') do reg add "HKLM\System\CurrentControlSet\services\%%i\Parameters" /v "ThreadPriority" /t REG_DWORD /d "15" /f >nul 2>&1

echo Clean non-present devices
call "modules\devicecleanup.exe" * -s -n >nul 2>&1

echo Disabling devices power management
call:POWERSHELL "$devices = Get-WmiObject Win32_PnPEntity; $powerMgmt = Get-WmiObject MSPower_DeviceEnable -Namespace root\wmi; foreach ($p in $powerMgmt){$IN = $p.InstanceName.ToUpper(); foreach ($h in $devices){$PNPDI = $h.PNPDeviceID; if ($IN -like \"*$PNPDI*\"){$p.enable = $False; $p.psbase.put()}}}"

echo Import Power Plan
powercfg -delete 77777777-7777-7777-7777-777777777777 >nul 2>&1
powercfg -import "%~dp0\resources\ExtremePerformance.pow" 77777777-7777-7777-7777-777777777777 >nul 2>&1
powercfg -setactive 77777777-7777-7777-7777-777777777777 >nul 2>&1

REM echo Auto disable FSO and set High DPI scaling override by Application for apps/games
REM echo Dim oldflags : newflags = "~ DISABLEDXMAXIMIZEDWINDOWEDMODE HIGHDPIAWARE" >"%WinDir%\globalflags.vbs"
REM echo Const HKU = 2147483651 : Const SEMISYNCHRONOUS = 48 >>"%WinDir%\globalflags.vbs"
REM echo layerskey = "Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers" >>"%WinDir%\globalflags.vbs"
REM echo querytext = "SELECT ExecutablePath FROM Win32_Process WHERE ProcessID=" ^& TargetEvent.ProcessID >>"%WinDir%\globalflags.vbs"
REM echo Set mExec = GetObject^("winmgmts:{impersonationLevel=impersonate}!\\.\root\CIMv2"^).ExecQuery^(querytext,,SEMISYNCHRONOUS^) >>"%WinDir%\globalflags.vbs"
REM echo Set rProv = GetObject^("winmgmts:{impersonationLevel=impersonate}!\\.\root\default:StdRegProv"^) >>"%WinDir%\globalflags.vbs"
REM echo Set regEx = New RegExp : regEx.Global = False : regEx.IgnoreCase = True >>"%WinDir%\globalflags.vbs"
REM echo filterprg = "^.:\\Program Files(?:\\| \(x86\)\\)(Common |dotnet|Microsoft |Windows |WindowsApps|MSBuild)" >>"%WinDir%\globalflags.vbs"
REM echo regEx.Pattern = "^.:\\Windows\\|^.\\ProgramData\\Package |\\AppData\\Local\\Temp\\|\\AppData\\Local\\Microsoft\\|" ^& filterprg >>"%WinDir%\globalflags.vbs"
REM echo For Each process in mExec >>"%WinDir%\globalflags.vbs"
REM echo     If Not IsNull^(process.ExecutablePath^) And Not regEx.Test^(process.ExecutablePath^) Then >>"%WinDir%\globalflags.vbs"
REM echo         process.GetOwnerSid sid : compatkey = sid ^& "\\" ^& layerskey >>"%WinDir%\globalflags.vbs"
REM echo         ret = rProv.GetStringValue^(HKU, compatkey, process.ExecutablePath, oldflags^) >>"%WinDir%\globalflags.vbs"
REM echo         If ^(ret ^<^> 0^) Then >>"%WinDir%\globalflags.vbs"
REM echo             rProv.CreateKey HKU, compatkey : rProv.SetStringValue HKU, compatkey, process.ExecutablePath, newflags >>"%WinDir%\globalflags.vbs"
REM echo         ElseIf ^(newflags = "~ "^) Then >>"%WinDir%\globalflags.vbs"
REM echo             rProv.DeleteValue HKU, compatkey, process.ExecutablePath >>"%WinDir%\globalflags.vbs"
REM echo         End If >>"%WinDir%\globalflags.vbs"
REM echo     End If >>"%WinDir%\globalflags.vbs"
REM echo Next >>"%WinDir%\globalflags.vbs"

set "SESSIONID=SessionID^!=0"
for %%i in (cvtres csc svchost DllHost RuntimeBroker backgroundTaskHost
    rundll32 find findstr reg PING timeout taskkill Conhost cmd cscript
    wscript powershell explorer OpenWith SearchProtocolHost SpeechRuntime
    browser_broker MicrosoftEdgeCP firefox chrome steamwebhelper) do set "FILTER=!FILTER! AND ProcessName^!='%%i.exe'"
wmic /NAMESPACE:"\\root\subscription" PATH __EventFilter CREATE Name="GlobalAppCompatFlags", EventNameSpace="root\cimv2",QueryLanguage="WQL", Query="SELECT * from Win32_ProcessStartTrace WHERE !SESSIONID!!FILTER!" >nul 2>&1
wmic /NAMESPACE:"\\root\subscription" PATH ActiveScriptEventConsumer CREATE Name="GlobalAppCompatFlags", ScriptingEngine="VBScript",ScriptFileName="C:\Windows\globalflags.vbs" >nul 2>&1
wmic /NAMESPACE:"\\root\subscription" PATH __FilterToConsumerBinding CREATE Filter="__EventFilter.Name=\"GlobalAppCompatFlags\"", Consumer="ActiveScriptEventConsumer.Name=\"GlobalAppCompatFlags\"" >nul 2>&1

REM echo Removing Windows bloatware
call:POWERSHELL "Get-AppxPackage *3dbuilder* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *WindowsFeedbackHub* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *GetHelp* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *WindowsMaps* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *MicrosoftStickyNotes* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *Todos* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *zunemusic* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *Teams* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *solitairecollection* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *YourPhone* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *zunevideo* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *people* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *bingnews* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *bingsports* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *bingweather* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *Microsoft3DViewer* | Remove-AppxPackage"
call:POWERSHELL "Get-AppxPackage *SpotifyAB.SpotifyMusic* | Remove-AppxPackage"


echo Enabling HRTF
echo hrtf ^= true > "%appdata%\alsoft.ini"
echo hrtf ^= true > "%ProgramData%\alsoft.ini"

echo Install Simple DirectMedia Layer
if not exist "%WinDir%\System32\SDL.dll" copy "resources\SDL.dll" "%WinDir%\System32" >nul 2>&1
if not exist "%WinDir%\SysWOW64\SDL.dll" copy "resources\SDL.dll" "%WinDir%\SysWOW64" >nul 2>&1

echo Network tweaks
ipconfig /flushdns >nul 2>&1
netsh winsock reset >nul 2>&1
netsh winsock set autotuning on >nul 2>&1
netsh interface ip delete arpcache >nul 2>&1
netsh interface teredo set state disabled >nul 2>&1
netsh interface 6to4 set state disabled >nul 2>&1
netsh int isatap set state disable >nul 2>&1
netsh int tcp set global autotuninglevel=normal >nul 2>&1
netsh int tcp set heuristics disabled >nul 2>&1
netsh int tcp set supplemental internet congestionprovider=CUBIC >nul 2>&1
netsh int tcp set global ecncapability=disabled >nul 2>&1
netsh int tcp set global dca=enabled >nul 2>&1
netsh int tcp set global netdma=enabled >nul 2>&1
netsh int tcp set global nonsackrttresiliency=disabled >nul 2>&1
netsh int tcp set global rsc=disabled >nul 2>&1
netsh int tcp set global rss=enabled >nul 2>&1
netsh int tcp set global timestamps=disabled >nul 2>&1
netsh int tcp set security mpp=disabled >nul 2>&1
netsh int tcp set security profiles=disabled >nul 2>&1
netsh int tcp set global initialRto=2000 >nul 2>&1
netsh int tcp set global maxsynretransmissions=2 >nul 2>&1
netsh int ip set global taskoffload=disabled >nul 2>&1
netsh int ip set global neighborcachelimit=4096 >nul 2>&1
call:POWERSHELL "Set-NetOffloadGlobalSetting -Chimney Disabled"
call:POWERSHELL "Set-NetTCPSetting -SettingName InternetCustom -MinRto 300"
call:POWERSHELL "Set-NetTCPSetting -SettingName InternetCustom -InitialCongestionWindow 10"
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "EnableICMPRedirect" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "EnablePMTUDiscovery" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "Tcp1323Opts" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "GlobalMaxTcpWindowSize" /t REG_DWORD /d "5840" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "TcpWindowSize" /t REG_DWORD /d "5840" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "MaxConnectionsPerServer" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "MaxUserPort" /t REG_DWORD /d "65534" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "TcpTimedWaitDelay" /t REG_DWORD /d "30" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "EnablePMTUBHDetect" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "DefaultTTL" /t REG_DWORD /d "64" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "SackOpts" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters" /v "TcpMaxDupAcks" /t REG_DWORD /d "2" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Winsock" /v "UseDelayedAcceptance" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Winsock" /v "MaxSockAddrLength" /t REG_DWORD /d "16" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Winsock" /v "MinSockAddrLength" /t REG_DWORD /d "16" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\WinSock2\Parameters" /v "Ws2_32NumHandleBuckets" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\MSMQ\Parameters" /v "TCPNoDelay" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Psched" /v "MaxOutstandingSends" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Psched" /v "NonBestEffortLimit" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Psched" /v "TimerResolution" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Psched\DiffservByteMappingConforming" /v "ServiceTypeGuaranteed" /t REG_DWORD /d "46" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Psched\DiffservByteMappingConforming" /v "ServiceTypeNetworkControl" /t REG_DWORD /d "56" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Psched\DiffservByteMappingNonConforming" /v "ServiceTypeGuaranteed" /t REG_DWORD /d "46" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Psched\DiffservByteMappingNonConforming" /v "ServiceTypeNetworkControl" /t REG_DWORD /d "56" /f >nul 2>&1
reg add "HKLM\SOFTWARE\WOW6432Node\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_MAXCONNECTIONSPER1_0SERVER" /v "explorer.exe" /t REG_DWORD /d "10" /f >nul 2>&1
reg add "HKLM\SOFTWARE\WOW6432Node\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_MAXCONNECTIONSPER1_0SERVER" /v "iexplore.exe" /t REG_DWORD /d "10" /f >nul 2>&1
reg add "HKLM\SOFTWARE\WOW6432Node\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_MAXCONNECTIONSPERSERVER" /v "explorer.exe" /t REG_DWORD /d "10" /f >nul 2>&1
reg add "HKLM\SOFTWARE\WOW6432Node\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_MAXCONNECTIONSPERSERVER" /v "iexplore.exe" /t REG_DWORD /d "10" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\ServiceProvider" /v "DnsPriority" /t REG_DWORD /d "6" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\ServiceProvider" /v "HostsPriority" /t REG_DWORD /d "5" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\ServiceProvider" /v "LocalPriority" /t REG_DWORD /d "4" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\ServiceProvider" /v "NetbtPriority" /t REG_DWORD /d "7" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\AFD\Parameters" /v "DefaultReceiveWindow" /t REG_DWORD /d "16384" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\AFD\Parameters" /v "DefaultSendWindow" /t REG_DWORD /d "16384" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\AFD\Parameters" /v "DisableRawSecurity" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\AFD\Parameters" /v "DynamicSendBufferDisable" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\AFD\Parameters" /v "FastCopyReceiveThreshold" /t REG_DWORD /d "16384" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\AFD\Parameters" /v "FastSendDatagramThreshold" /t REG_DWORD /d "16384" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\AFD\Parameters" /v "IgnorePushBitOnReceives" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\AFD\Parameters" /v "NonBlockingSendSpecialBuffering" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters" /v "EnableICSIPv6" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters" /v "DisabledComponents" /t REG_DWORD /d "255" /f >nul 2>&1
for /f %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\services\NetBT\Parameters\Interfaces" /s /f "NetbiosOptions"^| findstr "HKEY"') do reg add "%%i" /v "NetbiosOptions" /t REG_DWORD /d "2" /f >nul 2>&1
for /f %%i in ('wmic path win32_networkadapter get GUID^| findstr "{"') do (
    reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\%%i" /v "TcpAckFrequency" /t REG_DWORD /d "1" /f >nul 2>&1
    reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\%%i" /v "TcpDelAckTicks" /t REG_DWORD /d "0" /f >nul 2>&1
    reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\%%i" /v "TCPNoDelay" /t REG_DWORD /d "1" /f >nul 2>&1
)
echo Network Adapter settings
for /f %%i in ('reg query "HKLM\SYSTEM\ControlSet001\Control\Class\{4D36E972-E325-11CE-BFC1-08002bE10318}" /f "PCI\VEN_" /d /s^| findstr "HKEY"') do (
    reg add "%%i" /v "*EEE" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*FlowControl" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*HeaderDataSplit" /t REG_SZ /d "1" /f >nul 2>&1
    reg add "%%i" /v "*InterruptModeration" /t REG_SZ /d "1" /f >nul 2>&1
    reg add "%%i" /v "*IPChecksumOffloadIPv4" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*JumboPacket" /t REG_SZ /d "1514" /f >nul 2>&1
    reg add "%%i" /v "*LsoV1IPv4" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*LsoV2IPv4" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*LsoV2IPv6" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*ModernStandbyWoLMagicPacket" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*PMARPOffload" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*PMNSOffload" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*PriorityVLANTag" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*PtpHardwareTimestamp" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*RSS" /t REG_SZ /d "1" /f >nul 2>&1
    reg add "%%i" /v "*RssBaseProcNumber" /t REG_SZ /d "1" /f >nul 2>&1
    reg add "%%i" /v "*RssMaxProcNumber" /t REG_SZ /d "1" /f >nul 2>&1
    reg add "%%i" /v "*RssProfile" /t REG_SZ /d "4" /f >nul 2>&1
    reg add "%%i" /v "*SoftwareTimestamp" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*SpeedDuplex" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*TCPChecksumOffloadIPv4" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*TCPChecksumOffloadIPv6" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*UDPChecksumOffloadIPv4" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*UDPChecksumOffloadIPv6" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*WakeOnMagicPacket" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "*WakeOnPattern" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "AdaptiveIFS" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "AdvancedEEE" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "AutoDisableGigabit" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "AutoPowerSaveModeEnabled" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "EEELinkAdvertisement" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "EnableGreenEthernet" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "EnablePME" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "EnableTss" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "GigaLite" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "ITR" /t REG_SZ /d "950" /f >nul 2>&1
    reg add "%%i" /v "LinkNegotiationProcess" /t REG_SZ /d "1" /f >nul 2>&1
    reg add "%%i" /v "LogLinkStateEvent" /t REG_SZ /d "16" /f >nul 2>&1
    reg add "%%i" /v "MasterSlave" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "PowerSavingMode" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "ReduceSpeedOnPowerDown" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "S5WakeOnLan" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "SipsEnabled" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "TxIntDelay" /t REG_SZ /d "5" /f >nul 2>&1
    reg add "%%i" /v "ULPMode" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "WaitAutoNegComplete" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "WakeOnLink" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "WakeOnSlot" /t REG_SZ /d "0" /f >nul 2>&1
    reg add "%%i" /v "WolShutdownLinkSpeed" /t REG_SZ /d "2" /f >nul 2>&1
)
call:POWERSHELL "$NetAdapters = Get-NetAdapterHardwareInfo | Get-NetAdapter | Where-Object {$_.Status -eq 'Up'};foreach ($NetAdapter in $NetAdapters) {$MaxNumRssQueues = [int](($NetAdapter | Get-NetAdapterAdvancedProperty -RegistryKeyword '*NumRssQueues').ValidRegistryValues | Measure-Object -Maximum).Maximum;$NetAdapter | Set-NetAdapterAdvancedProperty -RegistryKeyword '*NumRssQueues' -RegistryValue $MaxNumRssQueues}"
call:POWERSHELL "$NetAdapters = Get-NetAdapterHardwareInfo | Get-NetAdapter | Where-Object {$_.Status -eq 'Up'};foreach ($NetAdapter in $NetAdapters) {$iReceiveBuffers = [int]($NetAdapter | Get-NetAdapterAdvancedProperty -RegistryKeyword '*ReceiveBuffers').NumericParameterMaxValue;$iTransmitBuffers = [int]($NetAdapter | Get-NetAdapterAdvancedProperty -RegistryKeyword '*TransmitBuffers').NumericParameterMaxValue;$NetAdapter | Set-NetAdapterAdvancedProperty -RegistryKeyword '*ReceiveBuffers' -RegistryValue $iReceiveBuffers;$NetAdapter | Set-NetAdapterAdvancedProperty -RegistryKeyword '*TransmitBuffers' -RegistryValue $iTransmitBuffers}"
call:POWERSHELL "Disable-NetAdapterRsc -Name *"
call:POWERSHELL "Disable-NetAdapterLso -Name *"
call:POWERSHELL "Disable-NetAdapterIPsecOffload -Name *"
call:POWERSHELL "Disable-NetAdapterPowerManagement -Name *"
call:POWERSHELL "Disable-NetAdapterChecksumOffload -Name *"
call:POWERSHELL "Disable-NetAdapterEncapsulatedPacketTaskOffload -Name *"
call:POWERSHELL "Disable-NetAdapterQos -Name *"
if "!NETWORK!"=="WIFI" (
    netsh int tcp set supplemental internet congestionprovider=newreno >nul 2>&1
    for /f %%i in ('reg query "HKLM\SYSTEM\ControlSet001\Control\Class\{4D36E972-E325-11CE-BFC1-08002bE10318}" /f "PCI\VEN_" /d /s^| findstr "HKEY"') do (
        reg add "%%i" /v "*DeviceSleepOnDisconnect" /t REG_SZ /d "0" /f >nul 2>&1
        reg add "%%i" /v "*PacketCoalescing" /t REG_SZ /d "0" /f >nul 2>&1
        reg add "%%i" /v "*PMWiFiRekeyOffload" /t REG_SZ /d "0" /f >nul 2>&1
        reg add "%%i" /v "BgScanGlobalBlocking" /t REG_SZ /d "2" /f >nul 2>&1
        reg add "%%i" /v "CtsToItself" /t REG_SZ /d "1" /f >nul 2>&1
        reg add "%%i" /v "FatChannelIntolerant" /t REG_SZ /d "0" /f >nul 2>&1
        reg add "%%i" /v "IbssQosEnabled" /t REG_SZ /d "0" /f >nul 2>&1
        reg add "%%i" /v "IbssTxPower" /t REG_SZ /d "100" /f >nul 2>&1
        reg add "%%i" /v "MIMOPowerSaveMode" /t REG_SZ /d "0" /f >nul 2>&1
        reg add "%%i" /v "RoamAggressiveness" /t REG_SZ /d "1" /f >nul 2>&1
        reg add "%%i" /v "RoamingPreferredBandType" /t REG_SZ /d "3" /f >nul 2>&1
        reg add "%%i" /v "ThroughputBoosterEnabled" /t REG_SZ /d "1" /f >nul 2>&1
        reg add "%%i" /v "uAPSDSupport" /t REG_SZ /d "0" /f >nul 2>&1
        reg add "%%i" /v "WirelessMode" /t REG_SZ /d "34" /f >nul 2>&1
    )
)
echo Disabling Network Adapter bindings
for %%i in (ms_lldp ms_lltdio ms_msclient ms_rspndr ms_server ms_implat ms_pacer ms_tcpip6) do call:POWERSHELL "Disable-NetAdapterBinding -Name * -ComponentID %%i"
for %%i in (ms_pppoe ms_rdma_ndk ms_ndisuio ms_wfplwf_upper ms_wfplwf_lower ms_netbt ms_netbios ms_ndiscap) do call:POWERSHELL "Disable-NetAdapterBinding -Name * -ComponentID %%i"

REM echo Turn off microsoft peer-to-peer networking services
REM reg add "HKLM\SOFTWARE\Policies\Microsoft\Peernet" /v "Disabled" /t REG_DWORD /d "0" /f >nul 2>&1

REM echo Turn off data execution prevention
REM reg add "HKLM\SOFTWARE\Policies\Microsoft\Internet Explorer\Main" /v "DEPOff" /t REG_DWORD /d "1" /f >nul 2>&1

echo Trick to make system Startup faster
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Serialize" /v "StartupDelayInMSec" /t REG_DWORD /d "0" /f >nul 2>&1

echo Display highly detailed status messages
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v "VerboseStatus" /t REG_DWORD /d "1" /f >nul 2>&1

echo Do not offer tailored experiences based on the diagnostic data setting
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Privacy" /v "TailoredExperiencesWithDiagnosticDataEnabled" /t REG_DWORD /d "0" /f >nul 2>&1

REM echo Disabling Remote assistance connections
REM reg add "HKLM\System\CurrentControlSet\Control\Remote Assistance" /v "fAllowToGetHelp" /t REG_DWORD /d "0" /f >nul 2>&1

echo Do not let apps on other devices open and message apps on this device
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\CDP" /v "RomeSdkChannelUserAuthzPolicy" /t REG_DWORD /d "0" /f >nul 2>&1

echo Do not show recently added apps in the Start menu
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Explorer" /v "HideRecentlyAddedApps" /t REG_DWORD /d "1" /f >nul 2>&1

echo Turn off automatic installing suggested apps
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SilentInstalledAppsEnabled" /t REG_DWORD /d "0" /f >nul 2>&1

echo Do not suggest ways I can finish setting up my device to get the most out of Windows
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\UserProfileEngagement" /v "ScoobeSystemSettingEnabled" /t REG_DWORD /d "0" /f >nul 2>&1

echo Removing Metadata Tracking
reg delete "HKLM\Software\Microsoft\Windows\CurrentVersion\Device Metadata" /f >nul 2>&1

REM echo Removing Storage Sense
REM reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\StorageSense" /f >nul 2>&1

echo Disabling Delivery Optimization
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DeliveryOptimization" /v "DODownloadMode" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DeliveryOptimization" /v "SystemSettingsDownloadMode" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\DeliveryOptimization" /v "SystemSettingsDownloadMode" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\DeliveryOptimization\Config" /v "DODownloadMode" /t REG_DWORD /d "0" /f >nul 2>&1

echo Error Reporting
reg add "HKLM\SOFTWARE\Policies\Microsoft\PCHealth\ErrorReporting" /v "DoReport" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\PCHealth\ErrorReporting" /v "ForceQueueMode" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\PCHealth\ErrorReporting\DW" /v "DWFileTreeRoot" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\PCHealth\ErrorReporting\DW" /v "DWNoExternalURL" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\PCHealth\ErrorReporting\DW" /v "DWNoFileCollection" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\PCHealth\ErrorReporting\DW" /v "DWNoSecondLevelCollection" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\PCHealth\ErrorReporting\DW" /v "DWReporteeName" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v "MachineID" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v "AutoApproveOSDumps" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v "ConfigureArchive" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v "DisableArchive" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v "Disabled" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v "DontSendAdditionalData" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v "LoggingDisabled" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting\Consent" /v "DefaultConsent" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting\Consent" /v "NewUserDefaultConsent" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting\WMR" /v "Disable" /t REG_DWORD /d "1" /f >nul 2>&1

echo Disabling Telemetry
reg add "HKCU\Control Panel\International\User Profile" /v "HttpAcceptLanguageOptOut" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\AppHost" /v "EnableWebContentEvaluation" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\PolicyManager\default\WiFi\AllowAutoConnectToWiFiSenseHotspots" /v "value" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\PolicyManager\default\WiFi\AllowWiFiHotSpotReporting" /v "value" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\ImmersiveShell" /v "UseActionCenterExperience" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" /v "HideSCAHealth" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\AdvertisingInfo" /v "DisabledByGroupPolicy" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "AllowClipboardHistory" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "AllowCrossDeviceClipboard" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\EnhancedStorageDevices" /v "TCGSecurityActivationDisabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\OneDrive" /v "DisableFileSyncNGSC" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\safer\codeidentifiers" /v "authenticodeenabled" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Policies\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\WUDF" /v "LogEnable" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\WUDF" /v "LogLevel" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Lsa\Credssp" /v "DebugLogLevel" /t REG_DWORD /d "0" /f >nul 2>&1
for /f %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\WMI\AutoLogger" /s /f "start"^| findstr "HKEY"') do reg add "%%i" /v "Start" /t REG_DWORD /d "0" /f >nul 2>&1

echo Disabling Windows Media Player telemetry
reg add "HKCU\SOFTWARE\Microsoft\MediaPlayer\Preferences" /v "UsageTracking" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\Software\Policies\Microsoft\WindowsMediaPlayer" /v "PreventCDDVDMetadataRetrieval" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\Software\Policies\Microsoft\WindowsMediaPlayer" /v "PreventMusicFileMetadataRetrieval" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\Software\Policies\Microsoft\WindowsMediaPlayer" /v "PreventRadioPresetsRetrieval" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\WMDRM" /v "DisableOnline" /t REG_DWORD /d "1" /f >nul 2>&1

echo Disabling Windows Defender telemetry
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows Defender\Reporting" /v "DisableGenericReports" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\MRT" /v "DontReportInfectionInformation" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows Defender\Spynet" /v "LocalSettingOverrideSpynetReporting" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows Defender\Spynet" /v "SpynetReporting" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows Defender\Spynet" /v "SubmitSamplesConsent" /t REG_DWORD /d "2" /f >nul 2>&1

echo Scheduled tasks
schtasks /change /tn "Microsoft\Windows\Application Experience\Microsoft Compatibility Appraiser" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Application Experience\ProgramDataUpdater" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Application Experience\StartupAppTask" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Application Experience\AitAgent" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Customer Experience Improvement Program\Consolidator" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Customer Experience Improvement Program\KernelCeipTask" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Customer Experience Improvement Program\UsbCeip" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Customer Experience Improvement Program\Uploader" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Power Efficiency Diagnostics\AnalyzeSystem" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\AppID\SmartScreenSpecific" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Autochk\Proxy" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\CloudExperienceHost\CreateObjectTask" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\DiskDiagnostic\Microsoft-Windows-DiskDiagnosticDataCollector" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\DiskFootprint\Diagnostics" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\FileHistory\File History (maintenance mode)" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Maintenance\WinSAT" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\NetTrace\GatherNetworkInfo" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\PI\Sqm-Tasks" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Time Synchronization\ForceSynchronizeTime" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Time Synchronization\SynchronizeTime" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\ErrorDetails\EnableErrorDetailsUpdate" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Windows Error Reporting\QueueReporting" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\WindowsUpdate\Automatic App Update" /disable >nul 2>&1
schtasks /change /tn "Microsoft\Windows\Device Information\Device" /disable >nul 2>&1
schtasks /change /tn "USER_ESRV_SVC_QUEENCREEK" /disable >nul 2>&1
for %%i in (GWX FamilySafety UpdateOrchestrator Media Office NvTm NvProfile Intel) do for /f "tokens=1 delims=," %%a in ('schtasks /query /fo csv^| findstr /v "TaskName"^| findstr "%%i"') do schtasks /change /tn "%%a" /disable >nul 2>&1

echo Importing Hosts file
call:CURL -L "https://gist.githubusercontent.com/ArtanisInc/74081e8f0548105412e8082ed47c4c97/raw/fce96a4ad8175249b7b8965af623d25c3c99659a/hosts" "%WinDir%\System32\drivers\etc\hosts" >nul 2>&1


echo Interface tweaks
reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}" /f >nul 2>&1
reg delete "HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Search" /v "SearchboxTaskbarMode" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced\People" /v "PeopleBand" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarGlomLevel" /t REG_DWORD /d "1" /f >nul 2>&1reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "HideIcons" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarSmallIcons" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "AppsUseLightTheme" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "HideFileExt" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "Hidden" /t REG_DWORD /d "1" /f >nul 2>&1reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "MultiTaskingAltTabFilter " /t REG_DWORD /d "3" /f >nul 2>&1
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v "link" /t REG_BINARY /d "0" /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer" /v "OperationStatusManager" /t REG_DWORD /d "0" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\System"/v "AllowClipboardHistory" /t REG_DWORD /d "1" /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced"/v "UseOLEDTaskbarTransparency" /t REG_DWORD /d "1" /f >nul 2>&1

Echo Reverting scale to 100%
reg add "HKCU\Control Panel\Desktop" /v "LogPixels" /t REG_DWORD /d "96" /f >nul 2>&1

echo Fetching Packages
call:CHOCO sharex
call:CHOCO discord
call:CHOCO office365proplus
call:CHOCO easy7zip
call:CHOCO vscode
call:CHOCO steam-client
call:CHOCO qbittorrent
call:CHOCO vcredist-all
call:CHOCO directx
call:CHOCO dotnetfx
call:CHOCO msiafterburner
call:CHOCO parsec
call:CHOCO k-litecodecpackfull
call:CHOCO windirstat
call:CHOCO paint.net
call:CHOCO defraggler
call:CHOCO project-aurora
call:CHOCO microsoft-windows-Terminal
call:CHOCO ds4windows
call:CHOCO universal-adb-drivers
call:CHOCO git
call:CHOCO nodejs
call:CHOCO borderlessgaming
call:CHOCO geforce-experience
call:CHOCO mousewithoutborders
call:CHOCO moonlight-qt
call:CHOCO choco-upgrade-all-at-startup
call:CHOCOUP choco-upgrade-all-at

echo Opening Driver installer
call:CURL "0" "http://sdi-tool.org/releases/SDI_R2000.zip" "%UserProfile%\Documents\_Tools\Snappy Driver Installer\SDI.zip"
call "modules\7z.exe" x -aoa "%UserProfile%\Documents\_Tools\Snappy Driver Installer\SDI.zip"  -O"%UserProfile%\Documents\_Tools\Snappy Driver Installer">nul 2>&1
del /f /q "%UserProfile%\Documents\_Tools\Snappy Driver Installer\SDI.zip" >nul 2>&1
cd "%UserProfile%\Documents\_Tools\Snappy Driver Installer\"
SDI_x64_R2000.exe -autoinstall

echo Extra Packages-- safe to exit
pause 
echo Extra Packages
call:CHOCO steelseries-engine
call:CHOCO icue

goto:eof


:SETVARIABLES
:: Colors and text format
set "CMDLINE=RED=[31m,S_GRAY=[90m,S_RED=[91m,S_GREEN=[92m,S_YELLOW=[93m,S_MAGENTA=[95m,S_WHITE=[97m,B_BLACK=[40m,B_YELLOW=[43m,UNDERLINE=[4m,_UNDERLINE=[24m"
set "%CMDLINE:,=" & set "%"
:: Check GPU
wmic path Win32_VideoController get Name | findstr "NVIDIA" >nul 2>&1 && set "GPU=NVIDIA"
wmic path Win32_VideoController get Name | findstr "AMD ATI Radeon" >nul 2>&1 && set "GPU=AMD"
:: Video adapter class
for /f %%i in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}" /s /v "DriverDesc"^| findstr "HKEY"') do set VIDEO_ADAPTER_PATH=%%i
:: Check Wi-Fi usage
netsh wlan show networks | findstr "Wi-Fi" >nul 2>&1 && set "NETWORK=WIFI"
:: Page file & SvcHost
for /f "skip=1" %%i in ('wmic os get TotalVisibleMemorySize') do if not defined PAGEFILE (set /a PAGEFILE=%%i/1024*2) & if not defined SVCHOST (set /a SVCHOST=%%i+1024000)
:: Large page drivers
set WHITELIST=ACPI AcpiDev AcpiPmi AFD AMDPCIDev amdgpio2 amdgpio3 amdkmdag AmdPPM amdpsp amdsata amdsbs amdxata asmtxhci atikmpag atikmdag BasicDisplay BasicRender dc1-controll Disk DXGKrnl e1iexpress e1rexpress genericusbfn hwpolicy iagpio igdkmd64 IntcAzAudAdd intelppm kbdclass kbdhid MMCSS monitor mouclass mouhid mountmgr mt7612US MTConfig NDIS nvdimm nvlddmkm pci PktMon Psched RTCore64 Tcpip usbehci usbhub USBHUB3 USBXHCI Wdf01000 xboxgip xinputhid xusb22
for /f %%i in ('driverquery^| findstr "!WHITELIST!"') do set "DRIVERLIST=!DRIVERLIST!%%i\0"
for /f "tokens=3" %%i in ('reg query "HKLM\SYSTEM\ControlSet001\Control\Class\{4d36e972-e325-11ce-bfc1-08002be10318}" /s /f "Service"^| findstr "Service"^| findstr /v "kdnic vwifimp RasSstp RasAgileVpn Rasl2tp PptpMiniport RasPppoe NdisWan"') do set "NIC_SERVICE=!NIC_SERVICE!%%i\0"
:: Open shell
for %%i in ("Item1.Command=user_files" "Item1.Settings=NOEXPAND" "Item2.Command=user_documents" "Item2.Settings=NOEXPAND"
    "Item3.Command=user_pictures" "Item3.Settings=NOEXPAND" "Item4.Command=user_music" "Item4.Settings=NOEXPAND" "Item5.Command=user_videos"
    "Item5.Settings=NOEXPAND" "Item6.Command=downloads" "Item6.Settings=NOEXPAND" "Item7.Command=homegroup" "Item7.Settings=ITEM_DISABLED"
    "Item8.Command=separator" "Item9.Command=games" "Item9.Settings=TRACK_RECENT|NOEXPAND|ITEM_DISABLED" "Item10.Command=favorites"
    "Item10.Settings=ITEM_DISABLED" "Item11.Command=recent_documents" "Item12.Command=computer" "Item12.Settings=NOEXPAND" "Item13.Command=network"
    "Item13.Settings=ITEM_DISABLED" "Item14.Command=network_connections" "Item14.Settings=ITEM_DISABLED" "Item15.Command=separator" "Item16.Command=control_panel"
    "Item16.Settings=TRACK_RECENT" "Item17.Command=pc_settings" "Item17.Settings=TRACK_RECENT" "Item18.Command=admin" "Item18.Settings=TRACK_RECENT|ITEM_DISABLED"
    "Item19.Command=devices" "Item19.Settings=ITEM_DISABLED" "Item20.Command=defaults" "Item20.Settings=ITEM_DISABLED" "Item21.Command=help" "Item21.Settings=ITEM_DISABLED"
    "Item22.Command=run" "Item23.Command=apps" "Item23.Settings=ITEM_DISABLED" "Item24.Command=windows_security" "Item24.Settings=ITEM_DISABLED") do set "MENUITEMS=!MENUITEMS!%%i\0"
:: User SID
for /f "tokens=* USEBACKQ" %%i in (`wmic useraccount where "name="%username%"" get sid^| findstr "S-"`) do set USER_SID=%%i
set USER_SID=!USER_SID:~0,-3!
goto:eof

:POWERSHELL
chcp 437 >nul 2>&1
powershell -NoLogo -NoProfile -NonInteractive -ExecutionPolicy Bypass -Command %* >nul 2>&1
chcp 65001 >nul 2>&1
goto:eof

:CHOCO [Package]
if not exist "%ProgramData%\chocolatey" (
    call:POWERSHELL "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && set "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    call "%ProgramData%\chocolatey\bin\RefreshEnv.cmd"
)
choco install -y --limit-output --ignore-checksums %*
goto:eof

:CHOCOUP [Package]
if not exist "%ProgramData%\chocolatey" (
    call:POWERSHELL "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && set "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    call "%ProgramData%\chocolatey\bin\RefreshEnv.cmd"
)
choco install -y --limit-output --ignore-checksums %* --params "'/DAILY:yes /TIME:04:00 /ABORTTIME:08:00'"
goto:eof

:CURL [Argument] [URL] [Directory]
if not exist "%WinDir%\System32\curl.exe" if not exist "%ProgramData%\chocolatey\lib\curl" call:CHOCO curl
if "%~1"=="0" curl -k -L --progress-bar "%~2" --create-dirs -o "%~3"
if "%~1"=="1" curl --silent "%~2" --create-dirs -o "%~3"
goto:eof

:SHORTCUT [Name] [Path] [TargetPath] [WorkingDirectory]
echo Set WshShell=WScript.CreateObject^("WScript.Shell"^) >"%TMP%\shortcut.vbs"
echo Set lnk=WshShell.CreateShortcut^("%~2\%~1.lnk"^) >>"%TMP%\shortcut.vbs"
echo lnk.TargetPath="%~3" >>"%TMP%\shortcut.vbs"
echo lnk.WorkingDirectory="%~4" >>"%TMP%\shortcut.vbs"
echo lnk.WindowStyle=4 >>"%TMP%\shortcut.vbs"
echo lnk.Save >>"%TMP%\shortcut.vbs"
cscript /nologo "%TMP%\shortcut.vbs" & del /f /q "%TMP%\shortcut.vbs"
goto:eof
