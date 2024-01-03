import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import dynamic from "next/dynamic";
import BaseCard from "../baseCard/BaseCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
  const [month, setMonth] = useState({});
  const [event, setEvent] = useState({});
  const fetchMonthData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getmonthdata`);
      const data = await response.json();
      setMonth(data);
    } catch (error) {
      console.error("Error fetching month data:", error);
    }
  };
  const fetchMontheventData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/geteventmonthdata`);
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };
  useEffect(() => {
    fetchMonthData();
    fetchMontheventData();
  }, []);

  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },
  
    colors: ["#fb9678", "#03c9d7"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 1,
      max: 100,
      tickAmount: 10,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };
  

  const seriessalesoverview = [
    {
      name: "Total registration month wise",
      data: [
        month.jan?.length,
        month.feb?.length,
        month.mar?.length,
        month.apr?.length,
        month.may?.length,
        month.jun?.length,
        month.jul?.length,
        month.aug?.length,
        month.sept?.length,
        month.oct?.length,
        month.nov?.length,
        month.dec?.length,
      ],
    },
    {
      name: "Total event registrataion month wise",
      data: [
        event.jan?.length,
        event.feb?.length,
        event.mar?.length,
        event.apr?.length,
        event.may?.length,
        event.jun?.length,
        event.jul?.length,
        event.aug?.length,
        event.sept?.length,
        event.oct?.length,
        event.nov?.length,
        event.dec?.length,
      ],
    },
  ];

  return (
    <BaseCard title="InnovateU Performance">
      {Object.keys(month,event).length > 0 ? (
        <Chart options={optionssalesoverview} series={seriessalesoverview} type="bar" height="295px" />
      ) : (
        <p>Loading month data...</p>
      )}
    </BaseCard>
  );
};

export default SalesOverview;