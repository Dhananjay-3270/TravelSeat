import { useContext, useState, useRef } from "react";
import datacontext from "../../../Context";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Seatview from "../Seatview";
import "./Buscard.css";

const Buscard = ({ showbus, setShowbus, Routeindex }) => {
  console.log(Routeindex)
  const { businformation, From, Too, } =
    useContext(datacontext);
  const seatref = useRef(null);
  const [Busid, setBusid] = useState(0);
  const [seatview, setSeatview] = useState(false);

  const handleseats = (id) => {
    setBusid(id);
    setSeatview(true);
    setTimeout(() => {
      seatref.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <div className="bus-card-container">
        {businformation[Routeindex].map((data) => (
          <div className="bus-card" key={data.busId}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="bus-img"
                height="140"
                image={data.img}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  DTC tours
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {data.model}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">More info</Button>
                <Button size="small" onClick={() => handleseats(data.busId)}>
                  View Seats
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      <div ref={seatref}>
        {seatview && (
          <Seatview
            id={Busid}
            seatview={seatview}
            setSeatview={setSeatview}
            setShowbus={setShowbus}
            Routeindex={Routeindex}
          />
        )}
      </div>
    </>
  );
};

export default Buscard;
