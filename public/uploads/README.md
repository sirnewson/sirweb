# Sir Newson Uploads Directory

Put your images (`.webp`, `.png`, `.jpg`) and video files (`.mp4`, `.webm`) in this folder.

## How to add them to your website:
To show them on the **Home** or **Work** boards, edit the `uploads` array inside `src/pages/Home.tsx` or `src/pages/Work.tsx` by adding a new item like:

```json
{
  "id": "my-upload-1",
  "type": "image", // or "video"
  "category": "BRANDING",
  "title": "My New Campaign",
  "image": "/uploads/my-image.webp" // path inside this folder
}
```

If it is a video, you can specify:
```json
{
  "id": "my-video-1",
  "type": "video",
  "category": "MOTION",
  "title": "Brand Loop Animation",
  "image": "/uploads/video-thumbnail.webp",
  "video": "/uploads/my-video.mp4"
}
```
