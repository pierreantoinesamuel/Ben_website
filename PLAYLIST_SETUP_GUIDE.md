# YouTube Playlist Setup Guide

## Your Playlist
🎥 **Playlist URL**: https://www.youtube.com/watch?v=VPENswy9zWw&list=PLKvKgq9vy00xtVT6uL7o0fjeQK6wwWEi7

## How to Extract Video Information

### Method 1: Manual Collection (Easiest)
1. Open your playlist in YouTube
2. For each video, right-click on the video title/thumbnail
3. Copy the video URL (it will look like: `https://www.youtube.com/watch?v=XXXXX`)
4. Extract the video ID (the `XXXXX` part after `v=`)
5. Fill in the template below

### Method 2: Using Browser Console
1. Open the playlist in YouTube
2. Press `F12` to open Developer Tools
3. Go to the Console tab
4. Paste this code:
```javascript
const videos = [];
document.querySelectorAll('a[href*="watch?v="]').forEach(el => {
  const url = new URL(el.href);
  const videoId = url.searchParams.get('v');
  if (videoId && !videos.includes(videoId)) {
    videos.push(videoId);
  }
});
console.log(JSON.stringify(videos, null, 2));
```
5. Copy the output and share it

## Video Information Template

Fill in this information for each video in order (latest first):

### Video 1 (Featured Episode - Latest)
- **Video ID**: 
- **Title**: 
- **Duration** (e.g., 45:32): 
- **Upload Date** (e.g., "Today", "2 days ago"): 
- **Description**: 
- **Tags** (comma-separated): 

### Video 2
- **Video ID**: 
- **Title**: 
- **Duration**: 
- **Upload Date**: 
- **Description**: 
- **Tags**: 

### Video 3
- **Video ID**: 
- **Title**: 
- **Duration**: 
- **Upload Date**: 
- **Description**: 
- **Tags**: 

### Video 4
- **Video ID**: 
- **Title**: 
- **Duration**: 
- **Upload Date**: 
- **Description**: 
- **Tags**: 

### Video 5
- **Video ID**: 
- **Title**: 
- **Duration**: 
- **Upload Date**: 
- **Description**: 
- **Tags**: 

### Video 6
- **Video ID**: 
- **Title**: 
- **Duration**: 
- **Upload Date**: 
- **Description**: 
- **Tags**: 

## Once You Have the Information

1. Copy the filled-in data
2. Paste it in the chat
3. I'll automatically update `videos.json` and `affiliate-shows.html` with all your playlist videos
