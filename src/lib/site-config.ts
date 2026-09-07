export const contact = {
  whatsappNumber: "34691364684",
  whatsappDisplay: "+34 691 36 46 84",
  instagramHandle: "@muntanyabjj",
  instagramUrl: "https://www.instagram.com/muntanyabjj/",
};

export const location = {
  name: "Poliesportiu Municipal de Sort",
  lat: 42.4114509,
  lon: 1.1298362,
};

export const pricing = {
  monthly: 50,
  dropIn: 8,
  private: 25,
  currency: "€",
};

export type ScheduleDayKey = "mon" | "wed" | "fri";
export type SessionType = "bjj" | "bjjKids";

export const schedule: { day: ScheduleDayKey; sessions: { time: string; type: SessionType }[] }[] = [
  {
    day: "mon",
    sessions: [
      { time: "10:30", type: "bjj" },
      { time: "20:00", type: "bjjKids" },
    ],
  },
  { day: "wed", sessions: [{ time: "10:30", type: "bjj" }] },
  { day: "fri", sessions: [{ time: "10:30", type: "bjj" }] },
];

export function whatsappHref(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function osmEmbedUrl() {
  const delta = 0.01;
  const bbox = [
    location.lon - delta,
    location.lat - delta,
    location.lon + delta,
    location.lat + delta,
  ].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${location.lat}%2C${location.lon}`;
}

export function osmLink() {
  return `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lon}#map=16/${location.lat}/${location.lon}`;
}
