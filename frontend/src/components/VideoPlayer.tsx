export default function VideoPlayer({ src }: { src: string }) {
  // Convert local file path to proper URL for the video element
  const videoSrc = src.startsWith("app/uploads/")
    ? `http://localhost:8000/${src}`
    : src;

  return <video src={videoSrc} controls style={{ width: "100%" }} />;
}
