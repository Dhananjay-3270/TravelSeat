import { busdata } from "../../Data/db";
import single from "../../assets/single.png";
import double from "../../assets/double.png";
import "./Seatview.css";
const Seatview = () => {
  return (
    <>
      <div className="seat-view-container">
        <div className="seat-grid">
          {busdata.map((bus) =>
            bus.seats.map((seat) => {
              return (
                <div key={seat.seatId} className={`${seat.type}-seat`}>
                  <img
                    className="seat-icon"
                    src={seat.type == "Single" ? single : double}
                    alt=""
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
export default Seatview;
