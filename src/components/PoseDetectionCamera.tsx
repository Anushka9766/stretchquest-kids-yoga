import { useEffect, useRef, useState } from "react";
import { Pose, Results } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { POSE_CONNECTIONS } from "@mediapipe/pose";
import { Button } from "@/components/ui/button";
import { Video, VideoOff } from "lucide-react";
import { calculatePoseAccuracy } from "@/utils/poseComparison";

interface PoseDetectionCameraProps {
  targetPose: string;
  onPoseMatch: (accuracy: number) => void;
}

export const PoseDetectionCamera = ({ targetPose, onPoseMatch }: PoseDetectionCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const cameraRef = useRef<Camera | null>(null);
  const poseRef = useRef<Pose | null>(null);

  useEffect(() => {
    if (!isCameraActive) return;

    const initializePoseDetection = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      // Initialize MediaPipe Pose
      const pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      pose.onResults((results: Results) => {
        if (!canvasRef.current) return;

        const canvasCtx = canvasRef.current.getContext("2d");
        if (!canvasCtx) return;

        // Draw camera feed
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

        // Draw pose landmarks
        if (results.poseLandmarks) {
          drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
            color: "#00ff00",
            lineWidth: 4
          });
          drawLandmarks(canvasCtx, results.poseLandmarks, {
            color: "#ff0000",
            lineWidth: 2,
            radius: 6
          });

          // Calculate accuracy
          const poseAccuracy = calculatePoseAccuracy(results.poseLandmarks, targetPose);
          setAccuracy(poseAccuracy);
          onPoseMatch(poseAccuracy);

          // Display accuracy on canvas
          canvasCtx.fillStyle = poseAccuracy >= 70 ? "#00ff00" : "#ffaa00";
          canvasCtx.font = "bold 32px Arial";
          canvasCtx.fillText(`Match: ${poseAccuracy}%`, 20, 50);
        }

        canvasCtx.restore();
      });

      poseRef.current = pose;

      // Initialize camera
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current && poseRef.current) {
            await poseRef.current.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480
      });

      cameraRef.current = camera;
      await camera.start();
    };

    initializePoseDetection();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, [isCameraActive, targetPose, onPoseMatch]);

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-foreground">Your Pose</h3>
        <Button variant="outline" size="sm" onClick={toggleCamera}>
          {isCameraActive ? (
            <>
              <VideoOff className="w-4 h-4 mr-2" />
              Stop Camera
            </>
          ) : (
            <>
              <Video className="w-4 h-4 mr-2" />
              Start Camera
            </>
          )}
        </Button>
      </div>

      <div className="relative w-full h-full rounded-xl overflow-hidden bg-muted border-2 border-primary/20">
        {!isCameraActive ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Click "Start Camera" to begin</p>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="hidden"
              playsInline
            />
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="w-full h-full object-cover"
            />
            {accuracy >= 70 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full font-bold animate-bounce-gentle">
                Great Match! 🌟
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
