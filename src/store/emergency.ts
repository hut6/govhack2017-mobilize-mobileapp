import {Skill} from "./skill";
import {EmergencyType} from "./emergencyType";

export class Emergency {
  description: string;
  type: EmergencyType;
  skills: Skill[];
  lat: string;
  lon: string;
  created: any;
}
