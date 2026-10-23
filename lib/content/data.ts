// Placeholder content, ported verbatim from docs/design/bench.src.html.
// Lao copy is a draft translation: have a native speaker check it before the client sees it.
import type { Bean, BrewMethod, ImageRef, Localized, Place, SiteImage, Step } from "./types";

export const ui = {
  nav_home: { en: "Home", lo: "ໜ້າຫຼັກ" },
  nav_beans: { en: "Our beans", lo: "ເມັດກາເຟ" },
  nav_story: { en: "Our story", lo: "ເລື່ອງລາວຂອງພວກເຮົາ" },
  nav_buy: { en: "Where to buy", lo: "ຊື້ໄດ້ທີ່ໃສ" },
  nav_main_label: { en: "Main", lo: "ເມນູຫຼັກ" },
  nav_footer_label: { en: "Footer", lo: "ເມນູທ້າຍໜ້າ" },
  menu: { en: "Open menu", lo: "ເປີດເມນູ" },
  close: { en: "Close menu", lo: "ປິດເມນູ" },
  lang_label: { en: "Language", lo: "ພາສາ" },
  hero_eyebrow: { en: "Single-origin coffee from Laos", lo: "ກາເຟແຫຼ່ງດຽວ ຈາກປະເທດລາວ" },
  hero_h1: { en: "Grown on the Bolaven Plateau. Roasted slowly.", lo: "ປູກເທິງພູພຽງບໍລະເວນ ຂົ້ວແບບຊ້າໆ" },
  hero_sub: {
    en: "Arabica from the volcanic soil around Paksong, roasted in small batches every week.",
    lo: "ອາຣາບິກາຈາກດິນພູເຂົາໄຟອ້ອມເມືອງປາກຊ່ອງ ຂົ້ວເທື່ອລະໜ້ອຍທຸກອາທິດ",
  },
  see_beans: { en: "See the beans", lo: "ເບິ່ງເມັດກາເຟ" },
  feat_h: { en: "This season's beans", lo: "ເມັດກາເຟລະດູນີ້" },
  all_beans: { en: "All beans", lo: "ເມັດກາເຟທັງໝົດ" },
  origin_h: { en: "Coffee from the plateau", lo: "ກາເຟຈາກພູພຽງ" },
  origin_p: {
    en: "The Bolaven Plateau in southern Laos is high, cool and wet. Cherries ripen slowly up here, and slow ripening gives the beans more sweetness.",
    lo: "ພູພຽງບໍລະເວນ ທາງພາກໃຕ້ຂອງລາວ ສູງ ອາກາດເຢັນ ແລະ ຝົນຕົກຫຼາຍ. ໝາກກາເຟຢູ່ທີ່ນີ້ສຸກຊ້າ ເຮັດໃຫ້ເມັດກາເຟມີລົດຫວານຫຼາຍຂຶ້ນ.",
  },
  origin_alt: { en: "Ripe coffee cherries on a branch on the Bolaven Plateau", lo: "ໝາກກາເຟສຸກເທິງກິ່ງ ຢູ່ພູພຽງບໍລະເວນ" },
  f_elev: { en: "Elevation", lo: "ຄວາມສູງ" },
  f_elev_v: { en: "1,000 to 1,300 m", lo: "1,000 ຫາ 1,300 ແມັດ" },
  f_where: { en: "Grown around", lo: "ແຫຼ່ງປູກ" },
  f_where_v: { en: "Paksong, Champasak", lo: "ປາກຊ່ອງ, ຈຳປາສັກ" },
  f_harvest: { en: "Harvest", lo: "ລະດູເກັບກ່ຽວ" },
  f_harvest_v: { en: "November to February", lo: "ພະຈິກ ຫາ ກຸມພາ" },
  brew_h: { en: "Brew it at home", lo: "ຊົງກາເຟເອງຢູ່ເຮືອນ" },
  brew_p: {
    en: "Start with these ratios and adjust to taste. 1:16 means 1 g of coffee to 16 g of water.",
    lo: "ເລີ່ມຈາກອັດຕາສ່ວນນີ້ ແລ້ວປັບຕາມໃຈມັກ. 1:16 ໝາຍເຖິງ ກາເຟ 1 ກຣາມ ຕໍ່ນ້ຳ 16 ກຣາມ.",
  },
  grind: { en: "Grind", lo: "ການບົດ" },
  time: { en: "Time", lo: "ເວລາ" },
  band_h: { en: "Find Brand Name in Vientiane and Pakse", lo: "ຊອກຫາ Brand Name ໄດ້ທີ່ ວຽງຈັນ ແລະ ປາກເຊ" },
  ft_tag: { en: "Single-origin coffee from the Bolaven Plateau, Laos.", lo: "ກາເຟແຫຼ່ງດຽວ ຈາກພູພຽງບໍລະເວນ ປະເທດລາວ." },
  ft_credit: {
    en: "Photos: Unsplash and Wikimedia Commons (Pierre André, CC BY-SA 4.0; Tarrazu, public domain). All text and contact details are placeholders.",
    lo: "ຮູບພາບ: Unsplash ແລະ Wikimedia Commons (Pierre André, CC BY-SA 4.0; Tarrazu, public domain). ເນື້ອຫາ ແລະ ຂໍ້ມູນຕິດຕໍ່ທັງໝົດເປັນຕົວຢ່າງ.",
  },
  beans_h: { en: "Our beans", lo: "ເມັດກາເຟຂອງພວກເຮົາ" },
  beans_p: {
    en: "Four coffees from southern Laos. Every bag is 250 g, sold as whole beans or ground to order.",
    lo: "ກາເຟສີ່ຊະນິດຈາກພາກໃຕ້ຂອງລາວ. ແຕ່ລະຖົງ 250 ກຣາມ ມີທັງແບບເມັດ ແລະ ແບບບົດຕາມສັ່ງ.",
  },
  f_all: { en: "All", lo: "ທັງໝົດ" },
  light: { en: "Light roast", lo: "ຂົ້ວອ່ອນ" },
  medium: { en: "Medium roast", lo: "ຂົ້ວກາງ" },
  dark: { en: "Dark roast", lo: "ຂົ້ວເຂັ້ມ" },
  empty: { en: "No beans with this roast right now.", lo: "ຕອນນີ້ບໍ່ມີກາເຟລະດັບການຂົ້ວນີ້." },
  s_region: { en: "Region", lo: "ແຫຼ່ງປູກ" },
  s_elev: { en: "Elevation", lo: "ຄວາມສູງ" },
  s_variety: { en: "Variety", lo: "ສາຍພັນ" },
  s_process: { en: "Process", lo: "ການແປຮູບ" },
  s_roast: { en: "Roast", lo: "ລະດັບການຂົ້ວ" },
  s_bag: { en: "Bag", lo: "ຂະໜາດຖົງ" },
  bag_v: { en: "250 g, whole or ground", lo: "250 ກຣາມ, ເມັດ ຫຼື ບົດ" },
  how_brew: { en: "How we brew it", lo: "ວິທີຊົງທີ່ພວກເຮົາແນະນຳ" },
  more: { en: "More beans", lo: "ກາເຟອື່ນໆ" },
  story_h: { en: "From the plateau to your cup", lo: "ຈາກພູພຽງ ເຖິງຈອກກາເຟຂອງທ່ານ" },
  story_lede: {
    en: "We buy from small family farms around Paksong, pay for ripe cherries only, and roast every week in Vientiane.",
    lo: "ພວກເຮົາຊື້ກາເຟຈາກສວນຄອບຄົວນ້ອຍໆ ອ້ອມເມືອງປາກຊ່ອງ ຮັບຊື້ສະເພາະໝາກທີ່ສຸກ ແລະ ຂົ້ວທຸກອາທິດຢູ່ນະຄອນຫຼວງວຽງຈັນ.",
  },
  story_p1: {
    en: "Coffee came to the Bolaven Plateau in the early 1900s. Most of it is still grown by families on a few hectares each, often under shade trees.",
    lo: "ກາເຟເຂົ້າມາປູກຢູ່ພູພຽງບໍລະເວນ ຕັ້ງແຕ່ຕົ້ນຊຸມປີ 1900. ປັດຈຸບັນ ສ່ວນໃຫຍ່ຍັງປູກໂດຍຄອບຄົວຊາວສວນ ຄອບຄົວລະບໍ່ເທົ່າໃດເຮັກຕາ ແລະ ມັກປູກຢູ່ກ້ອງຮົ່ມໄມ້.",
  },
  story_p2: {
    en: "We visit at harvest, taste every lot before we buy it, and keep the roast light enough that you can still taste where it was grown.",
    lo: "ພວກເຮົາໄປຢ້ຽມສວນໃນລະດູເກັບກ່ຽວ ຊີມທຸກລັອດກ່ອນຊື້ ແລະ ຂົ້ວບໍ່ໃຫ້ເຂັ້ມເກີນໄປ ເພື່ອໃຫ້ຍັງໄດ້ລົດຊາດຂອງແຫຼ່ງປູກ.",
  },
  dry_cap: { en: "Coffee cherries drying on a raised bed.", lo: "ຕາກໝາກກາເຟເທິງແຄ່ສູງ." },
  steps_h: { en: "How a bean gets to you", lo: "ກວ່າຈະມາເປັນກາເຟໃນຈອກ" },
  buy_h: { en: "Where to buy", lo: "ຊື້ໄດ້ທີ່ໃສ" },
  buy_p: {
    en: "Buy at the roastery or our Pakse shop, or send a message and we deliver in Vientiane.",
    lo: "ຊື້ໄດ້ທີ່ໂຮງຂົ້ວ ຫຼື ຮ້ານຂອງພວກເຮົາຢູ່ປາກເຊ ຫຼື ສົ່ງຂໍ້ຄວາມມາ ພວກເຮົາສົ່ງເຖິງບ້ານໃນວຽງຈັນ.",
  },
  open_maps: { en: "Open in Maps", lo: "ເປີດແຜນທີ່" },
  reach_h: { en: "Order by message", lo: "ສັ່ງຜ່ານຂໍ້ຄວາມ" },
  reach_p: {
    en: "Message us on WhatsApp or Facebook. We deliver in Vientiane on Tuesdays and Fridays.",
    lo: "ສົ່ງຂໍ້ຄວາມຫາພວກເຮົາທາງ WhatsApp ຫຼື Facebook. ສົ່ງເຖິງບ້ານໃນວຽງຈັນ ທຸກວັນອັງຄານ ແລະ ວັນສຸກ.",
  },
  phone: { en: "Phone and WhatsApp", lo: "ໂທ ແລະ WhatsApp" },
  fb: { en: "Facebook", lo: "Facebook" },
  copy: { en: "Copy", lo: "ສຳເນົາ" },
  copied: { en: "Copied", lo: "ສຳເນົາແລ້ວ" },
  not_found: { en: "We couldn't find that page", lo: "ບໍ່ພົບໜ້ານີ້" },
  not_found_link: { en: "See all beans", lo: "ເບິ່ງເມັດກາເຟທັງໝົດ" },
} satisfies Record<string, Localized>;

