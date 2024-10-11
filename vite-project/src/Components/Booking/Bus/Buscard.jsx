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
  // Log the Routeindex for debugging purposes
  console.log(Routeindex);

  // Get the necessary data from context (bus information, From, and Too locations)
  const { businformation, From, Too } = useContext(datacontext);

  // Ref to scroll the page into the seat view when needed
  const seatref = useRef(null);

  // State to store the selected bus ID
  const [Busid, setBusid] = useState(0);

  // State to control the visibility of the seat view
  const [seatview, setSeatview] = useState(false);

  /**
   * Handles the "View Seats" button click.
   * It sets the selected bus ID, shows the seat view, and scrolls into the seat section.
   */
  const handleseats = (id) => {
    setBusid(id); // Set the selected bus ID
    setSeatview(true); // Show the seat view
    setTimeout(() => {
      // Scroll into the seat view section smoothly after a short delay
      seatref.current.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* Bus card container: Displays all buses available for the selected route */}
      <div className="bus-card-container">
        {businformation[Routeindex].map((data) => (
          <div className="bus-card" key={data.busId}>
            <Card sx={{ maxWidth: 345 }}>
              {/* Display the bus image */}
              <CardMedia
                component="img"
                alt="bus-img"
                height="140"
                image={data.img}
              />
              <CardContent>
                {/* Display the bus name (static for now) */}
                <Typography gutterBottom variant="h5" component="div">
                  DTC tours
                </Typography>
                {/* Display the bus model */}
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {data.model}
                </Typography>
              </CardContent>
              <CardActions>
                {/* More info button (functionality can be added later) */}
                <Button size="small">More info</Button>
                {/* Button to view seats for the selected bus */}
                <Button size="small" onClick={() => handleseats(data.busId)}>
                  View Seats
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>

      {/* Seat view section: Display seat selection for the chosen bus */}
      <div ref={seatref}>
        {seatview && (
          <Seatview
            id={Busid} // Pass the selected bus ID to Seatview component
            seatview={seatview}
            setSeatview={setSeatview} // Function to hide seat view
            setShowbus={setShowbus} // Function to hide the bus list if needed
            Routeindex={Routeindex} // Routeindex to pass to Seatview
          />
        )}
      </div>
    </>
  );
};

export default Buscard;
