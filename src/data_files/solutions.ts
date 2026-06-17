import type { ImageMetadata } from "astro";

import machineHealthImage from "@images/automation/Automate-compare2.png";
import industrialMonitoringImage from "@images/use-cases/industrial-iot-data.png";
import motorDriveImage from "@images/products/motor-control-system.png";
import dataLoggerImage from "@images/dashboarddarkpng.png";
import machineAutomationImage from "@images/automation/automate-existing-process.png";
import waterQualityImage from "@images/use-cases/smart-water-pump.png";
import irrigationImage from "@images/use-cases/agriculture-irrigation.png";
import aquacultureImage from "@images/use-cases/aquaculture-monitoring.png";
import pumpProtectionImage from "@images/automation/make-equipment-smart.png";
import fieldAssetImage from "@images/iot-gateway.png";
import connectedVehicleImage from "@images/products/connected-vehicle-monitoring.png";
import fleetTrackingImage from "@images/products/connected-vehicle-coverage.png";
import vehicleGatewayImage from "@images/iot-gateway-card.png";
import driverMonitoringImage from "@images/dashboardligth.png";
import coldChainImage from "@images/automation/end-to-end-solutions.png";
import visionInspectionImage from "@images/use-cases/edge-ai-vision.png";
import objectCountingImage from "@images/Edge_computing_infrastructure.png";
import safetyCameraImage from "@images/services/edge-computing.png";
import surveillanceAnalyticsImage from "@images/features-image.avif";
import tinyMlImage from "@images/services/embedded-systems.png";
import productRdImage from "@images/services/custom-rd-support.png";
import mechatronicPrototypeImage from "@images/Anthra-lab.png";
import smartDeviceImage from "@images/Anthra-Lab-pro.png";
import sensorFusionImage from "@images/pcb-orangedge.webp";
import fieldDeploymentImage from "@images/automation/Automate-compare3.png";
import machineHealthSupporting from "@images/solutions/supporting/01_machine-health-predictive-maintenance__motor-pump-sensors-gateway-stacklight.png";
import industrialMonitoringSupporting from "@images/solutions/supporting/02_industrial-monitoring-control__control-cabinet-pump-line-sensors.png";
import motorDriveSupporting from "@images/solutions/supporting/03_motor-drive-hmi-control__drive-cabinet-motor-hmi-panel.png";
import dataLoggerSupporting from "@images/solutions/supporting/04_machine-data-logger-dashboard__edge-gateway-machine-panel-laptop.png";
import machineAutomationSupporting from "@images/solutions/supporting/05_custom-machine-automation__actuator-fixture-controller-sensors.png";
import waterQualitySupporting from "@images/solutions/supporting/06_water-quality-monitoring__treatment-tank-probes-controller-panel.png";
import irrigationSupporting from "@images/solutions/supporting/07_smart-irrigation-fertigation__greenhouse-valves-dosing-controller.png";
import aquacultureSupporting from "@images/solutions/supporting/08_aquaculture-monitoring__pond-probe-controller-aerator-system.png";
import pumpProtectionSupporting from "@images/solutions/supporting/09_pump-automation-protection__pump-skid-control-panel-sensors.png";
import fieldAssetSupporting from "@images/solutions/supporting/10_remote-field-asset-monitoring__solar-iot-box-farm-pump.png";
import connectedVehicleSupporting from "@images/solutions/supporting/11_connected-vehicle-intelligence__vehicle-gateway-telemetry-tablet.png";
import fleetTrackingSupporting from "@images/solutions/supporting/12_fleet-tracking-telematics__fleet-yard-vehicle-gateway-map-tablet.png";
import vehicleGatewaySupporting from "@images/solutions/supporting/13_vehicle-iot-gateway__truck-service-bay-wiring-gateway-module.png";
import driverMonitoringSupporting from "@images/solutions/supporting/14_driver-vehicle-monitoring__cabin-camera-driver-road-context.png";
import coldChainSupporting from "@images/solutions/supporting/15_cold-chain-transport-monitoring__reefer-truck-temp-logger-cargo.png";
import visionInspectionSupporting from "@images/solutions/supporting/16_edge-ai-vision-inspection__conveyor-camera-edge-device-inspection.png";
import objectCountingSupporting from "@images/solutions/supporting/17_object-detection-counting__warehouse-conveyor-camera-packages.png";
import safetyCameraSupporting from "@images/solutions/supporting/18_safety-monitoring-camera__robot-cell-camera-edge-box-stacklight.png";
import surveillanceSupporting from "@images/solutions/supporting/19_smart-surveillance-analytics__facility-gate-cameras-edge-analytics-box.png";
import tinyMlSupporting from "@images/solutions/supporting/20_low-power-tinyml-detection__field-sensor-node-battery-alert-context.png";
import productRdSupporting from "@images/solutions/supporting/21_intelligent-product-rd__prototype-enclosure-embedded-board-test-bench.png";
import mechatronicPrototypeSupporting from "@images/solutions/supporting/22_custom-embedded-mechatronic-prototype__actuator-controller-test-rig.png";
import smartDeviceSupporting from "@images/solutions/supporting/23_ai-enabled-smart-device-development__installed-smart-sensor-warehouse.png";
import sensorFusionSupporting from "@images/solutions/supporting/24_sensor-fusion-system__mobile-robot-camera-lidar-gps-edge-computer.png";
import fieldDeploymentSupporting from "@images/solutions/supporting/25_poc-to-field-deployment__prototype-installation-machine-site-testing.png";
import driverMonitoringReplacement from "@images/solutions/replacements/driver-monitoring-alt__cabin-camera-dashboard.png";
import vehicleGatewayReplacement from "@images/solutions/replacements/vehicle-gateway-alt__truck-cabin-electronics-driver-context.png";
import coldChainReplacement from "@images/solutions/replacements/cold-chain-alt__cargo-sensor-detail.png";
import objectCountingReplacement from "@images/solutions/replacements/object-detection-alt__conveyor-inspection-station.png";
import safetyCameraReplacement from "@images/solutions/replacements/inspection-alt__factory-automation-close-up.png";
import surveillanceReplacement from "@images/solutions/replacements/surveillance-alt__gated-facility-camera.png";
import tinyMlReplacement from "@images/solutions/replacements/tinyml-alt__blue-machine-mounted-sensor.png";
import mechatronicReplacement from "@images/solutions/replacements/mechatronic-alt__industrial-test-rig.png";
import smartDeviceReplacement from "@images/solutions/replacements/smart-device-alt__mounted-sensor-warehouse.png";
import fieldDeploymentReplacement from "@images/solutions/replacements/prototype-alt__clean-lab-bench-mechatronic-closeup.png";
import dataLoggerReplacement from "@images/solutions/replacements/01_machine-monitoring-dashboard-context__cnc-machine-monitoring-screen.png";

