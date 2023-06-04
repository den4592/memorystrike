import { useCallback, useEffect, useMemo, useState, memo } from "react";
import StatisticsChart from "./components/StatisticsChart";
import StatisticsTable from "./components/StatisticsTable";
import { getStatistics } from "../../api/statistic/getStatistics";
import { FilteredStatisticDates, StatisticDates } from "../../types/statistics";
import { Topic } from "../../types/topics";
import { CalendarDatum } from "@nivo/calendar";

const Statistics = () => {
  const userData = JSON.parse(localStorage.getItem("userData")!);
  const [loader, setLoader] = useState<boolean>(false);

  //전체 일정 데이터 (2023-05-30, 2023-05-31)
  const [statisticDates, setStatisticDates] = useState<StatisticDates[]>([]);

  //전체 일정의 내부 추출된 shuffled
  const [shuffled, setShuffled] = useState<Topic[]>([]);

  //캘린더 차트에 뿌릴 데이터
  const [chartData, setChartData] = useState<CalendarDatum[]>([]);

  const [dateValue, setDateValue] = useState<number>(0);
  const [dateDay, setDateDay] = useState<string>("");

  const [shuffledDay, setShuffledDay] = useState<StatisticDates[] | null>();

  //전체 일정 데이터 받기
  const fetchStatistics = useCallback(async () => {
    try {
      setLoader(true);
      const res = await getStatistics(userData?.userId);
      setStatisticDates(res?.data.dates);

      setDateDay(new Date().toISOString().split("T")[0]);
      setShuffledDay([]);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  }, [userData?.userId]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const handleChartData = () => {
    const chartArr: CalendarDatum[] = [];
    for (let i = 0; i < statisticDates?.length; i++) {
      if (statisticDates[i] !== null) {
        chartArr.push({
          value: statisticDates[i].shuffled.length,
          day: statisticDates[i].timestamp.split("T")[0],
        });
      }
    }
    setChartData(chartArr);
  };

  const handleStatisticDates = useCallback(() => {
    const arr: Topic[] = [];
    let values = 0;
    for (let i = 0; i < statisticDates?.length; i++) {
      statisticDates[i].shuffled.forEach((item: FilteredStatisticDates) => {
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
    }
    setShuffled(arr);
    statisticDates?.map((item: StatisticDates) => {
      values += item.shuffled.length;
    });
    setDateValue(values);
  }, [statisticDates]);

  useEffect(() => {
    handleChartData();
    handleStatisticDates();
  }, [statisticDates]);

  //헤더에 해당하는 데이터 저장
  const columnData = useMemo(
    () => [
      {
        accessor: "topic",
        Header: "주제/제목/질문",
      },
      {
        accessor: "description",
        Header: "설명",
      },
      {
        accessor: "statuses",
        Header: " 상태",
      },
      {
        accessor: "timestamp",
        Header: "날짜",
      },
    ],
    []
  );

  //필드에 들어갈 데이터 저장
  const rowData = useMemo(() => shuffled, [shuffled]);

  return (
    <div>
      <StatisticsChart
        data={chartData}
        setShuffled={setShuffled}
        setLoader={setLoader}
        statisticDates={statisticDates}
        dateValue={dateValue}
        setDateValue={setDateValue}
        dateDay={dateDay}
        setDateDay={setDateDay}
        shuffledDay={shuffledDay}
        setShuffledDay={setShuffledDay}
      />
      {loader ? (
        <span className="loader"></span>
      ) : (
        <>
          <button className="btn" onClick={fetchStatistics}>
            가져오기
          </button>
          <StatisticsTable columns={columnData} data={rowData} />
        </>
      )}
    </div>
  );
};

export default memo(Statistics);
