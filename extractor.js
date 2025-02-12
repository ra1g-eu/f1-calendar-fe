function extractSessions() {
  // Find all divs with the specified class
  const sessionDivs = document.querySelectorAll(
    ".f1-utils-inner-padding-tr--half"
  );

  const eventName = document.querySelector('h2.f1-heading__body.f1-heading').firstChild.textContent.trim();

  // Array to store session objects
  const sessions = {
    [eventName]: [], // Sessions array will be nested here
  };

  // Iterate through each session div
  sessionDivs[0].childNodes[0].childNodes.forEach((sessionDiv) => {
    try {
      // Extract the date components
      const dateDiv = sessionDiv.querySelector(".min-w-16");
      const day = dateDiv.querySelector("span").textContent.trim(); // Day (e.g., 16)
      const month = dateDiv.querySelector(".leading-tight.uppercase").textContent.trim(); // Month (e.g., Mar)
      console.log(month);

      // Extract the session name and time
      const sessionName = sessionDiv.querySelector(".f1-heading__body.block.mb-xxs").textContent.trim(); // Session name (e.g., Race)
      const timeTextArray = sessionDiv.querySelector(".f1-text__micro.text-fs-15px span").textContent.trim().replace(' ', '').split('-'); // Time (e.g., 05:00)

      let dates = [];
      timeTextArray.forEach((timeText) => {
        const [hour, minute] = timeText.split(":").map(Number); // Split time into hours and minutes
        const year = new Date().getFullYear(); // Assume current year
        const utcDate = new Date(Date.UTC(year, getMonthIndex(month), parseInt(day), hour - 1, minute)); // Add 1 hour for CET
        const formattedDate = utcDate.toISOString(); // Convert to ISO string
        dates.push(formattedDate);
      });

      // Create a session object
      const session = {
        date_start: dates[0],
        date_end: dates[1] ?? null,
        sessionName,
      };

      // Add the session object to the array
      sessions[eventName].push(session);
    } catch (error) {
      console.error(error);
    }
  });

  let savedSessions = localStorage.getItem("sessions");
  if (savedSessions) {
    let saved = JSON.parse(savedSessions);
    saved = {...saved, ...sessions};
    localStorage.setItem("sessions", JSON.stringify(saved));
  } else {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }

  // Return the sessions as a JSON string
  return JSON.stringify(sessions, null, 2);
}

// Helper function to convert month abbreviations to indices
function getMonthIndex(monthAbbreviation) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.indexOf(monthAbbreviation);
}

console.log(extractSessions());
