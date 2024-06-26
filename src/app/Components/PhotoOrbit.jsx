"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import OrbitingCircles from "./photoCircle";
export function PhotoOrbit() {
  const [radius, setRadius] = useState(190);

  const handleResize = () => {
    setRadius((radius) => (radius = (window.innerWidth <= 640 && 140) || 190));
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Image
        src="/profile_pic.png"
        width={500}
        height={500}
        alt="Picture of the author"
      ></Image>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        radius={radius}
        duration={20}
        delay={2}
        reverse
      >
        <Icons.gitHub />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        radius={radius}
        duration={20}
        delay={4}
        reverse
      >
        <Icons.reactJS />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        radius={radius}
        duration={20}
        delay={6}
        reverse
      >
        <Icons.nextJS />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        radius={radius}
        duration={20}
        delay={8}
        reverse
      >
        <Icons.redux />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        radius={radius}
        duration={20}
        delay={10}
        reverse
      >
        <Icons.typeScript />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        radius={radius}
        duration={20}
        delay={12}
        reverse
      >
        <Icons.tailwindCSS />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        radius={radius}
        duration={20}
        delay={14}
        reverse
      >
        <Icons.mongoDB />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent custom-transform"
        radius={radius}
        duration={20}
        delay={16}
        reverse
      >
        <Icons.nodeJS />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent custom-transform"
        radius={radius}
        duration={20}
        delay={18}
        reverse
      >
        <Icons.javaScript />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent custom-transform"
        radius={radius}
        duration={20}
        delay={20}
        reverse
      >
        <Icons.postMan />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  gitHub: () => (
    <div className="bg-white rounded-xl p-2 shadow-md">
      <svg width="25" height="25" viewBox="0 0 438.549 438.549">
        <path
          fill="black"
          d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
        />
      </svg>
    </div>
  ),
  reactJS: () => (
    <div className="bg-white rounded-xl p-2 shadow-md">
      <svg
        width="25"
        height="25"
        viewBox="0 0 101 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50.3067 58.8168C55.1758 58.8168 59.1229 54.8697 59.1229 50.0006C59.1229 45.1315 55.1758 41.1844 50.3067 41.1844C45.4376 41.1844 41.4905 45.1315 41.4905 50.0006C41.4905 54.8697 45.4376 58.8168 50.3067 58.8168Z"
          fill="#61DAFB"
        />
        <path
          d="M50.3066 68.0631C76.4333 68.0631 97.6132 59.9762 97.6132 50.0005C97.6132 40.0249 76.4333 31.938 50.3066 31.938C24.1799 31.938 3 40.0249 3 50.0005C3 59.9762 24.1799 68.0631 50.3066 68.0631Z"
          stroke="#61DAFB"
          strokeWidth="5"
        />
        <path
          d="M34.664 59.0318C47.7274 81.6582 65.3207 95.9571 73.9599 90.9692C82.5991 85.9814 79.0126 63.5957 65.9492 40.9693C52.8858 18.3428 35.2925 4.04395 26.6533 9.03178C18.0141 14.0196 21.6006 36.4054 34.664 59.0318Z"
          stroke="#61DAFB"
          strokeWidth="5"
        />
        <path
          d="M34.664 40.9692C21.6007 63.5956 18.0141 85.9814 26.6533 90.9692C35.2925 95.957 52.8859 81.6582 65.9492 59.0318C79.0126 36.4053 82.5991 14.0196 73.9599 9.03176C65.3208 4.04393 47.7274 18.3428 34.664 40.9692Z"
          stroke="#61DAFB"
          strokeWidth="5"
        />
      </svg>
    </div>
  ),
  nextJS: () => (
    <div className="bg-white rounded-xl p-2 shadow-md">
      <svg
        width="25"
        height="25"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 99.9996C77.6142 99.9996 100 77.6139 100 49.9996C100 22.3854 77.6142 -0.000366211 50 -0.000366211C22.3858 -0.000366211 0 22.3854 0 49.9996C0 77.6139 22.3858 99.9996 50 99.9996Z"
          fill="black"
        />
        <path
          d="M83.06 87.511L38.4122 29.9996H30V69.983H36.7298V38.546L77.7773 91.5803C79.6294 90.3405 81.394 88.9804 83.06 87.511Z"
          fill="url(#paint0_linear_790_2962)"
        />
        <path
          d="M70.5558 29.9996H63.8892V69.9996H70.5558V29.9996Z"
          fill="url(#paint1_linear_790_2962)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_790_2962"
            x1="60.5555"
            y1="64.7219"
            x2="80.2778"
            y2="89.1663"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_790_2962"
            x1="67.2225"
            y1="29.9996"
            x2="67.1109"
            y2="59.3748"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
  redux: () => (
    <div className="bg-white rounded-xl p-2 shadow-md">
      <svg
        width="25"
        height="25"
        viewBox="0 0 100 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M69.2895 66.3024C72.9798 65.9204 75.7794 62.7392 75.652 58.9212C75.5251 55.1036 72.3434 52.0493 68.5258 52.0493H68.2715C64.3262 52.1767 61.2723 55.4852 61.3997 59.4302C61.527 61.3392 62.2903 62.9935 63.4356 64.1388C59.109 72.6653 52.4918 78.9009 42.5661 84.1184C35.8215 87.6817 28.8227 88.9544 21.8238 88.0638C16.0973 87.3001 11.6434 84.7552 8.84336 80.5552C4.77148 74.3196 4.38984 67.5747 7.82579 60.8302C10.2438 55.9942 14.0609 52.431 16.4789 50.6493C15.9699 48.995 15.2063 46.1954 14.8246 44.1595C-3.62735 57.5216 -1.71837 75.5923 3.88086 84.1184C8.08008 90.4817 16.6063 94.4267 26.0231 94.4267C28.568 94.4267 31.1129 94.172 33.6582 93.536C49.9469 90.3544 62.2907 80.6825 69.2895 66.3024ZM91.6864 50.5224C82.0149 39.1962 67.7626 32.9606 51.4739 32.9606H49.4379C48.2926 30.67 45.8747 29.1427 43.2024 29.1427H42.9477C39.0032 29.27 35.9493 32.5786 36.0762 36.5239C36.2035 40.3415 39.3848 43.3958 43.2024 43.3958H43.4567C46.2563 43.2685 48.6743 41.4868 49.6922 39.0688H51.9829C61.6544 39.0688 70.8165 41.8685 79.0884 47.3407C85.4509 51.5403 90.0321 57.0126 92.577 63.6298C94.7403 68.9747 94.613 74.1923 92.3224 78.6466C88.7595 85.3911 82.7786 89.0817 74.8887 89.0817C69.7985 89.0817 64.963 87.5544 62.4176 86.4091C61.018 87.6817 58.4727 89.7177 56.6911 90.9907C62.1633 93.5356 67.7626 94.9356 73.1071 94.9356C85.3235 94.9356 94.3587 88.1907 97.7946 81.4462C101.485 74.0649 101.23 61.3392 91.6864 50.5224ZM27.041 68.4653C27.1684 72.2833 30.3496 75.3372 34.1672 75.3372H34.4219C38.3668 75.2103 41.4207 71.9013 41.2934 67.9563C41.1664 64.1384 37.9848 61.0845 34.1672 61.0845H33.9129C33.6582 61.0845 33.2762 61.0845 33.0223 61.2114C27.8047 52.5579 25.6414 43.1411 26.4051 32.9603C26.9137 25.3247 29.459 18.7071 33.9129 13.2349C37.6032 8.52627 44.7293 6.23564 49.5653 6.10869C63.054 5.854 68.7801 22.652 69.1622 29.397C70.8165 29.7786 73.6161 30.6696 75.5251 31.306C73.9977 10.6903 61.2723 0.000488281 49.0563 0.000488281C37.6032 0.000488281 27.041 8.27236 22.8414 20.4892C16.9879 36.7782 20.8055 52.431 27.9317 64.7751C27.2957 65.6657 26.9137 67.0657 27.041 68.4657V68.4653Z"
          fill="#764ABC"
        />
      </svg>
    </div>
  ),
  typeScript: () => (
    <div className="bg-white rounded-xl p-2 shadow-md">
      <svg
        width="25"
        height="25"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0.000488281H100V100H0V0.000488281Z" fill="#017ACB" />
        <path
          d="M48.0157 37.0317H52.8126V45.313H39.8438V82.1567L39.5 82.2505C39.0313 82.3755 32.8594 82.3755 31.5313 82.2349L30.4688 82.1411V45.313H17.5V37.0317L21.6094 36.9849C23.8594 36.9536 29.6406 36.9536 34.4532 36.9849C39.2657 37.0161 45.3594 37.0317 48.0157 37.0317ZM84.6251 78.2505C82.7189 80.2661 80.672 81.3911 77.2657 82.313C75.7813 82.7192 75.5313 82.7349 72.1876 82.7192C68.8438 82.7036 68.5782 82.7036 66.9532 82.2817C62.7501 81.2036 59.3594 79.0942 57.0469 76.1099C56.3907 75.2661 55.3126 73.5161 55.3126 73.2974C55.3126 73.2349 55.4688 73.0942 55.6719 73.0005C55.8751 72.9067 56.2969 72.6411 56.6407 72.438C56.9844 72.2349 57.6094 71.8599 58.0313 71.6411C58.4532 71.4224 59.6719 70.7036 60.7345 70.063C61.797 69.4224 62.7657 68.9067 62.8751 68.9067C62.9845 68.9067 63.1876 69.1255 63.3438 69.3911C64.2813 70.9692 66.4688 72.9849 68.0157 73.6724C68.9688 74.0786 71.0782 74.5317 72.0938 74.5317C73.0313 74.5317 74.7501 74.1255 75.672 73.7036C76.6563 73.2505 77.1564 72.7974 77.7501 71.8911C78.1564 71.2505 78.2032 71.0786 78.1876 69.8599C78.1876 68.7349 78.1251 68.4224 77.8126 67.9067C76.9376 66.4692 75.7501 65.7192 70.9376 63.5942C65.9688 61.3911 63.7345 60.0786 61.9219 58.313C60.5782 57.0005 60.3126 56.6411 59.4688 55.0005C58.3751 52.8911 58.2344 52.2036 58.2188 49.063C58.2032 46.8599 58.2501 46.1411 58.4844 45.3911C58.8126 44.2661 59.8751 42.0942 60.3594 41.5474C61.3594 40.3755 61.7188 40.0161 62.422 39.438C64.547 37.688 67.8595 36.5317 71.0313 36.4224C71.3907 36.4224 72.5782 36.4849 73.6876 36.563C76.8751 36.8286 79.047 37.6099 81.1407 39.2817C82.7189 40.5317 85.1095 43.4692 84.8751 43.8599C84.7189 44.0942 78.4845 48.2505 78.0782 48.3755C77.8282 48.4536 77.6564 48.3599 77.3126 47.9536C75.1876 45.4067 74.3282 44.8599 72.2657 44.7349C70.797 44.6411 70.0157 44.813 69.0313 45.4692C68.0001 46.1567 67.5001 47.2036 67.5001 48.6567C67.5157 50.7817 68.3282 51.7817 71.3282 53.2661C73.2657 54.2192 74.922 55.0005 75.047 55.0005C75.2345 55.0005 79.2501 57.0005 80.297 57.6255C85.172 60.4849 87.1564 63.4224 87.672 68.4849C88.047 72.2974 86.9689 75.7817 84.6251 78.2505Z"
          fill="white"
        />
      </svg>
    </div>
  ),
  tailwindCSS: () => (
    <div className="bg-white rounded-xl p-2 shadow-md">
      <svg
        width="25"
        height="25"
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50.0002 0.000488281C36.6665 0.000488281 28.3334 6.66548 24.9996 19.9942C30.0002 13.3292 35.8337 10.8308 42.4999 12.4964C46.3039 13.4468 49.0224 16.2065 52.0323 19.2602C56.9341 24.2345 62.6075 29.9917 75.0009 29.9917C88.3334 29.9917 96.6677 23.3267 100 9.99672C95.0009 16.6617 89.1674 19.1614 82.4999 17.4958C78.6973 16.5454 75.9787 13.7856 72.9689 10.732C68.067 5.75764 62.3924 0.000488281 50.0002 0.000488281ZM24.9996 29.9917C11.6671 29.9917 3.33274 36.6567 0.000244141 49.9866C4.99962 43.3217 10.8331 40.822 17.5006 42.4888C21.3032 43.4405 24.0218 46.199 27.0316 49.2514C31.9335 54.2257 37.6081 59.9841 50.0002 59.9841C63.334 59.9841 71.6671 53.3191 75.0009 39.9892C70.0002 46.6542 64.1668 49.1538 57.5006 47.487C53.6966 46.5379 50.9781 43.7768 47.9682 40.7244C43.0664 35.7501 37.393 29.9917 24.9996 29.9917Z"
          fill="#06B6D4"
        />
      </svg>
    </div>
  ),
  mongoDB: () => (
    <div className="bg-white rounded-xl p-2 shadow-md">
      <svg
        width="25"
        height="25"
        viewBox="0 0 45 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.1455 0.27356L24.8141 5.28569C25.414 6.21062 26.064 7.02931 26.8295 7.79175C29.074 10.0082 31.1661 12.3739 33.0916 14.8725C37.6131 20.8095 40.6629 27.4028 42.8409 34.5335C44.1471 38.8894 44.8564 43.3578 44.9095 47.8763C45.1282 61.3846 40.4973 72.9838 31.1605 82.6237C29.6417 84.1524 28.001 85.5548 26.2546 86.8171C25.3296 86.8171 24.8922 86.1078 24.511 85.4547C23.8167 84.2437 23.3547 82.9137 23.1486 81.5331C22.8205 79.8989 22.6048 78.2646 22.7111 76.5772V75.8148C22.6361 75.6523 21.8205 0.657906 22.1455 0.27356Z"
          fill="#599636"
        />
        <path
          d="M22.1455 0.10799C22.0361 -0.110744 21.9268 0.0548687 21.8174 0.161111C21.8705 1.25478 21.4893 2.22971 20.8925 3.16089C20.2363 4.08582 19.3676 4.79514 18.4958 5.55759C13.6524 9.75103 9.84015 14.8163 6.78725 20.4815C2.72504 28.1059 0.631444 36.2772 0.037737 44.8797C-0.234118 47.9826 1.01892 58.9318 1.99697 62.0909C4.66553 70.4778 9.45893 77.5054 15.6679 83.6049C17.1927 85.0736 18.8239 86.436 20.5113 87.7453C21.0018 87.7453 21.055 87.3078 21.1675 86.9828C21.3825 86.2874 21.5465 85.5773 21.658 84.858L22.7517 76.6898L22.1455 0.10799Z"
          fill="#6CAC48"
        />
        <path
          d="M24.814 90.1357C24.9234 88.8858 25.5234 87.8484 26.1765 86.8141C25.5203 86.5422 25.0328 86.0016 24.6516 85.3986C24.3228 84.8276 24.0507 84.2258 23.8391 83.6018C23.0767 81.3145 22.9142 78.9147 22.6955 76.5774V75.1619C22.4236 75.3806 22.3673 77.2305 22.3673 77.5054C22.2083 79.9758 21.8805 82.4324 21.3862 84.858C21.2237 85.8391 21.1143 86.8172 20.5112 87.689C20.5112 87.7984 20.5112 87.9077 20.5644 88.0702C21.5455 90.9575 21.8143 93.8979 21.9799 96.8945V97.9882C21.9799 99.2943 21.9268 99.0194 23.0111 99.4568C23.4485 99.6193 23.936 99.6756 24.3735 100.001C24.7016 100.001 24.7547 99.7287 24.7547 99.5099L24.5922 97.7132V92.7011C24.5391 91.8262 24.7016 90.9575 24.8109 90.1388L24.814 90.1357Z"
          fill="#C2BFBF"
        />
      </svg>
    </div>
  ),
  nodeJS: () => (
    <div className="bg-white rounded-xl p-2 shadow-md">
      <svg
        width="25"
        height="25"
        viewBox="0 0 91 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M41.2785 1.06735C43.758 -0.351924 46.9876 -0.358335 49.465 1.06735C61.9286 8.10993 74.3961 15.1415 86.8576 22.1883C89.2014 23.5086 90.7692 26.1171 90.7454 28.8178V71.1886C90.7628 74.0012 89.0401 76.672 86.5673 77.9623C74.1447 84.9661 61.7285 91.9784 49.308 98.9821C46.7772 100.429 43.4827 100.318 41.031 98.7521C37.3067 96.5931 33.576 94.4447 29.8513 92.2879C29.0902 91.8341 28.2322 91.473 27.6948 90.735C28.1699 90.0947 29.0193 90.0149 29.7096 89.7353C31.2642 89.241 32.692 88.4475 34.1202 87.6775C34.4813 87.4303 34.9222 87.525 35.2684 87.7462C38.4531 89.5722 41.6097 91.4513 44.8051 93.2598C45.4868 93.6534 46.177 93.1309 46.7597 92.8061C58.9501 85.9163 71.1555 79.0525 83.3438 72.1606C83.7954 71.9433 84.0451 71.4639 84.0084 70.9692C84.0169 56.992 84.0105 43.0123 84.0126 29.035C84.0643 28.4737 83.7395 27.9576 83.232 27.7279C70.8524 20.7562 58.4793 13.7738 46.1019 6.80035C45.8874 6.65292 45.6334 6.57382 45.3732 6.57344C45.1129 6.57306 44.8587 6.65141 44.6438 6.79821C32.2664 13.7738 19.8954 20.7626 7.51799 27.734C7.01226 27.9641 6.67284 28.4716 6.73303 29.035C6.73517 43.0123 6.73303 56.992 6.73303 70.9714C6.71157 71.2127 6.76458 71.4549 6.88493 71.6652C7.00528 71.8756 7.18719 72.044 7.40616 72.1478C10.7091 74.0208 14.0164 75.8806 17.3215 77.7472C19.1834 78.7494 21.4696 79.3449 23.521 78.577C25.3314 77.9278 26.6003 76.0804 26.5658 74.1582C26.5829 60.2626 26.5573 46.3647 26.5786 32.4712C26.5334 31.8543 27.1185 31.3447 27.7183 31.4027C29.3053 31.392 30.8945 31.3814 32.4815 31.407C33.144 31.392 33.5998 32.0563 33.5179 32.6778C33.5115 46.6614 33.535 60.6454 33.5072 74.6291C33.5115 78.3559 31.9804 82.411 28.5332 84.2345C24.2864 86.4345 19.0374 85.9679 14.8419 83.8584C11.2099 82.0456 7.7438 79.9062 4.17621 77.9641C1.69702 76.6809 -0.017145 73.9994 0.000306541 71.189V28.8178C-0.0256927 26.0611 1.60442 23.4053 4.02128 22.1043C16.4418 15.0948 28.8601 8.08001 41.2785 1.06735Z"
          fill="#8CC84B"
        />
        <path
          d="M52.1141 30.4179C57.5312 30.0692 63.3304 30.2113 68.2051 32.88C71.9793 34.925 74.0717 39.217 74.1383 43.41C74.0329 43.9756 73.4416 44.2876 72.9017 44.2488C71.33 44.2466 69.7579 44.2701 68.1862 44.2381C67.5195 44.2637 67.132 43.649 67.0483 43.0596C66.5967 41.0534 65.5026 39.0664 63.6143 38.0987C60.7156 36.6474 57.3545 36.7204 54.1937 36.7507C51.8862 36.8732 49.4048 37.073 47.4499 38.4299C45.9491 39.4578 45.4932 41.5327 46.0289 43.2038C46.5339 44.4037 47.919 44.7908 49.0522 45.1477C55.5805 46.8551 62.4985 46.6852 68.9021 48.9322C71.5533 49.8482 74.1468 51.629 75.0543 54.4048C76.2414 58.1252 75.721 62.5721 73.0741 65.5589C70.9276 68.0167 67.8012 69.3544 64.6831 70.0809C60.535 71.0059 56.2302 71.0294 52.0176 70.6187C48.0564 70.1671 43.9343 69.1264 40.8764 66.4275C38.2615 64.157 36.9843 60.6194 37.1111 57.2049C37.1414 56.6283 37.7155 56.2262 38.2679 56.2736C39.8507 56.2608 41.4334 56.2565 43.0162 56.2757C43.6483 56.2305 44.117 56.7768 44.1494 57.3727C44.4415 59.2841 45.1598 61.2903 46.8266 62.4236C50.0434 64.4989 54.0797 64.3568 57.7631 64.4149C60.8146 64.2795 64.2401 64.2386 66.7303 62.2217C68.0441 61.0713 68.4334 59.1467 68.0783 57.4909C67.6937 56.093 66.2313 55.4416 64.9755 55.0156C58.5309 52.977 51.5357 53.7167 45.1534 51.4114C42.5624 50.4957 40.0569 48.7644 39.0614 46.1025C37.6724 42.3351 38.3089 37.6752 41.2333 34.7893C44.0846 31.9187 48.2007 30.8132 52.1141 30.4175V30.4179Z"
          fill="#8CC84B"
        />
      </svg>
    </div>
  ),
  javaScript: () => (
    <div className="bg-white rounded-xl p-2 shadow-md">
      <svg
        width="25"
        height="25"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100 0.000488281H0V100H100V0.000488281Z" fill="#F7DF1E" />
        <path
          d="M67.1745 78.1259C69.1888 81.4148 71.8094 83.8323 76.4444 83.8323C80.338 83.8323 82.8253 81.8862 82.8253 79.1973C82.8253 75.9751 80.2698 74.8339 75.9841 72.9592L73.6348 71.9513C66.8539 69.0624 62.3491 65.4434 62.3491 57.7926C62.3491 50.745 67.719 45.3799 76.111 45.3799C82.0856 45.3799 86.3809 47.4592 89.4761 52.9037L82.1586 57.6021C80.5475 54.7132 78.8094 53.5751 76.111 53.5751C73.3587 53.5751 71.6142 55.3212 71.6142 57.6021C71.6142 60.4212 73.3602 61.5624 77.392 63.3085L79.7412 64.3148C87.7253 67.7386 92.2333 71.2291 92.2333 79.0767C92.2333 87.537 85.5872 92.1719 76.6618 92.1719C67.9348 92.1719 62.2967 88.0132 59.538 82.5624L67.1745 78.1259ZM33.9793 78.9402C35.4555 81.5592 36.7983 83.7735 40.0269 83.7735C43.1142 83.7735 45.0618 82.5656 45.0618 77.8688V45.9164H54.4586V77.9958C54.4586 87.7259 48.7539 92.1545 40.4269 92.1545C32.9031 92.1545 28.546 88.2608 26.3301 83.5712L33.9793 78.9402Z"
          fill="black"
        />
      </svg>
    </div>
  ),
  postMan: () => (
    <div className="bg-white rounded-xl p-2 shadow-md">
      <svg
        width="25"
        height="25"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M89.5728 19.4399C83.5282 11.6126 75.2981 5.75362 65.9235 2.60398C56.5488 -0.545654 46.4507 -0.84447 36.9062 1.74533C27.3617 4.33512 18.7996 9.6972 12.3027 17.1534C5.80588 24.6096 1.66609 33.825 0.406949 43.6341C-0.852194 53.4433 0.825867 63.4055 5.2289 72.2608C9.63194 81.1162 16.5622 88.4669 25.1431 93.3834C33.7241 98.2999 43.5703 100.561 53.4365 99.8814C63.3027 99.2016 72.7457 95.6112 80.5713 89.5643C102.415 72.6832 106.446 41.2913 89.5712 19.4399H89.5728Z"
          fill="#FF6C37"
        />
        <path
          d="M66.8634 31.8587L45.7808 53.1085L39.8231 46.9836C60.5728 26.2337 62.6556 28.1087 66.8649 31.8587H66.8634Z"
          fill="white"
        />
        <path
          d="M45.781 53.6896C45.5942 53.685 45.4159 53.6109 45.281 53.4818L39.281 47.4818C39.1459 47.342 39.0704 47.1552 39.0704 46.9608C39.0704 46.7663 39.1459 46.5795 39.281 46.4397C59.7387 25.982 62.5308 26.9398 67.3636 31.3148C67.4445 31.3796 67.5092 31.4623 67.5526 31.5564C67.596 31.6505 67.6169 31.7534 67.6136 31.857C67.6448 32.0601 67.5667 32.2679 67.4058 32.3992L46.3232 53.4834C46.1753 53.6189 45.9815 53.6932 45.781 53.6912V53.6896ZM40.8638 46.9818L45.781 51.899L65.7808 31.8992C65.0903 31.0338 64.1049 30.4533 63.0133 30.2688C61.9216 30.0843 60.8002 30.3088 59.8637 30.8992C56.2387 32.5242 50.4059 37.4819 40.8638 46.9818Z"
          fill="#FF6C37"
        />
        <path
          d="M51.823 58.9833L46.073 53.1084L67.1557 32.2743C72.8229 37.8164 64.4057 47.0663 51.823 58.9817V58.9833Z"
          fill="white"
        />
        <path
          d="M51.8231 59.7333C51.6387 59.7186 51.4636 59.6459 51.3231 59.5255L45.4482 53.7756C45.3601 53.5619 45.3601 53.322 45.4482 53.1084C45.3857 52.933 45.3857 52.7415 45.4482 52.5662L66.5308 31.4836C66.6774 31.3459 66.871 31.2692 67.0722 31.2692C67.2734 31.2692 67.467 31.3459 67.6136 31.4836C68.2964 32.112 68.8358 32.8801 69.1952 33.7356C69.5546 34.5911 69.7255 35.5139 69.6964 36.4414C69.6964 42.0663 63.2793 49.149 52.3637 59.4833C52.2179 59.6276 52.026 59.7161 51.8216 59.7333H51.8231ZM47.156 53.1084L51.8637 57.8146C60.1965 49.9397 68.1558 41.8148 68.1964 36.3148C68.2417 35.1489 67.8563 34.007 67.1136 33.107L47.156 53.1084Z"
          fill="#FF6C37"
        />
        <path
          d="M39.9888 47.1084L44.1559 51.2756C44.1825 51.299 44.2038 51.3279 44.2184 51.3602C44.233 51.3926 44.2406 51.4276 44.2406 51.4631C44.2406 51.4986 44.233 51.5336 44.2184 51.5659C44.2038 51.5983 44.1825 51.6271 44.1559 51.6506L35.3638 53.5256C35.1864 53.5639 35.0012 53.5431 34.8366 53.4665C34.672 53.3898 34.537 53.2615 34.4521 53.1011C34.3671 52.9406 34.337 52.7567 34.3662 52.5775C34.3954 52.3983 34.4824 52.2336 34.6139 52.1084L39.7388 47.0256C39.7388 47.0256 39.906 47.0256 39.9888 47.1084Z"
          fill="white"
        />
        <path
          d="M35.156 54.3584C34.8782 54.3549 34.6059 54.2803 34.3652 54.1416C34.1245 54.0029 33.9234 53.8048 33.781 53.5662C33.6208 53.264 33.5627 52.9181 33.6153 52.5802C33.668 52.2422 33.8286 51.9304 34.0732 51.6913L39.1559 46.5663C39.3392 46.4025 39.5765 46.3119 39.8223 46.3119C40.0682 46.3119 40.3054 46.4025 40.4887 46.5663L44.6559 50.7334C44.9027 50.9678 44.9996 51.3225 44.9059 51.6506C44.8121 51.9787 44.5371 52.2397 44.1981 52.3178L35.406 54.1928L35.156 54.3584ZM39.8231 48.0257L35.1154 52.7334L42.9074 51.0663L39.8231 48.0257Z"
          fill="#FF6C37"
        />
        <path
          d="M78.073 20.1494C75.0573 17.24 70.3198 17.1182 67.1573 19.8635C63.9948 22.6087 63.4541 27.3212 65.9166 30.7118C68.3792 34.1024 73.0214 35.0524 76.6152 32.8993L70.9479 27.2321L78.073 20.1494Z"
          fill="white"
        />
        <path
          d="M72.448 34.8148C70.7154 34.7926 69.0277 34.2611 67.5951 33.2864C66.1626 32.3117 65.0485 30.937 64.3917 29.3336C63.7354 27.7314 63.5633 25.972 63.8965 24.273C64.2298 22.5739 65.0538 21.0099 66.2667 19.7743C67.9349 18.1368 70.1791 17.2194 72.5167 17.2194C74.8543 17.2194 77.0986 18.1368 78.7667 19.7743C78.9261 19.9087 79.0167 20.1071 79.0167 20.3165C79.0163 20.4195 78.9938 20.5212 78.9507 20.6148C78.9076 20.7083 78.8448 20.7915 78.7667 20.8587L72.0167 27.2336L77.1417 32.2758C77.2248 32.3551 77.2871 32.4535 77.3233 32.5625C77.3596 32.6714 77.3686 32.7876 77.3495 32.9008C77.3372 33.01 77.301 33.1152 77.2435 33.2089C77.186 33.3026 77.1086 33.3825 77.0167 33.443C75.6399 34.3036 74.0571 34.7785 72.4339 34.818L72.448 34.8148ZM72.448 18.6478C69.4792 18.6634 66.823 20.4493 65.7089 23.179C64.5949 25.9087 65.2011 29.0508 67.2824 31.1477C68.3176 32.1889 69.6431 32.8932 71.0853 33.1684C72.5276 33.4436 74.0193 33.2768 75.3652 32.6899L70.448 27.7727C70.3698 27.7102 70.3067 27.6309 70.2633 27.5407C70.22 27.4505 70.1975 27.3517 70.1975 27.2516C70.1975 27.1515 70.22 27.0527 70.2633 26.9625C70.3067 26.8723 70.3698 26.793 70.448 26.7305L76.948 20.1884C75.6559 19.1981 74.0759 18.6566 72.448 18.6462V18.6478Z"
          fill="#FF6C37"
        />
        <path
          d="M78.1977 20.2743L71.0729 27.357L76.7399 33.0241C77.3103 32.6967 77.8414 32.3051 78.3227 31.857C79.808 30.287 80.6252 28.2014 80.6019 26.0404C80.5786 23.8793 79.7165 21.8118 78.1977 20.2743Z"
          fill="white"
        />
        <path
          d="M76.6135 33.6493C76.5199 33.6544 76.4263 33.6383 76.3398 33.6023C76.2532 33.5664 76.1759 33.5114 76.1135 33.4415L70.4463 27.7743C70.3682 27.7118 70.3051 27.6325 70.2617 27.5423C70.2183 27.4521 70.1958 27.3533 70.1958 27.2532C70.1958 27.1532 70.2183 27.0544 70.2617 26.9641C70.3051 26.8739 70.3682 26.7947 70.4463 26.7322L77.5291 19.7744C77.5975 19.6712 77.6904 19.5866 77.7994 19.5281C77.9085 19.4696 78.0303 19.439 78.1541 19.439C78.2778 19.439 78.3997 19.4696 78.5087 19.5281C78.6178 19.5866 78.7107 19.6712 78.7791 19.7744C79.6106 20.5891 80.2711 21.5615 80.7221 22.6347C81.173 23.7079 81.4053 24.8603 81.4053 26.0243C81.4053 27.1884 81.173 28.3408 80.7221 29.414C80.2711 30.4872 79.6106 31.4596 78.7791 32.2743C78.2886 32.7945 77.7274 33.2432 77.1119 33.6071C76.9569 33.6852 76.7778 33.7003 76.6119 33.6493H76.6135ZM72.0307 27.2337L76.7385 31.9415C77.0623 31.7145 77.3689 31.4638 77.6556 31.1915C79.0396 29.8113 79.8191 27.9382 79.8228 25.9837C79.826 24.2346 79.1885 22.5448 78.0306 21.2338L72.0307 27.2337Z"
          fill="#FF6C37"
        />
        <path
          d="M67.7386 32.7336C67.1742 32.2037 66.4292 31.9087 65.655 31.9087C64.8808 31.9087 64.1358 32.2037 63.5714 32.7336L44.6981 51.5648L47.8231 54.732L67.7808 37.2321C68.0851 36.9404 68.3265 36.5894 68.4902 36.2009C68.6538 35.8124 68.7362 35.3945 68.7322 34.9729C68.7283 34.5514 68.6381 34.1351 68.4672 33.7497C68.2963 33.3643 68.0483 33.018 67.7386 32.7321V32.7336Z"
          fill="white"
        />
        <path
          d="M47.6559 55.4834C47.4692 55.4788 47.2909 55.4047 47.1559 55.2756L43.9888 52.1085C43.8537 51.9686 43.7782 51.7818 43.7782 51.5874C43.7782 51.3929 43.8537 51.2061 43.9888 51.0663L62.8636 32.2743C63.4073 31.7313 64.1015 31.3641 64.8564 31.2205C65.6112 31.0768 66.3918 31.1632 67.0969 31.4685C67.802 31.7739 68.3991 32.284 68.8108 32.9328C69.2225 33.5815 69.4298 34.339 69.4057 35.107C69.3841 35.6283 69.2587 36.1401 69.0368 36.6123C68.8149 37.0845 68.501 37.5076 68.1136 37.857L48.1559 55.3569C48.0108 55.4596 47.8324 55.5042 47.6559 55.4819V55.4834ZM45.4482 51.5647L47.5309 53.6897L67.1136 36.6477C67.598 36.2258 67.887 35.6227 67.9058 34.9805C67.9245 34.3383 67.6714 33.7102 67.198 33.2727C66.7608 32.8373 66.1689 32.5929 65.5519 32.5929C64.9349 32.5929 64.343 32.8373 63.9058 33.2727L45.4482 51.5647Z"
          fill="#FF6C37"
        />
        <path
          d="M30.0733 73.0239C30.02 73.0964 29.9913 73.184 29.9913 73.2739C29.9913 73.3639 30.02 73.4515 30.0733 73.5239L30.9061 77.1489C30.9395 77.3622 30.9079 77.5807 30.8153 77.7757C30.7228 77.9708 30.5737 78.1335 30.3874 78.2427C30.2017 78.3512 29.9864 78.3981 29.7725 78.3765C29.5585 78.3549 29.3569 78.2659 29.1968 78.1223L23.489 72.6224L41.281 54.6897H47.4481L51.6152 58.8569C45.1149 64.5403 37.8669 69.3069 30.0733 73.0239Z"
          fill="white"
        />
        <path
          d="M29.6983 79.1488C29.2264 79.1394 28.7608 78.9457 28.4483 78.6066L22.9905 73.1488C22.9124 73.0863 22.8492 73.0071 22.8059 72.9169C22.7625 72.8266 22.74 72.7278 22.74 72.6278C22.74 72.5277 22.7625 72.4289 22.8059 72.3387C22.8492 72.2485 22.9124 72.1692 22.9905 72.1067L40.906 54.149C41.0063 54.0424 41.1374 53.9698 41.281 53.9412H47.4887C47.6505 53.884 47.827 53.884 47.9887 53.9412L52.1559 58.1084C52.2351 58.1814 52.2954 58.2726 52.3316 58.3741C52.3678 58.4757 52.3788 58.5845 52.3637 58.6912C52.3666 58.7947 52.3456 58.8975 52.3022 58.9916C52.2589 59.0856 52.1943 59.1684 52.1137 59.2334L51.7809 59.5255C45.2543 64.9666 38.0738 69.5715 30.4061 73.2332L31.1983 76.6082C31.2595 76.8685 31.2618 77.1393 31.2051 77.4007C31.1484 77.662 31.034 77.9075 30.8704 78.119C30.7068 78.3306 30.498 78.5029 30.2592 78.6235C30.0205 78.7441 29.7579 78.8098 29.4905 78.816L29.6983 79.1488ZM24.6155 72.6067L29.5311 77.5644C29.5769 77.6053 29.6361 77.6279 29.6975 77.6279C29.7589 77.6279 29.8181 77.6053 29.8639 77.5644C29.8945 77.5219 29.911 77.4708 29.911 77.4183C29.911 77.3659 29.8945 77.3148 29.8639 77.2723L29.0311 73.6473C28.9655 73.3871 28.9918 73.1123 29.1058 72.8694C29.2197 72.6264 29.4141 72.4304 29.6561 72.3145C37.1176 68.7016 44.113 64.1963 50.4887 58.8974L47.0716 55.4803H41.4888L24.6155 72.6067Z"
          fill="#FF6C37"
        />
        <path
          d="M19.1984 76.8988L23.3655 72.7317L29.7827 79.1488L19.5749 78.441C19.3997 78.4272 19.2332 78.3585 19.0994 78.2446C18.9655 78.1306 18.871 77.9773 18.8295 77.8065C18.7879 77.6357 18.8013 77.4561 18.8678 77.2934C18.9344 77.1307 19.0506 76.9931 19.2 76.9004L19.1984 76.8988Z"
          fill="white"
        />
        <path
          d="M29.906 79.7739L19.739 79.0661C19.1359 79.0098 18.6171 78.5973 18.4046 78.0458C18.1921 77.4942 18.3218 76.8395 18.739 76.3989L22.9061 72.2317C23.046 72.0966 23.2328 72.0211 23.4272 72.0211C23.6216 72.0211 23.8085 72.0966 23.9483 72.2317L30.3232 78.6067C30.4115 78.7276 30.459 78.8734 30.459 79.0231C30.459 79.1728 30.4115 79.3186 30.3232 79.4395C30.2268 79.5953 30.0794 79.713 29.906 79.7723V79.7739ZM19.739 77.4411L28.0717 77.9832L23.4889 73.6911L19.739 77.4411Z"
          fill="#FF6C37"
        />
        <path
          d="M48.0308 55.1928L39.6138 56.485L44.4887 51.6522L48.0308 55.1928Z"
          fill="white"
        />
        <path
          d="M39.6138 57.274C39.4739 57.2777 39.336 57.2401 39.2174 57.1659C39.0987 57.0917 39.0046 56.9842 38.9466 56.8569C38.8579 56.7362 38.8101 56.5903 38.8101 56.4405C38.8101 56.2906 38.8579 56.1448 38.9466 56.024L43.7793 51.149C43.9259 51.0113 44.1196 50.9346 44.3207 50.9346C44.5219 50.9346 44.7155 51.0113 44.8621 51.149L48.4058 54.6897C48.4766 54.8019 48.5141 54.932 48.5141 55.0647C48.5141 55.1974 48.4766 55.3274 48.4058 55.4397C48.371 55.5765 48.2976 55.7004 48.1942 55.7966C48.0909 55.8927 47.962 55.9571 47.823 55.9819L39.4904 57.274H39.6138ZM44.4887 52.7319L41.7809 55.4397L46.448 54.7319L44.4887 52.7319Z"
          fill="#FF6C37"
        />
        <path
          d="M48.0309 55.1898L42.156 55.9398C41.9988 55.9755 41.8342 55.9596 41.6868 55.8944C41.5393 55.8292 41.4168 55.7182 41.3374 55.578C41.2579 55.4377 41.2258 55.2755 41.2458 55.1155C41.2657 54.9555 41.3367 54.8063 41.4482 54.6898L44.4903 51.6476L48.0309 55.1898Z"
          fill="white"
        />
        <path
          d="M41.9888 56.7335C41.7165 56.7308 41.4497 56.6562 41.2156 56.517C40.9815 56.3779 40.7884 56.1792 40.656 55.9413C40.4969 55.6561 40.4352 55.3267 40.4803 55.0032C40.5254 54.6798 40.6749 54.3799 40.906 54.1491L43.9482 51.1069C44.0948 50.9692 44.2884 50.8925 44.4896 50.8925C44.6907 50.8925 44.8844 50.9692 45.031 51.1069L48.5731 54.6491C48.6785 54.7489 48.7526 54.8771 48.7865 55.0182C48.8204 55.1593 48.8127 55.3072 48.7642 55.444C48.7158 55.5808 48.6287 55.7006 48.5135 55.7888C48.3983 55.8771 48.26 55.93 48.1153 55.9413L42.2826 56.6913L41.9888 56.7335ZM41.9888 55.1913L46.406 54.6491L44.4482 52.6913L41.9482 55.1913H41.9888ZM78.2385 25.0665C78.16 24.935 78.036 24.8369 77.8899 24.7908C77.7439 24.7447 77.5861 24.7539 77.4463 24.8165C77.3773 24.8514 77.3161 24.8999 77.2662 24.9589C77.2162 25.0179 77.1787 25.0864 77.1557 25.1602C77.1093 25.3092 77.1239 25.4705 77.1963 25.6087C77.4885 26.2227 77.4072 26.9493 76.9885 27.4836C76.9365 27.5351 76.8957 27.5968 76.8688 27.6649C76.8419 27.7329 76.8295 27.8058 76.8322 27.879C76.8338 28.0255 76.8894 28.1663 76.9885 28.2743C77.0954 28.3165 77.2144 28.3165 77.3213 28.2743C77.4183 28.2986 77.5202 28.296 77.6158 28.2665C77.7114 28.237 77.7971 28.1819 77.8635 28.1071C78.2066 27.687 78.4239 27.1784 78.4902 26.6401C78.5566 26.1018 78.4693 25.5557 78.2385 25.0649V25.0665Z"
          fill="#FF6C37"
        />
      </svg>
    </div>
  ),
};
