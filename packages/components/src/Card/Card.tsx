import React, { useState } from "react";
import MuiCard from "@mui/material/Card";
import {
  Box,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { cardProps, IAbilityProp } from "./Card.types";

export const Card = (props: cardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { image, name, height, weight, location, abilities, stats, sprites } =
    props;

  return (
    <MuiCard
      sx={{
        display: "flex",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
      }}
    >
      <CardContent>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!imageLoaded && (
            <Box
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {imageLoaded && (
              <CardMedia
                component="img"
                alt="front_image"
                height="auto"
                width="auto"
                image={sprites.front_default}
              />
            )}
            <img
              src={image}
              alt="pokedex character"
              style={{ display: "none" }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
            <CardMedia
              sx={{
                width: "150px",
                height: `${imageLoaded}? "150px" : "0px" `,
                objectFit: "contain",
              }}
              component="img"
              image={image}
              title={name}
              loading="lazy"
              style={{ visibility: imageLoaded ? "visible" : "hidden" }}
            />
            {imageLoaded && (
              <CardMedia
                component="img"
                alt="front_image"
                height="auto"
                width="auto"
                image={sprites.back_default}
              />
            )}
          </Box>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ textTransform: "capitalize" }}
          >
            {name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 5 }}>
          <Typography variant="body2" color="text.secondary">
            Height : {height}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Weight : {weight}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: "flex", flexDiretion: "column" }}
        >
          Location:
          <a href={location} target="_blank" rel="noreferrer">
            {location}
          </a>
        </Typography>
        <Box>
          <Typography variant="h6" component="div">
            Abilities
          </Typography>
          <List dense={false} sx={{ lineHeight: "1px" }}>
            {abilities.map((ability: IAbilityProp, i: number) => (
              <ListItem key={i}>
                <ListItemText
                  primary={ability.ability.name}
                  secondary={ability.ability.url}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Typography variant="h6" component="div">
            Stats
          </Typography>
          <Box sx={{ pl: "16px" }}>
            {stats?.map((statDetails, index) => (
              <Box key={index}>
                <Typography
                  sx={{ display: "inline" }}
                  component="div"
                  variant="subtitle1"
                >
                  {statDetails?.stat?.name} :{" "}
                </Typography>
                <Typography
                  sx={{ display: "inline" }}
                  component="div"
                  variant="subtitle2"
                >
                  {statDetails?.base_stat}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </MuiCard>
  );
};
