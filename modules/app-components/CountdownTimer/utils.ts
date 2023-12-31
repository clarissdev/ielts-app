import moment from "moment";

export function getCountdownDetailsFromMillisecondsLeft(
  millisecondsLeft: number
) {
  const duration = moment.duration(millisecondsLeft);
  return {
    numDays: Math.floor(duration.asDays()).toString().padStart(2, "0"),
    numHours: duration.hours().toString().padStart(2, "0"),
    numMinutes: duration.minutes().toString().padStart(2, "0"),
    numSeconds: duration.seconds().toString().padStart(2, "0")
  };
}
