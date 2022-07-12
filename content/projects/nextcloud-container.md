+++
title="Nextcloud Container"
draft=false
date=2022-06-22
[extra]
toc=true
+++

## Inspirations

I needed a few other niceties for my own nextcloud instance, so I made a container based on the official Nextcloud container with them added. Initially I was adding just cron and dependencies for Collabora Built-In. I removed the cron aspect though as it  was unreliable and interferred with the update process.

## Add-ons

* smbclient
* imagick
* php-ffi

## How to handle cron

On the docker host write a bash script that uses the docker command to execute within the container.  
Example:

``` bash
#!/bin/bash
# checks if the docker daemon is running
if [ -f "/var/run/dockerd.pid" ]; then
    echo "Docker is running.... Checking on Nextcloud container"
    # checks if container with name Nextcloud and image tetricz/nextcloud is running
    if [ "$(docker ps -q -f name=Nextcloud | grep tetricz/nextcloud)" ]; then
        echo "Container is running. Executing cron"
        # executes cronjob with user www-data inside container
        docker exec -u www-data Nextcloud php cron.php
    else
        echo "Container is not running."
    fi
else
    echo "Docker is not running..."
fi
```

## To access OCC

It is similar to the method used to handle cron. 

``` bash
docker exec -u www-data -it Nextcloud /var/www/html/occ
```

