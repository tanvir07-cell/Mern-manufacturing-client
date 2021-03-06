import React from "react";
import hero from "../assets/hero.svg";
import TypeWriter from "react-typewriter";

const Hero = () => {
  return (
    <>
      <div class="hero min-h-screen ">
        <div class="hero-content flex-col-reverse gap-10 lg:flex-row-reverse">
          <img src={hero} class="lg:max-w-lg " alt="" />
          <div>
            <TypeWriter typing={1}>
              <h1
                class="text-3xl lg:text-5xl font-bold"
                data-aos="fade-right"
                data-aos-delay="1000"
                data-aos-duration="1000"
              >
                Get Your Desire Product
              </h1>
            </TypeWriter>
            <p
              className="text-xl mb-3 mt-3"
              data-aos="fade-right"
              data-aos-delay="700"
              data-aos-duration="800"
            >
              We have all kind of tool for managing your work
            </p>
            <button
              class="btn btn-primary"
              data-aos-delay="1500"
              data-aos="zoom-out"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
