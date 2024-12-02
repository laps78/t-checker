export default function DailyInfoCard({ date, stats }) {
  const { checkinTimeString, checkoutTimeString, workedOutHours, restMinutes } =
    stats;
  /**
   * component code
   */
  const DailyInfo = () => {
    if (stats !== "") {
      return (
        <div className="daily_card_stats">
          <span className="statsRow">
            <strong>ПРИХОД:</strong> {checkinTimeString || "нет отметок"}{" "}
          </span>
          <span className="statsRow">
            <strong>УХОД:</strong> {checkoutTimeString || "нет отметок"}{" "}
          </span>
          <hr />
          <span className="statsRow">
            <strong>ОТРАБОТАНО:</strong> {workedOutHours || 0} часов{" "}
            {restMinutes || 0} минут
          </span>
        </div>
      );
    } else {
      return "нет отметок в выбранную дату";
    }
  };

  return (
    <>
      <h3>{date}:</h3>
      <DailyInfo />
    </>
  );
}
