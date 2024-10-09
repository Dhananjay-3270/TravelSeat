import React, { useState, useRef } from "react";
import { busdata } from "./../../../Data/db";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Seatview from "../Seatview";
import "./Buscard.css";

const Buscard = ({ showbus, setShowbus }) => {
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
        {busdata.map((data) => (
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
      <div ref={seatref}>{seatview && <Seatview id={Busid} />}</div>
    </>
  );
};

export default Buscard;
