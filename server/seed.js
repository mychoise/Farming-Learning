import { drizzle } from "drizzle-orm/node-postgres";
import { noticeTable } from "./db/schema/notice.js";
import {db} from "./db.js"



// ── Seed data ────────────────────────────────────────────────────────────────
const seedNotices = [
  // weather
  {
    title: "Monsoon Season Advisory",
    lead: "The Department of Hydrology and Meteorology has issued a high-priority advisory urging all residents across the Bagmati, Gandaki, and Koshi river valleys to prepare for an extended and potentially severe monsoon season. Above-average precipitation is expected this year due to a strengthened Bay of Bengal low-pressure system, and authorities are calling on communities to act early and stay informed throughout the season.",
    content:
      "Heavy and continuous rainfall is expected across the valley from June through September, with meteorologists forecasting above-average precipitation levels this year. Residents living in low-lying areas, floodplains, and near riverbanks should take immediate precautions: reinforce drainage channels, move valuables to higher ground, and prepare emergency kits containing essential documents, medicines, and at least three days' worth of food and drinking water. Local authorities have pre-positioned rescue boats at flood-prone locations including Teku, Thapathali, and Balkhu. Citizens are strongly encouraged to monitor updates from the Department of Hydrology and Meteorology and follow instructions from ward-level disaster management committees. Do not attempt to cross flooded roads or rivers under any circumstances. Report blocked drains or landslide activity to your nearest ward office immediately so that response teams can be deployed without delay.",
    image: "https://images.unsplash.com/photo-1504608524841-42584120d63f?w=800",
    category: "weather",
  },
  {
    title: "Heatwave Warning Issued",
    lead: "A severe heatwave warning has been declared by the Meteorological Forecasting Division as temperatures across the Terai and mid-hill regions are projected to reach dangerous highs over the next three days. Health authorities are urging the public to take the warning seriously, limit unnecessary outdoor exposure, and pay close attention to the well-being of elderly neighbours, young children, and individuals with pre-existing medical conditions.",
    content:
      "Temperatures are forecast to exceed 40 °C over the next 72 hours, with heat index values potentially feeling even higher due to elevated humidity in low-altitude districts. Health authorities warn that prolonged exposure can cause heat exhaustion and life-threatening heat stroke. Residents should drink at least 3–4 litres of water daily, avoid strenuous outdoor activity between 11 AM and 4 PM, wear light-coloured and loose-fitting clothing, and keep living spaces well ventilated. Community members are encouraged to regularly check on vulnerable individuals nearby. Public cooling centres have been established at ward offices in the most severely affected areas. If you or someone around you shows signs of heat stroke — including confusion, rapid heartbeat, or loss of consciousness — call emergency services immediately and move the person to a cool, shaded area while awaiting assistance.",
    image: null,
    category: "weather",
  },
  {
    title: "Fog Alert for Mountain Roads",
    lead: "Traffic authorities and the Department of Roads have jointly issued a dense fog advisory for major national highways following a sharp drop in visibility that has already contributed to several road incidents in the past 48 hours. Motorists travelling on Tribhuwan Highway, Prithvi Highway, and the Siddhartha Highway approaches are urged to exercise extreme caution and postpone non-essential journeys until conditions improve.",
    content:
      "Dense, persistent fog has been reported along Tribhuwan Highway and Prithvi Highway, with visibility dropping to as low as 20–30 metres in several stretches, particularly between Naubise and Mugling. Drivers must use fog lights — not high beams, which reflect off fog and further reduce visibility — and maintain a safe following distance of at least 50 metres from the vehicle ahead. Overtaking is strictly discouraged under these conditions. Heavy vehicles, buses, and trucks should pull over at designated rest areas if visibility drops below a safe threshold. Pedestrians and cyclists must wear reflective gear and avoid walking along highway shoulders during foggy periods. Traffic police have been deployed at high-risk stretches to manage flow and assist stranded motorists. Travellers are advised to check road conditions with local traffic authorities before departing and to carry emergency supplies including a torch, blanket, and basic first-aid kit.",
    image: null,
    category: "weather",
  },

  // market
  {
    title: "Weekly Vegetable Price Update",
    lead: "The municipal market monitoring unit has released its weekly price bulletin, revealing notable fluctuations across several key vegetable commodities. Tomato prices have climbed sharply this week as supply chain disruptions stemming from recent road blockages in major producing districts continue to affect availability, while staples such as potatoes and onions have held relatively steady for the time being.",
    content:
      "Tomato prices have risen approximately 15 percent this week due to supply disruptions caused by road blockages in key producing areas of Sindhupalchowk and Kavrepalanchowk districts, reducing the volume of fresh produce reaching Kathmandu Valley markets. Consumers are advised to plan purchases carefully and consider substitute vegetables that remain affordable. Potato and onion prices remain stable for now, though market analysts caution that prolonged disruptions could affect these commodities in coming weeks as well. Green leafy vegetables, cauliflower, and seasonal gourds are currently available at reasonable prices and offer good nutritional value. The full itemised price list, updated every Monday and Thursday, is available at the municipal market board located at Kalimati Fruits and Vegetable Market and on the municipality's official website. Consumers are encouraged to buy from registered vendors to ensure fair pricing and food safety standards.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
    category: "market",
  },
  {
    title: "New Trading Hours at Ason Market",
    lead: "The Ason Market Management Committee, in coordination with the Kathmandu Metropolitan City office, has announced a revision to the official trading hours of Ason Bazaar effective from the first of next month. The change is designed to better serve the growing number of shoppers visiting the historic market and to provide vendors with extended business opportunities during peak weekend periods.",
    content:
      "Effective from the 1st of next month, Ason Bazaar will operate from 6 AM to 8 PM on weekdays and from 6 AM to 10 PM on weekends and public holidays, extending the current closing time by two hours on weekdays and four hours on weekends. The decision follows a survey of vendors and shoppers that highlighted consistent demand for longer operating hours, particularly during festive seasons and weekends when foot traffic peaks significantly. Shop owners are required to update their signage and inform their regular customers accordingly. Security and sanitation staff deployment will be adjusted to cover the extended hours. Vendors operating food stalls are reminded to comply with municipal hygiene guidelines throughout the extended period. Any vendor found operating outside the designated hours without prior written approval from the Market Management Committee will be subject to a formal warning and possible suspension of trading licence.",
    image: null,
    category: "market",
  },
  {
    title: "Livestock Fair – Annual Registration Open",
    lead: "The District Agriculture Office has officially opened registration for this year's annual livestock fair, one of the region's most anticipated agricultural events bringing together farmers, breeders, veterinary professionals, and agribusiness stakeholders from across the province. Organisers are expecting record participation this year following the expansion of fair grounds and the addition of new competitive categories for poultry and small ruminants.",
    content:
      "Farmers and livestock breeders wishing to participate in this year's annual livestock fair must complete their registration at the District Agriculture Office before the end of the current month. Entry is free for registered smallholders holding a valid agricultural identity card, while commercial breeders are required to pay a nominal registration fee as outlined in the official fair circular. Participants may enter animals in categories including cattle, buffalo, goats, sheep, pigs, and poultry. All animals entered must have up-to-date vaccination records and will undergo a mandatory veterinary health inspection upon arrival at the fairground. Prizes will be awarded across multiple categories based on criteria including breed quality, health condition, and productivity indicators. In addition to competitions, the fair will feature demonstrations of modern livestock management practices, veterinary consultations, and an agri-input exhibition. For registration forms and detailed guidelines, visit the District Agriculture Office during business hours or download the form from the official district website.",
    image: null,
    category: "market",
  },

  // government
  {
    title: "Public Holiday – Constitution Day",
    lead: "The Government of Nepal has confirmed that Constitution Day, commemorating the promulgation of the Constitution of Nepal in 2072 BS, will be observed as a nationwide public holiday this year. Citizens across the country are invited to participate in flag-hoisting ceremonies, civic programmes, and cultural events organised by local government bodies to mark this significant occasion in the nation's democratic history.",
    content:
      "In observance of Constitution Day, all government offices, public schools, universities, courts, and public institutions will remain closed for the day. Private businesses and financial institutions are also encouraged to grant the holiday to employees in accordance with the Labour Act. Emergency services including hospitals, fire brigades, police, and utilities will operate as normal to ensure uninterrupted public safety and welfare. Local governments across all seven provinces have planned a range of commemorative events, including flag-hoisting ceremonies at public squares, civic awareness programmes in schools, and cultural performances highlighting Nepal's constitutional journey. Citizens are encouraged to participate in these events and take pride in the democratic values enshrined in the constitution. The national broadcaster will air special programmes throughout the day reviewing constitutional milestones and featuring addresses by senior government officials. Travel disruptions are possible in central areas due to official processions; commuters are advised to plan accordingly.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    category: "government",
  },
  {
    title: "Voter Registration Drive",
    lead: "The Election Commission of Nepal has launched a special voter registration drive targeting eligible citizens who have yet to be enrolled on the national electoral roll. With the next local and federal election cycle approaching, the Commission is emphasising the critical importance of ensuring every eligible Nepali citizen has the opportunity to exercise their democratic right to vote without administrative hurdles.",
    content:
      "The Election Commission invites all eligible citizens who have not yet registered as voters, or who need to update their registration due to a change of address or personal details, to visit their nearest ward office at the earliest opportunity. Applicants must bring a valid citizenship certificate as proof of identity and residency. The ward offices have been equipped with dedicated registration counters staffed by trained Election Commission personnel to facilitate the process smoothly. Citizens who have previously registered but moved to a new ward are reminded that they must transfer their registration to their current place of residence to be eligible to vote in local elections. Registration is free of charge. The Commission has also deployed mobile registration units to reach remote communities with limited access to ward offices. The deadline for this registration drive will be announced formally; applicants are urged not to wait until the final days to avoid long queues and potential processing delays.",
    image: null,
    category: "government",
  },
  {
    title: "Water Supply Interruption Notice",
    lead: "The Kathmandu Upatyaka Khanepani Limited (KUKL) has issued an advance notice informing residents of wards 5, 6, and 7 of a planned suspension of water supply this coming Sunday morning. The interruption is necessitated by essential maintenance work on a critical section of the main distribution pipeline that, if left unaddressed, could result in a larger and more prolonged supply failure affecting a significantly wider area.",
    content:
      "Due to scheduled maintenance and repair work on the main water distribution pipeline serving the northern supply zone, water supply to wards 5, 6, and 7 will be fully suspended from 6 AM to 2 PM this Sunday. KUKL engineers will be replacing a deteriorated section of the primary pipeline at the junction near the Balaju distribution point, which requires complete shutdown of the affected supply line during works. Residents in the affected wards are strongly advised to store adequate water before 6 AM Sunday to meet household needs throughout the interruption period. Hospitals, clinics, schools, and other critical facilities in the affected wards are requested to make appropriate arrangements well in advance. Emergency water tankers will be stationed at two central locations within each ward for residents who require additional supply during the maintenance window. Supply is expected to resume by 2 PM, though minor restoration delays may occur depending on field conditions. For queries, contact the KUKL helpline.",
    image: null,
    category: "government",
  },

  // other
  {
    title: "Community Clean-Up Drive",
    lead: "Community leaders, local youth clubs, and environmental volunteers are joining hands this Saturday for a large-scale clean-up of the Bagmati riverbanks, one of the most sacred and historically significant waterways in the Kathmandu Valley. Organisers are calling on residents from all neighbouring wards to come out in force, contribute a few hours of their morning, and help restore the dignity and ecological health of this beloved river.",
    content:
      "Volunteers are invited to join their neighbours this Saturday for a community clean-up of the Bagmati riverbanks stretching from Teku Bridge to the Tripureshwor Ghat. The event is being coordinated by the ward environmental committee in partnership with the Bagmati Civilisation Integrated Development Committee and several local youth organisations. Gloves, collection bags, and safety equipment will be provided to all participants at no cost. Volunteers should assemble at the Teku Bridge by 7 AM sharp for a brief orientation before clean-up zones are assigned. The activity is expected to conclude by 11 AM, after which a small refreshment gathering will be held to appreciate participants' efforts. Children are welcome to attend accompanied by a parent or guardian. Participants are encouraged to wear comfortable clothes and sturdy footwear. This is part of an ongoing monthly initiative; those interested in joining the regular volunteer roster can register with the ward environmental coordinator. Together, small actions create lasting change for our rivers and communities.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
    category: "other",
  },
  {
    title: "Blood Donation Camp",
    lead: "The Nepal Red Cross Society, in collaboration with the local ward health committee and a coalition of youth volunteer groups, is organising a one-day blood donation camp this Friday to address a critically low supply of blood reserves at the district blood bank. All healthy adults are urged to come forward and donate, as even a single unit of blood has the potential to save up to three lives.",
    content:
      "A free blood donation camp will be held at the ward community hall this Friday from 9 AM to 4 PM. All blood groups are urgently needed, with stocks of O negative and AB positive particularly depleted at the district blood bank following increased surgical and trauma cases over recent weeks. Donors must be between 18 and 65 years of age, weigh at least 50 kg, and be in good general health. Bring a valid government-issued ID and ensure you are well hydrated and have eaten a light meal before arriving. A brief medical screening will be conducted on-site before donation. The entire process, including registration, screening, donation, and rest, takes approximately 45 minutes. All equipment used is sterile, single-use, and completely safe. Donors will receive a complimentary refreshment pack and a donation certificate. Those who are unable to donate due to medical reasons are encouraged to spread the word among family and friends. Contact the ward health office for further information.",
    image: null,
    category: "other",
  },
  {
    title: "Internet Maintenance Downtime",
    lead: "The regional internet service provider has issued a formal advance notice informing subscribers across the valley of planned infrastructure upgrade work scheduled for late Thursday night into the early hours of Friday morning. The maintenance is part of a broader network modernisation programme aimed at significantly improving connection speeds, reducing latency, and expanding bandwidth capacity for both residential and business customers across the service area.",
    content:
      "Internet services across the affected distribution zones may experience intermittent outages and significantly reduced speeds between midnight and 4 AM on Thursday night as the local ISP carries out essential infrastructure upgrades on core fibre optic routing equipment at the central exchange. The maintenance window has been deliberately scheduled during the lowest-traffic period of the week to minimise disruption to subscribers. During this period, both broadband and fibre connections may drop multiple times as engineers cycle equipment and test restored connections. Mobile data services will remain unaffected and can be used as an alternative during the outage window. Businesses and individuals who rely on uninterrupted connectivity for critical operations — including cloud backups, remote servers, or overnight automated processes — are advised to either reschedule these tasks or make alternative connectivity arrangements ahead of time. The ISP's technical support helpline will remain active throughout the maintenance window. Services are expected to be fully restored and performing at improved speeds by 4 AM Friday.",
    image: null,
    category: "other",
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("🌱 Seeding notices table…");

  try {
    const inserted = await db
      .insert(noticeTable)
      .values(seedNotices)

    console.log(`✅ Inserted ${inserted.length} notices:`);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
