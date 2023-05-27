import { useCallback, useEffect, useMemo, useState, memo } from "react";
import "./index.scss";
import axios from "axios";
import StatisticsChart from "./components/StatisticsChart";
import StatisticsTable from "./components/StatisticsTable";

const Statistics = () => {
  let userId = window.localStorage.getItem("token");
  const [statistics, setStatistics] = useState<any>([]);
  const [shuffled, setShuffled] = useState([]);
  const [chartData, setChartData] = useState<any>([]);
  const [day, setDay] = useState<string>("");

  const getStatistics = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/statistics/${userId}`
    );
    setStatistics(data.dates);
  }, []);

  useEffect(() => {
    getStatistics();
  }, []);

  const handleChartData = useCallback(() => {
    const chartArr: any = [];
    for (let i = 0; i < statistics.length; i++) {
      if (statistics[i] !== null) {
        chartArr.push({
          value: statistics[i].shuffled.length,
          day: statistics[i].timestamp.split("T")[0],
        });
      }
    }
    if (day === "") {
      setChartData([chartArr]);
    }
  }, [statistics]);

  useEffect(() => {
    const arr: any = [];
    handleChartData();
    for (let i = 0; i < statistics.length; i++) {
      if (statistics[i] !== null) {
        statistics[i].shuffled?.map((i: any) => {
          if (i.statuses.correct === true) {
            i.statuses = "정답";
          }
          if (i.statuses.uncertation === true) {
            i.statuses = "확인 필요";
          }
          if (i.statuses.incorrect === true) {
            i.statuses = "틀림";
          }
          const [yyyy, mm, dd, hh, mi] = i.timestamp.split(/[/:\-T]/);
          i.timestamp = `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
          arr.push(i);
        });
      }
    }
    setShuffled(arr);
  }, [statistics]);

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
        setStatistics={setStatistics}
        day={day}
        setDay={setDay}
      />
      <StatisticsTable columns={columnData} data={rowData} />
    </div>
  );
};

export default memo(Statistics);
