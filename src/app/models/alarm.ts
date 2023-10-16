export interface Alarm {
  title: string,
  description: string,
  timestamp: string,
  messageType: string
}
/*
*
* {"title":"Avviso saturazione capienza SmartBin",
* "description":"6 smartBins eccedono il limite di capienza. Si consiglia di istanziare un percorso di pulizia.",
* "timestamp":"2023-10-15T10:58:56.168841262",
* "messageType":"DANGER"}

* */