const decorative = (src: string): ImageRef => ({ src, alt: null });

export const images: Record<SiteImage, ImageRef> = {
  hero: decorative("/images/hero.jpg"),
  cherries: { src: "/images/cherries.jpg", alt: ui.origin_alt },
  brew: decorative("/images/brew.jpg"),
  texture: decorative("/images/texture.jpg"),
  drying: { src: "/images/drying.jpg", alt: ui.dry_cap },
  roast: decorative("/images/roast.jpg"),
  cafe: decorative("/images/cafe.jpg"),
};

export const brandName = "Brand Name";
export const phone = "+856 20 5555 0142";
export const facebook = "facebook.com/brandname";
export const featuredBeanSlug = "bolaven-natural";

export const brewMethods: BrewMethod[] = [
  { id: "pour-over", name: { en: "Pour-over", lo: "ດຣິບ" }, ratio: "1:16", grind: { en: "Medium-fine", lo: "ກາງຄ່ອນລະອຽດ" }, time: { en: "3 min", lo: "3 ນາທີ" } },
  { id: "french-press", name: { en: "French press", lo: "ເຟຣນເພຣສ" }, ratio: "1:15", grind: { en: "Coarse", lo: "ຫຍາບ" }, time: { en: "4 min", lo: "4 ນາທີ" } },
  { id: "sock-filter", name: { en: "Lao sock filter", lo: "ກາເຟຖົງ" }, ratio: "1:10", grind: { en: "Fine", lo: "ລະອຽດ" }, time: { en: "5 min", lo: "5 ນາທີ" } },
  { id: "espresso", name: { en: "Espresso", lo: "ເອສເປຣສໂຊ" }, ratio: "1:2", grind: { en: "Very fine", lo: "ລະອຽດຫຼາຍ" }, time: { en: "28 sec", lo: "28 ວິນາທີ" } },
];

