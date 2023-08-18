import { useEffect, useState, memo, useCallback } from "react";
import "./index.scss";
import { CalendarDatum, ResponsiveCalendar } from "@nivo/calendar";
import { getStatisticsDay } from "../../../../api/statistic/getStatisticsDay";
import {
  Chart,
  FilteredStatisticDates,
  StatisticDates,
} from "../../../../types/statistics";
import { Topic } from "../../../../types/topics";
import { secondsToFullTime } from "../../../../utils/timeConverter";

interface StatisticsChartProps {
  data: CalendarDatum[];
  setShuffled: React.Dispatch<React.SetStateAction<Topic[]>>;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  statisticDates: StatisticDates[] | null | undefined;
  dateValue: number;
  setDateValue: React.Dispatch<React.SetStateAction<number>>;
  dateDay: string;
  setDateDay: React.Dispatch<React.SetStateAction<string>>;
  setShuffledDay: React.Dispatch<
    React.SetStateAction<StatisticDates[] | null | undefined>
  >;
  shuffledDay: StatisticDates[] | any;
  reviewTime: string;
  setReviewTime: React.Dispatch<React.SetStateAction<string>>;
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
  reviewTime,
  setReviewTime,
}: StatisticsChartProps) => {
  const userData = JSON.parse(localStorage.getItem("userData")!);
  const [dayDateCount, setDayDateCount] = useState<Chart>({
    day: "",
    value: 0,
  });

  const fetchStatisticsDay = useCallback(async () => {
    try {
      setLoader(true);
      const res = await getStatisticsDay(userData.userId, dayDateCount.day);
      if (res?.status === 200) {
        setShuffledDay(res?.data);
        setReviewTime(secondsToFullTime(Number(res?.data.duration)));
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  }, [dayDateCount.day, setLoader, userData.userId]);

  useEffect(() => {
    const arr: FilteredStatisticDates[] = [];
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

  const theme = {
    labels: {
      text: {
        fontSize: 12,
        fill: "#65748f",
      },
    },
    axis: {
      legend: {
        text: {
          fontSize: 12,
          fill: "#333333",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
      },
    },
  };

  return (
    <div className="statistics-chart">
      <ResponsiveCalendar
        theme={theme}
        onClick={(data) => {
          setDayDateCount((prev: Chart) => {
            return { ...prev, day: data.day, value: data.value };
          });
          setDateValue(0);
          setDateDay("");
        }}
        data={data?.map((item) => item)}
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

      {dateValue ? (
        <>
          <p className="statistics-chart-review-time">
            총 복습 시간 : {reviewTime}
          </p>
          <p className="statistics-chart-date">
            <br />~ {dateDay} : {dateValue}
          </p>
        </>
      ) : (
        <>
          <p className="statistics-chart-review-time">
            총 복습 시간 : {reviewTime}
          </p>
          <p className="statistics-chart-date">
            <br />
            {dayDateCount.day} : {dayDateCount.value}
          </p>
        </>
      )}
    </div>
  );
};

export default memo(StatisticsChart);
