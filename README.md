<br>
<p align="center">
  <img src="https://i.imgur.com/IdPmu5n.png">
</p>

# Pipeboard

Hello and welcome to the Pipeboard official repository; here you'll find everything you need to know for installing and find the source code for your own use or installation (respecting the licence of course) or reporting bugs and contributing. See the [about section](#about) for more information about the project!
<br>
<br>
[![Version Number](https://img.shields.io/badge/version-0.1.3-c89467)](#Downloads)
[![System](https://img.shields.io/badge/system-terminal-c89467)](#Compatibility)
[![Build Status](https://travis-ci.com/Pipeboard/Pipeboard.svg)](https://travis-ci.com/Pipeboard/Pipeboard)

## About
Pipeboard is a web dashboard built with [**Node**](https://nodejs.org), [**React**](https://reactjs.org), **JavaScript**, [**PHP**](https://www.php.net/) and **Shell**, that alows an enduser (or users, see reseller info) install, configure and manage lots of - traditionally terminal only - programs and applications in one neat interface without touching the command line.†

Behind an idea, there's always a story. - Pipeboard was created initialy as an internal tool for web hosting with no cost (unlike cPanel or Plesk), but after some research, finding that many open source/free softwares didn't really complete the job at hand, or were outdated and not user-friendly/unattractive, so Pipeboard was born from that frustration and in an effort to help other developers.

> <ins><b>FACT!</b></ins> - Pipeboard was named Pipeboard becuase <b>pipe</b>s create things and card<b>board</b> boxes hold things. In this case the pipes enpower the apps and the board would be the app's virtual machines/containers.

## Compatibility
Right now, Pipeboard can only runs on command line based machine with npm, docker and no port-conflicting programs. For non-command-line desktop machines, please check out [Piperunner](https://github.com/Pipeboard/Piperunner) which is a controller desktop app for running Pipeboard in a window.

> <ins><b>TIP!</b></ins> - In the case of desktops with terminal applications; either may be able to be used, with requirements for machines, however it is recommended to use the Piperunner instead as on Macs its harder to navigate the commandline, but it's up to you.

### Guide Chart

| Platform | Version | Capacity | Compatibility |
| :--- | --- | --- | :---: |
| Ubuntu | Any | 32x, 64x | ![](https://i.imgur.com/86ADFBS.png) |
| RedHat | Any | 32x, 64x | ![](https://i.imgur.com/86ADFBS.png) |
| CentOS | Any | 32x, 64x | ![](https://i.imgur.com/86ADFBS.png) |
| Debian | Any | 32x, 64x | ![](https://i.imgur.com/86ADFBS.png) |
| MacOS Terminal | Any | 32x, 64x | ![](https://i.imgur.com/86ADFBS.png) |
| Windows Terimal | Any | 32x, 64x | ![](https://i.imgur.com/86ADFBS.png) |
| PowerShell | Any | N/A | ![](https://i.imgur.com/lHPSCrC.png) |
| Msys | Any | N/A | ![](https://i.imgur.com/lHPSCrC.png) |
| FreeBSD | Any | 32x, 64x | ![](https://i.imgur.com/lHPSCrC.png) |
| Orcale | Any | 32x, 64x | ![](https://i.imgur.com/lHPSCrC.png) |
| ClearOS | Any | N/A | ![](https://i.imgur.com/lHPSCrC.png) |

## Installation

Now that you've checked that your system is suported above, you can move forward with your install. If your a beginner installing Pipeboard, please read our detailed guide, [Getting Started](https://github.com/pipeboard/pipeboard/wiki/getting-started) on the Wiki, which has step-by-step instructions for every platform.
<br>

- Check that your OS is supported.
- Install Pipeboard through NPM or directly from the repo.
   
   ```
   npm install pipeboard
   
   # OR
   
   wget https://github.com/Pipeboard/Pipeboard.git
   unzip pipeboard-master.zip
   cd pipeboard-master
   ```
- Unpack and check download and files.

   ```
   pipeboard check #confirms all assets
   pipeboard update (optional)
   ```
- Prep for running & installation.
   ```
   pipeboard prep
   ```
- Setup your Pipeboard install.
   ```
   pipeboard setup
   ```
- Run Pipeboard in demo mode to catch any errors.
   
   ```
   pipeboard run
   ```
- Put on a docker, optionally.
   ```
   pipeboard run -bg
   ```
- Confirm your Pipeboard installation is running and head to [localhost](https://localhost) (or [pipeboard.dev](https://pipeboard.dev) if you already enabled the DNS engine) to setup the panel.
- Setup docked engines and modules, if you haven't already done so.
   ```
   pipeboard mods install -all
   ```
- Have fun with Pipeboard and make the web your oyster! :)

## Downloads

<details>
   <summary>
      <b>
         <span style="color: orange;">Version 0.1.4</span> - 👍 
      </b>
      <br>
      <div width="30px"></div>Usable-ish, Work-In-Progress
   </summary>
   <br>

   **Npm Registry** - https://npm.com/package/pipeboard-0.1.4<br>
   **JS Delivr** - https://jsdelivr.com/package/npm/pipeboard-0.1.4<br>
   **Openbase<span>.</span>io** - https://openbase.io/js/pipeboard-0.1.4<br>
   **Github** - https://github.com/Pipeboard/Pipeboard/releases/tag/v0.1.4

   *Links may not be active yet!*
</details>

<details>
   <summary>
      <b>
         <span style="color: pink;">Version 0.1.3</span> - 👎
      </b>
      <br>
      <div width="30px"></div>Unusable, Work-In-Progress
   </summary>
   <br>

   **Npm Registry** - https://npm.com/package/pipeboard-0.1.3<br>
   **JS Delivr** - https://jsdelivr.com/package/npm/pipeboard-0.1.3<br>
   **Openbase<span>.</span>io** - https://openbase.io/js/pipeboard-0.1.3<br>
   **Github** - https://github.com/Pipeboard/Pipeboard/releases/tag/v0.1.3
</details>

<details>
   <summary>
      <b>
         <span style="color: red;">Version 0.1.2</span> - 👎
      </b>
      <br>
      <div width="30px"></div>Unusable, Unfinished
   </summary>
   <br>

   **Npm Registry** - https://npm.com/package/pipeboard-0.1.2<br>
   **JS Delivr** - https://jsdelivr.com/package/npm/pipeboard-0.1.2<br>
   **Openbase<span>.</span>io** - https://openbase.io/js/pipeboard-0.1.2<br>
   **Github** - https://github.com/Pipeboard/Pipeboard/releases/tag/v0.1.2
</details>

<details>
   <summary>
      <b>
         <span style="color: red;">Version 0.1.1</span> - 👎
      </b>
      <br>
      Unusable, Unfinished
   </summary>
   <br>

   **Npm Registry** - https://npm.com/package/pipeboard-0.1.1<br>
   **JS Delivr** - https://jsdelivr.com/package/npm/pipeboard-0.1.1<br>
   **Openbase<span>.</span>io** - https://openbase.io/js/pipeboard-0.1.1<br>
   **Github** - https://github.com/Pipeboard/Pipeboard/releases/tag/v0.1.1
</details>

## Screenshots

Nothing here, just yet... :)

## Tutorials

Nothing here, just yet... :)

## Addons

Nothing here, just yet... :)

## Contributors
If your intrested in becoming a Pipeboard developer, please reach out. We do not list issue-trackers or fork/pull request-ers here.  
| Name | Username | Role |
| --- | --- | --- |
| Nathanna | [@nathannaofficial](https://github.com/nathannaofficial.com) | Lead Developer & Creator |

## License
Pipeboard and all official resources are licenced under CC0-1.0 or "Creative Commons Zero v1.0 Universal". Please see the [LICENSE](LICENSE) file for more details and information.

## Resources

**Website** - https://pipeboard.org<br>
**Github Profile** - https://github.com/Pipeboard<br>
**Twitter Profile** - https://twitter.com/PipeboardProject<br>
**Facebook Profile** - https://facebook.com/Pipeboard-105017771541767<br>
**NPM Profile** - https://npmjs.com/org/pipeboard<br>

**Wiki** - https://github.com/Pipeboard/Pipeboard/wiki<br>
**ReadMe** - [/README.md](README.md)<br>
**License** - [/LICENSE](LICENSE)<br>
**Changelog** - [/CHANGELOG.md](CHANGELOG.md)<br>
**Package File** - [/package.json](package.json)<br>

## Repositories

Don't like this website? Don't worry, you can find us at other locations too.

**Github** - https://github.com/Pipeboard/Pipeboard<br>
**BitBucket** - https://bitbucket.io/Pipeboard/Pipeboard<br>
**GitLabs** - https://gitlabs.com/Pipeboard/Pipeboard<br>
**Sourceforge** - https://sourceforge.net/projects/Pipeboard<br>