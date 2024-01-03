import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import BaseCard from "../baseCard/BaseCard";

const activities = [
  {
    time: "09.50",
    color: "success.main",
    text: "Check emails and respond to inquiries",
  },
  {
    time: "09.46",
    color: "secondary.main",
    text: "Check user stats and data usage",
  },
  {
    time: "09.47",
    color: "primary.main",
    text: "Check system logs and fix bugs",
  },
  {
    time: "09.48",
    color: "warning.main",
    text: "Check for server errors and fix them",
  },
  {
    time: "09.49",
    color: "error.main",
    text: "Maintain database and run system backups",
  },
];

const DailyActivity = () => {
  return (
    <BaseCard title="Daily Activity">
      <Timeline
        sx={{
          p: 0,
        }}
      >
        {activities.map((activity) => (
          <TimelineItem key={activity.time}>
            <TimelineOppositeContent
              sx={{
                fontSize: "12px",
                fontWeight: "700",
                flex: "0",
              }}
            >
              {activity.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                sx={{
                  borderColor: activity.color,
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              color="text.secondary"
              sx={{
                fontSize: "14px",
              }}
            >
              {activity.text}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </BaseCard>
  );
};

export default DailyActivity;
