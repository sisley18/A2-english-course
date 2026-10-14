/* A2 Course content — 8 units, CEFR A2 (Elementary), B1-style unit layout.
   Section numbering: A2.<unit>.<section> */
const g = (t, a) => ({ t, a });                 // gap-fill item
const m = (q, o, a) => ({ q, o, a });           // multiple-choice item
const TF = ["True", "False"];

const UNITS = [
/* ───────────────────────── UNIT 1 ───────────────────────── */
{
  n: 1, emoji: "🏡", title: "Last Weekend", topic: "Free time & weekend activities",
  grammarName: "Past simple: was / were + regular verbs",
  goals: ["Talk about what you did at the weekend", "Use was / were correctly", "Form the past simple of regular verbs (-ed)", "Use past time expressions"],
  vocab: [
    ["go shopping", "I went shopping with my sister on Saturday."],
    ["have a barbecue", "We had a barbecue in the garden."],
    ["visit relatives", "She visited her relatives on Sunday."],
    ["watch a film", "They watched a film at the cinema."],
    ["play football", "He played football with his friends."],
    ["stay at home", "I stayed at home because it was raining."],
    ["clean the house", "We cleaned the house in the morning."],
    ["cook dinner", "My dad cooked dinner for the family."],
    ["hang out with friends", "I hung out with friends in the park."],
    ["have a lie-in", "On Sunday I had a lie-in until ten o'clock."]
  ],
  grammar: {
    rules: [
      "<b>Be:</b> I / he / she / it <b>was</b> · you / we / they <b>were</b>.",
      "<b>Negative:</b> wasn't / weren't. <b>Questions:</b> Was she…? Were they…?",
      "<b>Regular verbs:</b> add <b>-ed</b> → watch<b>ed</b>, play<b>ed</b>. Ends in -e: add <b>-d</b> → like<b>d</b>. Consonant + y → <b>-ied</b>: study → stud<b>ied</b>. One short vowel + consonant: double it → sto<b>pped</b>.",
      "<b>Time expressions:</b> yesterday · last night / week / weekend · on Saturday · two days ago · in 2020."
    ],
    examples: ["I was at home last night.", "They weren't at the party.", "Were you tired yesterday?", "She studied English on Sunday.", "We stopped at a café."]
  },
  practice: [
    { title: "Complete with the past simple of the verb in brackets.", type: "gap", items: [
      g("I ___ (be) at home last night.", "was"), g("They ___ (be) at the park yesterday.", "were"),
      g("She ___ (watch) a film on Saturday.", "watched"), g("We ___ (play) football two days ago.", "played"),
      g("He ___ (study) for his test on Sunday.", "studied"), g("My parents ___ (not / be) at work on Friday.", "weren't|were not"),
      g("I ___ (stop) at the shop to buy bread.", "stopped"), g("___ (be) you at the cinema last night? — Yes, I was.", "were")] },
    { title: "Choose the correct answer.", type: "mcq", items: [
      m("Yesterday we ___ a barbecue.", ["have", "had", "haved"], 1),
      m("She ___ at the gym last Sunday.", ["was", "were", "is"], 0),
      m("I ___ my room on Saturday morning.", ["cleaned", "cleanned", "clean"], 0),
      m("___ your friends at the party?", ["Was", "Were", "Did"], 1),
      m("He ___ happy about the weather.", ["wasn't", "weren't", "didn't"], 0)] }
  ],
  listening: {
    title: "Anna and Tom talk on Monday morning.",
    lines: [
      ["Tom", "Hi, Anna! How was your weekend?"],
      ["Anna", "It was great, thanks! On Saturday I visited my grandparents, and we had a barbecue in their garden."],
      ["Tom", "That sounds nice. Was the weather good?"],
      ["Anna", "Yes, it was sunny and warm. And you? What did you do?"],
      ["Tom", "Well, on Saturday I played football with my friends. We lost, but it was fun!"],
      ["Anna", "And on Sunday?"],
      ["Tom", "I stayed at home and watched a film. I was really tired."]
    ],
    qs: [
      m("Where did Anna have a barbecue?", ["At the park", "In her grandparents' garden", "At home"], 1),
      m("How was the weather on Saturday?", ["Sunny and warm", "Rainy", "Cold"], 0),
      m("What did Tom do on Sunday?", ["Played football", "Visited relatives", "Watched a film at home"], 2)]
  },
  reading: {
    title: "Sam's Weekend",
    text: ["Last weekend was very busy for Sam. On Saturday morning he cleaned the house with his brother. After lunch they walked to the shopping centre and bought new trainers. In the evening Sam's friends arrived and they cooked pizza together.",
           "On Sunday Sam didn't get up early. He had a lie-in until ten o'clock! Then he called his grandmother and talked to her for half an hour. In the afternoon he played tennis in the park. He was very tired, but happy."],
    qs: [
      m("Sam cleaned the house on Saturday.", TF, 0), m("They bought trainers at a market.", TF, 1),
      m("Sam got up early on Sunday.", TF, 1), m("Sam played tennis on Sunday afternoon.", TF, 0)]
  },
  speaking: ["Ask your partner: How was your weekend? What did you do on Saturday / Sunday?", "Were you tired / busy / bored? Why?", "Tell your partner about your best weekend ever."],
  writing: { task: "Write 50–70 words about your last weekend. Use at least four past simple verbs and two time expressions.",
    model: "Last weekend was great. On Saturday I went shopping with my mum and we bought a new jacket. In the evening I watched a film at home. On Sunday I visited my cousins. We had a barbecue and played football in the garden. I was very tired, but I was happy." }
},

/* ───────────────────────── UNIT 2 ───────────────────────── */
{
  n: 2, emoji: "✈️", title: "Holiday Memories", topic: "Travel & holidays",
  grammarName: "Past simple: irregular verbs",
  goals: ["Describe a past holiday", "Use common irregular past forms", "Use travel collocations", "Link events with then, after that, finally"],
  vocab: [
    ["book a hotel", "We booked a hotel near the beach."],
    ["pack a suitcase", "I packed my suitcase the night before."],
    ["go sightseeing", "We went sightseeing in Rome."],
    ["take photos", "She took hundreds of photos."],
    ["buy souvenirs", "They bought souvenirs for their friends."],
    ["lie on the beach", "I lay on the beach all afternoon."],
    ["catch a plane", "We caught the early plane to Madrid."],
    ["miss the bus", "He missed the last bus to the hotel."],
    ["try local food", "We tried local food in every town."],
    ["stay in a campsite", "My family stayed in a campsite by the lake."]
  ],
  grammar: {
    rules: [
      "Many common verbs are <b>irregular</b>: you must learn them.",
      "go → <b>went</b> · see → <b>saw</b> · eat → <b>ate</b> · buy → <b>bought</b> · take → <b>took</b> · have → <b>had</b> · get → <b>got</b> · come → <b>came</b>",
      "make → <b>made</b> · say → <b>said</b> · drink → <b>drank</b> · swim → <b>swam</b> · write → <b>wrote</b> · meet → <b>met</b> · lose → <b>lost</b> · lie → <b>lay</b>",
      "<b>Sequencers:</b> First, … · Then … · After that … · Finally … · The next day …"
    ],
    examples: ["We went to Italy last summer.", "I saw the Eiffel Tower.", "She ate pasta every day.", "They bought a lot of souvenirs.", "First we flew to Paris. Then we took a train."]
  },
  practice: [
    { title: "Complete with the past simple of the verb in brackets.", type: "gap", items: [
      g("Last summer we ___ (go) to Greece.", "went"), g("I ___ (see) a beautiful sunset on the beach.", "saw"),
      g("She ___ (buy) a hat at the market.", "bought"), g("They ___ (eat) fish every evening.", "ate"),
      g("He ___ (take) a lot of photos.", "took"), g("We ___ (swim) in the sea every morning.", "swam"),
      g("I ___ (meet) some nice people at the hotel.", "met"), g("She ___ (write) postcards to her friends.", "wrote")] },
    { title: "Choose the correct answer.", type: "mcq", items: [
      m("We ___ the last train to the airport.", ["catched", "caught", "catch"], 1),
      m("He ___ his passport at the hotel.", ["losed", "lost", "lose"], 1),
      m("My sister ___ a postcard to me.", ["wrote", "writed", "write"], 0),
      m("First we ___ in a café, then we went sightseeing.", ["have", "had", "has"], 1),
      m("I ___ some souvenirs for my family.", ["buyed", "bought", "buy"], 1)] }
  ],
  listening: {
    title: "Mia tells her friend Jack about her holiday.",
    lines: [
      ["Jack", "Hi, Mia! Welcome back. Where did you go on holiday?"],
      ["Mia", "I went to Portugal with my family. We stayed in a small hotel near the beach."],
      ["Jack", "Wow! What did you do there?"],
      ["Mia", "First we went sightseeing in Lisbon. Then we tried the local food. I ate fish and rice every day!"],
      ["Jack", "Did you swim in the sea?"],
      ["Mia", "Yes, we swam every morning. But on the last day I missed the bus to the airport!"],
      ["Jack", "Oh no! What happened?"],
      ["Mia", "We took a taxi. We got to the airport just in time."]
    ],
    qs: [
      m("Where did Mia stay?", ["In a campsite", "In a small hotel", "With friends"], 1),
      m("What did she eat every day?", ["Pasta", "Fish and rice", "Pizza"], 1),
      m("What happened on the last day?", ["She lost her passport", "She missed the bus", "She missed the plane"], 1)]
  },
  reading: {
    title: "A Summer in Scotland",
    text: ["Last August Ben and his family went to Scotland. They flew to Edinburgh and stayed in a campsite near a lake. It rained on the first day, so they stayed in the tent and played cards.",
           "The next day the weather was better. They went walking in the mountains and saw some deer. In the evening they cooked sausages on a fire. Ben took many photos. After a week they got back home. 'It was the best holiday of my life,' Ben said."],
    qs: [
      m("Ben's family travelled by car.", TF, 1), m("They stayed in a hotel.", TF, 1),
      m("They saw deer in the mountains.", TF, 0), m("Ben didn't enjoy the holiday.", TF, 1)]
  },
  speaking: ["Tell your partner about your last holiday: Where did you go? Who did you go with?", "What did you eat / buy / see?", "What was the best / worst thing about it?"],
  writing: { task: "Write a postcard (50–70 words) from a holiday. Say where you are, what you did yesterday and what the weather was like.",
    model: "Hi Anna! We are in Spain and it's fantastic. Yesterday we went sightseeing in Barcelona. First we saw the cathedral, then we ate paella in a small restaurant. After that we bought souvenirs. The weather was hot and sunny. See you soon! Love, Laura" }
},

/* ───────────────────────── UNIT 3 ───────────────────────── */
{
  n: 3, emoji: "🎒", title: "School Days", topic: "School, childhood & memories",
  grammarName: "Past simple: negatives, questions & used to",
  goals: ["Ask and answer questions about the past", "Make negative past statements", "Talk about childhood habits with used to", "Use school collocations"],
  vocab: [
    ["do homework", "I did my homework before dinner."],
    ["learn a language", "She learned French at primary school."],
    ["pass an exam", "He passed the maths exam."],
    ["fail a test", "I failed the history test."],
    ["make friends", "I made lots of friends in my first year."],
    ["get good marks", "She got good marks in English."],
    ["be good at", "I was good at sport but bad at art."],
    ["ride a bike", "I rode my bike to school."],
    ["have lessons", "We had lessons from nine to three."],
    ["play a trick on someone", "My brother played a trick on me."]
  ],
  grammar: {
    rules: [
      "<b>Negative:</b> subject + <b>didn't</b> + base verb → I <b>didn't go</b> (NOT I didn't went).",
      "<b>Questions:</b> <b>Did</b> + subject + base verb? → <b>Did</b> you <b>like</b> school? Short answers: Yes, I did. / No, I didn't.",
      "<b>Wh- questions:</b> What / Where / Who / When / Why + did + subject + base verb? → Where <b>did</b> you <b>go</b>?",
      "<b>used to</b> + base verb: past habits that are not true now → I <b>used to walk</b> to school. Negative: I <b>didn't use to</b> like maths."
    ],
    examples: ["I didn't do my homework.", "Did you walk to school?", "Where did she study?", "We used to play in the street.", "He didn't use to like vegetables."]
  },
  practice: [
    { title: "Complete the sentences with the correct form.", type: "gap", items: [
      g("I ___ (not / do) my homework yesterday.", "didn't do|did not do"), g("___ you ___ (like) school? — Yes, I did.", "did, like|did like"),
      g("She didn't ___ (pass) the exam.", "pass"), g("Where ___ he ___ (go) to school?", "did, go|did go"),
      g("We ___ (not / have) lessons on Saturday.", "didn't have|did not have"), g("When I was a child, I ___ (use) to play football every day.", "used"),
      g("What time ___ the lesson ___ (start)?", "did, start|did start"), g("They didn't ___ (make) many friends.", "make")] },
    { title: "Choose the correct answer.", type: "mcq", items: [
      m("Did you ___ English at school?", ["study", "studied", "studies"], 0),
      m("She ___ get good marks in maths.", ["didn't", "doesn't", "don't"], 0),
      m("We ___ walk to school when we were small.", ["use to", "used to", "uses to"], 1),
      m("Who ___ you sit next to?", ["do", "did", "were"], 1),
      m("He ___ the test because he didn't study.", ["failed", "fail", "fails"], 0)] }
  ],
  listening: {
    title: "Two friends talk about primary school.",
    lines: [
      ["Ella", "Did you enjoy primary school, Dan?"],
      ["Dan", "Yes, I loved it! I used to walk to school with my best friend, Max."],
      ["Ella", "What was your favourite subject?"],
      ["Dan", "PE! I was good at football. But I didn't like maths. I failed one test and I didn't get a good mark."],
      ["Ella", "Did you do your homework every day?"],
      ["Dan", "No, I didn't. Sometimes I forgot it, and the teacher wasn't happy!"],
      ["Ella", "I used to hate homework too."]
    ],
    qs: [
      m("How did Dan go to school?", ["By bus", "He walked", "He rode his bike"], 1),
      m("What was Dan's favourite subject?", ["Maths", "PE", "English"], 1),
      m("Did Dan do his homework every day?", ["Yes, he did", "No, he didn't", "We don't know"], 1)]
  },
  reading: {
    title: "My First School",
    text: ["I started school when I was five. It was a small school in the village and there were only forty students. I used to walk there with my older sister every morning. We didn't have a canteen, so we ate sandwiches in the playground.",
           "My favourite teacher was Mrs Brown. She taught us English and music. I wasn't good at maths and I didn't like it, but I loved reading. At the end of the year I got a prize for the best story. I still have it in my room today."],
    qs: [
      m("The school was very big.", TF, 1), m("The writer walked to school with her sister.", TF, 0),
      m("There was a canteen at the school.", TF, 1), m("She got a prize for a story.", TF, 0)]
  },
  speaking: ["Ask your partner: Did you like primary school? What did you use to do after school?", "What was your favourite / worst subject? Why?", "Describe your best teacher."],
  writing: { task: "Write 60–80 words about your school days. Use used to, didn't and two past simple questions.",
    model: "When I was at primary school, I used to walk with my friends every day. I didn't like maths, but I loved art. Did I do my homework? Not always! My teacher, Mr Green, was very kind. What did I want to be? I wanted to be a painter. I had a lot of fun at school." }
},

/* ───────────────────────── UNIT 4 ───────────────────────── */
{
  n: 4, emoji: "🌧️", title: "A Day to Remember", topic: "Events, accidents & news",
  grammarName: "Past continuous & past simple (when / while)",
  goals: ["Describe what was happening at a moment in the past", "Combine past continuous and past simple", "Tell a short story", "Use event collocations"],
  vocab: [
    ["wait for the bus", "I was waiting for the bus when it started to rain."],
    ["lose my keys", "She lost her keys on the way home."],
    ["hear a noise", "We heard a strange noise in the garden."],
    ["fall asleep", "He fell asleep on the sofa."],
    ["call the police", "They called the police immediately."],
    ["break a leg", "He broke his leg while he was skiing."],
    ["take a photo", "I was taking a photo when my phone fell."],
    ["miss the train", "She missed the train by two minutes."],
    ["it was pouring with rain", "It was pouring with rain all morning."],
    ["by chance", "I met an old friend by chance."]
  ],
  grammar: {
    rules: [
      "<b>Past continuous:</b> was / were + verb<b>-ing</b> → I <b>was walking</b>. Negative: wasn't / weren't walking. Question: <b>Were</b> you walking?",
      "Use it for an <b>action in progress</b> at a past time → At 8 o'clock I was having breakfast.",
      "<b>when</b> + past simple (short action): <b>When</b> the phone rang, I was cooking.",
      "<b>while</b> + past continuous (long action): I met Sara <b>while</b> I was shopping."
    ],
    examples: ["At nine o'clock I was having breakfast.", "It was raining when we left.", "What were you doing at 7 p.m.?", "I fell while I was running.", "They weren't listening to the teacher."]
  },
  practice: [
    { title: "Complete with past continuous or past simple.", type: "gap", items: [
      g("I ___ (walk) home when it started to rain.", "was walking"), g("While she ___ (cook), the phone rang.", "was cooking"),
      g("They ___ (watch) TV when the lights went out.", "were watching"), g("We ___ (not / listen) to the teacher.", "weren't listening|were not listening"),
      g("What ___ you ___ (do) at eight o'clock last night?", "were, doing|were doing"), g("He ___ (break) his arm while he was playing rugby.", "broke"),
      g("When I ___ (arrive), everyone was dancing.", "arrived"), g("___ it ___ (rain) when you left? — Yes, it was.", "was, raining|was raining")] },
    { title: "Choose the correct answer.", type: "mcq", items: [
      m("I ___ a shower when the doorbell rang.", ["had", "was having", "were having"], 1),
      m("She hurt her knee while she ___ tennis.", ["played", "was playing", "were playing"], 1),
      m("They ___ for the bus when I saw them.", ["waited", "was waiting", "were waiting"], 2),
      m("When the teacher came in, we ___.", ["talked", "were talking", "was talking"], 1),
      m("I ___ my keys while I was running.", ["lost", "was losing", "losing"], 0)] }
  ],
  listening: {
    title: "Leo tells Kate about a strange evening.",
    lines: [
      ["Kate", "Leo, you look tired. What happened last night?"],
      ["Leo", "It was crazy! I was watching a film when I heard a loud noise outside."],
      ["Kate", "Really? What did you do?"],
      ["Leo", "I looked out of the window. A car was standing in the road, and a man was shouting."],
      ["Kate", "Oh no! Did you call the police?"],
      ["Leo", "Yes, I did. While I was talking to them, the man drove away!"],
      ["Kate", "Wow. And were you scared?"],
      ["Leo", "A little. I couldn't sleep after that."]
    ],
    qs: [
      m("What was Leo doing when he heard the noise?", ["Cooking", "Watching a film", "Sleeping"], 1),
      m("Who did Leo call?", ["His friend", "The police", "His mum"], 1),
      m("What happened while Leo was talking?", ["The man drove away", "The police arrived", "The car crashed"], 0)]
  },
  reading: {
    title: "A Lucky Escape",
    text: ["Last Tuesday Nina was waiting for the bus in the centre of town. It was pouring with rain and she was reading a message on her phone. Suddenly a cyclist hit her bag and her phone fell into the road.",
           "While Nina was picking it up, the bus arrived. She ran to the door, but it closed in front of her. She missed the bus! Then a friendly driver stopped and said, 'Do you need a lift?' It was her old teacher. They talked all the way home, by chance, and Nina forgot about the rain."],
    qs: [
      m("It was sunny when Nina waited for the bus.", TF, 1), m("A cyclist hit her bag.", TF, 0),
      m("Nina caught the bus.", TF, 1), m("A teacher gave her a lift.", TF, 0)]
  },
  speaking: ["What were you doing at 9 p.m. yesterday? at 6 a.m. today? Ask your partner.", "Tell a story about a day when something unexpected happened. Use when and while.", "Ask: What happened? What were you doing? What did you do next?"],
  writing: { task: "Write a short story (60–80 words) about an unusual day. Use the past continuous and past simple.",
    model: "Last Friday I was walking to school when I saw a small dog in the street. It was raining and the dog was crying. I took it home. While my mum was calling the owner, I was giving it some water. An hour later, the owner arrived. She was very happy." }
},

/* ───────────────────────── UNIT 5 ───────────────────────── */
{
  n: 5, emoji: "🏙️", title: "City Life", topic: "Cities, places & transport",
  grammarName: "Comparatives & superlatives",
  goals: ["Compare places and things", "Use -er / more / the -est / the most", "Use as … as", "Describe your town and city life"],
  vocab: [
    ["a busy city centre", "The city centre is always busy at five o'clock."],
    ["a quiet village", "I grew up in a quiet village."],
    ["public transport", "Public transport is cheaper than a car."],
    ["the cost of living", "The cost of living is high in big cities."],
    ["a tourist attraction", "The castle is the biggest tourist attraction here."],
    ["a historic old town", "The old town is full of historic buildings."],
    ["fresh air", "In the countryside you can breathe fresh air."],
    ["the nightlife", "The nightlife in Madrid is fantastic."],
    ["rush hour", "The buses are full at rush hour."],
    ["a traffic jam", "We were stuck in a traffic jam for an hour."]
  ],
  grammar: {
    rules: [
      "<b>Short adjectives:</b> adj + <b>-er</b> / <b>the -est</b> → cheap<b>er</b>, the cheap<b>est</b>; big → big<b>ger</b>, the big<b>gest</b>; busy → bus<b>ier</b>, the bus<b>iest</b>.",
      "<b>Long adjectives:</b> <b>more</b> / <b>the most</b> + adj → <b>more</b> expensive, <b>the most</b> beautiful.",
      "<b>Irregular:</b> good → <b>better</b> → <b>the best</b> · bad → <b>worse</b> → <b>the worst</b> · far → <b>further</b> → <b>the furthest</b>.",
      "<b>than</b> for comparison: Paris is bigger <b>than</b> Lyon. <b>as … as</b>: The bus is <b>as</b> fast <b>as</b> the tram. <b>not as … as</b>: Taxis are <b>not as</b> cheap <b>as</b> buses."
    ],
    examples: ["London is bigger than Bristol.", "Trains are more comfortable than buses.", "It's the most beautiful city in the country.", "Life in the village is quieter than in the city.", "This bus is as fast as the train."]
  },
  practice: [
    { title: "Write the comparative or superlative form.", type: "gap", items: [
      g("The city is ___ (noisy) than the village.", "noisier"), g("This is ___ (big) shopping centre in the country.", "the biggest"),
      g("Trains are ___ (comfortable) than buses.", "more comfortable"), g("It's ___ (expensive) restaurant in town.", "the most expensive"),
      g("Life in a village is ___ (good) than in a city, I think.", "better"), g("That was ___ (bad) traffic jam ever!", "the worst"),
      g("The tram isn't ___ (fast) ___ the train.", "as, as"), g("Cycling is ___ (healthy) than driving.", "healthier")] },
    { title: "Choose the correct answer.", type: "mcq", items: [
      m("The metro is ___ than the bus.", ["fast", "faster", "fastest"], 1),
      m("It's ___ city I know.", ["the more beautiful", "the most beautiful", "most beautiful"], 1),
      m("Taxis are not ___ cheap as buses.", ["so", "than", "more"], 0),
      m("The weather here is ___ than in my country.", ["worse", "worst", "badder"], 0),
      m("This is ___ street in the town.", ["the busier", "the busiest", "busiest"], 1)] }
  ],
  listening: {
    title: "Zoe and Chris are looking for a place to live.",
    lines: [
      ["Zoe", "Chris, I can't decide. Do you prefer the city centre or the suburbs?"],
      ["Chris", "The city centre is more exciting, and the nightlife is the best. But it's noisier than the suburbs."],
      ["Zoe", "And it's more expensive. The flats there are much smaller than the ones in the suburbs."],
      ["Chris", "That's true. But public transport is easier. We don't need a car."],
      ["Zoe", "The suburbs are quieter and the air is cleaner. And the parks are the biggest in the area."],
      ["Chris", "OK. What about the cost of living? Is it cheaper in the suburbs?"],
      ["Zoe", "Yes, a lot cheaper. I think the suburbs are the best choice."]
    ],
    qs: [
      m("Which place is noisier?", ["The suburbs", "The city centre", "Both are the same"], 1),
      m("What is easier in the city centre?", ["Parking", "Public transport", "Finding a big flat"], 1),
      m("What does Zoe decide?", ["The city centre", "The suburbs", "A village"], 1)]
  },
  reading: {
    title: "Two Cities, Two Lifestyles",
    text: ["Lucas lives in Madrid, the capital of Spain. It's one of the biggest cities in Europe, and it's busier and noisier than the town where he grew up. Life is more expensive here, but there are more jobs and the nightlife is the best.",
           "His cousin Alba lives in a small village in the mountains. It's much quieter and the air is fresher. She says the people are friendlier, but there isn't as much to do. 'Public transport is worse,' she says, 'so I need a car.'"],
    qs: [
      m("Madrid is quieter than Lucas's hometown.", TF, 1), m("Life in Madrid is more expensive.", TF, 0),
      m("Alba lives in a big city.", TF, 1), m("Alba thinks public transport is better in the village.", TF, 1)]
  },
  speaking: ["Compare your town with another town or city. Which is bigger / older / safer?", "What's the best / worst thing about your city?", "Would you prefer to live in a village or a city? Why?"],
  writing: { task: "Write 60–80 words comparing two places (cities, towns or villages). Use at least four comparatives and one superlative.",
    model: "I live in Cordoba, and my aunt lives in Madrid. Madrid is bigger and busier than Cordoba. It's also more expensive. But Cordoba is quieter and the weather is hotter in summer. For me, Cordoba is the best city in Spain because the people are friendlier and the old town is the most beautiful." }
},

/* ───────────────────────── UNIT 6 ───────────────────────── */
{
  n: 6, emoji: "🍽️", title: "Eating Out", topic: "Food, drink & restaurants",
  grammarName: "Countable & uncountable nouns, quantifiers",
  goals: ["Order a meal in a restaurant", "Use some / any / much / many / a lot of", "Ask about quantity with How much / How many", "Use food and restaurant collocations"],
  vocab: [
    ["book a table", "I booked a table for four people."],
    ["ask for the menu", "We asked for the menu and the wine list."],
    ["order a meal", "She ordered a vegetarian meal."],
    ["a starter / a main course / a dessert", "I'd like soup as a starter and fish for the main course."],
    ["pay the bill", "Can we pay the bill, please?"],
    ["leave a tip", "We left a ten percent tip."],
    ["fast food", "Fast food isn't very healthy."],
    ["a healthy diet", "A healthy diet includes lots of vegetables."],
    ["home-made", "This soup is home-made."],
    ["a slice of cake / a glass of water", "Can I have a slice of cake and a glass of water?"]
  ],
  grammar: {
    rules: [
      "<b>Countable</b> nouns: a / an, plural → an apple, two apples. <b>Uncountable</b> nouns: no plural → water, rice, bread, cheese, milk.",
      "<b>some</b> (positive): I'd like <b>some</b> water. <b>any</b> (negative & questions): We haven't got <b>any</b> milk. Do you have <b>any</b> sugar?",
      "<b>How many</b> + countable? → How <b>many</b> eggs? <b>How much</b> + uncountable? → How <b>much</b> milk?",
      "<b>a lot of</b> (positive), <b>much / many</b> (negative & questions): There's <b>a lot of</b> salt. There isn't <b>much</b> time. Not <b>many</b> people came. <b>a few</b> + countable · <b>a little</b> + uncountable."
    ],
    examples: ["I'd like some bread, please.", "We haven't got any tomatoes.", "How much sugar do you take?", "How many people are coming?", "There's a little milk and a few eggs."]
  },
  practice: [
    { title: "Complete with some, any, much, many, a lot of, a few or a little.", type: "gap", items: [
      g("Would you like ___ coffee? (offer)", "some"), g("I haven't got ___ money with me.", "any"),
      g("How ___ sugar do you want in your tea?", "much"), g("How ___ eggs do we need for the cake?", "many"),
      g("There are ___ restaurants in this street — about twenty!", "a lot of"), g("Just ___ milk for me, please — not too much.", "a little"),
      g("There are only ___ tomatoes left. Three or four.", "a few"), g("Is there ___ cheese in the fridge?", "any")] },
    { title: "Choose the correct answer.", type: "mcq", items: [
      m("Bread is ___.", ["countable", "uncountable"], 1),
      m("I'd like ___ apple, please.", ["a", "an", "some"], 1),
      m("We didn't eat ___ chips.", ["some", "any", "a"], 1),
      m("How ___ water do you drink every day?", ["many", "much", "a few"], 1),
      m("Can we have ___ glass of water?", ["a", "some", "any"], 0)] }
  ],
  listening: {
    title: "At the restaurant: ordering a meal.",
    lines: [
      ["Waiter", "Good evening. Do you have a reservation?"],
      ["Mr Lee", "Yes, a table for two under the name Lee."],
      ["Waiter", "Of course. Here is the menu. Are you ready to order?"],
      ["Mr Lee", "Yes. I'd like the tomato soup as a starter, and the grilled chicken for the main course."],
      ["Mrs Lee", "And I'll have a salad and the fish, please. Is there any rice with the fish?"],
      ["Waiter", "Yes, there is. Would you like something to drink?"],
      ["Mrs Lee", "Some water, please. And a glass of orange juice."],
      ["Mr Lee", "Could we have the bill later, please?"]
    ],
    qs: [
      m("What does Mr Lee order for his starter?", ["Salad", "Tomato soup", "Fish"], 1),
      m("What does Mrs Lee order for the main course?", ["Chicken", "Fish", "A salad"], 1),
      m("What does Mrs Lee drink?", ["Water and orange juice", "Coffee", "Wine"], 0)]
  },
  reading: {
    title: "A Healthy Diet",
    text: ["Doctors say a healthy diet needs a lot of fruit and vegetables, but not much sugar or salt. You should drink plenty of water — about two litres a day. Fast food isn't good for you if you eat it every day.",
           "Marta's family tries to eat well. They cook home-made meals and they don't buy many ready meals. On Saturdays they have a few treats: some ice cream or a slice of cake. 'It isn't a problem,' says Marta, 'if you don't eat too many sweets.'"],
    qs: [
      m("A healthy diet needs a lot of sugar.", TF, 1), m("You should drink about two litres of water.", TF, 0),
      m("Marta's family buys many ready meals.", TF, 1), m("They have treats on Saturdays.", TF, 0)]
  },
  speaking: ["Role-play: customer and waiter. Book a table, order a starter, main course and drink, ask for the bill.", "Ask your partner: How much water do you drink? How many meals do you have a day?", "Describe your favourite restaurant."],
  writing: { task: "Write an email (60–80 words) booking a table at a restaurant for a family dinner. Say the date, time and number of people.",
    model: "Dear Sir or Madam, I would like to book a table for six people on Saturday 15th June at 8 p.m. Two of us are vegetarian, so please could you tell me if you have any vegetarian dishes? We also need a high chair for a baby. Please confirm the booking by email. Thank you. Best wishes, Helen Brown" }
},

/* ───────────────────────── UNIT 7 ───────────────────────── */
{
  n: 7, emoji: "🎯", title: "Plans & Dreams", topic: "Future plans, jobs & ambitions",
  grammarName: "Future: going to, will & present continuous",
  goals: ["Talk about plans and intentions", "Make predictions and spontaneous decisions", "Talk about arrangements", "Use work and study collocations"],
  vocab: [
    ["get a job", "I hope to get a job next year."],
    ["apply for a job", "She applied for a job at a bank."],
    ["have an interview", "He has an interview on Monday."],
    ["go to university", "My brother is going to go to university."],
    ["save money", "I'm saving money for a new laptop."],
    ["work part-time", "She works part-time in a café."],
    ["earn money", "He earns a lot of money."],
    ["learn to drive", "I'm going to learn to drive this summer."],
    ["move abroad", "They're planning to move abroad."],
    ["start your own business", "She wants to start her own business."]
  ],
  grammar: {
    rules: [
      "<b>be going to + base verb:</b> plans and intentions → I'<b>m going to</b> study medicine. Predictions with evidence → Look at the clouds. It's <b>going to</b> rain.",
      "<b>will + base verb:</b> spontaneous decisions → I'<b>ll</b> help you. Predictions & opinions → I think she'<b>ll</b> pass. Negative: <b>won't</b>.",
      "<b>Present continuous:</b> fixed arrangements → I'<b>m meeting</b> my teacher at 5 p.m. tomorrow.",
      "<b>Time expressions:</b> tomorrow · next week / month / year · in two days · this evening · soon."
    ],
    examples: ["I'm going to study medicine.", "I'll carry that bag for you.", "She's meeting her boss at three.", "It's going to rain.", "I don't think they'll win."]
  },
  practice: [
    { title: "Complete with going to, will or the present continuous.", type: "gap", items: [
      g("I ___ (go) to university next year. It's my plan.", "'m going to go|am going to go|m going to go"), g("The phone is ringing. I ___ (answer) it!", "'ll answer|will answer|ll answer"),
      g("We ___ (have) dinner with Tom at 8 p.m. tomorrow. (arrangement)", "'re having|are having|re having"), g("Look at those black clouds! It ___ (rain).", "'s going to rain|is going to rain|s going to rain"),
      g("I think Spain ___ (win) the match.", "'ll win|will win|ll win"), g("She ___ (not / apply) for that job. She doesn't like it.", "isn't going to apply|is not going to apply"),
      g("What ___ you ___ (do) this weekend?", "are, doing|are doing"), g("I'm tired. I ___ (not / go) out tonight.", "won't go|will not go|'m not going to go|am not going to go|m not going to go")] },
    { title: "Choose the correct answer.", type: "mcq", items: [
      m("I ___ study law. I've decided.", ["will", "am going to", "am studying"], 1),
      m("'It's cold in here.' 'I ___ close the window.'", ["'ll", "'m going to", "'m closing"], 0),
      m("We ___ the dentist at ten tomorrow. It's on my calendar.", ["see", "are seeing", "will see"], 1),
      m("Be careful! You ___ fall!", ["will", "are going to", "are falling"], 1),
      m("I don't think it ___ rain tomorrow.", ["will", "won't", "is going"], 0)] }
  ],
  listening: {
    title: "Two friends talk about the future.",
    lines: [
      ["Ruby", "So, Jake, what are you going to do after school?"],
      ["Jake", "I'm going to go to university. I'm going to study computer science."],
      ["Ruby", "That sounds great. Have you applied?"],
      ["Jake", "Yes, I have an interview next Tuesday. I'm meeting the head of department at ten o'clock."],
      ["Ruby", "Good luck! I'm sure you'll get a place."],
      ["Jake", "Thanks. What about you, Ruby?"],
      ["Ruby", "I'm not going to go to university. I want to save money and travel. I'll work part-time for a year, then I'll move abroad."]
    ],
    qs: [
      m("What is Jake going to study?", ["Medicine", "Computer science", "Law"], 1),
      m("When is Jake's interview?", ["Next Tuesday at ten", "Tomorrow at ten", "Next Monday"], 0),
      m("What is Ruby going to do first?", ["Go to university", "Work part-time", "Move abroad"], 1)]
  },
  reading: {
    title: "A Gap Year",
    text: ["Daniel is eighteen. He finished school in June, but he isn't going to start university this year. He's going to take a gap year. First he's going to work in a restaurant for six months to save money.",
           "In January he's flying to Thailand with a friend. They're staying in a small hotel for a week, then they're going to travel around the country. 'I think I'll learn a lot,' says Daniel. 'I'll practise my English, meet new people and try new food. After that, I'll be ready to study.'"],
    qs: [
      m("Daniel is going to start university this year.", TF, 1), m("He's going to work in a restaurant first.", TF, 0),
      m("He's flying to Thailand in January.", TF, 0), m("He's going to travel alone.", TF, 1)]
  },
  speaking: ["What are you going to do next weekend / next summer / after you finish this course?", "What are your plans for the next five years? Ask your partner.", "Make predictions about your partner's future: I think you'll…"],
  writing: { task: "Write 60–80 words about your plans for the next five years. Use going to, will and one arrangement.",
    model: "In five years I'm going to be a nurse. First I'm going to finish school and then I'm going to go to university. Next month I'm visiting a hospital to talk to a nurse. I think I'll work hard, but I'll enjoy it. I'm also going to learn to drive and save money. Maybe I'll move abroad one day." }
},

/* ───────────────────────── UNIT 8 ───────────────────────── */
{
  n: 8, emoji: "🌍", title: "Life Experiences", topic: "Experiences, achievements & technology",
  grammarName: "Present perfect: ever, never, just, already, yet, for, since",
  goals: ["Talk about life experiences", "Form the present perfect (have / has + past participle)", "Use ever, never, just, already, yet", "Use for and since"],
  vocab: [
    ["try a new sport", "I've tried surfing, but I've never tried skiing."],
    ["ride a horse", "Have you ever ridden a horse?"],
    ["travel abroad", "She has travelled abroad many times."],
    ["meet a famous person", "I've never met a famous person."],
    ["win a prize", "He's won a prize for his photos."],
    ["lose a phone", "I've just lost my phone!"],
    ["learn to cook", "She's learned to cook Italian food."],
    ["climb a mountain", "We've climbed a small mountain."],
    ["download an app", "I've already downloaded the new app."],
    ["break a record", "The athlete has broken the world record."]
  ],
  grammar: {
    rules: [
      "<b>Form:</b> have / has + <b>past participle</b> → I <b>have seen</b>, she <b>has worked</b>. Regular: -ed. Irregular: be → <b>been</b>, go → <b>gone/been</b>, see → <b>seen</b>, eat → <b>eaten</b>, do → <b>done</b>, write → <b>written</b>, take → <b>taken</b>.",
      "<b>Experience:</b> Have you <b>ever</b> been to London? — Yes, I have. / No, I <b>never</b> have.",
      "<b>just</b> (a moment ago), <b>already</b> (earlier than expected), <b>yet</b> (negatives & questions): I've <b>just</b> arrived. She's <b>already</b> finished. Have you done it <b>yet</b>?",
      "<b>for</b> + period of time (for two years) · <b>since</b> + point in time (since 2020, since Monday). I've lived here <b>for</b> five years. / <b>since</b> 2019.",
      "Past simple = finished time: I <b>went</b> to Paris in 2022. Present perfect = no exact time: I've <b>been</b> to Paris."
    ],
    examples: ["I've never ridden a horse.", "Have you ever met a famous person?", "She has just finished her homework.", "We haven't eaten yet.", "He has lived here since 2018."]
  },
  practice: [
    { title: "Complete with the present perfect of the verb in brackets.", type: "gap", items: [
      g("I ___ (never / ride) a horse.", "have never ridden|'ve never ridden|ve never ridden"), g("___ you ever ___ (be) to the USA?", "have, been|have been"),
      g("She ___ (just / win) a prize!", "has just won|'s just won|s just won"), g("We ___ (not / eat) yet. We're hungry.", "haven't eaten|have not eaten"),
      g("He ___ (already / do) his homework.", "has already done|'s already done|s already done"), g("They ___ (live) here for ten years.", "have lived|'ve lived|ve lived"),
      g("I ___ (know) her since 2015.", "have known|'ve known|ve known"), g("___ she ___ (finish) the report yet?", "has, finished|has finished")] },
    { title: "Choose the correct answer.", type: "mcq", items: [
      m("I've lived in this town ___ 2016.", ["for", "since", "ago"], 1),
      m("She has worked here ___ three years.", ["for", "since", "from"], 0),
      m("Have you ___ eaten sushi?", ["yet", "ever", "already"], 1),
      m("I ___ to Rome in 2021.", ["have been", "went", "have gone"], 1),
      m("We haven't seen that film ___.", ["yet", "just", "ever"], 0)] }
  ],
  listening: {
    title: "A job interview for a summer camp.",
    lines: [
      ["Interviewer", "Thank you for coming, Lisa. Have you ever worked with children?"],
      ["Lisa", "Yes, I have. I've worked as a babysitter for three years."],
      ["Interviewer", "That's good. Have you ever been to a summer camp?"],
      ["Lisa", "I've never been to one, but I've just finished a first-aid course. I've already passed the exam."],
      ["Interviewer", "Excellent. Have you ever lived abroad?"],
      ["Lisa", "Yes. I've lived in Canada since 2021, so my English is good."],
      ["Interviewer", "Perfect. Have you filled in the form yet?"],
      ["Lisa", "Yes, I gave it to your assistant this morning."]
    ],
    qs: [
      m("How long has Lisa worked as a babysitter?", ["For one year", "For three years", "Since last month"], 1),
      m("What has Lisa just finished?", ["A French course", "A first-aid course", "School"], 1),
      m("Has Lisa been to a summer camp?", ["Yes, many times", "No, never", "Yes, once"], 1)]
  },
  reading: {
    title: "A Life Full of Adventures",
    text: ["Tom is only twenty-five, but he has already done many exciting things. He has climbed three mountains, he has travelled to fifteen countries and he has learned to speak Spanish. He has never been to Africa, but he's going there next year.",
           "Last month he won a prize for a short film about his journeys. 'I've wanted to make films since I was twelve,' he says. 'Now I've just started my own YouTube channel. I haven't earned any money yet, but I'm very happy.'"],
    qs: [
      m("Tom has climbed three mountains.", TF, 0), m("He has been to Africa.", TF, 1),
      m("He has wanted to make films since he was twelve.", TF, 0), m("He has earned a lot of money from his channel.", TF, 1)]
  },
  speaking: ["Have you ever…? Ask your partner about five experiences (try, ride, win, lose, meet…).", "What have you done this week? What haven't you done yet?", "Tell your partner about the most exciting thing you have ever done."],
  writing: { task: "Write 70–90 words about your life experiences. Say what you have done, what you have never done and what you have just done.",
    model: "I've done many interesting things in my life. I've travelled to five countries and I've learned to swim. I've never ridden a horse, but I'd like to. I've lived in this city since 2015, so I know it very well. I've just started a photography course, and I've already taken a hundred photos. I haven't shown them to my friends yet." }
}
];
