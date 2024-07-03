import React, { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CollectionsIcon from "@mui/icons-material/Collections";
import InfoRounded from "@mui/icons-material/InfoRounded";
import { useQuery } from "react-query";
import { loadImages, loadVotes, loadBids } from "../../data/api/api";

import Timer from "./Timer";
import { useThisAuction } from "../../data";
import { Link } from "react-router-dom";

function Ending({ uuid }) {
  const { data: imagesData = { results: [] } } = useQuery("images", loadImages);
  const { auction } = useThisAuction(uuid);

  const results = imagesData.results;
  console.log(results);

  const { data: bidsData = { results: [] } } = useQuery("bids", loadBids);
  const bids = bidsData.results;

  const { data: votesData = { results: [] } } = useQuery("votes", loadVotes);
  const votes = votesData.results;

  const [justEnded, setJustEnded] = useState(false);

  const update = () => {
    setJustEnded(true);
  };

  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (auction && auction.start_time && auction.duration) {
      const durationInMilliseconds = auction.duration * 24 * 60 * 60 * 1000; // Convert duration from days to milliseconds
      const endTimeInMilliseconds = new Date(auction.start_time).getTime() + durationInMilliseconds;
      const endTime = new Date(endTimeInMilliseconds);

      setEndTime(endTime);
    }
  }, [auction]);

  useEffect(() => {
    // Update the end_time when a new auction is added
    setEndTime(null); // Reset end_time to null initially
    if (auction && auction.start_time && auction.duration) {
      const durationInMilliseconds = auction.duration * 24 * 60 * 60 * 1000; // Convert duration from days to milliseconds
      const endTimeInMilliseconds = new Date(auction.start_time).getTime() + durationInMilliseconds;
      const endTime = new Date(endTimeInMilliseconds);

      setEndTime(endTime);
    }
  }, [auction, auction?.uuid]);

  const currentDate = new Date();

  let AuctionBids = auction ? bids.filter(bid => bid.auction === auction.uuid) : [];
  const highestBid = AuctionBids.length > 0 ? Math.max(...AuctionBids.map(bid => parseFloat(bid.amount)), 0) : 0;

  const filteredImages = auction ? results.filter(image => image.auction === auction.uuid) : [];

  let AuctionVotes = auction ? votes.filter(vote => vote.auction === auction.uuid) : [];
  let totalVotes = AuctionVotes.length;
  let sumVotes = AuctionVotes.reduce((total, vote) => total + vote.confidence_score, 0);
  let averageScore = totalVotes > 0 ? sumVotes / totalVotes : 0;
  let formattedScore = averageScore.toFixed(2);

  return (
    <Card
      orientation="vertical"
      key={auction?.name}
      variant="elevation"
      sx={{
        gap: 2,
        "--Card-padding": theme => theme.spacing(1)
      }}
    >
      {auction && (
        <Link to={`/auctions/${auction.uuid}`}>
          <AspectRatio
            ratio="1.5"
            variant="soft"
            sx={{
              flexGrow: 1,
              minWidth: 250
            }}
          >
            {filteredImages.length > 0 && (
              <li key={filteredImages[0].id}>
                <img
                  src={filteredImages[0].image}
                  className="card-img-top"
                  alt={auction.name}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-25px",
                    left: "0px",
                    padding: "8px"
                  }}
                >
                  {currentDate > new Date(auction.start_time) ? (
                    <>
                      {endTime && currentDate < new Date(endTime) ? (
                        <Typography
                          fontSize=""
                          borderRadius=""
                          my={0.5}
                          ml={-3}
                          px={1}
                          mr={-1}
                          sx={theme => ({
                            ...theme.variants.soft.warning,
                            color: "danger.400",
                            verticalAlign: "text-top"
                          })}
                        >
                          <Timer endTime={endTime} update={update} />
                        </Typography>
                      ) : (
                        <div
                          style={{
                            bottom: "-20px",
                            left: "0",
                            padding: "15px"
                          }}
                        >
                          <Typography
                            fontSize=""
                            borderRadius=""
                            px={0.5}
                            mr={0.5}
                            sx={theme => ({
                              ...theme.variants.soft.danger,
                              color: "danger.400",
                              verticalAlign: "text-top"
                            })}
                          >
                            Auction ended
                          </Typography>
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      style={{ bottom: "-20px", left: "0", padding: "15px" }}
                    >
                      <Typography
                        fontSize="md"
                        borderRadius="sm"
                        px={0.5}
                        mr={0.5}
                        sx={theme => ({
                          ...theme.variants.soft.warning,
                          color: "success.400",
                          verticalAlign: "text-top"
                        })}
                      >
                        {`Auction Starts at ${new Date(
                          auction.start_time
                        ).toLocaleString()}`}
                      </Typography>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-12px",
                    right: "0",
                    padding: "8px"
                  }}
                >
                  {AuctionBids.length > 0 && (
                    <Typography
                      fontSize="md"
                      borderRadius=""
                      my={0.5}
                      ml={-1}
                      px={1}
                      mr={-1}
                      sx={theme => ({
                        ...theme.variants.soft.warning,
                        color: "danger.400",
                        verticalAlign: "text-top"
                      })}
                    >
                      <Box display="flex" alignItems="center">
                        {highestBid}
                      </Box>
                    </Typography>
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0",
                    padding: "8px"
                  }}
                >
                  <Typography
                    fontSize="md"
                    borderRadius="sm"
                    px={0.5}
                    mr={0.5}
                    sx={theme => ({
                      ...theme.variants.soft.neutral,
                      color: "danger.400",
                      verticalAlign: "text-top"
                    })}
                  >
                    <CollectionsIcon /> {filteredImages.length}
                  </Typography>
                </div>
              </li>
            )}
          </AspectRatio>
        </Link>
      )}
      {auction && (
        <Box sx={{ whiteSpace: "nowrap", paddingLeft: 1 }}>
          <Typography fontWeight="xl">
            {auction.year} {auction.make} {auction.model}
            <span style={{ marginLeft: "30px" }}>
              <InfoRounded sx={{ fontSize: 16, my: 0.5, mr: 0.1, mt: "1px" }} />{" "}
              local
            </span>
            <div style={{ bottom: "-20px", left: "0", padding: "15px" }}>
              <Typography
                fontSize="md"
                borderRadius="sm"
                px={0.5}
                mr={0.5}
                sx={theme => ({
                  color: "success.400",
                  verticalAlign: "text-top"
                })}
              >
                <span style={{ marginLeft: "30px" }}>
                  <InfoRounded
                    sx={{ fontSize: 16, my: 0.5, mr: 0.1, mt: "1px" }}
                  />{" "}
                  {formattedScore}%
                </span>
              </Typography>
            </div>
          </Typography>
        </Box>
      )}
    </Card>
  );
}

export default Ending;