export interface Solution {
  title: string;
  slug: string;
  description: string;
  subtitle?: string;
  category?: string;
  heroImage?: ImageMetadata;
  image: ImageMetadata;
  alt: string;
  features: string[];
  applications: string[];
  stack: string[];
  customProblemPoints?: DetailCard[];
  customOutcomePoints?: DetailCard[];
  outcomePoints?: DetailCard[];
  customHowItWorksSteps?: FlowStep[];
  flowSteps?: WorkflowStep[];
  typicalInputs?: string[];
  typicalOutputs?: string[];
  modulesBuilt?: DetailCard[];
  problemPoints?: DetailCard[];
  systemFlow?: FlowStep[];
  anthraBuildsModules?: DetailCard[];
  keyFeatures?: DetailCard[];
  bestSuitedFor?: DetailCard[];
  technologyBehindSystem?: DetailCard[];
  customizationOptions?: DetailCard[];
  relatedSolutions?: string[];
  ctaText?: string;
  flowDiagramImage?: ImageMetadata;
  workflowTitle?: string;
  workflowSubtitle?: string;
  supportingImage?: ImageMetadata;
  supportingImageAlt?: string;
  supportingImagePending?: boolean;
  replacementImageUsed?: string;
  imageNotes?: string;
}

export interface DetailCard {
  title: string;
  text: string;
}

export interface FlowStep {
  title: string;
  text: string;
  icon?: string;
}

export interface WorkflowStep {
  phase: "Source" | "Sense / Capture" | "Process" | "Show / Act" | "Outcome";
  title: string;
  description: string;
  visualKey: string;
  imageCropKey?: string;
  inputs: string[];
  outputs: string[];
  detail: string;
  configures?: string[];
}

