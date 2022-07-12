+++
title="OpenVPN-Client Container"
draft=false
date=2020-09-19
[extra]
toc=true
+++

## Inspiration

I needed a secure OpenVPN conatiner to route other containers through. Thus allowing multiple containers to connect to a VPN while only using one VPN instance. I also needed to have access to these routed containers on the local network. 

## iptables

Using iptables I was able to create a container that uses only the connection from the VPN to access the outside world while allowing other docker subnets and lan subnets to access container routed through the VPN container. I've completely disabled IPV6 support as when I made this container I don't think IPV6 support was widely implemented in Docker. 

## How to Use

To use the container you first need to set it up.

``` sh
docker run -dit --cap-add=NET_ADMIN -e VPN_PASS="password" -e VPN_USER="username" -v </your/directory>:/openvpn --name openvpn-client tetricz/openvpn-client
```

I would suggest docker-compose personally. The compose example has the full line up of environment variables.

``` docker
version: '3'
services:
    openvpn-client:
        restart: unless-stopped
        container_name: openvpn-client
        image: tetricz/openvpn-client
        volumes:
         - </your/directory>:/openvpn
        environment:
         - PROTO="udp"
         - PORT="1194"
         - LAN_NETWORK="192.168.1.0/24"
         - docker_GATEWAY="172.17.0.1"
         - docker_SUBNET="172.17.0.0/16"
         - VPN_USER=""
         - VPN_PASS=""
        ports:
         - "8080:8080"
        cap_add:
         - NET_ADMIN
```

To add a container to the VPN client, use the --net=conatiner:openvpn-client option to set the network to the openvpn-client container.
Make sure to open a port on the openvpn-client container whenever you add a container that needs one for you to access a WebUI or otherwise.  

The LAN_NETWORK shoud be the same as your LAN, if you are on windows you can find this using ipconfig /all. docker_GATEWAY and docker_SUBNET are both set to the defaults, but you can find out what they are with
``` sh
docker network inspect <network name>
```
