export const categories = [
  { id: 'all', name: 'All Books' },
  { id: 'fiction', name: 'Fiction' },
  { id: 'mystery', name: 'Mystery' },
  { id: 'romance', name: 'Romance' },
  { id: 'scifi', name: 'Sci-Fi' },
  { id: 'thriller', name: 'Thriller' },
  { id: 'fantasy', name: 'Fantasy' },
  { id: 'selfhelp', name: 'Self-Help' },
];

export const books = [
  {
    id: '1',
    title: 'The Last Lighthouse Keeper',
    author: 'Eleanor Vance',
    category: 'fiction',
    coverGradient: ['#1e3a5f', '#2d5a87'],
    rating: 4.8,
    pages: 324,
    readTime: '5h 20m',
    synopsis: 'On a remote island where the sea meets the sky, an aging lighthouse keeper discovers a message in a bottle that threatens to unravel the island\'s oldest secret. As storms gather and trust fractures, she must choose between preserving the past or illuminating the truth.',
    chapters: [
      { title: 'The Bottle', content: `The bottle arrived on a Tuesday, wedged between two black rocks at the base of the cliff. Mara found it during her morning rounds, the glass still slick with seawater, the cork swollen and dark. She might have left it there—another piece of ocean debris in a lifetime of debris—except for the paper curled inside, pressed against the glass like a desperate hand.\n\nShe sat on the wet rock, her boots inches from the tide, and worked the cork free with her pocketknife. The paper unfurled in her palm, the ink faded but legible, and the first line made her forget the cold: "If you are reading this, I am already dead, and the lighthouse is not what you think it is."\n\nMara looked up at the tower looming above her, its white paint peeling in silver strips, its light dormant in the pale morning. She had lived inside that tower for forty-three years. She had believed she knew every brick, every stair, every ghost. Now, holding the bottle, she was no longer sure.` },
      { title: 'Forty-Three Years', content: `Her father had brought her to the island when she was six. She remembered the boat trip in fragments: the smell of diesel, the way her mother\'s hand tightened on the railing, the silence that settled over them as the mainland shrank to a line and then a memory. "This is our purpose," her father had said, pointing up at the tower. "We keep the light. We keep them safe."\n\nShe had believed him. Even after he died, even after her mother walked into the sea on a moonless night and never walked back, even after the supply boats came less and less frequently and the radio stopped working on Tuesdays—she had believed him. The light was purpose. The light was enough.\n\nBut the letter in the bottle was written in her mother\'s hand.` },
      { title: 'The Letter', content: `"The lighthouse was built in 1847," the letter read, "but not to warn ships away from the rocks. It was built to hide something. To keep something in. Your father knew. The light you tend every night is not a beacon—it is a seal. And seals weaken with time."\n\nMara read the letter three times. Then she folded it carefully, returned it to the bottle, and climbed the spiral stairs for the first time in years, counting each step: one hundred and forty-seven. At the top, the lamp room smelled of brass polish and old oil. The lens, a giant Fresnel of prismatic glass, caught the weak daylight and scattered it across the walls in fractured rainbows.\n\nShe had never questioned why the lamp was so large. She had never questioned why, on certain nights, she heard sounds beneath the tower—not the sea, but something rhythmic, something that breathed.` },
    ],
  },
  {
    id: '2',
    title: 'Midnight in the Garden of Silicon',
    author: 'Julian K. Reed',
    category: 'scifi',
    coverGradient: ['#0f172a', '#312e81'],
    rating: 4.6,
    pages: 412,
    readTime: '7h 10m',
    synopsis: 'In a city where memories can be backed up to the cloud and love is algorithmically optimized, a memory-archivist falls for a woman whose past has been permanently deleted. Their search for her history uncovers a conspiracy that could reboot humanity.',
    chapters: [
      { title: 'Backup Complete', content: `At 11:47 PM, Elias finished archiving his thirty-seventh memory of the day. He sat back in his chair, the neural interface cooling against his temple, and watched the upload progress bar fill with amber light. In the corner of his vision, his storage quota blinked: 84% full. He was due for a purge soon, a ritual he dreaded more than the dentist.\n\nThe Memory Gardens tower rose above him through the panoramic window, its bioluminescent vines pulsing in rhythm with the city\'s data flow. Each bloom represented a thousand archived moments; each root system, a decade of collective human experience. It was beautiful and obscene.\n\nHis console chimed. A client request, flagged urgent. He almost ignored it—no one needed memories archived at midnight—but the name stopped him: Aria Voss. No backup history. No cloud footprint. A ghost in a world of permanent records.` },
      { title: 'The Woman With No Past', content: `She arrived wearing a coat the color of old television static, her hair pinned in a style that had been fashionable three decades ago. Elias noticed these things because his job had trained him to notice: every detail was a potential memory trigger, every choice a clue to what someone valued enough to preserve.\n\n"I need you to find something," she said, before he could ask for her identification. Her voice was lower than he expected, rough at the edges, as if she had spent years shouting into storms. "Not archive. Find."\n\n"I\'m not a detective, Ms. Voss."\n\n"No. You\'re a gardener." She gestured at the tower visible through his window. "And my memories are in there. All of them. Planted without my consent. I want them back, or I want them burned."` },
    ],
  },
  {
    id: '3',
    title: 'The Confectioner\'s Daughter',
    author: 'Amélie Beaumont',
    category: 'romance',
    coverGradient: ['#831843', '#be185d'],
    rating: 4.9,
    pages: 278,
    readTime: '4h 30m',
    synopsis: 'In a Parisian patisserie that closes at midnight, a baker who can taste emotions in chocolate meets a composer who has lost his ability to hear music. Together, they discover that some recipes can only be written by two hearts.',
    chapters: [
      { title: 'Bitter Notes', content: `The kitchen of Pâtisserie Minuit smelled of burnt sugar and regret. Colette stirred her ganache in slow, deliberate circles, tasting the air with the part of her mind that had never learned to switch off. The cocoa was from Madagascar, floral and bright, but underneath it she detected something else: the supplier\'s anxiety, sharp and metallic, lingering in the beans like a frequency only she could hear.\n\nShe adjusted the temperature, added a pinch of sea salt to counter the bitterness, and allowed herself one moment of exhaustion. It was 11:47 PM. In thirteen minutes, she would flip the sign to Fermé and retreat to her apartment above the shop, where she would sleep poorly and dream of flavors that did not yet exist.\n\nThe bell above the door chimed.\n\nShe did not look up. "Je suis désolée, nous fermons—"\n\n"I don\'t need a cake," the man said. His French was fluent but accented, something Eastern European in the vowels. "I need silence."` },
      { title: 'The Composer', content: `His name was Lukas Varga, and he had composed three symphonies before the age of thirty. The fourth had broken him. Colette learned this not from him—he was stingy with words, generous with pauses—but from the music magazines she found in his coat pockets, their pages soft as tissue from repeated reading.\n\n"I can\'t hear it anymore," he told her on his fourth visit, sitting at the marble counter while she tempered chocolate. "Not just my own music. Any music. It\'s like someone painted over a window I used to look through."\n\nShe handed him a truffle, dark and glossy, rolled in crushed pistachio. "Eat this. Close your eyes."\n\nHe did. She watched his face as the flavors unfolded—first the bitterness of the cacao, then the grassiness of the nut, finally the faint sweetness of the honey she had added because the batch had tasted, to her, of loneliness.\n\nHis eyes opened, and for a moment she saw music in them, something moving that did not need sound.` },
    ],
  },
  {
    id: '4',
    title: 'The Algorithm of Doubt',
    author: 'Marcus Chen',
    category: 'thriller',
    coverGradient: ['#064e3b', '#059669'],
    rating: 4.5,
    pages: 356,
    readTime: '6h 00m',
    synopsis: 'When a famous true-crime podcaster is found dead, the only clue is an episode published after her death. Her estranged brother, a forensic statistician, realizes the killer is using probability theory to choose victims—and he\'s next on the list.',
    chapters: [
      { title: 'Episode Zero', content: `The episode was forty-seven minutes long, uploaded at 3:33 AM to a server that had been deactivated six hours earlier. Theo listened to it three times in the fluorescent glare of the police station, his sister\'s voice unmistakable even through the cheap speakers.\n\n"If you\'re hearing this," Vivian said, her tone light, conversational, the same voice she used to discuss kidnappings and unsolved murders with millions of subscribers, "then I\'m probably dead, and you\'re probably wondering how a dead woman managed to post a podcast. The answer is simple: I didn\'t. Someone who knows my work very well did. Someone who wants to play a game."\n\nA pause. Theo heard paper rustling.\n\n"Theo, if you\'re listening—and I know you are, because the police always call the family first—I need you to remember what Dad taught us about coincidences. There are no coincidences. Only probability we haven\'t calculated yet."` },
      { title: 'The Statistician', content: `Theo had spent fifteen years proving that crime was predictable. Not individual crimes—he was not a psychic—but patterns, clusters, the way violence gathered in certain neighborhoods during certain weather conditions, the way serial offenders followed mathematical distributions more rigid than most people followed traffic laws. He had testified before Congress. He had been profiled in The New Yorker. He had not spoken to his sister in three years.\n\nNow, sitting in her apartment, surrounded by corkboards and red string and the particular chaos of someone who organized information for a living, he opened her laptop and found the spreadsheet. It contained names. Addresses. Dates. And in the final column, a formula that made his blood slow in his veins: a Bayesian probability model that predicted, with 94% accuracy, the likelihood of each person\'s death within the next thirty days.\n\nHis own name was at the bottom. Probability: 97.3%.` },
    ],
  },
  {
    id: '5',
    title: 'Echoes of the Ember Throne',
    author: 'Sera Blackwood',
    category: 'fantasy',
    coverGradient: ['#7c2d12', '#c2410c'],
    rating: 4.7,
    pages: 528,
    readTime: '9h 15m',
    synopsis: 'In a kingdom where fire is currency and memories fuel magic, a smuggler is hired to steal the crown princess\'s memories—only to discover they contain the location of the last dragon, which both the crown and the revolution need to survive.',
    chapters: [
      { title: 'Ash Market', content: `Kael sold memories by the dram, measured in crystal vials that caught the torchlight and scattered it into rainbows. The Ash Market operated under the skeletal remains of the old cathedral, its vendors hooded and anonymous, its customers desperate. A vial of childhood joy went for five ember-coins. A first kiss, three. Trauma was cheap—too common, too heavy to carry—and nostalgia was premium, hoarded by the nobility like wine.\n\nHe had built his reputation on discretion. You wanted to forget? He made it happen, no questions. You wanted to remember something that wasn\'t yours? He could arrange that too, though it cost more and hurt worse.\n\nTonight, a woman in a mask of phoenix feathers approached his stall and slid a single coin across the table. Solid gold, stamped with a crown.\n\n"I don\'t buy or sell royal memories," Kael said automatically. The penalty was death by slow burn, and he had no desire to learn how many hours a body could smolder before the heart gave out.\n\n"Not buy," the woman said. Her voice was muffled by the mask, but something in it made him still. "Steal. From the princess. And I\'ll pay you not in gold, but in truth."` },
      { title: 'The Princess of Cinders', content: `Princess Veyra was nineteen years old and had not cried since she was seven. Kael knew this because the first memory he extracted from a servant\'s discarded vial was of the princess at breakfast, dry-eyed while her mother\'s funeral pyre burned on the horizon. The servant had wept enough for both of them, and that grief was what Kael tasted now, sharp and salt-heavy, as he climbed the palace walls.\n\nThe princess slept in a tower of black glass, kept warm by perpetual flames that consumed no fuel. The revolutionaries said she was the last vessel of the old magic, the fire-blood that had built the empire and would, if unchecked, burn the world to bedrock. The crown said she was their salvation, the only one who could reignite the failing sun-forges.\n\nKael said nothing. He was here for a memory, not a cause.\n\nHe found her awake, sitting by the window, watching him climb over the sill.\n\n"You\'re late," she said. "I expected you yesterday."` },
    ],
  },
  {
    id: '6',
    title: 'The Art of Noticing',
    author: 'Dr. Nina Patel',
    category: 'selfhelp',
    coverGradient: ['#3f6212', '#65a30d'],
    rating: 4.4,
    pages: 210,
    readTime: '3h 45m',
    synopsis: 'A cognitive psychologist presents a radical approach to productivity: doing less, but with full attention. Through research and practical exercises, she demonstrates how the modern obsession with efficiency is making us less effective—and how to reclaim focus in a fragmented world.',
    chapters: [
      { title: 'The Attention Diet', content: `We check our phones an average of 96 times a day. Not because we receive 96 meaningful communications, but because we have trained our brains to crave interruption the way addicts crave a fix. Each notification, each scroll, each dopamine hit of new information reinforces a neural pathway that makes deep work increasingly difficult, and eventually, impossible.\n\nI began studying attention collapse in 2019, before the pandemic made remote work universal and distraction inescapable. My subjects were high-performing professionals—doctors, engineers, executives—who reported the same paradox: they were working more hours than ever, and accomplishing less that mattered.\n\nThe problem was not laziness. The problem was fragmentation.\n\nThis book is not about time management. It is about attention management. And attention, unlike time, is not a renewable resource in the way we have been taught. You cannot multitask your way to mastery.` },
      { title: 'The Three-Hour Window', content: `In my research, one pattern emerged consistently across every field I studied: the most impactful work was done in uninterrupted blocks of approximately ninety minutes, followed by deliberate rest. Not passive scrolling, not email-checking, but genuine cognitive rest: walking, looking at nature, daydreaming.\n\nThe brain operates in ultradian rhythms, cycles of high-frequency activity followed by recovery periods. When we ignore these rhythms—pushing through fatigue with caffeine and willpower—we produce work that is not merely slower, but qualitatively worse. Mistakes increase. Creativity vanishes. Decision-making becomes reactive rather than strategic.\n\nThe solution is radical in its simplicity: schedule three hours of protected time each day. No meetings, no notifications, no multitasking. Three hours of single-tasking on the most important work you have. For most people, this produces more meaningful output than an entire day of fragmented effort.` },
    ],
  },
  {
    id: '7',
    title: 'Beneath the Paper Moon',
    author: 'Thomas Halloway',
    category: 'mystery',
    coverGradient: ['#1e1b4b', '#4338ca'],
    rating: 4.7,
    pages: 301,
    readTime: '5h 00m',
    synopsis: 'In 1920s Chicago, a jazz pianist is found dead in a speakeasy, a paper moon pinned to his lapel. The only witness is a blind singer who claims she saw the murderer through the music. A disgraced detective must navigate Prohibition, prejudice, and his own ghosts to find the truth.',
    chapters: [
      { title: 'The Blue Note', content: `The Blue Note smelled of bathtub gin and desperation, same as every other joint on South Michigan Avenue. What set it apart was the piano: a Steinway concert grand, imported at absurd expense, played nightly by a man who had once performed for European royalty.\n\nJames Harrow found the body at 2 AM, during his nightly prowl through the district he had policed for twelve years before the department decided his methods were too rough and his mouth too honest. Now he worked private security for half the clubs in the neighborhood, turning blind eyes to liquor and occasionally open ones to worse.\n\nElliot Vance sat at the piano bench, his head tilted back as if studying the ceiling, a paper moon—crude, cut from newsprint, childish—pinned to his lapel with a pearl-headed hatpin. His throat had been cut with surgical precision. Not a drop of blood on the ivory keys.\n\nIn the corner, the blind singer sat motionless, her white cane across her knees.\n\n"I heard him," she said, before Harrow could ask. "The killer. He hummed while he worked. Off-key. Always off-key."` },
    ],
  },
  {
    id: '8',
    title: 'Tomorrow\'s Ghost',
    author: 'Lena Okafor',
    category: 'scifi',
    coverGradient: ['#164e63', '#0891b2'],
    rating: 4.3,
    pages: 388,
    readTime: '6h 30m',
    synopsis: 'A temporal archaeologist excavates the ruins of future civilizations, bringing back artifacts that haven\'t been created yet. When she unearths her own obituary from 2147, she must solve her own murder before she commits the crime that causes it.',
    chapters: [
      { title: 'The Dig', content: `The future was buried in layers, same as the past. Dr. Amara Okonkwo knew this because she had spent fifteen years learning to read time the way geologists read rock strata. The upper layers were easy—recent futures, probable futures, the detritus of paths most likely taken. The deeper you went, the stranger the artifacts became, branching into timelines that might never converge with the present you called home.\n\nShe had pulled back a watch that counted in emotions instead of hours. A children\'s book written in a language that did not yet exist. A photograph of a city where the buildings grew rather than being built, their windows breathing like lungs.\n\nToday, at the 2147 layer, she found a gravestone.\n\nAMARA OKONKWO. BELOVED DAUGHTER, SISTER, THIEF OF TIME. 2089-2147.\n\nBeneath the dates, a single line: "She died as she lived: too curious for her own good."` },
    ],
  },
];

export const getBookById = (id) => books.find((b) => b.id === id);
export const getBooksByCategory = (categoryId) =>
  categoryId === 'all' ? books : books.filter((b) => b.category === categoryId);
export const getTrendingBooks = () => books.slice(0, 4);
export const getRecommendedBooks = () => [books[2], books[4], books[0], books[6]];