const beanImage = (slug: string, name: Localized): ImageRef => ({ src: `/images/bean-${slug}.jpg`, alt: name });

const bean = (b: Omit<Bean, "image">): Bean => ({ ...b, image: beanImage(b.slug, b.name) });

export const beans: Bean[] = [
  bean({
    slug: "paksong-washed",
    roast: "light",
    brewMethod: "pour-over",
    name: { en: "Paksong Washed", lo: "ປາກຊ່ອງ ລ້າງນ້ຳ" },
    process: { en: "Washed", lo: "ລ້າງນ້ຳ" },
    variety: { en: "Typica", lo: "ທີປິກາ" },
    region: { en: "Paksong, Champasak", lo: "ປາກຊ່ອງ, ຈຳປາສັກ" },
    elevation: { en: "1,300 m", lo: "1,300 ແມັດ" },
    notes: { en: "Jasmine, lemongrass, black tea", lo: "ດອກມະລິ, ຫົວສິງໄຄ, ຊາດຳ" },
    description: {
      en: "Washed at the farm and dried on raised beds. Clean and floral, best as a pour-over without milk.",
      lo: "ລ້າງທີ່ສວນ ແລະ ຕາກເທິງແຄ່ສູງ. ລົດຊາດສະອາດ ມີກິ່ນດອກໄມ້ ເໝາະກັບການຊົງແບບດຣິບ ບໍ່ໃສ່ນົມ.",
    },
  }),
  bean({
    slug: "bolaven-natural",
    roast: "medium",
    brewMethod: "french-press",
    name: { en: "Bolaven Natural", lo: "ບໍລະເວນ ຕາກແຫ້ງ" },
    process: { en: "Natural", lo: "ຕາກແຫ້ງທັງໝາກ" },
    variety: { en: "Catimor", lo: "ຄາຕິມໍ" },
    region: { en: "Bolaven Plateau", lo: "ພູພຽງບໍລະເວນ" },
    elevation: { en: "1,200 m", lo: "1,200 ແມັດ" },
    notes: { en: "Ripe mango, cocoa, brown sugar", lo: "ໝາກມ່ວງສຸກ, ໂກໂກ້, ນ້ຳຕານແດງ" },
    description: {
      en: "Dried whole in the cherry, so the fruit sugars stay in the bean. Heavy and sweet, good black or with milk.",
      lo: "ຕາກແຫ້ງທັງໝາກ ຄວາມຫວານຈາກໝາກຈຶ່ງຊຶມເຂົ້າເມັດ. ເຂັ້ມຂຸ້ນ ແລະ ຫວານ ດື່ມດຳ ຫຼື ໃສ່ນົມກໍໄດ້.",
    },
  }),
  bean({
    slug: "tha-teng-honey",
    roast: "medium",
    brewMethod: "sock-filter",
    name: { en: "Tha Teng Honey", lo: "ທ່າແຕງ ຮັນນີ່" },
    process: { en: "Honey", lo: "ຮັນນີ່" },
    variety: { en: "Catimor", lo: "ຄາຕິມໍ" },
    region: { en: "Tha Teng, Sekong", lo: "ທ່າແຕງ, ເຊກອງ" },
    elevation: { en: "1,000 m", lo: "1,000 ແມັດ" },
    notes: { en: "Tamarind, honey, roasted peanut", lo: "ໝາກຂາມ, ນ້ຳເຜິ້ງ, ຖົ່ວດິນຂົ້ວ" },
    description: {
      en: "Dried with some of the fruit left on the bean. Sweet and round, made for a sock filter and condensed milk.",
      lo: "ຕາກແຫ້ງໂດຍເຫຼືອເນື້ອໝາກໄວ້ບາງສ່ວນ. ຫວານ ກົມກ່ອມ ເໝາະກັບກາເຟຖົງ ໃສ່ນົມຂົ້ນ.",
    },
  }),
  bean({
    slug: "house-espresso",
    roast: "dark",
    brewMethod: "espresso",
    name: { en: "House Espresso", lo: "ເອສເປຣສໂຊ ປະຈຳຮ້ານ" },
    process: { en: "Washed and natural", lo: "ລ້າງນ້ຳ ແລະ ຕາກແຫ້ງ" },
    variety: { en: "Catimor and Robusta", lo: "ຄາຕິມໍ ແລະ ໂຣບັສຕາ" },
    region: { en: "Bolaven Plateau", lo: "ພູພຽງບໍລະເວນ" },
    elevation: { en: "800 to 1,300 m", lo: "800 ຫາ 1,300 ແມັດ" },
    notes: { en: "Dark chocolate, molasses, toasted rice", lo: "ຊັອກໂກແລັດ, ນ້ຳອ້ອຍ, ເຂົ້າຂົ້ວ" },
    description: {
      en: "Arabica for sweetness and a little Robusta for crema. Made for espresso and milk drinks.",
      lo: "ອາຣາບິກາໃຫ້ຄວາມຫວານ ແລະ ໂຣບັສຕາເລັກນ້ອຍໃຫ້ຄຣີມາ. ເໝາະກັບເອສເປຣສໂຊ ແລະ ເຄື່ອງດື່ມໃສ່ນົມ.",
    },
  }),
];