export interface SolutionArea {
  title: string;
  slug: string;
  description: string;
  accent: string;
  solutions: Solution[];
}

const baseSolutionAreas: SolutionArea[] = [
  {
    title: "Industry & Machine Systems",
    slug: "industry-machine-systems",
    description:
      "Intelligent systems for monitoring, controlling, diagnosing, and improving machines, production lines, and industrial assets.",
    accent: "Machine intelligence",
    solutions: [
      {
        title: "Machine Health & Predictive Maintenance System",
        slug: "machine-health-predictive-maintenance",
        description:
          "Monitor machine condition, vibration, current, temperature, and early fault signs before breakdowns occur.",
        image: machineHealthImage,
        alt: "Industrial machine diagnostics and monitoring system.",
        features: ["Condition monitoring", "Early fault alerts", "Trend dashboards", "Maintenance insights"],
        applications: ["Motors", "Production equipment", "Pumps", "Critical machine assets"],
        stack: ["Sensors", "Embedded acquisition", "Dashboards", "Alert logic"],
      },
      {
        title: "Industrial Monitoring & Control System",
        slug: "industrial-monitoring-control",
        description:
          "Connect machines and industrial processes to dashboards, alerts, remote monitoring, and control logic.",
        image: industrialMonitoringImage,
        alt: "Connected industrial monitoring dashboard and field system.",
        features: ["Live process visibility", "Remote alerts", "Control logic", "Operational history"],
        applications: ["Production lines", "Utilities", "Plant equipment", "Process monitoring"],
        stack: ["PLC/HMI", "IoT gateway", "Cloud dashboard", "Industrial protocols"],
      },
      {
        title: "Motor Drive & HMI Control System",
        slug: "motor-drive-hmi-control",
        description:
          "Custom motor control and operator interface systems for machines that need smoother control and visibility.",
        image: motorDriveImage,
        alt: "Motor drive and HMI control hardware for machine operation.",
        features: ["Motor control", "Operator screens", "Drive integration", "Machine status"],
        applications: ["Special machines", "Conveyors", "Motorized equipment", "Panel upgrades"],
        stack: ["Motor drives", "HMI", "Control panel", "Embedded logic"],
      },
      {
        title: "Machine Data Logger & Dashboard System",
        slug: "machine-data-logger-dashboard",
        description:
          "Capture machine data and convert it into useful operational insights, history, and live monitoring.",
        image: dataLoggerImage,
        alt: "Industrial dashboard showing logged machine data and operational history.",
        features: ["Data logging", "Live dashboards", "Reports", "Event history"],
        applications: ["Machine uptime", "Energy tracking", "Process records", "Quality data"],
        stack: ["Data logger", "Database", "Web dashboard", "Industrial connectivity"],
      },
      {
        title: "Custom Machine Automation System",
        slug: "custom-machine-automation",
        description:
          "Build tailored automation systems for special industrial machines, workflows, and process requirements.",
        image: machineAutomationImage,
        alt: "Custom automation system for existing industrial equipment.",
        features: ["Workflow automation", "Machine retrofits", "Sensor integration", "Control sequencing"],
        applications: ["Custom machines", "Manual process automation", "Retrofits", "Test rigs"],
        stack: ["Controllers", "Sensors", "Actuators", "Panel wiring"],
      },
    ],
  },
  {
    title: "Water, Agriculture & Field Systems",
    slug: "water-agriculture-field-systems",
    description:
      "Smart monitoring and automation systems for water, farms, aquaculture, irrigation, and remote field infrastructure.",
    accent: "Field intelligence",
    solutions: [
      {
        title: "Water Quality Monitoring System",
        slug: "water-quality-monitoring",
        description:
          "Monitor water conditions such as pH, TDS, turbidity, chlorine, and related quality indicators in real time.",
        image: waterQualityImage,
        alt: "Water monitoring system with pump, sensor, and dashboard.",
        features: ["pH/TDS/turbidity sensing", "Remote alerts", "Quality trends", "Site dashboards"],
        applications: ["Water plants", "Tanks", "Aquaculture", "Industrial water"],
        stack: ["Water sensors", "Controller", "Telemetry", "Dashboard"],
      },
      {
        title: "Smart Irrigation & Fertigation System",
        slug: "smart-irrigation-fertigation",
        description:
          "Automate irrigation, nutrient dosing, scheduling, and field-level monitoring for better crop and water management.",
        image: irrigationImage,
        alt: "Farm irrigation automation and field monitoring system.",
        features: ["Irrigation scheduling", "Pump control", "Nutrient dosing", "Field sensing"],
        applications: ["Farms", "Greenhouses", "Nurseries", "Open fields"],
        stack: ["Soil sensors", "Valves", "Pump controls", "Mobile dashboard"],
      },
      {
        title: "Aquaculture Monitoring System",
        slug: "aquaculture-monitoring",
        description:
          "Track pond or tank health, water quality, aeration conditions, and key operational parameters.",
        image: aquacultureImage,
        alt: "Aquaculture water quality and aeration monitoring system.",
        features: ["Pond health monitoring", "Aeration alerts", "Water parameter tracking", "Remote visibility"],
        applications: ["Fish farms", "Ponds", "Tanks", "Aquaculture operations"],
        stack: ["Water probes", "Aeration monitoring", "IoT gateway", "Alerts"],
      },
      {
        title: "Pump Automation & Protection System",
        slug: "pump-automation-protection",
        description:
          "Automate pumps, prevent dry-run, manage tank levels, and monitor system faults and operating status.",
        image: pumpProtectionImage,
        alt: "Pump automation and protection system for field equipment.",
        features: ["Dry-run protection", "Tank level logic", "Fault alerts", "Remote start/stop"],
        applications: ["Water pumps", "Irrigation", "Utility systems", "Remote pump sites"],
        stack: ["Pump controller", "Level sensors", "Protection logic", "Telemetry"],
      },
      {
        title: "Remote Field Asset Monitoring System",
        slug: "remote-field-asset-monitoring",
        description:
          "Monitor field equipment, pumps, tanks, sensors, and other remote assets through connected intelligence.",
        image: fieldAssetImage,
        alt: "IoT gateway for remote field asset monitoring.",
        features: ["Remote telemetry", "Asset status", "Low-connectivity operation", "Maintenance alerts"],
        applications: ["Field assets", "Tanks", "Pumps", "Distributed sites"],
        stack: ["IoT gateway", "Sensors", "Cellular/Wi-Fi", "Cloud dashboard"],
      },
    ],
  },
  {
    title: "Mobility & Connected Vehicles",
    slug: "mobility-connected-vehicles",
    description:
      "Connected systems for vehicles, fleets, transport monitoring, telemetry, diagnostics, and mobile assets.",
    accent: "Connected mobility",
    solutions: [
      {
        title: "Connected Vehicle Intelligence System",
        slug: "connected-vehicle-intelligence",
        description:
          "Collect and use vehicle data for smarter monitoring, safety, performance, and connected operations.",
        image: connectedVehicleImage,
        alt: "Connected vehicle intelligence system with telematics and dashboard.",
        features: ["Vehicle data capture", "Location intelligence", "Safety alerts", "Performance visibility"],
        applications: ["Fleets", "Special vehicles", "Mobile equipment", "Transport operations"],
        stack: ["GPS", "Vehicle sensors", "IoT gateway", "Analytics dashboard"],
      },
      {
        title: "Fleet Tracking & Telematics System",
        slug: "fleet-tracking-telematics",
        description:
          "Track vehicles, routes, driving activity, usage patterns, and fleet performance more effectively.",
        image: fleetTrackingImage,
        alt: "Fleet route tracking and telematics coverage visual.",
        features: ["Route tracking", "Usage patterns", "Trip history", "Fleet dashboards"],
        applications: ["Logistics", "Service fleets", "Delivery", "Operations teams"],
        stack: ["GPS", "Telematics device", "Map dashboard", "Reports"],
      },
      {
        title: "Vehicle IoT Gateway",
        slug: "vehicle-iot-gateway",
        description:
          "Connect vehicle sensors, GPS, diagnostics, and communication modules into one intelligent system.",
        image: vehicleGatewayImage,
        alt: "Vehicle IoT gateway hardware for connected mobility systems.",
        features: ["Sensor aggregation", "GPS integration", "Connectivity", "Edge logic"],
        applications: ["Vehicle prototypes", "Fleet hardware", "Diagnostics", "Mobile assets"],
        stack: ["Embedded gateway", "CAN/GPIO", "GPS", "Cellular/Wi-Fi"],
      },
      {
        title: "Driver & Vehicle Monitoring System",
        slug: "driver-vehicle-monitoring",
        description:
          "Monitor vehicle behavior, driver activity, safety events, and operational alerts.",
        image: driverMonitoringImage,
        alt: "Vehicle and driver monitoring dashboard.",
        features: ["Safety event alerts", "Driver behavior", "Vehicle state", "Incident visibility"],
        applications: ["Fleet safety", "Transport operations", "Industrial vehicles", "Driver monitoring"],
        stack: ["Sensors", "Camera optional", "Gateway", "Dashboards"],
      },
      {
        title: "Cold Chain / Transport Monitoring System",
        slug: "cold-chain-transport-monitoring",
        description:
          "Monitor temperature, location, and transport conditions for sensitive or time-critical cargo movement.",
        image: coldChainImage,
        alt: "Transport monitoring system for sensitive cargo movement.",
        features: ["Temperature logs", "Location tracking", "Condition alerts", "Trip reports"],
        applications: ["Cold chain", "Food logistics", "Medical transport", "Sensitive cargo"],
        stack: ["Temperature sensors", "GPS", "Gateway", "Cloud reports"],
      },
    ],
  },
  {
    title: "Edge AI & Vision Systems",
    slug: "edge-ai-vision-systems",
    description:
      "Camera and AI-based systems that detect, inspect, count, monitor, and support faster decisions at the edge.",
    accent: "Edge perception",
    solutions: [
      {
        title: "Edge AI Vision Inspection System",
        slug: "edge-ai-vision-inspection",
        description:
          "Inspect products, parts, or operating conditions using AI-powered camera systems near the point of use.",
        image: visionInspectionImage,
        alt: "Edge AI vision inspection system for detection and monitoring.",
        features: ["Camera inspection", "Local AI inference", "Defect alerts", "Operator visibility"],
        applications: ["Quality checks", "Machine vision", "Counting", "Safety monitoring"],
        stack: ["Camera", "Edge device", "AI model", "Dashboard"],
      },
      {
        title: "Object Detection & Counting System",
        slug: "object-detection-counting",
        description:
          "Detect and count people, vehicles, products, animals, or other objects using edge intelligence.",
        image: objectCountingImage,
        alt: "Edge computing infrastructure for object detection and counting.",
        features: ["Object detection", "Counting events", "Edge alerts", "Usage analytics"],
        applications: ["Production counts", "Vehicle counts", "People flow", "Animal monitoring"],
        stack: ["Vision model", "Edge compute", "Camera", "Event database"],
      },
      {
        title: "Safety Monitoring Camera System",
        slug: "safety-monitoring-camera",
        description:
          "Monitor safety conditions, restricted zones, missing safety gear, and unsafe activity through vision systems.",
        image: safetyCameraImage,
        alt: "Edge vision hardware for safety monitoring camera systems.",
        features: ["Restricted zone alerts", "Safety gear checks", "Event capture", "Local processing"],
        applications: ["Factories", "Warehouses", "Sites", "Machine areas"],
        stack: ["IP cameras", "Edge AI", "Alert logic", "Operations dashboard"],
      },
      {
        title: "Smart Surveillance Analytics System",
        slug: "smart-surveillance-analytics",
        description:
          "Add intelligence to camera monitoring for event detection, alerts, and smarter operational visibility.",
        image: surveillanceAnalyticsImage,
        alt: "Analytics interface for smart surveillance and event visibility.",
        features: ["Event detection", "Camera analytics", "Alert workflows", "Searchable history"],
        applications: ["Facilities", "Campuses", "Operations", "Remote sites"],
        stack: ["Camera feeds", "AI analytics", "Storage", "Notifications"],
      },
      {
        title: "Low-Power TinyML Detection System",
        slug: "low-power-tinyml-detection",
        description:
          "Deploy lightweight AI models on compact devices for always-on detection and low-power monitoring.",
        image: tinyMlImage,
        alt: "Compact embedded system for low-power TinyML detection.",
        features: ["Low-power inference", "Compact hardware", "Always-on sensing", "Local decisions"],
        applications: ["Battery devices", "Remote sensing", "Small machines", "Smart devices"],
        stack: ["MCU/edge device", "TinyML model", "Sensors", "Firmware"],
      },
    ],
  },
  {
    title: "Custom R&D Systems",
    slug: "custom-rd-systems",
    description:
      "R&D-led engineering for new product ideas, prototypes, special systems, mechatronic builds, and undefined technical challenges.",
    accent: "Applied R&D",
    solutions: [
      {
        title: "Intelligent Product R&D",
        slug: "intelligent-product-rd",
        description:
          "Turn new product ideas into practical engineering concepts, architectures, and early-stage prototypes.",
        image: productRdImage,
        alt: "Applied R&D lab and prototype development system.",
        features: ["Problem study", "Architecture", "Feasibility builds", "Prototype planning"],
        applications: ["New products", "Special machines", "Smart devices", "Research prototypes"],
        stack: ["System architecture", "Electronics", "Software", "Testing"],
      },
      {
        title: "Custom Embedded + Mechatronic Prototype",
        slug: "custom-embedded-mechatronic-prototype",
        description:
          "Build integrated prototypes combining electronics, mechanics, sensing, and embedded intelligence.",
        image: mechatronicPrototypeImage,
        alt: "Engineering lab prototype combining hardware and mechatronic components.",
        features: ["Integrated prototype", "Sensor placement", "Mechanical fit", "Embedded control"],
        applications: ["Prototype machines", "Smart products", "Test rigs", "Mechatronic builds"],
        stack: ["Embedded hardware", "Mechanical design", "Firmware", "Sensors"],
      },
      {
        title: "AI-Enabled Smart Device Development",
        slug: "ai-enabled-smart-device-development",
        description:
          "Create smart connected devices with sensing, decision-making, communication, and applied intelligence.",
        image: smartDeviceImage,
        alt: "Smart device development and testing on an engineering bench.",
        features: ["Sensing", "Decision logic", "Connectivity", "Device testing"],
        applications: ["Connected devices", "Smart instruments", "Monitoring products", "AI devices"],
        stack: ["Sensors", "Firmware", "AI/ML", "Connectivity"],
      },
      {
        title: "Sensor Fusion System",
        slug: "sensor-fusion-system",
        description:
          "Combine data from multiple sensors to improve system awareness, detection accuracy, and decision-making.",
        image: sensorFusionImage,
        alt: "Embedded electronics for multi-sensor fusion and connected intelligence.",
        features: ["Multi-sensor input", "Data filtering", "Awareness logic", "Decision support"],
        applications: ["Robotics", "Vehicles", "Monitoring systems", "Smart machines"],
        stack: ["IMU/sensors", "Embedded processing", "Fusion logic", "Validation"],
      },
      {
        title: "Proof-of-Concept to Field Deployment",
        slug: "proof-of-concept-to-field-deployment",
        description:
          "Move a concept from prototype and testing toward a practical deployable real-world system.",
        image: fieldDeploymentImage,
        alt: "Prototype system moving from engineering build toward deployment.",
        features: ["POC refinement", "Field trial planning", "Deployment support", "Iteration"],
        applications: ["Pilot systems", "Client prototypes", "Field trials", "Productization"],
        stack: ["Prototype", "Testing", "Documentation", "Deployment plan"],
      },
    ],
  },
];

