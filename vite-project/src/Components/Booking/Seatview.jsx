import { busdata, destinations } from "../../Data/db";
// import { MdEventSeat } from "react-icons/md";
import "./Seatview.css";
import single from "../../assets/single.png";
import double from "../../assets/double.png";
const Seatview = () => {
  console.log(busdata.bus.seats);
  return (
    <>
      <div className="seat-view-container">
        <div className="seat-grid">
          {busdata.bus.seats.map((seat) => {
            if (seat.type == "Single") {
              return (
                <div key={seat.seatId} className={`${seat.type}-seat`}>
                  <img className="seat-icon" src={single} alt="" />
                </div>
              );
            } else {
              return (
                <div key={seat.seatId}>
                  <img className="seat-icon" src={double} alt="" />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
export default Seatview;
