import { useEffect, useState, memo, useCallback } from "react";
import "./index.scss";
import { ResponsiveCalendar } from "@nivo/calendar";
import axios from "axios";

interface StatisticsChartProps {
  data: any;
  dayDateCount: any;
  setDayDateCount: any;
  setStatistics: React.Dispatch<React.SetStateAction<any[]>>;
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
}

const StatisticsChart = ({
  data,
  dayDateCount,
  setDayDateCount,
  setStatistics,
  day,
  setDay,
}: StatisticsChartProps) => {
  const userData = JSON.parse(localStorage.getItem("userData")!);

  const handleFetchDayData = useCallback(async () => {
    const dt = await axios.get(
      `http://localhost:8080/api/statistics/${userData.userId}/${day}`
    );
    setStatistics(dt.data);
  }, [day, setStatistics]);

  useEffect(() => {
    handleFetchDayData();
  }, [day]);

  return (
    <div className="statistics-chart">
      <ResponsiveCalendar
        onClick={(data) => {
          setDay(data.day);
          setDayDateCount((prev: any) => {
            return { ...prev, day: data.day, count: data.value };
          });
        }}
        data={data[0]?.map((item: any) => item)}
        from="2023-01-01"
        to="2023-12-31"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        yearSpacing={40}
        monthBorderWidth={0}
        monthBorderColor="#6b7fff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
      {dayDateCount?.day !== "" && (
        <p>
          {dayDateCount.day} : {dayDateCount.count}
        </p>
      )}
    </div>
  );
};

export default memo(StatisticsChart);