const solutionSupportingImages: Record<string, ImageMetadata> = {
  "machine-health-predictive-maintenance": machineHealthSupporting,
  "industrial-monitoring-control": industrialMonitoringSupporting,
  "motor-drive-hmi-control": motorDriveSupporting,
  "machine-data-logger-dashboard": dataLoggerSupporting,
  "custom-machine-automation": machineAutomationSupporting,
  "water-quality-monitoring": waterQualitySupporting,
  "smart-irrigation-fertigation": irrigationSupporting,
  "aquaculture-monitoring": aquacultureSupporting,
  "pump-automation-protection": pumpProtectionSupporting,
  "remote-field-asset-monitoring": fieldAssetSupporting,
  "connected-vehicle-intelligence": connectedVehicleSupporting,
  "fleet-tracking-telematics": fleetTrackingSupporting,
  "vehicle-iot-gateway": vehicleGatewaySupporting,
  "driver-vehicle-monitoring": driverMonitoringSupporting,
  "cold-chain-transport-monitoring": coldChainSupporting,
  "edge-ai-vision-inspection": visionInspectionSupporting,
  "object-detection-counting": objectCountingSupporting,
  "safety-monitoring-camera": safetyCameraSupporting,
  "smart-surveillance-analytics": surveillanceSupporting,
  "low-power-tinyml-detection": tinyMlSupporting,
  "intelligent-product-rd": productRdSupporting,
  "custom-embedded-mechatronic-prototype": mechatronicPrototypeSupporting,
  "ai-enabled-smart-device-development": smartDeviceSupporting,
  "sensor-fusion-system": sensorFusionSupporting,
  "proof-of-concept-to-field-deployment": fieldDeploymentSupporting,
};

