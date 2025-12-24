(function() {
    // This script should be run in the developer console of your browser
    // on the page: https://www.youtube.com/@Koneksyonplus/streams

    // Select all video renderer elements
    const videos = document.querySelectorAll('ytd-rich-item-renderer');

    if (videos.length < 4) {
        console.log("Not enough videos on the page to get the 3 latest after the first one.");
        return;
    }

    // Skip the first video and take the next three
    const latestThreeVideos = Array.from(videos).slice(1, 4);

    const videoData = latestThreeVideos.map(video => {
        const titleElement = video.querySelector('#video-title');
        const thumbnailElement = video.querySelector('yt-image img');
        const linkElement = video.querySelector('a#video-title-link');

        const title = titleElement ? titleElement.textContent.trim() : 'No title found';
        const link = linkElement ? 'https://www.youtube.com' + linkElement.getAttribute('href') : 'No link found';
        const thumbnail = thumbnailElement ? thumbnailElement.src : 'No thumbnail found';

        return {
            title: title,
            link: link,
            thumbnail: thumbnail
        };
    });

    console.log("Here are the 3 latest videos after the first one:");
    console.table(videoData);
})();
