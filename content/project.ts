// content/project.ts

export type ProjectImage = {
  src: string;
  alt: string;
  bg?: "dark" | "light";
};

export type ImagePair = {
  label: string; // e.g. "Flight Controller"
  left: ProjectImage; // schematic
  right: ProjectImage; // top view
};

export type Project = {
  slug: "drone" | "ethernet" | "usb";
  title: string;
  subtitle: string;
  tags: string[];
  highlights: string[];
  pairs: ImagePair[]; // groups of 2
};

export const projects: Project[] = [
  {
      slug: "ethernet",
      title: "High Power Battery Managment/Leveling/Monitoring System with Power distribution",
      subtitle:
        "High Power (220+ Amps) Battery Management System with integrated power distribution and monitoring, designed for UAARG (University of Alberta Arial Robotics Group).",
      tags: ["High Power", "LTspice", "Altium", "C++"],
      highlights: [
        "Design takes in up to 4 6s LiPo batteries and outputs a 25.2V bus for powering a high-power drone, with integrated battery management features including cell balancing, overcurrent protection, and real-time monitoring.",
        "Designed around a BQ76952PFBR BMU IC to monitor cells and communicate with the MCU.",
        "Design uses a busbar for taking power from inputs to main outputs, as it provides a low resistance path for high currents and helps with heat dissipation.",
        "Communication and configuration with a STM32G474 MCU, and a ILI9341 display for QOL",
        "Design features a MOSFETS + Controller to act as an ideal diode to allow batteries to provide power to the bus while preventing backflow",
        "Design features PFETs to precharge ESC capacitors to avoid sparks upon connection.",
      ],
      pairs: [
        {
          label: "High Power BMU & PD Unit",
          left: { src: "/Top Level Diagram.png", alt: "Top Level Diagram", bg: "light" },
          right: { src: "/BMU_Top.png", alt: "BMU top view", bg: "dark" },
        },
                {
          label: "",
          left: { src: "/BMU_IC_Schematic.png", alt: "BMU IC with Battery Schematic", bg: "light" },
          right: { src: "/BMU_bottom.png", alt: "BMU bottom view", bg: "light" },
        },
                        {
          label: "",
          left: { src: "/Main_MCU.png", alt: "Main MCU Schematic", bg: "light" },
          right: { src: "/BMU_side.png", alt: "BMU isometric side view", bg: "dark" },
        },
      ],
    },
  {
    slug: "drone",
    title: "Custom Quadcopter Electronics Stack",
    subtitle:
      "Design features a central flight controller, 4 ESCs, and a custom controller module.",
    tags: ["Altium", "LTspice", "SolidWorks", "Fusion 360", "C++"],
    highlights: [
      "Design Features a central flight controller architected around a STM32H750 MCU, with integrated IMU, barometer, GNSS, and magnetometer, along with an external NRFL01+ radio module for communication.",
      "Four discrete ESCs designed for each motor, featuring shunt-based current sensing for precise control and monitoring, built around STM32G431 MCUs and DRV8323RS Gate drivers.",
      "ESCs utilize a dshot protocol coming from the flight controller for precise motor control, with additional telemetry feedback for current and RPM monitoring.",
      "Controller module with a 2-axis joystick and USB-C port for charging and configuration, also utilizing an external NRFL01+ radio module for communication with the flight controller.",
      "Currently Designing the drone chassis and controller shell in SolidWorks and Fusion 360",
      "Currently working on developing the hardware bring-up and flight control firmware in C++ with an RTOS, implementing sensor fusion, PID control loops, and communication protocols for stable flight performance.",

    ],
    pairs: [
      {
        label: "Flight Controller",
        left: { src: "/fc_schematic.png", alt: "Flight controller schematic", bg: "light" },
        right: { src: "/fc_top.png", alt: "Flight controller top view", bg: "dark" },
      },
      {
        label: "ESC (Per Motor)",
        left: { src: "/esc_schematic.png", alt: "ESC schematic", bg: "light" },
        right: { src: "/esc_top.png", alt: "ESC top view", bg: "dark" },
      },
      {
        label: "Controller Board",
        left: { src: "/Controller_Schematic.png", alt: "Controller schematic", bg: "light" },
        right: { src: "/Controller_top.png", alt: "Controller top view", bg: "dark" },
      },
    ],
  },



  {
    slug: "ethernet",
    title: "Gigabit Ethernet Switch and PoE+ Injector",
    subtitle:
      "Multi-port PoE+ switch/injector design with controlled-impedance routing and protection-focused layout.",
    tags: ["Ethernet", "LTspice", "PoE+", "High-speed", "Length Tuning"],
    highlights: [
      "Design Features 1 Upstream Ethernet Port (Non PoE) and 4 Downstream PoE+ Ports.",
      "Designed around a KSZ9567S Ethernet IC, TPS23882B PSE PoE IC, and  STM32G07 MCU for configuration.",
      "Routed with attention to controlled-impedance routing, length tuning, and isolation between ports for signal integrity at Gigabit speeds.",
      "ESD and surge protection components placed strategically at connectors and along critical paths for safe operation and bring up.",
    ],
    pairs: [
      {
        label: "PoE Switch/Injector",
        left: { src: "/poe_schematic.png", alt: "PoE schematic", bg: "light" },
        right: { src: "/poe_top.png", alt: "PoE top view", bg: "dark" },
      },
    ],
  },

  {
    slug: "usb",
    title: "Custom USB 3.0 Hub",
    subtitle:
      "Custom USB 3.0 hub board with controlled-impedance routing and ESD protection.",
    tags: ["USB 3.0", "High-speed", "Length Tuning", "LTspice"],
    highlights: [
      "Design Features 1 Upstream USB-C 3.0 Port, 2 downstream USB-C 3.0 Ports, 2 downstream USB-A 3.0 Ports and 2 downstream HDMI 1.4 ports.",
      "Designed around a TUSB8041-Q1 Hub IC, STDP4320BA Dp Alt Mode 1:2 Splitter, TPS65987D USB-C PD Controller, and HD3SS460 Mux Controller",
      "Routed with attention to controlled-impedance routing, length tuning, and isolation between ports for signal integrity at SuperSpeed speeds.",
      "Specific differential impedence of 90Ω for USB-C and USB-A 3.0 data lines and 100Ω differential impedance for HDMI 1.4 lines, with careful length tuning to meet timing requirements and maintain signal integrity.",
      "ESD and surge protection components placed strategically at connectors and along critical paths for safe operation and bring up.",
    ],
    pairs: [
      {
        label: "USB Hub",
        left: { src: "/usb_schematic.png", alt: "USB hub schematic", bg: "light" },
        right: { src: "/usb3.0_top.png", alt: "USB 3.0 hub top view", bg: "dark" },
      },
    ],
  },
];