const solutionSupportingAlts: Record<string, string> = {
  "machine-health-predictive-maintenance": "Motor pump condition monitoring setup with sensors, gateway, and stack light.",
  "industrial-monitoring-control": "Industrial control cabinet connected to pump line sensors for monitoring and control.",
  "motor-drive-hmi-control": "Motor drive cabinet with HMI panel and connected industrial motor control setup.",
  "machine-data-logger-dashboard": "Edge gateway, machine panel, and laptop dashboard used for machine data logging.",
  "custom-machine-automation": "Custom actuator fixture with controller hardware and connected sensors.",
  "water-quality-monitoring": "Water treatment tank with probes and controller panel for quality monitoring.",
  "smart-irrigation-fertigation": "Greenhouse irrigation valves, dosing unit, and controller for fertigation automation.",
  "aquaculture-monitoring": "Pond monitoring system with water probe, controller, and aeration equipment.",
  "pump-automation-protection": "Pump skid with control panel and sensors for automation and protection.",
  "remote-field-asset-monitoring": "Solar IoT box installed near a farm pump for remote field asset monitoring.",
  "connected-vehicle-intelligence": "Vehicle gateway and telemetry tablet used for connected vehicle intelligence.",
  "fleet-tracking-telematics": "Fleet yard with vehicle gateway and tablet map for telematics tracking.",
  "vehicle-iot-gateway": "Truck service bay wiring with a vehicle IoT gateway module.",
  "driver-vehicle-monitoring": "Cabin camera and road context for driver and vehicle monitoring.",
  "cold-chain-transport-monitoring": "Reefer truck cargo area with temperature logger for cold chain monitoring.",
  "edge-ai-vision-inspection": "Conveyor camera and edge device used for AI vision inspection.",
  "object-detection-counting": "Warehouse conveyor camera setup for object detection and counting.",
  "safety-monitoring-camera": "Robot cell camera with edge box and stack light for safety monitoring.",
  "smart-surveillance-analytics": "Facility gate cameras connected to an edge analytics box.",
  "low-power-tinyml-detection": "Battery-powered field sensor node used for low-power TinyML detection.",
  "intelligent-product-rd": "Prototype enclosure and embedded board on a product R&D test bench.",
  "custom-embedded-mechatronic-prototype": "Actuator controller and test rig for embedded mechatronic prototyping.",
  "ai-enabled-smart-device-development": "Installed smart sensor in a warehouse environment.",
  "sensor-fusion-system": "Mobile robot with camera, LiDAR, GPS, and edge computer for sensor fusion.",
  "proof-of-concept-to-field-deployment": "Prototype installation on a machine site during field testing.",
};

