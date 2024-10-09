import React, { useState } from "react";
import { busdata } from "./../../../Data/db";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import bus from "../../../assets/MSRTC BUS VECTOR.jpg";
import Seatview from "../Seatview";
import "./Buscard.css";
const Buscard = ({data}) => {
  console.log(data)
  const [Busid, setBusid] = useState();
  const [seatview, showSeatview] = useState(false);
  const handleseats = (id) => {
    setBusid(id);
    showSeatview(true);
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
      {showSeatview && <Seatview data={busdata.Busid.seats} />}
    </>
  );
};

export default Buscard;
