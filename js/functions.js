function checkMeetingTime(workStart, workEnd, meetingStart, meetingDuration) {
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
}

console.log(checkMeetingTime('08:00', '17:30', '14:00', 90)); 
console.log(checkMeetingTime('8:0', '10:0', '8:0', 120));
console.log(checkMeetingTime('08:00', '14:30', '14:00', 90)); 
console.log(checkMeetingTime('14:00', '17:30', '08:0', 90)); 
console.log(checkMeetingTime('8:00', '17:30', '08:00', 900)); 