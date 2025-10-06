import { NormalizedLandmark } from "@mediapipe/pose";

// Calculate angle between three points
const calculateAngle = (a: NormalizedLandmark, b: NormalizedLandmark, c: NormalizedLandmark): number => {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  
  return angle;
};

// Define target angles for each pose
const poseTargetAngles: Record<string, { 
  leftElbow?: number, 
  rightElbow?: number,
  leftKnee?: number,
  rightKnee?: number,
  leftShoulder?: number,
  rightShoulder?: number
}> = {
  tree: {
    leftElbow: 40,
    rightElbow: 40,
    leftKnee: 90,
    rightKnee: 180
  },
  cat: {
    leftElbow: 180,
    rightElbow: 180,
    leftKnee: 90,
    rightKnee: 90
  },
  warrior: {
    leftElbow: 180,
    rightElbow: 180,
    leftKnee: 90,
    rightKnee: 180,
    leftShoulder: 90,
    rightShoulder: 90
  },
  "downward-dog": {
    leftElbow: 180,
    rightElbow: 180,
    leftKnee: 180,
    rightKnee: 180
  }
};

export const calculatePoseAccuracy = (landmarks: NormalizedLandmark[], targetPose: string): number => {
  if (!landmarks || landmarks.length < 33) return 0;

  const targetAngles = poseTargetAngles[targetPose];
  if (!targetAngles) return 0;

  const scores: number[] = [];

  // MediaPipe landmark indices
  const LEFT_SHOULDER = 11;
  const RIGHT_SHOULDER = 12;
  const LEFT_ELBOW = 13;
  const RIGHT_ELBOW = 14;
  const LEFT_WRIST = 15;
  const RIGHT_WRIST = 16;
  const LEFT_HIP = 23;
  const RIGHT_HIP = 24;
  const LEFT_KNEE = 25;
  const RIGHT_KNEE = 26;
  const LEFT_ANKLE = 27;
  const RIGHT_ANKLE = 28;

  // Calculate left elbow angle
  if (targetAngles.leftElbow) {
    const leftElbowAngle = calculateAngle(
      landmarks[LEFT_SHOULDER],
      landmarks[LEFT_ELBOW],
      landmarks[LEFT_WRIST]
    );
    const diff = Math.abs(leftElbowAngle - targetAngles.leftElbow);
    const score = Math.max(0, 100 - diff);
    scores.push(score);
  }

  // Calculate right elbow angle
  if (targetAngles.rightElbow) {
    const rightElbowAngle = calculateAngle(
      landmarks[RIGHT_SHOULDER],
      landmarks[RIGHT_ELBOW],
      landmarks[RIGHT_WRIST]
    );
    const diff = Math.abs(rightElbowAngle - targetAngles.rightElbow);
    const score = Math.max(0, 100 - diff);
    scores.push(score);
  }

  // Calculate left knee angle
  if (targetAngles.leftKnee) {
    const leftKneeAngle = calculateAngle(
      landmarks[LEFT_HIP],
      landmarks[LEFT_KNEE],
      landmarks[LEFT_ANKLE]
    );
    const diff = Math.abs(leftKneeAngle - targetAngles.leftKnee);
    const score = Math.max(0, 100 - diff);
    scores.push(score);
  }

  // Calculate right knee angle
  if (targetAngles.rightKnee) {
    const rightKneeAngle = calculateAngle(
      landmarks[RIGHT_HIP],
      landmarks[RIGHT_KNEE],
      landmarks[RIGHT_ANKLE]
    );
    const diff = Math.abs(rightKneeAngle - targetAngles.rightKnee);
    const score = Math.max(0, 100 - diff);
    scores.push(score);
  }

  // Calculate shoulder angles for warrior pose
  if (targetAngles.leftShoulder) {
    const leftShoulderAngle = calculateAngle(
      landmarks[LEFT_HIP],
      landmarks[LEFT_SHOULDER],
      landmarks[LEFT_ELBOW]
    );
    const diff = Math.abs(leftShoulderAngle - targetAngles.leftShoulder);
    const score = Math.max(0, 100 - diff);
    scores.push(score);
  }

  if (targetAngles.rightShoulder) {
    const rightShoulderAngle = calculateAngle(
      landmarks[RIGHT_HIP],
      landmarks[RIGHT_SHOULDER],
      landmarks[RIGHT_ELBOW]
    );
    const diff = Math.abs(rightShoulderAngle - targetAngles.rightShoulder);
    const score = Math.max(0, 100 - diff);
    scores.push(score);
  }

  // Calculate average score
  if (scores.length === 0) return 0;
  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  return Math.round(averageScore);
};
