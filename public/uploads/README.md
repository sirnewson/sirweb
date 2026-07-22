# Sir Newson Creative Uploads

Drop new work into the most relevant category folder:

- `business-posters`
- `church-and-events`
- `brand-identity`
- `social-media-and-ads`
- `company-profiles-and-editorial`
- `print-and-packaging`
- `motion-and-video`

The older `graphics`, `branding`, `logo`, and `motion and video` folders are preserved as the existing source library.

Use clear filenames such as `client-project-campaign.webp`. Preferred formats are `.webp`, `.jpg`, `.png`, `.mp4`, and `.webm`.

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
