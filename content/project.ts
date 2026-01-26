export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  title: string;
  subtitle: string;
  tags: string[];
  highlights: string[];
  images: {
    schematic: ProjectImage;
    layout: ProjectImage;
  };
};

export const projects: Project[] = [
  {
    title: "USB 3.0 Hub & USB-C Signal Routing Board",
    subtitle: "",
    tags: ["USB 3.0", "High-Speed", "PCB Design", "Altium Designer", "Ltspice"],
    highlights: [
      "Designed the PCB schematic and Layout for a USB 3.0 hub, featuring 1 USB-C 3.0 input, 2 USB-C 3.0 outputs, 2 USB-A 3.0 outputs and 2 HDMI 1.4 outputs.",
      "Designed around a TUSB8041IPAPRQ1 HUB IC, STDP4320BA DP Alt Mode 1:2 Splitter, TPS65987DDHRSHR Mux controller, PS176 DP alt mode to HDMI Converters.",
      "Devloped with Manafacturability in mind and implemented Over-Voltage Protection and accurate impedance control for super speed lines.",
    ],
    images: {
      schematic: {
        src: "/usb3-schematic.png",
        alt: "USB 3.0 hub schematic",
      },
      layout: {
        src: "/usb3-layout.png",
        alt: "USB 3.0 hub PCB layout",
      },
    },
  },
  {
    title: "24V FOC-Capable BLDC Motor Controller",
    subtitle: "",
    tags: ["PCB Design", "Power Electronics", "Motor Control", "Altium Designer", "LTspice"],
    highlights: [
      "Designed the schematic and PCB layout for a 24V, FOC-capable BLDC controller around STM32G4 microcontroller and DRV8323RSRGZT gate driver IC",
      "Integrated 6-phase MOSFET power stage, gate drive, current/voltage sensing, and CAN interface.",
    ],
    images: {
      schematic: {
        src: "/bldc-schematic.png",
        alt: "BLDC motor controller schematic",
      },
      layout: {
        src: "/bldc-layout.png",
        alt: "BLDC motor controller PCB layout",
      },
    },
  },
  {
    title: "915 MHz RF Communication Board",
    subtitle: "",
    tags: ["RF", "915 MHz", "PCB Design", "Altium Designer", "LTspice"],
    highlights: [
      "Designed a 915 MHz RF communication board for short-range wireless data transmission.",
      "Integrated RF transceiver circuitry with on-board regulation and digital interfaces.",
    ],
    images: {
      schematic: {
        src: "/rf915-schematic.png",
        alt: "915 MHz RF schematic",
      },
      layout: {
        src: "/rf915-layout.png",
        alt: "915 MHz RF PCB layout",
      },
    },
  },
];
