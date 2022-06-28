+++
title="Youtube-Archive Container"
draft=false
date=2020-11-24
[extra]
toc=true
+++

## Inspiration

The channels of several YouTubers I admired were threatened to be taken down. One such case being Cody'sLab. I loved his content and I was devestated when I learned some of his videos were removed.
That being said I then decided I would download and backup videos of any channel I deemed possibly a risk of being removed from the platform. This was mostly Science channels that had "dangerous" content. Originally this was a simple script that would download the channels one by one, but eventually I realized this wasn't going to be enough and it needed to be downloading the channels concurrently. In it's current state the script downloads the channels concurrently.

## YT-DLP

This is the basis of the container. Originally youtube-dl was used, but it was updated too infrequently, so the container was switched over to the master branch of the yt-dlp fork. Performance has been better than youtube-dl since the switch.

## How to Use

The volume directories you should care to mount are `/data` and `/config`. These a respectively the video download folder and your config folder.  

The config file is `channels.txt`. To add a channel add the channel link and the channel name seperate by a `|`. This will download all the videos on the channel and put them in a folder according to channel name within the data directory.  

It is recommended to use a tmpfs assigned to `/tmp`. The bash script utilizes the /tmp folder for creating copies of the downloaded files and channels config.

Possible environment variables (Note everything should be passed as a string):

``` bash
 UID="1000"
 GID="1000"
 TIME_INTERVAL="600"
 COOKIES="false"
 QUIET="TRUE"
 FORMAT="bestvideo+bestaudio/best"
 NAMING_CONVENTION="%(format_id)s-%(title)s.%(ext)s"
 PROXY=
 DATE=
 ARCHIVE_DOWNLOADED="TRUE"
```

Docker run example:

``` bash
docker run -dit --tmpfs /tmp:rw,noexec,nosuid,size=1g -v </your/directory>:/data -v </your/directory>:/config --name yt-archive tetricz/yt-archive
```

Docker compose example:  

``` dockerfile
version: '3'
services:
    yt-dl:
        restart: unless-stopped
        container_name: yt-archive
        image: tetricz/yt-archive
        volumes:
         - </your/directory>:/config
         - </your/directory>:/data
        environment:
         - COOKIES="FALSE"
         - TIME_INTERVAL="600"
         - QUIET="TRUE"
         - UID="1000"
         - GID="1000"
        tmpfs:
         - /tmp:rw,noexec,nosuid,size=1g
```