export const steps: Step[] = [
  { title: { en: "Pick", lo: "ເກັບ" }, body: { en: "Ripe red cherries are picked by hand from November to February.", lo: "ເກັບໝາກກາເຟສີແດງທີ່ສຸກດ້ວຍມື ແຕ່ເດືອນພະຈິກ ຫາ ກຸມພາ." } },
  { title: { en: "Dry", lo: "ຕາກ" }, body: { en: "Cherries dry on raised beds for two to four weeks and are turned every day.", lo: "ຕາກໝາກກາເຟເທິງແຄ່ສູງ 2 ຫາ 4 ອາທິດ ແລະ ພິກທຸກມື້." } },
  { title: { en: "Hull and sort", lo: "ສີ ແລະ ຄັດ" }, body: { en: "The dried fruit is milled off and the beans are sorted by size, then by hand.", lo: "ສີເປືອກອອກ ແລ້ວຄັດເມັດຕາມຂະໜາດ ແລະ ຄັດດ້ວຍມືອີກຄັ້ງ." } },
  { title: { en: "Roast", lo: "ຂົ້ວ" }, body: { en: "We roast small batches every week in Vientiane, so bags reach you within days of roasting.", lo: "ຂົ້ວເທື່ອລະໜ້ອຍທຸກອາທິດຢູ່ວຽງຈັນ ກາເຟຈຶ່ງເຖິງມືທ່ານພາຍໃນບໍ່ເທົ່າໃດມື້ຫຼັງຂົ້ວ." } },
  { title: { en: "Brew", lo: "ຊົງ" }, body: { en: "Use the beans within a month of the roast date printed on the bag.", lo: "ຄວນໃຊ້ພາຍໃນໜຶ່ງເດືອນ ນັບແຕ່ວັນທີຂົ້ວທີ່ພິມຢູ່ຖົງ." } },
];

export const places: Place[] = [
  {
    name: { en: "Roastery and shop", lo: "ໂຮງຂົ້ວ ແລະ ຮ້ານ" },
    address: { en: "Ban Sisaket, Chanthabouly District, Vientiane", lo: "ບ້ານສີສະເກດ, ເມືອງຈັນທະບູລີ, ນະຄອນຫຼວງວຽງຈັນ" },
    hours: { en: "Monday to Saturday, 7:00 to 17:00", lo: "ວັນຈັນ ຫາ ວັນເສົາ, 7:00 ຫາ 17:00" },
    mapsQuery: "Ban Sisaket Vientiane",
  },
  {
    name: { en: "Pakse shop", lo: "ຮ້ານປາກເຊ" },
    address: { en: "Ban Wat Luang, Pakse, Champasak", lo: "ບ້ານວັດຫຼວງ, ເມືອງປາກເຊ, ແຂວງຈຳປາສັກ" },
    hours: { en: "Every day, 7:00 to 18:00", lo: "ທຸກມື້, 7:00 ຫາ 18:00" },
    mapsQuery: "Wat Luang Pakse",
  },
];
