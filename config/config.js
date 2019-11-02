export const MATCH_DURATION = 120 * 60 * 1000; // 120 minutes;
export const DAYS_IN_ADVANCE = 1000 * 60 * 60 * 24 * 7; // 7 
export const IMAGES_URL = 'https://ultrasmap-prod.nero12.usermd.net/images';
export const ATTITUDE_DATA_UNKNOWN = {
  color: 'black',
  backgroundColor: '#f5f5f5',
  label: 'nieznane',
  labelExtended: 'Nie udało sie ustalić relacji'
};
export const ATTITUDE_DATA = [{
  from: 0,
  to: 10,
  color: 'black',
  backgroundColor: '#c70000',
  label: 'kosa',
  labelExtended: 'Kosa (kibice nienawidzą się)'
}, {
  from: 10,
  to: 30,
  color: 'black',
  backgroundColor: '#b51b1b',
  label: 'wrogie',
  labelExtended: 'Kibice są we wrogich relacjach'
}, {
  from: 30,
  to: 42,
  color: 'black',
  backgroundColor: '#b57f14',
  label: 'antypatia',
  labelExtended: 'Kibice nie lubią się'
}, {
  from: 42,
  to: 47,
  color: 'black',
  backgroundColor: '#edb442',
  label: 'delikatna antypatia',
  labelExtended: 'Kibice nie przepadają za sobą'
}, { // Neutral
  from: 47,
  to: 53,
  color: 'black',
  backgroundColor: '#c4c1bb',
  label: 'neutralne',
  labelExtended: 'Między kibicami panują neutralne relacje'
}, {
  from: 53,
  to: 58,
  color: 'black',
  backgroundColor: '#dff0b1',
  label: 'delikatna sympatia',
  labelExtended: 'Kibice darzą się delikatną sympatią'
}, {
  from: 58,
  to: 66,
  color: 'black',
  backgroundColor: '#a7c25d',
  label: 'sympatia',
  labelExtended: 'Kibice darzą się sympatią'
}, {
  from: 66,
  to: 80,
  color: 'black',
  backgroundColor: '#7f9937',
  label: 'dobre relacje',
  labelExtended: 'Kibice są w dobrych relacjach'
}, {
  from: 80,
  to: 95,
  color: 'black',
  backgroundColor: '#55a61e',
  label: 'układ',
  labelExtended: 'Układ (kibice sa w bardzo dobrych relacjach)'
}, {
  from: 95,
  to: 100,
  color: 'black',
  backgroundColor: '#54cf00',
  label: 'zgoda',
  labelExtended: 'Zgoda (kibice się przyjaźnią)'
}];

const bgR = 63;
const bgG = 81;
const bgB = 181;

export const IMPORTANCE_COLORS = [{
  from: 0,
  to: 0.25,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.1)`,
  label: 'Bez żadnego znaczenia'
}, {
  from: 0.25,
  to: 0.5,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.15)`,
  label: 'Nic ciekawego'
}, {
  from: 0.5,
  to: 1,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.2)`,
  label: 'Raczej można pominąć'
}, {
  from: 1,
  to: 2,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.3)`,
  label: 'Nieduża szansa na coś emocjonującego'
}, {
  from: 2,
  to: 3,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.4)`,
  label: 'Warto mieć na uwadze'
}, {
  from: 3,
  to: 4,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.5)`,
  label: 'Interesująca konfrontacja z potencjałem'
}, {
  from: 4,
  to: 5,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.6)`,
  label: 'Zdecydowanie należy śledzić obrót wydarzeń'
}, {
  from: 5,
  to: 6,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.7)`,
  label: 'Gwarantowany wysoki poziom doznań'
}, {
  from: 6,
  to: 7,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.8)`,
  label: 'Szykuje się świetne widowisko na trybunach'
}, {
  from: 7,
  to: 8,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.85)`,
  label: 'Szykuje się świetne widowisko na trybunach'
}, {
  from: 8,
  to: 9,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.9)`,
  label: 'Arcyciekawe spotkanie'
}, {
  from: 9,
  to: 10,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 0.95)`,
  label: 'Arcyciekawe spotkanie'
}, {
  from: 10,
  to: 100,
  color: 'black',
  backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, 1)`,
  label: 'Kibicowski hit'
}];