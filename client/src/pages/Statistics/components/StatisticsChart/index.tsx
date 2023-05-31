import { useEffect, useState, memo, useCallback } from "react";
import "./index.scss";
import { ResponsiveCalendar } from "@nivo/calendar";
import { getStatisticsDay } from "../../../../api/statistic/getStatisticsDay";

interface StatisticsChartProps {
  data: any;
  setShuffled: React.Dispatch<any>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  statisticDates: any;
  dateValue: any;
  setDateValue: React.Dispatch<any>;
  dateDay: any;
  setDateDay: React.Dispatch<any>;
  setShuffledDay: React.Dispatch<any>;
  shuffledDay: any;
}

const StatisticsChart = ({
  data,
  setShuffled,
  setLoader,
  dateValue,
  setDateValue,
  dateDay,
  setDateDay,
  shuffledDay,
  setShuffledDay,
}: StatisticsChartProps) => {
  const userData = JSON.parse(localStorage.getItem("userData")!);
  const [dayDateCount, setDayDateCount] = useState<any>({
    day: "",
    value: 0,
  });

  const fetchStatisticsDay = useCallback(async () => {
    try {
      setLoader(true);
      const getStatisticsDayResponse = await getStatisticsDay(
        userData.userId,
        dayDateCount.day
      );
      if (getStatisticsDayResponse?.status === 200) {
        setShuffledDay(getStatisticsDayResponse?.data);
      }
      setLoader(false);
    } catch (error) {}
  }, [dayDateCount.day, setLoader, userData.userId]);

  useEffect(() => {
    const arr: any = [];

    shuffledDay?.shuffled?.forEach((item: any) => {
      if (item.statuses.correct === true) {
        item.statuses = "정답";
      }
      if (item.statuses.uncertation === true) {
        item.statuses = "확인 필요";
      }
      if (item.statuses.incorrect === true) {
        item.statuses = "틀림";
      }
      const [yyyy, mm, dd, hh, mi] = item.timestamp.split(/[/:\-T]/);
      item.timestamp = `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
      arr.push(item);
    });
    setShuffled(arr);
  }, [shuffledDay]);

  useEffect(() => {
    fetchStatisticsDay();
  }, [dayDateCount.day]);

  return (
    <div className="statistics-chart">
      <ResponsiveCalendar
        onClick={(data) => {
          setDayDateCount((prev: any) => {
            return { ...prev, day: data.day, value: data.value };
          });
          setDateValue(0);
          setDateDay("");
        }}
        data={data?.map((item: any) => item)}
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

      {dateValue ? (
        <p>
          ~ {dateDay} : {dateValue}
        </p>
      ) : (
        <p>
          {dayDateCount.day} : {dayDateCount.value}
        </p>
      )}
    </div>
  );
};

export default memo(StatisticsChart);
