import React, { useMemo, useState } from "react";

const Demo: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState(
    "https://youtu.be/P9RgGEWJE7I?si=J_VAurMZuddM0Mmz"
  );

  const getYoutubeVideoId = (url: string): string | null => {
    try {
      const patterns = [
        /(?:youtube\.com\/watch\?v=)([^&]+)/,
        /(?:youtu\.be\/)([^?&]+)/,
        /(?:youtube\.com\/embed\/)([^?&]+)/,
        /(?:youtube\.com\/shorts\/)([^?&]+)/,
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match?.[1]) {
          return match[1];
        }
      }

      return null;
    } catch {
      return null;
    }
  };

  const videoId = useMemo(
    () => getYoutubeVideoId(youtubeUrl),
    [youtubeUrl]
  );

  const thumbnailUrl = useMemo(() => {
    if (!videoId) return null;

    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }, [videoId]);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">
          YouTube Thumbnail Preview
        </h2>

        <input
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="Paste YouTube URL"
          className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        {videoId ? (
          <div className="mt-6">
            <div className="mb-3 text-sm text-zinc-600">
              <span className="font-semibold">Video ID:</span> {videoId}
            </div>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-zinc-200"
            >
              <img
                src={thumbnailUrl!}
                alt="YouTube Thumbnail"
                className="w-full object-cover transition hover:scale-105"
                onError={(e) => {
                  (
                    e.currentTarget as HTMLImageElement
                  ).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
            </a>

            <div className="mt-3 break-all text-sm text-zinc-500">
              {thumbnailUrl}
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
            Invalid YouTube URL
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;