const solutionImageReplacements: Record<
  string,
  { image: ImageMetadata; alt: string; replacementImageUsed: string; imageNotes: string }
> = {
  "vehicle-iot-gateway": {
    image: vehicleGatewayReplacement,
    alt: "Truck cabin electronics and gateway wiring context for vehicle IoT integration.",
    replacementImageUsed: "vehicle-gateway-alt__truck-cabin-electronics-driver-context.png",
    imageNotes: "Replaced generic gateway card image with a vehicle-specific cabin electronics image.",
  },
  "driver-vehicle-monitoring": {
    image: driverMonitoringReplacement,
    alt: "Driver cabin camera and dashboard context for vehicle monitoring.",
    replacementImageUsed: "driver-monitoring-alt__cabin-camera-dashboard.png",
    imageNotes: "Replaced dashboard-only image with a clearer driver monitoring camera context.",
  },
  "cold-chain-transport-monitoring": {
    image: coldChainReplacement,
    alt: "Cargo temperature sensor detail for cold chain transport monitoring.",
    replacementImageUsed: "cold-chain-alt__cargo-sensor-detail.png",
    imageNotes: "Replaced generic automation image with cold-chain cargo sensor context.",
  },
  "object-detection-counting": {
    image: objectCountingReplacement,
    alt: "Conveyor inspection station with camera for object detection and counting.",
    replacementImageUsed: "object-detection-alt__conveyor-inspection-station.png",
    imageNotes: "Replaced generic edge infrastructure with a concrete conveyor detection setup.",
  },
  "safety-monitoring-camera": {
    image: safetyCameraReplacement,
    alt: "Factory automation camera setup for safety monitoring around equipment.",
    replacementImageUsed: "inspection-alt__factory-automation-close-up.png",
    imageNotes: "Replaced generic edge computing image with a camera-based industrial inspection scene.",
  },
  "smart-surveillance-analytics": {
    image: surveillanceReplacement,
    alt: "Gated facility camera setup for smart surveillance analytics.",
    replacementImageUsed: "surveillance-alt__gated-facility-camera.png",
    imageNotes: "Replaced generic feature image with facility surveillance context.",
  },
  "low-power-tinyml-detection": {
    image: tinyMlReplacement,
    alt: "Compact machine-mounted sensor device for low-power TinyML detection.",
    replacementImageUsed: "tinyml-alt__blue-machine-mounted-sensor.png",
    imageNotes: "Replaced generic embedded systems image with a clear mounted sensor device.",
  },
  "custom-embedded-mechatronic-prototype": {
    image: mechatronicReplacement,
    alt: "Industrial mechatronic test rig used for custom embedded prototype validation.",
    replacementImageUsed: "mechatronic-alt__industrial-test-rig.png",
    imageNotes: "Replaced broad lab image with a more specific mechatronic test rig.",
  },
  "ai-enabled-smart-device-development": {
    image: smartDeviceReplacement,
    alt: "Mounted smart sensor device installed in a warehouse environment.",
    replacementImageUsed: "smart-device-alt__mounted-sensor-warehouse.png",
    imageNotes: "Replaced lab bench image with a real installed smart device context.",
  },
  "proof-of-concept-to-field-deployment": {
    image: fieldDeploymentReplacement,
    alt: "Clean engineering bench with prototype hardware prepared for field deployment.",
    replacementImageUsed: "prototype-alt__clean-lab-bench-mechatronic-closeup.png",
    imageNotes: "Replaced generic automation comparison image with prototype deployment preparation context.",
  },
  "machine-data-logger-dashboard": {
    image: dataLoggerReplacement,
    alt: "CNC machine monitoring screen showing machine data dashboard context.",
    replacementImageUsed: "01_machine-monitoring-dashboard-context__cnc-machine-monitoring-screen.png",
    imageNotes: "Replaced dark dashboard-only image with a clearer machine monitoring dashboard in context.",
  },
};

const enhanceSolution = (solution: Solution) => {
    const replacement = solutionImageReplacements[solution.slug];
    const supportingImage = solution.supportingImage ?? solutionSupportingImages[solution.slug];

    return {
      ...solution,
      image: replacement?.image ?? solution.image,
      alt: replacement?.alt ?? solution.alt,
      supportingImage,
      supportingImageAlt:
        solution.supportingImageAlt ??
        solutionSupportingAlts[solution.slug] ??
        `${solution.title} implementation support visual for Anthra Systems.`,
      supportingImagePending: supportingImage ? false : true,
      replacementImageUsed: replacement?.replacementImageUsed ?? solution.replacementImageUsed,
      imageNotes: replacement?.imageNotes ?? solution.imageNotes,
    };
};

export const solutionAreas = baseSolutionAreas.map((area) => ({
  ...area,
  solutions: area.solutions.map(enhanceSolution),
}));

export const solutions = solutionAreas.flatMap((area) =>
  area.solutions.map((solution) => ({
    ...solution,
    area: area.title,
    areaSlug: area.slug,
  })),
);

export const solutionSlugs = solutions.map((solution) => solution.slug);

export const getSolutionBySlug = (slug: string | undefined) =>
  solutions.find((solution) => solution.slug === slug);
