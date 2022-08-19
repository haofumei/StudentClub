import React from "react";
import imageSrc1 from "./images/hayward_skate_park.jpg";
import imageSrc2 from "./images/cruiser_board.jpg";

const header = <header><h1>Hayward Skateboard Club</h1></header>;
const footer = <footer><p>&copy 2021 Hayward Skateboard Club</p></footer>;

let image1 = <img src={imageSrc1} alt="Hayward Skate Park" />;
const figure1 = <figure>{image1}
<figcaption>Figure 1. Hayward Skate Park @ Huntwood Ave</figcaption>
</figure>;

let image2 = <img src={imageSrc2} alt="Cruiser Skateboard" />;
const figure2 = <figure>{image2}
<figcaption>Figure 2. Cruiser Board</figcaption>
</figure>;

function Home() {
    return (
        <>
        {header}
        <main>
            <h2>Skate Board</h2>
            <p>Here is for the fun &#128518  of skateboard. &#127938</p>
            {figure1}
            <p>Why is it good to have a skate park? 
                <strong>
                    First, community gathering places help build social skills;
                    Second, skateboarding has positive effects on mental health; 
                    And most importantly, skateparks reduce criminal behavior!
                </strong>
            </p>

            <h2>How to pick a suitable skateboard? &#128558</h2>
            {figure2}
            <p>Here we will introduce the difference of types of the skateboard&#128761.</p>

            <h2>Beginer for the skateboard</h2>
            <p>Here we will teach how to play the skateboard.</p>
        </main>
        {footer}
        </>
    );
}

export default Home;
