import { useCallback, useEffect, useMemo, useState, memo } from "react";
import "./index.scss";
import StatisticsChart from "./components/StatisticsChart";
import StatisticsTable from "./components/StatisticsTable";
import { getStatistics } from "../../api/statistic/getStatistics";

const Statistics = () => {
  const userData = JSON.parse(localStorage.getItem("userData")!);
  const [loader, setLoader] = useState<boolean>(false);

  //전체 일정 데이터 (2023-05-30, 2023-05-31)
  const [statisticDates, setStatisticDates] = useState<any>([]);

  //전체 일정의 내부 추출된 shuffled
  const [shuffled, setShuffled] = useState<any>([]);

  //캘린더 차트에 뿌릴 데이터
  const [chartData, setChartData] = useState<any>();

  const [dateValue, setDateValue] = useState<number>(0);
  const [dateDay, setDateDay] = useState<string>("");

  const [shuffledDay, setShuffledDay] = useState<any>([]);

  //전체 일정 데이터 받기
  const fetchStatistics = useCallback(async () => {
    try {
      setLoader(true);
      const getStatisticsResponse = await getStatistics(userData?.userId);
      setStatisticDates(getStatisticsResponse?.data.dates);
      setDateDay(new Date().toISOString().split("T")[0]);
      setShuffledDay([]);
      setLoader(false);
    } catch (error) {}
  }, [userData?.userId]);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const handleChartData = () => {
    const chartArr: any = [];
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

  const handleStatisticDates = () => {
    const arr: any = [];
    let values = 0;
    for (let i = 0; i <= statisticDates?.length - 1; i++) {
      statisticDates[i].shuffled.forEach((item: any) => {
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
    statisticDates?.map((item: any) => {
      values += item.shuffled.length;
    });
    setDateValue(values);
  };

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
