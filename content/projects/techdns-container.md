+++
title="Technitium-DNS Container"
draft=false
date=2020-09-11
[extra]
toc=true
+++

## Inspiration

At the time there was only one container made for this open source software. I was getting impatient with the maintainer and decided to make my own container. This is possibly my first real foray into containerization.

## How to Use

Only need to map one volume for persistence. Map `/dns/config` to a local path. Other than this you need to expose the necessary ports.

| Ports | Use |
| ----- | --- |
| 53/udp | DNS |
| 53/tcp | DNS |
| 5380/tcp | WebUI |
| 67/udp | DHCP |

Docker run example:

``` bash
docker run -dit -v <your/directory>:/dns/config --net=host --name techdns tetricz/techdns
```
