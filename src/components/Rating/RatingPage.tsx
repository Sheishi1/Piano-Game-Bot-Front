import React, {useEffect, useState} from 'react';
import axios from "axios";
import {RatingData} from "../../Models/RatingData";
import "./RatingPage.css";
import RatingListItem from "./RatingListItem";

const RatingPage = (props: {userId: number}) => {
    const [ratingData, setRatingData] = useState<RatingData | null>(null);


    useEffect(() => {
        const fetchRatingData = async () => {
            try {
                const response = await axios.post(
                    'https://pianobot.dutx.site/api/rating/top',
                    {userId: props.userId}
                )
                setRatingData(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchRatingData()
    }, [ratingData]);

    return (
        <div className={`main__RatingPageBlock`}>
            {
                ratingData?.topUsers.map( data =>
                    <RatingListItem userName={data?.user?.userName!} points={data?.user?.points!} position={data?.position!} />
                )
            }
        </div>
    );
};

export default RatingPage;