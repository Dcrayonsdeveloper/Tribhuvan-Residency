import {
  FaWifi,
  FaSnowflake,
  FaParking,
  FaBolt,
  FaBroom,
  FaConciergeBell,
  FaUtensils,
  FaTint,
  FaBath,
  FaTemperatureHigh,
  FaCouch,
  FaUserTie,
  FaBed,
  FaShieldAlt,
} from "react-icons/fa";

// Maps amenity/facility icon keys (see src/data/site.js) to react-icons.
const ICONS = {
  wifi: FaWifi,
  ac: FaSnowflake,
  parking: FaParking,
  power: FaBolt,
  housekeeping: FaBroom,
  "room-service": FaConciergeBell,
  dining: FaUtensils,
  water: FaTint,
  bath: FaBath,
  "hot-water": FaTemperatureHigh,
  lounge: FaCouch,
  caretaker: FaUserTie,
  bed: FaBed,
  security: FaShieldAlt,
};

export default function AmenityIcon({ name, className = "" }) {
  const Icon = ICONS[name] || FaConciergeBell;
  return <Icon className={className} />;
}
