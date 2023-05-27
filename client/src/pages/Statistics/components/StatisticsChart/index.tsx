import { useEffect, useState, memo, useCallback } from "react";
import "./index.scss";
import { ResponsiveCalendar } from "@nivo/calendar";
import axios, { AxiosResponse } from "axios";

interface StatisticsChartProps {
  data: any;
  setStatistics: React.Dispatch<React.SetStateAction<any[]>>;
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
}

const StatisticsChart = ({
  data,
  setStatistics,
  day,
  setDay,
}: StatisticsChartProps) => {
  let userId = localStorage.getItem("token");
  const [count, setCount] = useState<any>({
    day: "",
    count: "",
  });

  const handleFetchDayData = useCallback(async () => {
    const dt = await axios.get(
      `http://localhost:8080/api/statistics/${userId}/${day}`
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
          setCount((prev: any) => {
            return { ...prev, day: data.day, count: data.value };
          });
        }}
        data={data[0]?.map((item: any) => item)}
        from="2023-01-01"
        to="2023-12-31"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
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
      {count.day !== "" && (
        <p>
          {count.day} : {count.count}
        </p>
      )}
    </div>
  );
};

export default memo(StatisticsChart);
