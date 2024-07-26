"use client";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { cn } from "../../util/util";

export default function V2() {
  const projectImages = [
    {
      id: 1,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDhgeklqXoBToyh7bY_ItZZw3dqrZS4wBjS1bOgVghmFoFKrdXryvCNn0_qLOfBvMzOI&usqp=CAU",
    },
    {
      id: 2,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtpSUUe4AvBc_xLTS-DIKoOE6YBAWGqS1kEv4GMlgLipSVqHL2Fqxyc7f9uBq7OsLSSE&usqp=CAU",
    },
    {
      id: 3,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgL4wSDbplvrNdXj3QNssRA6_zV8wDf8sbVokp5x02sPiEiROctYyAS3x5tDoIHLCGJl0&usqp=CAU",
    },
    {
      id: 4,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_GSne2sWMwxN46VxWy6u6HW8aN8E30V3QOMIfRufLzY0cSGv2QO5-rTUKkPL0FPzZbY&usqp=CAU",
    },
    {
      id: 5,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGN87Cgm2rzhXg1vcF2kM4p1nQ3BrQS9SFJs7B7SUKDQG2XzwhIF5NKFE-n59-sqg5k_g&usqp=CAU",
    },
    {
      id: 6,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwzIRz1P_3hrTEmMNBvvKtwgMQhKLI2JHr6Yjoh1oxeeObxYVNLhEP1-WR5m8RNUaGG4&usqp=CAU",
    },
  ];

  const certificationImg = [
    {
      id: 1,
      img: "/p1.webp",
      link: "https://codedamn.com/certificate/verify/9a6d81b2dda1813c5c84e263aec862b87678d22b",
    },
    {
      id: 2,
      img: "/p2.webp",
      link: "https://codedamn.com/certificate/verify/999367cd82015a46ff9716f938829cde8319d8ca",
    },
    {
      id: 3,
      img: "/p3.png",
      link: "https://www.hackerrank.com/certificates/10cad37b088b",
    },
    {
      id: 4,
      img: "/p4.png",
      link: "https://www.freecodecamp.org/certification/imranh/javascript-algorithms-and-data-structures",
    },
    {
      id: 5,
      img: "/p5.png",
      link: "https://www.hackerrank.com/certificates/3bf4f19a03a3",
    },
  ];

  const firstRow = projectImages.slice(0, projectImages.length / 2);
  const secondRow = projectImages.slice(projectImages.length / 2);
  return (
    <main className="h-full lg:h-screen w-screen flex justify-center items-center flex-wrap lg:grid lg:grid-cols-6 lg:grid-rows-8 gap-6 p-4 lg:p-16">
      <Card styles={"col-span-2 row-span-6 w-fit h-fit lg:w-full lg:h-full"}>
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Experience</h2>

        <div className="mb-6 p-4 bg-[#141414] rounded-lg w-fit h-fit">
          <h3 className="text-md lg:text-xl font-semibold">
            Front-End Web Developer at Pipeline, Inc
          </h3>
          <p className="text-gray-600 flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#818cf8"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            Mar 2023 - Present
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>
              Optimized Webpack, reducing bundle size by 3x and improving load
              times by 5x
            </li>
            <li>
              Collaborated with the design team to create user-friendly
              interfaces.
            </li>
            <li>
              Implemented responsive designs and ensured cross-browser
              compatibility.
            </li>
            <li>
              Collaborated in agile, conducting code reviews and fostering
              teamwork.
            </li>
            <li>Enhanced UX by 10x through UI/UX design and user feedback.</li>
          </ul>
        </div>

        <div className="mb-6 p-4 bg-[#141414] rounded-lg w-fit h-fit">
          <h3 className="text-xl font-semibold">
            Front End Developer (Intern) at CodeBabbage
          </h3>
          <p className="text-gray-600 flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#818cf8"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            Aug 2022 - Feb 2023
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>
              Assisted in the development of web applications using JavaScript,
              React, and TypeScript.
            </li>
            <li>
              Worked closely with senior developers to learn best practices and
              improve coding skills.
            </li>
            <li>
              Participated in code reviews and contributed to team projects.
            </li>
          </ul>
        </div>
      </Card>
      <Card styles={"col-span-2 row-span-3  w-fit h-fit lg:w-full lg:h-full"}>
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">
          Core Competencies
        </h2>
        <div className="flex flex-wrap gap-4">
          <Tag text={"Javascript"}></Tag>
          <Tag text={"Typescript"}></Tag>
          <Tag text={"React"}></Tag>
          <Tag text={"Next JS"}></Tag>
          <Tag text={"TailwindCSS"}></Tag>
          <Tag text={"Redux"}></Tag>
          <Tag text={"Zustand"}></Tag>
          <Tag text={"RTL"}></Tag>
          <Tag text={"Express"}></Tag>
          <Tag text={"MongoDB"}></Tag>
          <Tag text={"Prisma"}></Tag>
          <Tag text={"Redis"}></Tag>
          <Tag text={"Redis"}></Tag>
          <Tag text={"Kafka"}></Tag>
          <Tag text={"Docker"}></Tag>
        </div>
      </Card>
      <Card styles={"col-span-2 row-span-4 w-fit h-fit lg:w-full lg:h-full"}>
        <h2 className="text-2xl font-bold mb-4 pt-4 text-indigo-400">
          Educational Qualifications
        </h2>

        <div className="mt-8 p-4 bg-[#141414] rounded-lg flex flex-col">
          <h3 className="text-xl font-semibold">
            Diploma in Computer Technology
          </h3>
          <p className="text-gray-400 py-1">Patuakhali Polytechnic Institute</p>
          <p className="text-gray-400 py-1">CGPA: 3.64 out of 4.00</p>
          <p className="text-gray-600 flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#818cf8"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            2018-2023
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>
              Learned fundamentals of computer science, software development,
              and networking.
            </li>
            <li>
              Completed various projects on web development, database
              management, and software engineering.
            </li>
            <li>Participated in coding competitions and workshops.</li>
          </ul>
        </div>
      </Card>
      <Card
        styles={
          "col-span-2 row-span-4 flex justify-center items-center overflow-hidden  w-fit h-fit lg:w-full lg:h-full"
        }
      >
        {/* Profile */}
        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            <Image
              src={"/pp .png"}
              width={100}
              height={100}
              alt="Picture of the author"
              className="object-cover rounded-lg"
            ></Image>
            <div>
              <div className="bg-[#191919] px-4 py-2 rounded-3xl text-gray-300 flex items-center gap-2">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available To Work
              </div>

              <h2 className="p-2 font-semibold text-2xl">Md Imran Hossen</h2>

              <span className="p-2 text-gray-400 text-sm lg:text-md">
                Im a
                <span className="text-indigo-500 px-2 font-medium">
                  <Typewriter
                    words={["Software Engineer", "Marathon Runner"]}
                    cursor
                    loop={false}
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  ></Typewriter>
                </span>
              </span>
            </div>
          </div>

          <div className="w-full bg-[#141414] my-4 p-2 py-4 rounded-lg flex flex-wrap gap-2">
            <Tag
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              }
              text={"Dhaka"}
            ></Tag>

            <Tag
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              }
              text={"English & Bengali"}
            ></Tag>

            <Tag
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>
              }
              text={"Computer Technology"}
            ></Tag>

            <Tag
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                  />
                </svg>
              }
              text={"PPI"}
            ></Tag>
          </div>

          <div className="grid grid-cols-2 gap-2 p-2 pt-4 text-gray-300">
            <a
              href="/Md Imran Hossen Resume .pdf"
              target="_blank"
              className="px-2 py-3 rounded-md bg-[#1F1F1F] w-full text-sm lg:text-md flex justify-center items-center gap-2"
            >
              <span className="text-indigo-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                  />
                </svg>
              </span>
              Download Resume
            </a>
            <a
              href="https://www.linkedin.com/in/imranhc0/"
              target="_blank"
              className="px-2 py-3 rounded-md bg-[#1F1F1F] w-full flex items-center gap-2 justify-center text-sm lg:text-md"
            >
              <span className="text-indigo-400 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    fill="#818cf8"
                    d="M20.25 2.25H3.75a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h16.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5zM9 16.5a.75.75 0 1 1-1.5 0v-6a.75.75 0 1 1 1.5 0v6zM8.25 9a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25zm9 7.5a.75.75 0 1 1-1.5 0v-3.375a1.875 1.875 0 1 0-3.75 0V16.5a.75.75 0 1 1-1.5 0v-6a.75.75 0 0 1 1.48-.167 3.375 3.375 0 0 1 5.27 2.792V16.5z"
                  />
                </svg>
              </span>
              Linkedin
            </a>
          </div>
        </div>
      </Card>

      <Card styles={"col-span-2 row-span-4 w-fit h-fit lg:w-full lg:h-full"}>
        <h2 className="text-2xl font-bold  text-indigo-400">Projects</h2>
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((item) => (
              <MarqueeCard key={item.id} {...item} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((item) => (
              <MarqueeCard key={item.id} {...item} />
            ))}
          </Marquee>
        </div>
      </Card>
      <Card styles={"col-span-2 row-span-2 w-fit h-fit lg:w-full lg:h-full"}>
        <h2 className="text-2xl font-bold  text-indigo-400">Certifications</h2>
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
          <Marquee pauseOnHover className="[--duration:20s]">
            {certificationImg.map((item) => (
              <MarqueeCard key={item.id} {...item} />
            ))}
          </Marquee>
        </div>
      </Card>
      <Card styles={"col-span-2 row-span-1 w-fit h-fit lg:w-full lg:h-full"}>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <a
            href="fb.com/imranhc0"
            target="_blank"
            className="px-4 py-3 rounded-md bg-[#1F1F1F] text-sm lg:text-md flex justify-center items-center gap-2"
          >
            <span className="text-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                fill="#a78bfa"
                height="25"
                viewBox="0 0 30 30"
              >
                <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
              </svg>
            </span>
            Facebook
          </a>
          <a
            href="/Md Imran Hossen Resume .pdf"
            target="_blank"
            className="px-4 py-3 rounded-md bg-[#1F1F1F] text-sm lg:text-md flex justify-center items-center gap-2"
          >
            <span className="text-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="none"
              >
                <path
                  fill="#A291FD"
                  d="M12.5 2.9c-5.301 0-9.6 4.298-9.6 9.6a9.54 9.54 0 0 0 1.37 4.92L2.985 22.1l4.78-1.255A9.548 9.548 0 0 0 12.5 22.1c5.302 0 9.6-4.299 9.6-9.6a9.6 9.6 0 0 0-9.6-9.6zM9.214 8.022c.156 0 .317-.001.455.006.171.004.358.017.536.411.212.469.674 1.645.733 1.764.06.12.101.26.019.416-.079.16-.12.257-.235.398-.119.138-.25.309-.357.413-.12.119-.243.25-.105.487.137.238.615 1.017 1.322 1.645.908.812 1.674 1.06 1.912 1.18.239.12.377.1.514-.06.142-.155.595-.69.755-.929.156-.238.315-.197.531-.119.22.079 1.388.655 1.627.774.238.119.394.178.454.275.062.1.062.576-.136 1.131-.197.554-1.168 1.09-1.603 1.128-.439.04-.849.198-2.854-.592-2.42-.953-3.945-3.43-4.064-3.59-.12-.157-.97-1.289-.97-2.457 0-1.172.615-1.746.83-1.984a.874.874 0 0 1 .636-.297z"
                />
              </svg>
            </span>
            WhatsApp
          </a>
          <a
            href="https://github.com/imranhc0"
            target="_blank"
            className="px-4 py-3 rounded-md bg-[#1F1F1F] text-sm lg:text-md flex justify-center items-center gap-2"
          >
            <span className="text-indigo-400">
              <svg width="25" height="25" viewBox="0 0 438.549 438.549">
                <path
                  fill="#818cf8"
                  d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                />
              </svg>
            </span>
            Github
          </a>
          <a
            href="mailto:imranhosein.cse@gmail.com"
            target="_blank"
            className="px-4 py-3 rounded-md bg-[#1F1F1F] text-sm lg:text-md flex justify-center items-center gap-2"
          >
            <span className="text-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </span>
            Email
          </a>
        </div>
      </Card>
    </main>
  );
}

function Card({ children, styles }) {
  return (
    <section
      className={`w-full h-full bg-[#101010] px-4 py-4 rounded-xl border-[1px] border-gray-900 ${styles}`}
    >
      {children}
    </section>
  );
}

function Tag({ text, icon }) {
  return (
    <div className="bg-[#191919] px-4 py-2 rounded-3xl text-gray-300 flex items-center gap-1 w-fit border-[1px] border-gray-900">
      <span className="text-indigo-400">{icon}</span>
      <p>{text}</p>
    </div>
  );
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

const MarqueeCard = ({ img, link }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-2",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <a href={link} target="_blank">
          <img className="rounded-lg object-cover w-60 h-24" alt="" src={img} />
        </a>
      </div>
    </figure>
  );
};
