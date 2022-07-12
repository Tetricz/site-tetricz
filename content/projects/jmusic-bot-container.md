+++
title="jMusic-Bot Container"
draft=false
date=2021-10-16
[extra]
toc=true
+++

## Inspiration

All the music bots my friends and I were using for Discord slowly but surely got removed or taken down. Thus we wanted a self-hosted solution to the problem of Discord Music bots disappearing. jMusic-Bot was a solution we found. I wrote up a quick container do we could just launch a templated version with ease.

## How to Use

``` sh
docker run -dit -v <your/directory>:/jmusic-bot -e BOT_TOKEN="" -e BOT_OWNER="" --name jMusic-Bot tetricz/jmusic-bot
```

Variables

``` sh
COMMAND_PREFIX='@mention'
ALT_COMMAND_PREFIX=''
BOT_OWNER=''
BOT_TOKEN=''
BOT_STATUS='ONLINE'
SONGINSTATUS='false'
PLAYLISTSFOLDER='Playlists'
LYRICS_DEFUALT='A-Z Lyrics'
```