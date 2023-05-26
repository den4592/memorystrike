import { useEffect, useMemo, useState } from "react";
import "./index.scss";
import axios from "axios";
import { useTable } from "react-table";
import StatisticsTable from "./components/StatisticsTable";

const Statistics = () => {
  let userId = window.localStorage.getItem("token");
  const [statistics, setStatistics] = useState<any>([]);
  const [duration, setDuration] = useState<string>("");
  const [shuffled, setShuffled] = useState([]);

  const getStatistics = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/statistics/${userId}`
    );

    setStatistics(data.dates);
    // setDuration(data.dates[0].duration);
  };

  useEffect(() => {
    getStatistics();
  }, []);

  useEffect(() => {
    const arr: any = [];
    statistics.map((item: any) => {
      item.shuffled.map((i: any) => {
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
    });
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
      <StatisticsTable columns={columnData} data={rowData} />
    </div>
  );
};

export default Statistics;
