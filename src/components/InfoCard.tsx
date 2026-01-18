import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

interface InfoCardProps {
  title: string;
  description?: string;
  maxWidth?: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  maxWidth = 400,
}) => {
  return (
    <Card sx={{ maxWidth }}>
      <CardActionArea>
        <CardContent>
          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
            >
              {description}
            </Typography>
          )}

          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default InfoCard;
