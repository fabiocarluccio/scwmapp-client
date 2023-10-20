import {SmartBin} from "./smartbin";

export interface CleaningPath {
  id: string
  smartBinIDPath: string[]
  scheduledDate: Date
  done: boolean

  // only to show smartBin table on CleaningPathComponent
  smartBinList?: SmartBin[]
}
